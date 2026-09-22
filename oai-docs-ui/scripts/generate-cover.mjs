#!/usr/bin/env node
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { deflateSync } from 'node:zlib';
import { parseArgs } from 'node:util';
import { catalog, styles, defaultStyles, layerOnlyStyles, styleId, settings } from './cover-settings.mjs';
import { renderImage } from './cover-render.mjs';
export { settings } from './cover-settings.mjs';

const upstream = 'https://github.com/Northstrix/merucav/tree/b543416e23d5ccd5b6fa84628e483a16ae34c9ca';
const hash = value => createHash('sha256').update(value).digest('hex');
const crcTable = Uint32Array.from({ length: 256 }, (_, n) => {
  for (let i = 0; i < 8; i++) n = n & 1 ? 0xEDB88320 ^ (n >>> 1) : n >>> 1;
  return n >>> 0;
});
function chunk(type, data) {
  const body = Buffer.concat([Buffer.from(type), data]);
  let crc = 0xFFFFFFFF;
  for (const byte of body) crc = crcTable[(crc ^ byte) & 255] ^ (crc >>> 8);
  const length = Buffer.alloc(4), checksum = Buffer.alloc(4);
  length.writeUInt32BE(data.length); checksum.writeUInt32BE((crc ^ 0xFFFFFFFF) >>> 0);
  return Buffer.concat([length, body, checksum]);
}
export function encodePng(pixels, width, height) {
  const stride = width * 3 + 1, scanlines = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    const row = y * stride;
    scanlines[row] = 1;
    for (let x = 0; x < width; x++) {
      for (let c = 0; c < 3; c++) {
        const i = (y * width + x) * 3 + c;
        scanlines[row + 1 + x * 3 + c] = (pixels[i] - (x === 0 ? 0 : pixels[i - 3])) & 255;
      }
    }
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0); header.writeUInt32BE(height, 4);
  header[8] = 8; header[9] = 2;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header),
    chunk('sRGB', Buffer.from([0])), chunk('IDAT', deflateSync(scanlines)), chunk('IEND', Buffer.alloc(0)),
  ]);
}

export function parseOptions(args) {
  const expanded = args.flatMap((arg, i) => arg === '--random' && (!args[i + 1] || args[i + 1].startsWith('--')) ? ['--random', 'default'] : [arg]);
  return parseArgs({ args: expanded, options: {
    out: { type: 'string' }, seed: { type: 'string' }, color: { type: 'string' },
    style: { type: 'string', multiple: true }, random: { type: 'string', default: 'default' }, layers: { type: 'string' },
    param: { type: 'string', multiple: true }, params: { type: 'string' }, time: { type: 'string' },
    width: { type: 'string' }, height: { type: 'string' }, jobs: { type: 'string' },
    list: { type: 'boolean' }, describe: { type: 'string' }, help: { type: 'boolean' },
  } }).values;
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  if (options.help) {
    console.log(`node generate-cover.mjs [옵션]
기본: --random default / 1-3개 레이어 / 2600×1200px / ./output
--random [default|all|style|color|none]  생략하거나 단독 --random이면 default
  default: 지정된 27개 중 스타일·형태/색상 파라미터·키 컬러 랜덤. layer 단독 선택 제외
  all: 57개 전체에서 스타일·형태/색상 파라미터·키 컬러 랜덤
  style: 57개 전체에서 스타일·형태 파라미터 랜덤, 색상 파라미터는 기본값
  color: 스타일·형태는 고정하고 색상 파라미터·키 컬러만 랜덤
  none: 랜덤 없이 Flow 또는 지정한 스타일의 웹 기본값 사용; 원래 색상·time=2초
--style flow[,swirl]              스타일 지정; 여러 번 전달해도 됨
--layers 2                       랜덤 레이어 개수 고정; 생략 시 1-3개
  아래 레이어 불투명도는 1, 위 레이어는 기본 0.55 또는 랜덤 0.4-0.7
--color native|"#5477C4"          원래 색상 또는 단일 키 컬러
--seed text                      랜덤 선택 재현; none 모드에서는 기본값 유지
--param twist=30                 개별 파라미터; 다중 레이어는 flow.twist=30 또는 0.twist=30
--params file.json               파라미터 JSON; --param이 마지막에 적용됨
--time 2                         정지 프레임 시점(초)
--width 2600 --height 1200        출력 크기; 낮은 크기로 먼저 확인 가능
--jobs 4                         CPU 병렬 작업 수
--out ./output/cover.png         PNG 파일 경로; 같은 이름의 JSON도 저장
--list                           57개 스타일과 default/layer 표시
--describe space-threads          해당 스타일의 모든 기본값·범위 조회
Node.js 20+만 사용합니다. 런타임 다운로드·브라우저·추가 npm 설치가 없으며 기존 파일은 덮어쓰지 않습니다.`);
    return;
  }
  if (options.list) {
    console.log(styles.map(style => `${style}\t${catalog[style].name}${defaultStyles.includes(style) ? layerOnlyStyles.includes(style) ? '\tdefault (layer)' : '\tdefault' : ''}`).join('\n'));
    return;
  }
  if (options.describe) {
    const style = styleId(options.describe);
    console.log(JSON.stringify({ style, name: catalog[style].name, defaultPool: defaultStyles.includes(style), layerOnly: layerOnlyStyles.includes(style), parameters: catalog[style].params }, null, 2));
    return;
  }
  if (options.params) options.params = JSON.parse(await fs.readFile(options.params, 'utf8'));
  const config = settings(options);
  const { jobs, ...identity } = config;
  const tag = config.layers[0].style + (config.layers.length > 1 ? `-plus${config.layers.length - 1}` : '');
  const out = path.resolve(options.out ?? `output/cover-${tag}-${hash(JSON.stringify(identity)).slice(0, 12)}.png`);
  if (!out.toLowerCase().endsWith('.png')) throw new Error('출력 경로는 .png로 끝나야 합니다.');
  const metadataPath = out.slice(0, -4) + '.json';
  if (existsSync(out) || existsSync(metadataPath)) throw new Error('출력 PNG/JSON이 이미 있습니다. 다른 --out 경로를 사용하세요.');
  const { pixels, stats } = await renderImage(config);
  const png = encodePng(pixels, config.width, config.height);
  const sources = await Promise.all(['generate-cover.mjs', 'cover-settings.mjs', 'cover-render.mjs',
    'vendor/merucav-catalog.json', 'vendor/merucav-shaders.mjs', 'vendor/merucav-bindings.mjs',
    'vendor/merucav-color.mjs', 'vendor/merucav-city.mjs', 'vendor/merucav-city-geometry.mjs']
    .map(file => fs.readFile(new URL(file, import.meta.url))));
  const metadata = { ...config, upstream, renderer: 'merucav-cpu-v2', runtime: process.version, composite: 'screen',
    stats, sha256: hash(png), sourceSha256: hash(Buffer.concat(sources)), image: path.basename(out),
    licenseNotice: path.relative(path.dirname(metadataPath), fileURLToPath(new URL('./vendor/NOTICE.md', import.meta.url))).split(path.sep).join('/') };
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2) + '\n', { flag: 'wx' });
  try { await fs.writeFile(out, png, { flag: 'wx' }); }
  catch (error) { await fs.unlink(metadataPath); throw error; }
  console.log(JSON.stringify({ image: out, metadata: metadataPath, seed: config.seed, random: config.random, styles: config.layers.map(l => l.style), color: config.color }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
