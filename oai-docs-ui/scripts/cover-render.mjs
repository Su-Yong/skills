import { availableParallelism } from 'node:os';
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { shaderFactories } from './vendor/merucav-shaders.mjs';
import { bindUniforms } from './vendor/merucav-bindings.mjs';
import { renderCity } from './vendor/merucav-city.mjs';
import { catalog, seededRandom } from './cover-settings.mjs';

const clamp = value => Math.max(0, Math.min(1, value));
const mix = (a, b, t) => a + (b - a) * t;
const wrap = (value, size) => ((value % size) + size) % size;

function noiseTexture(seed) {
  const random = seededRandom(`texture:${seed}`);
  const data = new Float32Array(256 * 256 * 4);
  for (let i = 0; i < data.length; i++) data[i] = Math.floor(random() * 255) / 255;
  return { data, width: 256, height: 256 };
}

function sampleTexture(texture, coord) {
  const x = coord[0] * texture.width - 0.5, y = coord[1] * texture.height - 0.5;
  const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0;
  const pixel = (xx, yy, c) => texture.data[(wrap(yy, texture.height) * texture.width + wrap(xx, texture.width)) * 4 + c];
  return [0, 1, 2, 3].map(c => mix(mix(pixel(x0, y0, c), pixel(x0 + 1, y0, c), fx), mix(pixel(x0, y0 + 1, c), pixel(x0 + 1, y0 + 1, c), fx), fy));
}

function uniformsFor(layer, config) {
  const uniforms = bindUniforms[layer.style](layer.params, config.width, config.height, config.time, noiseTexture(config.geometrySeed));
  for (const [name, type] of Object.entries(catalog[layer.style].uniformTypes ?? {})) {
    if (type === 'int') uniforms[name] = Math.trunc(uniforms[name]);
    if (type === 'uint') uniforms[name] = uniforms[name] >>> 0;
    if (type === 'bool') uniforms[name] = Boolean(uniforms[name]);
  }
  return uniforms;
}

function dimensions(uniforms, config) {
  const name = Object.keys(uniforms).find(key => /resolution/i.test(key));
  return name ? uniforms[name].slice(0, 2).map(Math.round) : [config.width, config.height];
}

function drawRows({ layer, config, buffer, start, end }) {
  const uniforms = uniformsFor(layer, config);
  const [width, height] = dimensions(uniforms, config);
  const image = new Float32Array(buffer);
  let derivativeMode = 0, derivativeIndex = 0, dx = [], dy = [];
  const derivative = value => {
    const index = derivativeIndex++;
    if (derivativeMode === 1) { dx[index] = value; return 0; }
    if (derivativeMode === 2) { dy[index] = value; return 0; }
    return Math.abs((dx[index] ?? value) - value) + Math.abs((dy[index] ?? value) - value);
  };
  const sample = shaderFactories[layer.style](uniforms, derivative, width, height, sampleTexture);
  let nonFiniteValues = 0;
  for (let y = start; y < end; y++) {
    for (let x = 0; x < width; x++) {
      const px = x + 0.5, py = height - y - 0.5;
      if (catalog[layer.style].derivatives) {
        derivativeMode = 1; derivativeIndex = 0; dx = []; sample(px + 1, py);
        derivativeMode = 2; derivativeIndex = 0; dy = []; sample(px, py + 1);
      }
      derivativeMode = 0; derivativeIndex = 0;
      const rgba = sample(px, py);
      const index = (y * width + x) * 4;
      for (let c = 0; c < 4; c++) {
        let value = rgba[c] ?? (c === 3 ? 1 : 0);
        if (!Number.isFinite(value)) { nonFiniteValues++; value = 0; }
        image[index + c] = clamp(value);
      }
    }
  }
  return nonFiniteValues;
}

async function renderLayer(layer, config) {
  if (!layer.params.enabled || layer.params.opacity === 0) return { pixels: null, width: config.width, height: config.height, nonFiniteValues: 0 };
  if (layer.style === 'cosmicCity') return { pixels: renderCity(layer.params, config.width, config.height, config.time), width: config.width, height: config.height, nonFiniteValues: 0 };
  const [width, height] = dimensions(uniformsFor(layer, config), config);
  const buffer = new SharedArrayBuffer(width * height * 4 * Float32Array.BYTES_PER_ELEMENT);
  const jobs = width * height < 65_536 ? 1 : Math.min(config.jobs, availableParallelism(), height);
  let nonFiniteValues;
  if (jobs === 1) nonFiniteValues = drawRows({ layer, config, buffer, start: 0, end: height });
  else {
    const workers = [];
    try {
      const counts = await Promise.all(Array.from({ length: jobs }, (_, i) => new Promise((resolve, reject) => {
        const worker = new Worker(new URL(import.meta.url), {
          workerData: { coverRows: true, layer, config, buffer, start: Math.floor(height * i / jobs), end: Math.floor(height * (i + 1) / jobs) },
          execArgv: [],
        });
        workers.push(worker);
        worker.once('message', result => result.error ? reject(new Error(result.error)) : resolve(result.count));
        worker.once('error', reject);
        worker.once('exit', code => { if (code !== 0) reject(new Error(`렌더링 worker 종료: ${code}`)); });
      })));
      nonFiniteValues = counts.reduce((sum, n) => sum + n, 0);
    } finally {
      await Promise.all(workers.map(worker => worker.terminate()));
    }
  }
  return { pixels: new Float32Array(buffer), width, height, nonFiniteValues };
}

function sampleImage(frame, x, y, c) {
  const xx = Math.max(0, Math.min(frame.width - 1, x)), yy = Math.max(0, Math.min(frame.height - 1, y));
  const x0 = Math.floor(xx), y0 = Math.floor(yy), x1 = Math.min(x0 + 1, frame.width - 1), y1 = Math.min(y0 + 1, frame.height - 1);
  const pixel = (a, b) => frame.pixels[(b * frame.width + a) * 4 + c];
  return mix(mix(pixel(x0, y0), pixel(x1, y0), xx - x0), mix(pixel(x0, y1), pixel(x1, y1), xx - x0), yy - y0);
}

export async function renderImage(config) {
  const { width, height } = config;
  const rgb = new Float32Array(width * height * 3);
  const layers = [];
  for (const layer of config.layers) {
    const frame = await renderLayer(layer, config);
    layers.push({ style: layer.style, sourceWidth: frame.width, sourceHeight: frame.height, nonFiniteValues: frame.nonFiniteValues });
    if (!frame.pixels) continue;
    const transform = layer.params.transform;
    const angle = transform.rotation * Math.PI / 180, cs = Math.cos(angle), sn = Math.sin(angle);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x + 0.5 - width / 2 - transform.translateX / 100 * width;
        const dy = y + 0.5 - height / 2 - transform.translateY / 100 * height;
        const sx = (dx * cs + dy * sn) / transform.scale + width / 2;
        const sy = (-dx * sn + dy * cs) / transform.scale + height / 2;
        if (sx < 0 || sx >= width || sy < 0 || sy >= height) continue;
        const fx = sx / width * frame.width - 0.5, fy = sy / height * frame.height - 0.5;
        const alpha = clamp(sampleImage(frame, fx, fy, 3) * layer.params.opacity);
        const i = (y * width + x) * 3;
        // Screen blend keeps the light patterns in secondary layers visible.
        for (let c = 0; c < 3; c++) rgb[i + c] = 1 - (1 - rgb[i + c]) * (1 - clamp(sampleImage(frame, fx, fy, c)) * alpha);
      }
    }
  }
  const pixels = new Uint8Array(rgb.length);
  let low = 1, high = 0;
  for (let i = 0; i < rgb.length; i += 3) {
    const tone = rgb[i] * 0.2126 + rgb[i + 1] * 0.7152 + rgb[i + 2] * 0.0722;
    low = Math.min(low, tone); high = Math.max(high, tone);
  }
  let neutralFallback = false;
  if (config.color === 'native') {
    for (let i = 0; i < rgb.length; i++) pixels[i] = Math.round(clamp(rgb[i]) * 255);
  } else {
    let base = config.color.match(/[0-9A-F]{2}/g).map(c => parseInt(c, 16));
    neutralFallback = Math.min(...base) > 245;
    if (neutralFallback) base = [199, 199, 199];
    for (let i = 0; i < rgb.length; i += 3) {
      const value = rgb[i] * 0.2126 + rgb[i + 1] * 0.7152 + rgb[i + 2] * 0.0722;
      const tone = high - low < 1e-8 ? 1 : clamp((value - low) / (high - low));
      for (let c = 0; c < 3; c++) pixels[i + c] = Math.round(base[c] + (255 - base[c]) * tone);
    }
  }
  return { pixels, stats: { low, high, neutralFallback, layers } };
}

if (!isMainThread && workerData?.coverRows) {
  try { parentPort.postMessage({ count: drawRows(workerData) }); }
  catch (error) { parentPort.postMessage({ error: error.stack ?? error.message }); }
}
