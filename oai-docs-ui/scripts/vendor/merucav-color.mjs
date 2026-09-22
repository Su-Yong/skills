export function hexToRgbaVec(hex) {
 const s=hex.slice(1); const digits=s.length===3?[...s].map(c=>c+c).join(''):s;
 return [0,2,4].map(i=>parseInt(digits.slice(i,i+2),16)/255).concat(digits.length===8?parseInt(digits.slice(6,8),16)/255:1);
}
export function hslToRgb(h,s,l){
 h=((h%360)+360)%360/360;s/=100;l/=100;
 const f=n=>{const k=(n+h*12)%12;return l-s*Math.min(l,1-l)*Math.max(-1,Math.min(k-3,9-k,1));};
 return {r:Math.round(255*f(0)),g:Math.round(255*f(8)),b:Math.round(255*f(4))};
}
export function hexToRgb(hex){const [r,g,b]=hexToRgbaVec(hex);return {r:r*255,g:g*255,b:b*255};}
