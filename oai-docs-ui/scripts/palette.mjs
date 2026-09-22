#!/usr/bin/env node
import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const channels = hex => {
  if (typeof hex !== 'string' || !/^#[0-9A-F]{6}$/i.test(hex)) throw new Error('KEY_COLOR must be an opaque #RRGGBB value.');
  return hex.slice(1).match(/../g).map(value => parseInt(value, 16));
};
const mix = (a, b, weight) => '#' + channels(a).map((value, i) =>
  Math.floor(value * weight + channels(b)[i] * (1 - weight) + 0.5).toString(16).padStart(2, '0')).join('').toUpperCase();
const luminance = hex => channels(hex).map(value => {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}).reduce((sum, value, i) => sum + value * [0.2126, 0.7152, 0.0722][i], 0);

export function contrast(a, b) {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

// Exact 8-bit sRGB mixing and 5% darkening from references/design-system.md.
export function palette(keyColor = '#5477C4') {
  channels(keyColor);
  const values = {
    paper: '#FFFFFF', text: '#111111', muted: '#666666', rule: '#C7C7C7',
    'neutral-fill': '#F4F4F4', accent: keyColor.toUpperCase(),
    'accent-soft': mix(keyColor, '#FFFFFF', 0.06),
    'accent-tint': mix(keyColor, '#FFFFFF', 0.12),
    'accent-mid': mix(keyColor, '#FFFFFF', 0.28),
  };
  const backgrounds = [values.paper, values['accent-soft'], values['accent-tint']];
  for (let step = 0; step <= 20; step++) {
    const candidate = mix(keyColor, values.text, 1 - step / 20);
    if (backgrounds.every(background => contrast(candidate, background) >= 4.5)) {
      values['accent-ink'] = candidate;
      break;
    }
  }
  values['data-strong'] = contrast(keyColor, values.paper) >= 3 ? values.accent : values['accent-ink'];
  values['on-accent'] = contrast(keyColor, '#000000') >= contrast(keyColor, '#FFFFFF') ? '#000000' : '#FFFFFF';
  return values;
}
export const tokens = palette();

function check() {
  const examples = [
    ['#5477C4', '#F5F7FB', '#EAEFF8', '#CFD9EE', '#4A68A9', '#5477C4'],
    ['#138A72', '#F1F8F7', '#E3F1EE', '#BDDED8', '#137863', '#138A72'],
    ['#C26A29', '#FBF6F2', '#F8EDE5', '#EED5C3', '#9F5824', '#C26A29'],
    ['#FFD54F', '#FFFCF4', '#FFFAEA', '#FFF3CE', '#7C692D', '#7C692D'],
    ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#707070', '#707070'],
    ['#000000', '#F0F0F0', '#E0E0E0', '#B8B8B8', '#000000', '#000000'],
  ];
  for (const [keyColor, ...expected] of examples) {
    const p = palette(keyColor);
    assert.deepEqual(['accent-soft', 'accent-tint', 'accent-mid', 'accent-ink', 'data-strong'].map(name => p[name]), expected);
    for (const name of ['paper', 'accent-soft', 'accent-tint']) assert(contrast(p['accent-ink'], p[name]) >= 4.5);
    assert(contrast(p['data-strong'], p.paper) >= 3);
    assert(contrast(p['on-accent'], p.accent) >= 4.5);
  }
  assert.deepEqual(palette('#5477c4'), tokens);
  for (const invalid of ['', 'blue', '#FFF', '#5477C400', '#12GG34', null, 123]) assert.throws(() => palette(invalid));
  console.log('PASS: six specified palettes, text/data contrast, black/white, uppercase normalization, invalid input.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const args = process.argv.slice(2);
    if (args.length > 1) throw new Error('Usage: node palette.mjs [#RRGGBB | --check]');
    if (args[0] === '--check') check();
    else console.log(JSON.stringify(palette(args[0]), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
