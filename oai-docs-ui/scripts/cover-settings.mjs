import { readFileSync } from 'node:fs';
import { createHash, randomBytes } from 'node:crypto';

export const catalog = JSON.parse(readFileSync(new URL('./vendor/merucav-catalog.json', import.meta.url), 'utf8'));
export const styles = Object.keys(catalog);
export const defaultStyles = [
  'flow', 'tranquiluxe', 'fate', 'structuredNoise', 'balatro', 'electricPulse',
  'novatrix', 'discGlare', 'pulse', 'melt', 'neonPolygon', 'exposedFilm',
  'solarWhirls', 'chargedCells', 'refractedWave', 'swirl', 'neuralNoise',
  'interstellar', 'corrodedSpiral', 'celestialJourney', 'quantumShapes',
  'glassOrigin', 'chromaticUniverse', 'membranes', 'quantumCore', 'whirlpool', 'neuralGlass',
];
export const layerOnlyStyles = ['electricPulse', 'neonPolygon', 'swirl', 'interstellar', 'quantumCore'];
const normalize = name => name.toLowerCase().replace(/[\s_-]/g, '');
const hexPattern = /^#[0-9a-f]{6}(?:[0-9a-f]{2})?$/i;
const geometryExcluded = /^(enabled|opacity|renderScale|transform\.)/;

export function styleId(name) {
  const found = typeof name === 'string' && styles.find(style => normalize(style) === normalize(name) || normalize(catalog[style].name) === normalize(name));
  if (!found) throw new Error(`알 수 없는 스타일: ${name}. --list로 57개 스타일을 확인하세요.`);
  return found;
}

export function seededRandom(seed) {
  let state = createHash('sha256').update(seed).digest().readUInt32LE(0);
  return () => {
    let t = state = (state + 0x6D2B79F5) >>> 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function put(object, key, value) {
  const parts = key.split('.');
  let target = object;
  for (const part of parts.slice(0, -1)) target = target[part] ??= {};
  target[parts.at(-1)] = value;
}

export function defaultParameters(style) {
  const params = {};
  for (const [key, spec] of Object.entries(catalog[style].params)) put(params, key, structuredClone(spec.default));
  return params;
}

function setParameter(layer, rawKey, value) {
  const key = rawKey.replace(/\[(\d+)\]/g, '.$1');
  const arrayElement = key.match(/^(\w+)\.(\d+)$/);
  let spec = catalog[layer.style].params[key];
  if (!spec && arrayElement && catalog[layer.style].params[arrayElement[1]]?.type === 'colors') {
    const array = layer.params[arrayElement[1]];
    if (Number(arrayElement[2]) >= array.length) throw new Error(`${rawKey}: 색상 배열 범위를 벗어났습니다.`);
    spec = { type: 'color' };
  }
  if (!spec) throw new Error(`${layer.style}.${rawKey}: 알 수 없는 파라미터입니다. --describe ${layer.style}를 확인하세요.`);
  if (spec.type === 'number') {
    if (typeof value === 'boolean' && /symmetry|kaleidoscopeEnabled/.test(key)) value = Number(value);
    if (typeof value !== 'number' || !Number.isFinite(value) || Math.abs(value) > 1e9) throw new Error(`${key}: 유한한 숫자가 필요합니다.`);
    if (spec.min !== undefined && value < spec.min || spec.max !== undefined && value > spec.max) throw new Error(`${key}: 허용 범위 ${spec.min ?? '-∞'} ~ ${spec.max ?? '∞'}`);
  } else if (spec.type === 'boolean') {
    if (typeof value !== 'boolean') throw new Error(`${key}: true 또는 false가 필요합니다.`);
  } else if (spec.type === 'color') {
    if (typeof value !== 'string' || !hexPattern.test(value)) throw new Error(`${key}: #RRGGBB 또는 #RRGGBBAA가 필요합니다.`);
    value = value.toUpperCase();
  } else if (spec.type === 'colors') {
    if (!Array.isArray(value) || value.length < 1 || value.length > spec.maxLength || value.some(v => typeof v !== 'string' || !hexPattern.test(v))) throw new Error(`${key}: 1-${spec.maxLength}개의 HEX 색상 배열이 필요합니다.`);
    value = value.map(v => v.toUpperCase());
  } else if (typeof value !== spec.type) throw new Error(`${key}: ${spec.type} 값이 필요합니다.`);
  put(layer.params, key, value);
}

function flatten(object, prefix = '') {
  if (!object || typeof object !== 'object' || Array.isArray(object)) throw new Error('--params 파일은 JSON 객체여야 합니다.');
  return Object.entries(object).flatMap(([key, value]) => {
    if (['__proto__', 'constructor', 'prototype'].includes(key)) throw new Error(`허용되지 않은 파라미터: ${key}`);
    return value && typeof value === 'object' && !Array.isArray(value) ? flatten(value, `${prefix}${key}.`) : [[prefix + key, value]];
  });
}

export function settings(options = {}) {
  const randomMode = options.random === 'none' ? null : options.random ?? null;
  if (randomMode !== null && !['default', 'all', 'style', 'color'].includes(randomMode)) throw new Error('--random: default, all, style, color, none 중 하나를 사용하세요.');
  const seed = options.seed ?? (randomMode ? randomBytes(8).toString('hex') : 'merucav-default');
  if (typeof seed !== 'string' || !seed || seed.length > 256) throw new Error('seed는 1-256자여야 합니다.');
  const random = seededRandom(seed);
  const pick = values => values[Math.floor(random() * values.length)];
  const randomHex = () => `#${Math.floor(random() * 0x1000000).toString(16).padStart(6, '0')}`.toUpperCase();
  const randomStyle = ['default', 'all', 'style'].includes(randomMode);
  const randomColor = ['default', 'all', 'color'].includes(randomMode);
  const width = Number(options.width ?? 2600), height = Number(options.height ?? 1200);
  if (![width, height].every(n => Number.isInteger(n) && n >= 16 && n <= 8192) || width * height > 16_000_000) throw new Error('크기는 각 16-8192px, 전체 16,000,000픽셀 이하여야 합니다.');
  const explicitStyles = options.style === undefined ? null : (Array.isArray(options.style) ? options.style : [options.style]).flatMap(s => s.split(',')).map(s => styleId(s.trim()));
  let count = Number(options.layers ?? explicitStyles?.length ?? (randomStyle ? 1 + Math.floor(random() * 3) : 1));
  if (!Number.isInteger(count) || count < 1 || count > 57) throw new Error('--layers는 1-57의 정수여야 합니다.');
  if (explicitStyles && explicitStyles.length !== count) throw new Error('--layers와 지정한 --style 개수가 다릅니다.');
  if (!randomStyle && !explicitStyles && count !== 1) throw new Error('여러 레이어는 --style 목록 또는 --random default|all|style을 지정하세요.');
  let selected = explicitStyles;
  if (!selected) {
    if (randomStyle) {
      const candidates = (randomMode === 'default' ? defaultStyles : styles).filter(s => !(randomMode === 'default' && count === 1 && layerOnlyStyles.includes(s)));
      if (count > candidates.length) throw new Error(`이 모드에서는 최대 ${candidates.length}개를 선택할 수 있습니다.`);
      selected = [];
      while (selected.length < count) {
        const choice = pick(candidates); selected.push(choice); candidates.splice(candidates.indexOf(choice), 1);
      }
    } else selected = ['flow'];
  }
  if (randomMode === 'default' && selected.some(s => !defaultStyles.includes(s) || count === 1 && layerOnlyStyles.includes(s))) throw new Error('--random default: 지정 목록만 허용하며 layer 스타일은 단독으로 사용할 수 없습니다.');
  const layers = selected.map((style, index) => {
    const params = defaultParameters(style);
    if (randomMode) {
      for (const [key, spec] of Object.entries(catalog[style].params)) {
        const colorParameter = spec.color;
        if (geometryExcluded.test(key) || !(colorParameter ? randomColor : randomStyle)) continue;
        let value;
        if (spec.type === 'color') value = randomHex() + (spec.default.length === 9 ? spec.default.slice(7) : '');
        else if (spec.type === 'colors') value = spec.default.map(c => randomHex() + (c.length === 9 ? c.slice(7) : ''));
        else if (spec.type === 'boolean') value = random() < 0.5;
        else if (spec.type === 'number') {
          if (/^(symmetry|kaleidoscopeEnabled)$/.test(key)) value = random() < 0.5 ? 0 : 1;
          else {
            const bounded = spec.min !== undefined && spec.max !== undefined;
            const span = bounded ? (spec.max - spec.min) * 0.25 : Math.abs(spec.default) * 0.5 || 1;
            value = /hue/i.test(key) && bounded ? spec.min + random() * (spec.max - spec.min) : spec.default + (random() * 2 - 1) * span;
            if (spec.step) value = Math.round(value / spec.step) * spec.step;
            value = Math.max(spec.min ?? -1e9, Math.min(spec.max ?? 1e9, value));
            if (!colorParameter && spec.default > 0 && value === 0) value = Math.min(spec.max ?? Infinity, spec.step ?? spec.default * 0.1);
            value = Number(value.toFixed(8));
          }
        } else continue;
        put(params, key, value);
      }
    }
    params.opacity = index === 0 ? 1 : randomStyle ? 0.4 + random() * 0.3 : 0.55;
    return { style, params };
  });
  const color = options.color ?? (randomColor ? randomHex() : 'native');
  if (color !== 'native' && !/^#[0-9a-f]{6}$/i.test(color)) throw new Error('--color는 native 또는 #RRGGBB여야 합니다.');
  const time = Number(options.time ?? (randomStyle ? 1 + random() * 9 : 2));
  if (!Number.isFinite(time) || time < 0 || time > 1_000_000) throw new Error('--time은 0-1000000초여야 합니다.');
  const overrides = options.params === undefined ? [] : flatten(options.params);
  for (const entry of options.param ?? []) {
    const eq = entry.indexOf('=');
    if (eq < 1) throw new Error('--param은 이름=값 형식입니다.');
    const raw = entry.slice(eq + 1);
    let value; try { value = JSON.parse(raw); } catch { value = raw; }
    overrides.push([entry.slice(0, eq), value]);
  }
  for (const [key, value] of overrides) {
    const dot = key.indexOf('.');
    const prefix = dot < 0 ? '' : key.slice(0, dot);
    let index = /^\d+$/.test(prefix) ? Number(prefix) : layers.findIndex(l => normalize(l.style) === normalize(prefix));
    if (index >= 0) {
      if (!layers[index]) throw new Error(`레이어가 없습니다: ${prefix}`);
      if (!/^\d+$/.test(prefix) && layers.filter(l => l.style === layers[index].style).length > 1) throw new Error('같은 스타일이 여러 개이면 0, 1 등의 레이어 번호를 사용하세요.');
      setParameter(layers[index], key.slice(dot + 1), value);
    } else if (layers.length === 1) setParameter(layers[0], key, value);
    else throw new Error(`${key}: 다중 레이어는 스타일명 또는 번호 접두사가 필요합니다.`);
  }
  const jobs = Number(options.jobs ?? 4);
  if (!Number.isInteger(jobs) || jobs < 1 || jobs > 32) throw new Error('--jobs는 1-32여야 합니다.');
  return { random: randomMode, seed, width, height, time, color: color === 'native' ? color : color.toUpperCase(),
    geometrySeed: randomStyle ? seed : 'merucav-default', layers, jobs };
}
