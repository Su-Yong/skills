// CPU point/line projection of Merucav Cosmic City. Fixed-frame bloom and trails
// approximate the upstream WebGL postprocessing; all its controls are retained.
import {cityGeometry} from './merucav-city-geometry.mjs';
import {hexToRgbaVec} from './merucav-color.mjs';
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const mix=(a,b,t)=>a+(b-a)*t;
const mod=(v,d)=>v-Math.floor(v/d)*d;
const smooth=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t);};
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const norm=a=>{const l=Math.hypot(...a)||1;return a.map(x=>x/l);};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const pathX=(z,amount)=>{const p=z/430*Math.PI*2;return(Math.sin(p*2)*.72+Math.sin(p*5+1.8)*.22+Math.sin(p-.7)*.35)*amount;};
const pathY=z=>Math.sin(z/430*Math.PI*4+.8)*.48;
function shiftHue(rgb,hue,saturation){
 const max=Math.max(...rgb),min=Math.min(...rgb),d=max-min;
 let h=d===0?0:max===rgb[0]?mod((rgb[1]-rgb[2])/d,6):max===rgb[1]?(rgb[2]-rgb[0])/d+2:(rgb[0]-rgb[1])/d+4;
 h=mod(h/6+hue/360,1);const s=clamp((max===0?0:d/max)*saturation);
 return [0,2/3,1/3].map(o=>max*mix(1,clamp(Math.abs(mod(h+o,1)*6-3)-1),s));
}
function boxBlur(source,width,height,radius){
 if(radius<1)return source.slice();
 const temp=new Float32Array(source.length),out=new Float32Array(source.length);
 const diameter=radius*2+1;
 for(let y=0;y<height;y++)for(let c=0;c<3;c++){
  let sum=0;for(let x=-radius;x<=radius;x++)sum+=source[(y*width+clamp(x,0,width-1))*3+c];
  for(let x=0;x<width;x++){temp[(y*width+x)*3+c]=sum/diameter;sum+=source[(y*width+clamp(x+radius+1,0,width-1))*3+c]-source[(y*width+clamp(x-radius,0,width-1))*3+c];}
 }
 for(let x=0;x<width;x++)for(let c=0;c<3;c++){
  let sum=0;for(let y=-radius;y<=radius;y++)sum+=temp[(clamp(y,0,height-1)*width+x)*3+c];
  for(let y=0;y<height;y++){out[(y*width+x)*3+c]=sum/diameter;sum+=temp[(clamp(y+radius+1,0,height-1)*width+x)*3+c]-temp[(clamp(y-radius,0,height-1)*width+x)*3+c];}
 }
 return out;
}
export function renderCity(params,width,height,time){
 const {points,lines}=cityGeometry(params);
 const colors=[params.color1,params.color2,params.color3,params.color4].map(c=>hexToRgbaVec(c).slice(0,3));
 const output=new Float32Array(width*height*3);
 const frame=(at)=>{
  const pixels=new Float32Array(output.length);
  const cameraZ=-mod(at*params.speed,430),sway=Math.sin(at*.18)*params.cameraSway;
  const camera=[sway,params.cameraVertical,0];
  const forward=norm([pathX(cameraZ-28,params.curveAmount)-pathX(cameraZ,params.curveAmount)-sway*.58,pathY(cameraZ-28)-pathY(cameraZ),-28]);
  const right=norm(cross(forward,[0,1,0])),up=cross(right,forward);
  const roll=Math.sin(at*.24+.9)*params.cameraRoll+Math.sin(at*.61)*params.cameraRoll*.24;
  const cs=Math.cos(roll),sn=Math.sin(roll),focal=height/(2*Math.tan(params.fov*Math.PI/360));
  const project=(x,y,z,centerZ=z)=>{
   const relative=centerZ-cameraZ,wrap=mod(relative+215,430)-215-relative;
   const v=[x+pathX(z,params.curveAmount)-pathX(cameraZ,params.curveAmount)-camera[0],y*params.cityHeight+pathY(z)-pathY(cameraZ)-camera[1],z-cameraZ+wrap];
   const depth=dot(v,forward);if(depth<=.08||depth>360)return null;
   const px=dot(v,right),py=dot(v,up);
   return [width/2+focal*(px*cs+py*sn)/depth,height/2-focal*(-px*sn+py*cs)/depth,depth,v[2]];
  };
  const add=(x,y,rgb,alpha)=>{if(x<0||x>=width||y<0||y>=height||alpha<=0)return;const i=(y*width+x)*3;for(let c=0;c<3;c++)pixels[i+c]+=rgb[c]*alpha;};
  for(let i=0;i<lines.positions.length;i+=6){
   const n=i/3,center=lines.centers[n];
   const a=project(...lines.positions.slice(i,i+3),center),b=project(...lines.positions.slice(i+3,i+6),center);
   if(!a||!b)continue;
   const z=mod(center-cameraZ+215,430)-215;
   const fade=smooth(-215,-119,z)*(1-smooth(-30,-14,z))*(z<0?1:0);
   const t=mod(lines.seeds[n]*7.37,1),rgb=colors[0].map((c,j)=>mix(c,colors[1][j],t)*1.15);
   const steps=Math.min(Math.max(width,height)*2,Math.ceil(Math.max(Math.abs(a[0]-b[0]),Math.abs(a[1]-b[1]))));
   for(let k=0;k<=steps;k++)add(Math.round(mix(a[0],b[0],k/(steps||1))),Math.round(mix(a[1],b[1],k/(steps||1))),rgb,params.edgeOpacity*fade);
  }
  for(let n=0;n<points.seeds.length;n++){
   const i=n*3,p=project(points.positions[i],points.positions[i+1],points.positions[i+2]);if(!p)continue;
   const seed=points.seeds[n],brightness=points.brightness[n],palette=points.palette[n];
   const fade=smooth(-215,-123,p[3])*(1-smooth(-17,-3,p[3]));
   const alpha=params.pointOpacity*brightness*fade*(.9+.1*Math.sin(at*3+seed*43));
   if(alpha<.0001)continue;
   let rgb=colors[0].map((c,j)=>mix(mix(c,colors[1][j],smooth(0,.45,palette)),mix(colors[2][j],colors[3][j],smooth(.55,1,palette)),smooth(.38,.72,palette)));
   const spectral=mod(seed*19.17,1);if(spectral<.055)rgb=colors[3];else if(spectral<.105)rgb=[.25,1,.45];else if(spectral<.165)rgb=colors[1];
   rgb=rgb.map(c=>c*(.72+brightness*.75));
   const size=clamp(params.pointSize*points.sizes[n]*105/Math.max(18,p[2])*(1+Math.sin(at*2.1+seed*13)*params.pulse*.12),.55,5.2);
   const half=size/2;
   for(let y=Math.floor(p[1]-half);y<=Math.ceil(p[1]+half);y++)for(let x=Math.floor(p[0]-half);x<=Math.ceil(p[0]+half);x++){
    const edge=Math.max(Math.abs(x+.5-p[0]),Math.abs(y+.5-p[1]))/size;
    add(x,y,rgb,alpha*(1-smooth(.36,.5,edge)));
   }
  }
  return pixels;
 };
 // Five deterministic history samples approximate AfterimagePass for a still frame.
 for(let history=params.trailPersistence>0?4:0;history>=0;history--){
  const pixels=frame(time-history/30),weight=params.trailPersistence**history;
  for(let i=0;i<output.length;i++)output[i]=Math.max(output[i],pixels[i]*weight);
 }
 if(params.bloomStrength>0){
  const bright=output.map(v=>Math.max(0,v-params.bloomThreshold));
  const blur=boxBlur(bright,width,height,Math.max(1,Math.round((1+params.bloomRadius*12)*Math.max(width,height)/800)));
  const strength=params.bloomStrength*(1+(.5+.5*Math.sin(time*2.1))*params.pulse*.09);
  for(let i=0;i<output.length;i++)output[i]+=blur[i]*strength;
 }
 const result=new Float32Array(width*height*4);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const nx=(x+.5)/width-.5,ny=(y+.5)/height-.5,radial=nx*nx+ny*ny,l=Math.hypot(nx,ny)||1;
  const shift=params.chromaticShift*(.42+radial*2.6);
  const positions=[1,0,-1].map(sign=>[clamp(Math.round(x+nx/l*shift*width*sign),0,width-1),clamp(Math.round(y+ny/l*shift*height*sign),0,height-1)]);
  let rgb=positions.map(([xx,yy],c)=>output[(yy*width+xx)*3+c]);
  const noise=mod(Math.sin((x+time*37)*12.9898+(y+time*61)*78.233)*43758.5453,1)-.5;
  const lum=dot(rgb,[.2126,.7152,.0722]),scan=.985+(.5+.5*Math.sin((height-y+time*42)*Math.PI))*.015;
  const vignette=mix(1,smooth(.92,.18,radial*(1.05+params.vignette)),params.vignette);
  rgb=rgb.map(c=>clamp((c*scan+noise*params.grain*(.3+.7*clamp(lum)))*vignette));
  rgb=shiftHue(rgb,params.hue,params.saturation);
  const i=(y*width+x)*4;result.set([...rgb,1],i);
 }
 return result;
}
