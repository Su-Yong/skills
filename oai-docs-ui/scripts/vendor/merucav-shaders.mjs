// Generated JavaScript from pinned Merucav GLSL via glsl-transpiler 3.0.3.
// Local adaptations and licenses: NOTICE.md. No compiler or network needed at runtime.
function cloneValue(v){return Array.isArray(v)||ArrayBuffer.isView(v)?v.slice():v;}
function assignComponents(target,indices,values){for(let i=0;i<indices.length;i++)target[indices[i]]=values[i];return target;}
export const shaderFactories = {
"flow": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uVelocity = cloneValue(U.uVelocity);
var uDetail = cloneValue(U.uDetail);
var uTwist = cloneValue(U.uTwist);
var uSpeed = cloneValue(U.uSpeed);
var uContrast = cloneValue(U.uContrast);
var uRgbMultiplierR = cloneValue(U.uRgbMultiplierR);
var uRgbMultiplierG = cloneValue(U.uRgbMultiplierG);
var uRgbMultiplierB = cloneValue(U.uRgbMultiplierB);
var uColorOffset = cloneValue(U.uColorOffset);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function f(p) {
    p = p.slice();
    return (sin(p[0] + sin(p[1] + uTime * uVelocity))) * (sin((p[1] * p[0]) * 0.1 + uTime * uVelocity));
}
;
function main() {
    var p = [(gl_FragCoord[0] * 2.0 - uResolution[0]) / (min(uResolution[0], uResolution[1])), (gl_FragCoord[1] * 2.0 - uResolution[1]) / (min(uResolution[0], uResolution[1]))];
    var uScale = 5.0;
    p = [p[0] * uScale, p[1] * uScale];
    var ep = [0.05, 0.0];
    var rz = [0.0, 0.0];
    for (var i = 0; i < 20; i++) {
        var t0 = f(p);
        var t1 = f([p[0] + ep[0], p[1] + ep[1]]);
        var t2 = f([p[0] + ep[1], p[1] + ep[0]]);
        var g = [(t1 - t0) / ep[0], (t2 - t0) / ep[0]];
        var t = [-g[1], g[0]];
        (p[0] += (uTwist * 0.01) * t[0] + g[0] * (1.0 / uDetail), p[1] += (uTwist * 0.01) * t[1] + g[1] * (1.0 / uDetail), p);
        p[0] += (sin((uTime * uSpeed) / 10.0)) / 10.0;
        p[1] += (cos((uTime * uSpeed) / 10.0)) / 10.0;
        (rz[0] = g[0], rz[1] = g[1], rz);
    }
    ;
    var colorVec = [rz[0] * 0.5 + 0.5, rz[1] * 0.5 + 0.5, 1.5];
    colorVec[0] *= uRgbMultiplierR;
    colorVec[1] *= uRgbMultiplierG;
    colorVec[2] *= uRgbMultiplierB;
    colorVec = [colorVec[0] + uColorOffset, colorVec[1] + uColorOffset, colorVec[2] + uColorOffset];
    (colorVec[0] = (colorVec[0] - 0.5) * uContrast + 0.5, colorVec[1] = (colorVec[1] - 0.5) * uContrast + 0.5, colorVec[2] = (colorVec[2] - 0.5) * uContrast + 0.5, colorVec);
    var hsv = rgb2hsv(colorVec);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), colorVec);
    gl_FragColor = [colorVec[0], colorVec[1], colorVec[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
main();return Array.from(gl_FragColor); };
},
"tranquiluxe": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.multiply = function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uColor = cloneValue(U.uColor);
var uResolution = cloneValue(U.uResolution);
var vUv = cloneValue(UV);
var fragColor = [0, 0, 0, 0];
function colormap_red(x) {
    if (x < 0.0) {
        return 0.21176470588235294;
    }
    else {
        if (x < 0.24161534846165897) {
            return (829.79 * x + 54.51) / 255.0;
        }
        else {
            return 1.0;
        }
        ;
    }
    ;
}
;
function colormap_green(x) {
    if (x < 0.24161534846165897) {
        return 0.0;
    }
    else {
        if (x < 0.40322692018397266) {
            return (785.8348176838201 * x - 189.86975330798043) / 255.0;
        }
        else {
            if (x <= 1.0) {
                return (214.48688677354502 * x + 40.513113226454976) / 255.0;
            }
            else {
                return 1.0;
            }
            ;
        }
        ;
    }
    ;
}
;
function colormap_blue(x) {
    if (x < 0.0) {
        return 0.21176470588235294;
    }
    else {
        if (x < 0.08735945239156895) {
            return (829.79 * x + 54.51) / 255.0;
        }
        else {
            if (x < 0.24161534846165897) {
                return 0.4980392156862745;
            }
            else {
                if (x < 0.40322692018397266) {
                    return (792.0224934136139 * x - 64.36479073560233) / 255.0;
                }
                else {
                    return 1.0;
                }
                ;
            }
            ;
        }
        ;
    }
    ;
}
;
function colormap(x) {
    return [colormap_red(x), colormap_green(x), colormap_blue(x), 1.0];
}
;
function rand(n) {
    n = n.slice();
    return fract((sin(dot(n, [12.9898, 4.1414]))) * 43758.5453);
}
;
function noise(p) {
    p = p.slice();
    var ip = floor(p);
    var u = fract(p);
    (u[0] = (u[0] * u[0]) * (3.0 - 2.0 * u[0]), u[1] = (u[1] * u[1]) * (3.0 - 2.0 * u[1]), u);
    var res = mix(mix(rand(ip), rand([ip[0] + 1, ip[1]]), u[0]), mix(rand([ip[0], ip[1] + 1]), rand([ip[0] + 1, ip[1] + 1]), u[0]), u[1]);
    return res * res;
}
;
var mtx = [0.80, 0.60, -0.60, 0.80];
function fbm(p) {
    p = p.slice();
    var f = 0.0;
    var time = uTime * uSpeed;
    f += 0.500000 * (noise([p[0] + time, p[1] + time]));
    assignComponents(p, [0, 1], [(mtx[0] * p[0] + mtx[2] * p[1]) * 2.02, (mtx[1] * p[0] + mtx[3] * p[1]) * 2.02]);
    f += 0.031250 * noise(p);
    assignComponents(p, [0, 1], [(mtx[0] * p[0] + mtx[2] * p[1]) * 2.01, (mtx[1] * p[0] + mtx[3] * p[1]) * 2.01]);
    f += 0.250000 * noise(p);
    assignComponents(p, [0, 1], [(mtx[0] * p[0] + mtx[2] * p[1]) * 2.03, (mtx[1] * p[0] + mtx[3] * p[1]) * 2.03]);
    f += 0.125000 * noise(p);
    assignComponents(p, [0, 1], [(mtx[0] * p[0] + mtx[2] * p[1]) * 2.01, (mtx[1] * p[0] + mtx[3] * p[1]) * 2.01]);
    f += 0.062500 * noise(p);
    assignComponents(p, [0, 1], [(mtx[0] * p[0] + mtx[2] * p[1]) * 2.04, (mtx[1] * p[0] + mtx[3] * p[1]) * 2.04]);
    f += 0.015625 * (noise([p[0] + sin(time), p[1] + sin(time)]));
    return f / 0.96875;
}
;
function pattern(p) {
    p = p.slice();
    return fbm([p[0] + fbm([p[0] + fbm(p), p[1] + fbm(p)]), p[1] + fbm([p[0] + fbm(p), p[1] + fbm(p)])]);
}
;
function main() {
    var uv = [(vUv[0] * uResolution[0]) / uResolution[0], (vUv[1] * uResolution[1]) / uResolution[0]];
    var shade = pattern(uv);
    [...vec3.multiply([], new Float32Array([0, 1, 2].map(function (x, i) { return this[x]; }, colormap(shade))), uColor), shade].reduce((res, el, i) => (res[i] = el, res), fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
vUv=cloneValue(UV);
fragColor=[0, 0, 0, 0];
mtx=[0.80, 0.60, -0.60, 0.80];
main();return Array.from(fragColor); };
},
"kaleidoscope": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.multiply = function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function palette(t) {
    var a = [0.5, 0.5, 0.5];
    var b = [0.5, 0.5, 0.5];
    var c = [1, 1, 1];
    var d = [0.263, 0.416, 0.557];
    return vec3.add([], a, vec3.multiply([], b, cos([6.283185 * (c[0] * t + d[0]), 6.283185 * (c[1] * t + d[1]), 6.283185 * (c[2] * t + d[2])])));
}
;
function main() {
    var uv = [(gl_FragCoord[0] * 2.0 - uResolution[0]) / uResolution[1], (gl_FragCoord[1] * 2.0 - uResolution[1]) / uResolution[1]];
    var uv0 = cloneValue(uv);
    var finalColor = [0, 0, 0];
    for (var i = 0.0; i < 4.0; i++) {
        fract([uv[0] * 1.5, uv[1] * 1.5]).map(function (_) { return _ - 0.5; }).reduce((res, el, i) => (res[i] = el, res), uv);
        var d = length(uv) * exp(-length(uv0));
        var col = palette(length(uv0) + i * .4 + (uTime * uSpeed) * .4);
        d = (sin(d * 8. + uTime * uSpeed)) / 8.;
        d = abs(d);
        d = pow(0.01 / d, 1.2);
        (finalColor[0] += col[0] * d, finalColor[1] += col[1] * d, finalColor[2] += col[2] * d, finalColor);
    }
    ;
    var hsv = rgb2hsv(finalColor);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), finalColor);
    gl_FragColor = [finalColor[0], finalColor[1], finalColor[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
main();return Array.from(gl_FragColor); };
},
"fate": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.multiply = function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function palette(t) {
    var a = [0.5, 0.5, 0.5];
    var b = [0.5, 0.5, 0.5];
    var c = [2, 1, 0];
    var d = [0.5, 0.2, 0.25];
    return vec3.add([], a, vec3.multiply([], b, cos([6.283185 * (c[0] * t + d[0]), 6.283185 * (c[1] * t + d[1]), 6.283185 * (c[2] * t + d[2])])));
}
;
function hash13(p3) {
    p3 = p3.slice();
    fract([p3[0] * .1031, p3[1] * .1031, p3[2] * .1031]).reduce((res, el, i) => (res[i] = el, res), p3);
    p3 = [p3[0] + dot(p3, [p3[2] + 31.32, p3[1] + 31.32, p3[0] + 31.32]), p3[1] + dot(p3, [p3[2] + 31.32, p3[1] + 31.32, p3[0] + 31.32]), p3[2] + dot(p3, [p3[2] + 31.32, p3[1] + 31.32, p3[0] + 31.32])];
    return fract((p3[0] + p3[1]) * p3[2]);
}
;
function randomGradient(p) {
    p = p.slice();
    var the = hash13(p) * 6.283185;
    var phi = (hash13([p[0] + 3, p[1] + 2, p[2] + 1])) * 6.283185;
    return [sin(the) * cos(phi), sin(the) * sin(phi), cos(the)];
}
;
function noise(p) {
    p = p.slice();
    var i = floor(p);
    var f = fract(p);
    var g000 = randomGradient([i[0], i[1], i[2]]);
    var g100 = randomGradient([i[0] + 1, i[1], i[2]]);
    var g010 = randomGradient([i[0], i[1] + 1, i[2]]);
    var g001 = randomGradient([i[0], i[1], i[2] + 1]);
    var g011 = randomGradient([i[0], i[1] + 1, i[2] + 1]);
    var g101 = randomGradient([i[0] + 1, i[1], i[2] + 1]);
    var g110 = randomGradient([i[0] + 1, i[1] + 1, i[2]]);
    var g111 = randomGradient([i[0] + 1, i[1] + 1, i[2] + 1]);
    var v000 = dot(g000, [f[0], f[1], f[2]]);
    var v100 = dot(g100, [f[0] - 1, f[1], f[2]]);
    var v010 = dot(g010, [f[0], f[1] - 1, f[2]]);
    var v001 = dot(g001, [f[0], f[1], f[2] - 1]);
    var v011 = dot(g011, [f[0], f[1] - 1, f[2] - 1]);
    var v101 = dot(g101, [f[0] - 1, f[1], f[2] - 1]);
    var v110 = dot(g110, [f[0] - 1, f[1] - 1, f[2]]);
    var v111 = dot(g111, [f[0] - 1, f[1] - 1, f[2] - 1]);
    var u = [((f[0] * f[0]) * f[0]) * (f[0] * (f[0] * 6.0 - 15.0) + 10.0), ((f[1] * f[1]) * f[1]) * (f[1] * (f[1] * 6.0 - 15.0) + 10.0), ((f[2] * f[2]) * f[2]) * (f[2] * (f[2] * 6.0 - 15.0) + 10.0)];
    return mix(mix(mix(v000, v100, u[0]), mix(v010, v110, u[0]), u[1]), mix(mix(v001, v101, u[0]), mix(v011, v111, u[0]), u[1]), u[2]);
}
;
function fbm(p) {
    p = p.slice();
    var amp = 1.;
    var fre = 1.;
    var n = 0.;
    for (var i = 0.; i < 4.; i++) {
        n += (noise([fre * p[0], fre * p[1], fre * p[2]])) * amp;
        amp *= .5;
        fre *= 2.;
    }
    ;
    return n;
}
;
function fbmWrap(p) {
    p = p.slice();
    var q = [fbm([p[0] + 13.24, p[1] + 42.74, p[2] + 44.32]), fbm([p[0] + 51.16, p[1] + 17.93, p[2] + 98.23]), fbm([p[0] + 43.46, p[1] + 85.43, p[2] + 64.91])];
    return fbm(q);
}
;
function main() {
    var uv = [(gl_FragCoord[0] - uResolution[0] / 2.) / uResolution[1], (gl_FragCoord[1] - uResolution[1] / 2.) / uResolution[1]];
    (uv[0] = atan(uv[1], uv[0]), uv[1] = length(uv), uv);
    var O = [0., 0., 0.];
    var T = uTime * uSpeed;
    var k = .8;
    var d = fbmWrap([k * sin(uv[0]), k * cos(uv[0]), uv[1] - T * 1.2]);
    d -= uv[1] - .4;
    d = 1. - d;
    var col = mix([1, 1, 1], (sin([3 + d * 4. + T, 2 + d * 4. + T, 1 + d * 4. + T]).map(function (_) { return _ * .5; }).map(function (_) { return _ + .5; })), d);
    d = pow(.5 / d, 2.);
    (O[0] += d * col[0], O[1] += d * col[1], O[2] += d * col[2], O);
    var hsv = rgb2hsv(O);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), O);
    gl_FragColor = [O[0], O[1], O[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
main();return Array.from(gl_FragColor); };
},
"structuredNoise": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uMirrors = cloneValue(U.uMirrors);
var uNoiseStrength = cloneValue(U.uNoiseStrength);
var uDistortionStrength = cloneValue(U.uDistortionStrength);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var u_useFilter = cloneValue(U.u_useFilter);
var u_filterColor = cloneValue(U.u_filterColor);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
var PI = 3.14159265359;
function snoise(v) {
    v = v.slice();
    return fract((sin(dot(v, [12.9898, 78.233]))) * 43758.5453123);
}
;
function main() {
    var p = [(2.0 * gl_FragCoord[0] - uResolution[0]) / uResolution[1], (2.0 * gl_FragCoord[1] - uResolution[1]) / uResolution[1]];
    var angle = atan(p[1], p[0]);
    var radius = length(p);
    var t = uTime * uSpeed;
    var symmetricDistort = (sin(angle * 6.0 + t)) * 0.05 + (cos(radius * 8.0 - t)) * 0.05;
    var newAngle = angle + (symmetricDistort * uDistortionStrength) * 10.0;
    (p[0] = cos(newAngle) * radius, p[1] = sin(newAngle) * radius, p);
    radius = length(p);
    angle = atan(p[1], p[0]);
    var normalizedAngle = 0.0;
    var mirrorStrength = 1.0;
    if (uMirrors >= 1.0) {
        var sectorAngle = (2.0 * PI) / uMirrors;
        var wrappedAngle = mod(angle, 2.0 * PI);
        var rawAngle = mod(wrappedAngle, sectorAngle);
        var mirroredAngle = rawAngle > (sectorAngle * 0.5) ? sectorAngle - rawAngle : rawAngle;
        normalizedAngle = mirroredAngle / (sectorAngle * 0.5 + 1e-5);
        (p[0] = radius * cos(mirroredAngle), p[1] = radius * sin(mirroredAngle), p);
        var angleMask = pow(abs(cos(normalizedAngle * PI)), 3.0);
        mirrorStrength = mix(0.5, 2.5, angleMask);
    }
    else {
        normalizedAngle = (mod(angle, 2.0 * PI)) / (2.0 * PI);
    }
    ;
    radius = length(p);
    var uv = [0.0, radius];
    (uv[0] = (2.0 * uv[0]) - 1.0, uv[1] = (2.0 * uv[1]) - 1.0, uv);
    var noiseVal = (snoise([p[0] + t * 0.1, p[1] + t * 0.1])) * uNoiseStrength;
    var beamWidth = abs(5.0 / (30.0 * uv[1])) + noiseVal;
    beamWidth *= mirrorStrength;
    var color = [beamWidth, beamWidth, beamWidth];
    var hsv = rgb2hsv(color);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), color);
    if (u_useFilter) {
        (color[0] *= u_filterColor[0], color[1] *= u_filterColor[1], color[2] *= u_filterColor[2], color);
    }
    ;
    gl_FragColor = [color[0], color[1], color[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
PI=3.14159265359;
main();return Array.from(gl_FragColor); };
},
"balatro": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function vec2(x, y) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    return [x, y];
}
vec2.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uSpinRotation = cloneValue(U.uSpinRotation);
var uSpinSpeed = cloneValue(U.uSpinSpeed);
var uColor1 = cloneValue(U.uColor1);
var uColor2 = cloneValue(U.uColor2);
var uColor3 = cloneValue(U.uColor3);
var uContrast = cloneValue(U.uContrast);
var uLighting = cloneValue(U.uLighting);
var uSpinAmount = cloneValue(U.uSpinAmount);
var uPixelFilter = cloneValue(U.uPixelFilter);
var uSpinEase = cloneValue(U.uSpinEase);
var uIsRotate = cloneValue(U.uIsRotate);
function effect(screenSize, screen_coords) {
    screenSize = screenSize.slice();
    screen_coords = screen_coords.slice();
    var pixel_size = length(screenSize) / uPixelFilter;
    var uv = vec2.subtract([], (vec2.subtract([], floor([screen_coords[0] * (1. / pixel_size), screen_coords[1] * (1. / pixel_size)]).map(function (_) { return _ * pixel_size; }), [0.5 * screenSize[0], 0.5 * screenSize[1]])).map(function (_) { return _ / length(screenSize); }), [0.0, 0.0]);
    var uv_len = length(uv);
    var speed = ((uSpinRotation * uSpinEase) * 0.2);
    if (uIsRotate) {
        speed = uTime * speed;
    }
    ;
    speed += 302.2;
    var new_pixel_angle = atan(uv[1], uv[0]) + speed - (uSpinEase * 20.) * (uSpinAmount * uv_len + (1. - uSpinAmount));
    var mid = [(screenSize[0] / length(screenSize)) / 2., (screenSize[1] / length(screenSize)) / 2.];
    (uv[0] = ((uv_len * cos(new_pixel_angle) + mid[0]) - mid[0]), uv[1] = ((uv_len * sin(new_pixel_angle) + mid[1]) - mid[1]), uv);
    uv = [uv[0] * 30., uv[1] * 30.];
    speed = uTime * (uSpinSpeed);
    var uv2 = [uv[0] + uv[1], uv[0] + uv[1]];
    for (var i = 0; i < 5; i++) {
        (uv2[0] += sin(max(uv[0], uv[1])) + uv[0], uv2[1] += sin(max(uv[0], uv[1])) + uv[1], uv2);
        (uv[0] += 0.5 * (cos(5.1123314 + 0.353 * uv2[1] + speed * 0.131121)), uv[1] += 0.5 * (sin(uv2[0] - 0.113 * speed)), uv);
        uv = [uv[0] - cos(uv[0] + uv[1]) - sin(uv[0] * 0.711 - uv[1]), uv[1] - cos(uv[0] + uv[1]) - sin(uv[0] * 0.711 - uv[1])];
    }
    ;
    var contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);
    var paint_res = min(2., max(0., (length(uv) * (0.035)) * contrast_mod));
    var c1p = max(0., 1. - contrast_mod * (abs(1. - paint_res)));
    var c2p = max(0., 1. - contrast_mod * abs(paint_res));
    var c3p = 1. - min(1., c1p + c2p);
    var light = (uLighting - 0.2) * (max(c1p * 5. - 4., 0.)) + uLighting * (max(c2p * 5. - 4., 0.));
    return [(0.3 / uContrast) * uColor1[0] + (1. - 0.3 / uContrast) * (uColor1[0] * c1p + uColor2[0] * c2p + c3p * uColor3[0]) + light, (0.3 / uContrast) * uColor1[1] + (1. - 0.3 / uContrast) * (uColor1[1] * c1p + uColor2[1] * c2p + c3p * uColor3[1]) + light, (0.3 / uContrast) * uColor1[2] + (1. - 0.3 / uContrast) * (uColor1[2] * c1p + uColor2[2] * c2p + c3p * uColor3[2]) + light, (0.3 / uContrast) + (1. - 0.3 / uContrast) * (c1p + c2p + c3p) + light];
}
;
function main() {
    var uv = [gl_FragCoord[0] / uResolution[0], gl_FragCoord[1] / uResolution[1]];
    gl_FragColor = effect(uResolution, [uv[0] * uResolution[0], uv[1] * uResolution[1]]);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
main();return Array.from(gl_FragColor); };
},
"electricPulse": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function texture(sampler, coord, bias) { return sampleTexture(sampler, coord, bias); }
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function sqrt(x) {
    if (x.length)
        return x.map(sqrt);
    return Math.sqrt(x);
}
function log(x) {
    if (x.length)
        return x.map(log);
    return Math.log(x);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var iChannel0 = cloneValue(U.iChannel0);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var uColor1 = cloneValue(U.uColor1);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function makem2(theta) {
    var c = cos(theta);
    var s = sin(theta);
    return [c, -s, s, c];
}
;
function noise(x) {
    x = x.slice();
    return texture(iChannel0, [x[0] * .01, x[1] * .01])[0];
}
;
function fbm(p) {
    p = p.slice();
    var z = 2.;
    var rz = 0.;
    var bp = cloneValue(p);
    for (var i = 1.; i < 6.; i++) {
        rz += (abs((noise(p) - 0.5) * 2.)) / z;
        z = z * 2.;
        (p[0] = p[0] * 2., p[1] = p[1] * 2., p);
    }
    ;
    return rz;
}
;
function dualfbm(p) {
    p = p.slice();
    var p2 = [p[0] * .7, p[1] * .7];
    var basis = [fbm([p2[0] - (uTime * uSpeed) * 1.6, p2[1] - (uTime * uSpeed) * 1.6]), fbm([p2[0] + (uTime * uSpeed) * 1.7, p2[1] + (uTime * uSpeed) * 1.7])];
    (basis[0] = (basis[0] - .5) * .2, basis[1] = (basis[1] - .5) * .2, basis);
    (p[0] += basis[0], p[1] += basis[1], p);
    return fbm([dot(p, makem2((uTime * uSpeed) * 0.2).slice(0, 2)), dot(p, makem2((uTime * uSpeed) * 0.2).slice(2, 4))]);
}
;
function circ(p) {
    p = p.slice();
    var r = length(p);
    r = log(sqrt(r));
    return (abs(mod(r * 4., 6.2831853) - 3.14)) * 3. + .2;
}
;
function main() {
    var p = [gl_FragCoord[0] / uResolution[0] - 0.5, gl_FragCoord[1] / uResolution[1] - 0.5];
    p[0] *= uResolution[0] / uResolution[1];
    p = [p[0] * 4., p[1] * 4.];
    var rz = dualfbm(p);
    p = [p[0] / (exp(mod((uTime * uSpeed) * 10., 3.14159))), p[1] / (exp(mod((uTime * uSpeed) * 10., 3.14159)))];
    rz *= pow(abs((0.1 - circ(p))), .9);
    var col = [uColor1[0] / rz, uColor1[1] / rz, uColor1[2] / rz];
    pow(abs(col), [0.99, 0.99, 0.99]).reduce((res, el, i) => (res[i] = el, res), col);
    var hsv = rgb2hsv(col);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    gl_FragColor = [col[0], col[1], col[2], 1.];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
main();return Array.from(gl_FragColor); };
},
"laserBlast": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uStartColor = cloneValue(U.uStartColor);
var uEndColor = cloneValue(U.uEndColor);
var uStartRadius = cloneValue(U.uStartRadius);
var uEndRadius = cloneValue(U.uEndRadius);
var uPower = cloneValue(U.uPower);
var uDuration = cloneValue(U.uDuration);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function main() {
    var t = uTime * uSpeed + 5.;
    var z = 6.;
    var n = 100;
    var power = cloneValue(uPower);
    var duration = cloneValue(uDuration);
    var s = cloneValue(uResolution), v = [(z * (2. * gl_FragCoord[0] - s[0])) / s[1], (z * (2. * gl_FragCoord[1] - s[1])) / s[1]];
    var col = [0., 0., 0.];
    var mb = 0.;
    var sum = 0.;
    for (var i = 0; i < n; i++) {
        var d = fract(t * power + 48934.4238 * (sin(i * 692.7398)));
        var a = (6.28 * i) / n;
        var x = (d * cos(a)) * duration;
        var y = (d * sin(a)) * duration;
        var distRatio = d / duration;
        var mbRadius = mix(uStartRadius, uEndRadius, distRatio);
        var p = [v[0] - x, v[1] - y];
        mb = mbRadius / (dot(p, p));
        sum += mb;
        mix(col, mix(uStartColor, uEndColor, distRatio), mb / sum).reduce((res, el, i) => (res[i] = el, res), col);
    }
    ;
    sum /= n;
    normalize(col).map(function (_) { return _ * sum; }).reduce((res, el, i) => (res[i] = el, res), col);
    sum = clamp(sum, 0., .4);
    var tex = [1., 1., 1.];
    smoothstep(tex, [0., 0., 0.], [sum, sum, sum]).reduce((res, el, i) => (res[i] *= el, res), col);
    var hsv = rgb2hsv(col);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    gl_FragColor = [col[0], col[1], col[2]];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
main();return Array.from(gl_FragColor); };
},
"novatrix": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.multiply = function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
var uTime = cloneValue(U.uTime);
var uColor = cloneValue(U.uColor);
var uResolution = cloneValue(U.uResolution);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var vUv = cloneValue(UV);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function main() {
    var mr = min(uResolution[0], uResolution[1]);
    var uv = [((vUv[0] * 2.0 - 1.0) * uResolution[0]) / mr, ((vUv[1] * 2.0 - 1.0) * uResolution[1]) / mr];
    var d = -uTime * 0.5;
    var a = 0.0;
    for (var i = 0.0; i < 8.0; ++i) {
        a += cos(i - d - a * uv[0]);
        d += sin(uv[1] * i + a);
    }
    ;
    d += uTime * 0.5;
    var col = [...cos([uv[0] * d, uv[1] * a]).map(function (_) { return _ * 0.6; }).map(function (_) { return _ + 0.4; }), (cos(a + d)) * 0.5 + 0.5];
    cos(vec3.multiply([], col, cos([d, a, 2.5])).map(function (_) { return _ * 0.5; }).map(function (_) { return _ + 0.5; })).reduce((res, el, i) => (res[i] = el, res), col);
    var mixedColor = mix(col, uColor, 0.33);
    var hsv = rgb2hsv(mixedColor);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), mixedColor);
    gl_FragColor = [mixedColor[0], mixedColor[1], mixedColor[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
vUv=cloneValue(UV);
main();return Array.from(gl_FragColor); };
},
"voronoi": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function texture(sampler, coord, bias) { return sampleTexture(sampler, coord, bias); }
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var iChannel0 = cloneValue(U.iChannel0);
var uSpeed = cloneValue(U.uSpeed);
var uScale = cloneValue(U.uScale);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function hash2(p) {
    p = p.slice();
    return new Float32Array([0, 1].map(function (x, i) { return this[x]; }, texture(iChannel0, [(p[0] + 0.5) / 256.0, (p[1] + 0.5) / 256.0], 0.0)));
}
;
function voronoi(x) {
    x = x.slice();
    var ip = floor(x);
    var fp = fract(x);
    var mg = [0, 0], mr = [0, 0];
    var md = 8.0;
    for (var j = -1; j <= 1; j++) {
        for (var i = -1; i <= 1; i++) {
            var g = [i, j];
            var o = hash2([ip[0] + g[0], ip[1] + g[1]]);
            sin([uTime * uSpeed + 6.2831 * o[0], uTime * uSpeed + 6.2831 * o[1]]).map(function (_) { return 0.5 * _; }).map(function (_) { return 0.5 + _; }).reduce((res, el, i) => (res[i] = el, res), o);
            var r = [g[0] + o[0] - fp[0], g[1] + o[1] - fp[1]];
            var d = dot(r, r);
            if (d < md) {
                md = d;
                (mr[0] = r[0], mr[1] = r[1], mr);
                (mg[0] = g[0], mg[1] = g[1], mg);
            }
            ;
        }
        ;
    }
    ;
    md = 8.0;
    for (var j = -2; j <= 2; j++) {
        for (var i = -2; i <= 2; i++) {
            var g = [mg[0] + i, mg[1] + j];
            var o = hash2([ip[0] + g[0], ip[1] + g[1]]);
            sin([uTime * uSpeed + 6.2831 * o[0], uTime * uSpeed + 6.2831 * o[1]]).map(function (_) { return 0.5 * _; }).map(function (_) { return 0.5 + _; }).reduce((res, el, i) => (res[i] = el, res), o);
            var r = [g[0] + o[0] - fp[0], g[1] + o[1] - fp[1]];
            if ((dot([mr[0] - r[0], mr[1] - r[1]], [mr[0] - r[0], mr[1] - r[1]])) > 0.00001) {
                md = min(md, dot([0.5 * (mr[0] + r[0]), 0.5 * (mr[1] + r[1])], normalize([r[0] - mr[0], r[1] - mr[1]])));
            }
            ;
        }
        ;
    }
    ;
    return [md, mr[0], mr[1]];
}
;
function main() {
    var p = [gl_FragCoord[0] / uResolution[0], gl_FragCoord[1] / uResolution[0]];
    var c = voronoi([uScale * p[0], uScale * p[1]]);
    var col = [c[0] * (0.5 + 0.5 * (sin(64.0 * c[0]))), c[0] * (0.5 + 0.5 * (sin(64.0 * c[0]))), c[0] * (0.5 + 0.5 * (sin(64.0 * c[0])))];
    mix([1, 0.6, 0], col, smoothstep(0.04, 0.07, c[0])).reduce((res, el, i) => (res[i] = el, res), col);
    var dd = length([c[1], c[2]]);
    mix([1, 0.6, 0.1], col, smoothstep(0.0, 0.12, dd)).reduce((res, el, i) => (res[i] = el, res), col);
    (col[0] += (1.0 - smoothstep(0.0, 0.04, dd)), col[1] += 0.6 * (1.0 - smoothstep(0.0, 0.04, dd)), col[2] += 0.1 * (1.0 - smoothstep(0.0, 0.04, dd)), col);
    var hsv = rgb2hsv(col);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    gl_FragColor = [col[0], col[1], col[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
main();return Array.from(gl_FragColor); };
},
"discGlare": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.multiply = function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uPhase = cloneValue(U.uPhase);
var uDistortion = cloneValue(U.uDistortion);
var uZoom = cloneValue(U.uZoom);
var uContrast = cloneValue(U.uContrast);
var uGamma = cloneValue(U.uGamma);
var uHue = cloneValue(U.uHue);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
var PI = 3.14159265359;
function palette(t) {
    var a = [0.5, 0.5, 0.5];
    var b = [0.5, 0.5, 0.5];
    var c = [1, 1, 0.5];
    var d = [0.8, 0.9, 0.3];
    return vec3.add([], a, vec3.multiply([], b, cos([6.28318 * (c[0] * t + d[0]), 6.28318 * (c[1] * t + d[1]), 6.28318 * (c[2] * t + d[2])])));
}
;
function main() {
    var uv = [(2.0 * gl_FragCoord[0] - uResolution[0]) / (min(uResolution[0], uResolution[1])), (2.0 * gl_FragCoord[1] - uResolution[1]) / (min(uResolution[0], uResolution[1]))];
    uv = [uv[0] * uZoom, uv[1] * uZoom];
    var t = uTime * 0.1;
    var p = cloneValue(uv);
    p[0] += 0.5 * (sin((2.0 * PI) * p[1] + t));
    p[1] += 0.5 * (cos((2.0 * PI) * p[0] + t));
    var r = length(p);
    var a = atan(p[1], p[0]);
    var v = sin((uPhase * 10.0) * r - a * 5.0 + t * 2.0);
    v *= cos(a * 3.0 + t);
    var distortion = (sin(r * 10.0 + t)) * uDistortion;
    v += distortion;
    var val = (pow(abs(v), uGamma)) * uContrast;
    val = mod(val, 1.0);
    var color = palette(val);
    var hsv = rgb2hsv(color);
    hsv[0] += uHue / 360.0;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), color);
    gl_FragColor = [color[0], color[1], color[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
PI=3.14159265359;
main();return Array.from(gl_FragColor); };
},
"hydrogen": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function sqrt(x) {
    if (x.length)
        return x.map(sqrt);
    return Math.sqrt(x);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function acos(x) {
    if (x.length)
        return x.map(acos);
    return Math.acos(x);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uN = cloneValue(U.uN);
var uL = cloneValue(U.uL);
var uM = cloneValue(U.uM);
var uZoom = cloneValue(U.uZoom);
var uContrast = cloneValue(U.uContrast);
var uGamma = cloneValue(U.uGamma);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var uColor1 = cloneValue(U.uColor1);
var uColor2 = cloneValue(U.uColor2);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
var PI = 3.14159265359;
var a0 = 1.0;
function fact(n_float) {
    if (n_float <= 1.0) {
        return 1.0;
    }
    ;
    if (n_float == 2.0) {
        return 2.0;
    }
    ;
    if (n_float == 3.0) {
        return 6.0;
    }
    ;
    if (n_float == 4.0) {
        return 24.0;
    }
    ;
    if (n_float == 5.0) {
        return 120.0;
    }
    ;
    if (n_float == 6.0) {
        return 720.0;
    }
    ;
    if (n_float == 7.0) {
        return 5040.0;
    }
    ;
    if (n_float == 8.0) {
        return 40320.0;
    }
    ;
    if (n_float == 9.0) {
        return 362880.0;
    }
    ;
    if (n_float == 10.0) {
        return 3628800.0;
    }
    ;
    return 1.0;
}
;
function laguerre(p_float, q_float, x) {
    var p = p_float | 0;
    if (p == 0) {
        return 1.0;
    }
    ;
    if (p == 1) {
        return 1.0 + q_float - x;
    }
    ;
    if (p == 2) {
        return (x * x - (2.0 * (q_float + 2.0)) * x + (q_float + 1.0) * (q_float + 2.0)) / 2.0;
    }
    ;
    if (p == 3) {
        return ((-x * x) * x + ((3.0 * (q_float + 3.0)) * x) * x - (3.0 * (q_float + 2.0)) * (q_float + 3.0) * x + (q_float + 1.0) * (q_float + 2.0) * (q_float + 3.0)) / 6.0;
    }
    ;
    return 1.0 - x / (q_float + 1.0);
}
;
function legendre(l_float, m_float, x) {
    var l = l_float | 0;
    var m = abs(m_float) | 0;
    if ((l == 0) && (m == 0)) {
        return 1.0;
    }
    ;
    if ((l == 1) && (m == 0)) {
        return x;
    }
    ;
    if ((l == 1) && (m == 1)) {
        return -sqrt(1.0 - x * x);
    }
    ;
    if ((l == 2) && (m == 0)) {
        return 0.5 * ((3.0 * x) * x - 1.0);
    }
    ;
    if ((l == 2) && (m == 1)) {
        return (-3.0 * x) * (sqrt(1.0 - x * x));
    }
    ;
    if ((l == 2) && (m == 2)) {
        return 3.0 * (1.0 - x * x);
    }
    ;
    if ((l == 3) && (m == 0)) {
        return (0.5 * x) * ((5.0 * x) * x - 3.0);
    }
    ;
    if ((l == 3) && (m == 1)) {
        return (-1.5 * ((5.0 * x) * x - 1.0)) * (sqrt(1.0 - x * x));
    }
    ;
    if ((l == 3) && (m == 2)) {
        return (15.0 * x) * (1.0 - x * x);
    }
    ;
    if ((l == 3) && (m == 3)) {
        return -15.0 * (pow(1.0 - x * x, 1.5));
    }
    ;
    return 1.0;
}
;
function wave_function(r, theta, phi) {
    var n_f = cloneValue(uN);
    var l_f = cloneValue(uL);
    var m_f = cloneValue(uM);
    var rho = (2.0 * r) / (n_f * a0);
    var radial_part = (exp(-rho / 2.0)) * (pow(rho, l_f));
    var L = laguerre(n_f - l_f - 1.0, 2.0 * l_f + 1.0, rho);
    var P = legendre(l_f, m_f, cos(theta));
    var angular_part = cloneValue(P);
    if (uM != 0.0) {
        angular_part *= cos(m_f * phi);
    }
    ;
    var psi = (radial_part * angular_part) * L;
    return psi;
}
;
function palette(t) {
    return mix(uColor1, uColor2, t);
}
;
function main() {
    var uv = [(2.0 * gl_FragCoord[0] - uResolution[0]) / uResolution[1], (2.0 * gl_FragCoord[1] - uResolution[1]) / uResolution[1]];
    uv = [uv[0] * uZoom, uv[1] * uZoom];
    var pos = [uv[0], uv[1], 0];
    var r = length(pos) * 15.0;
    var theta = acos(clamp(pos[2] / (r + 1e-5), -1.0, 1.0));
    var phi = atan(pos[1], pos[0]);
    var psi = wave_function(r, theta, phi);
    var probability = psi * psi;
    var val = pow(probability * uContrast, uGamma);
    var color = palette(val);
    var hsv = rgb2hsv(color);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), color);
    mix([0, 0, 0], color, clamp(val, 0.0, 1.0)).reduce((res, el, i) => (res[i] = el, res), color);
    gl_FragColor = [color[0], color[1], color[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
PI=3.14159265359;
a0=1.0;
main();return Array.from(gl_FragColor); };
},
"pulse": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
vec3.multiply = function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
var u_resolution = cloneValue(U.u_resolution);
var u_time = cloneValue(U.u_time);
var u_speed = cloneValue(U.u_speed);
var u_factor = cloneValue(U.u_factor);
var u_hue = cloneValue(U.u_hue);
var u_saturation = cloneValue(U.u_saturation);
var u_contrast = cloneValue(U.u_contrast);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
var pi = 3.1415926;
function palette3(t, factor) {
    var a = vec3.add([], [0.5, 0.5, 0.5], sin([0.1 * factor, 0.3 * factor, 0.5 * factor]).map(function (_) { return 0.3 * _; }));
    var b = vec3.add([], [0.5, 0.5, 0.5], cos([0.2 * factor, 0.4 * factor, 0.6 * factor]).map(function (_) { return 0.3 * _; }));
    var c = vec3.add([], [1, 1, 1], sin([0.3 * factor, 0.7 * factor, 0.9 * factor]).map(function (_) { return 0.5 * _; }));
    var d = vec3.add([], [0.25, 0.4, 0.55], cos([0.5 * factor, 0.6 * factor, 0.7 * factor]).map(function (_) { return 0.2 * _; }));
    return vec3.add([], a, vec3.multiply([], b, cos([6.28318 * (c[0] * t + d[0]), 6.28318 * (c[1] * t + d[1]), 6.28318 * (c[2] * t + d[2])])));
}
;
function rotate(pos, angle) {
    pos = pos.slice();
    var cosAngle = cos(angle);
    var sinAngle = sin(angle);
    var rotationMatrix = [cosAngle, -sinAngle, sinAngle, cosAngle];
    return [rotationMatrix[0] * pos[0] + rotationMatrix[2] * pos[1], rotationMatrix[1] * pos[0] + rotationMatrix[3] * pos[1]];
}
;
function oscillate(time, minVal, maxVal) {
    var sineWave = sin(time);
    var normalizedSine = (sineWave + 1.0) / 2.0;
    return mix(minVal, maxVal, normalizedSine);
}
;
function hash(p) {
    p = p.slice();
    return fract((sin(dot(p, [127.1, 311.7]))) * 43758.5453123);
}
;
function noise(p) {
    p = p.slice();
    var i = floor(p);
    var f = fract(p);
    var u = [(f[0] * f[0]) * (3.0 - 2.0 * f[0]), (f[1] * f[1]) * (3.0 - 2.0 * f[1])];
    return mix(mix(hash([i[0], i[1]]), hash([i[0] + 1, i[1]]), u[0]), mix(hash([i[0], i[1] + 1]), hash([i[0] + 1, i[1] + 1]), u[0]), u[1]);
}
;
function main() {
    var uv = [(gl_FragCoord[0] / u_resolution[0]) * 2.0 - 1.0, (gl_FragCoord[1] / u_resolution[1]) * 2.0 - 1.0];
    uv[0] *= u_resolution[0] / u_resolution[1];
    rotate(uv, (u_time * u_speed) * 0.03).reduce((res, el, i) => (res[i] = el, res), uv);
    uv = [uv[0] * 15.0, uv[1] * 15.0];
    var t = (u_time * u_speed) * 0.2;
    var r = length(uv);
    var a = atan(uv[1], uv[0]);
    var N = 18.0;
    a = abs(mod(a, (pi * 2.0) / N) - pi / N);
    (uv[0] = cos(a) * r, uv[1] = sin(a) * r, uv);
    uv = [uv[0] * ((noise([uv[0] + u_time * (oscillate(u_time * 0.01, 0.01, 0.1)), uv[1] + u_time * (oscillate(u_time * 0.01, 0.01, 0.1))])) * 0.05), uv[1] * ((noise([uv[0] + u_time * (oscillate(u_time * 0.01, 0.01, 0.1)), uv[1] + u_time * (oscillate(u_time * 0.01, 0.01, 0.1))])) * 0.05)];
    var v = 5.0 + (0.5 * (sin(5.0 * uv[0] + 10.0 * uv[1] + t * 3.0))) * (0.5 + 0.2 * (sin(0.5 * r - t * 5.0)));
    var col = cos([(pi * 2.0) * (0.9 * v), (pi * 2.0) * (0.2 * v + 0.2), (pi * 2.0) * (0.1 * v + 0.35)]).map(function (_) { return 0.5 * _; }).map(function (_) { return 0.5 + _; });
    palette3(-length(col) * 1.9, length(col) * u_factor).reduce((res, el, i) => (res[i] = el, res), col);
    (col[0] = (col[0] - 0.5) * u_contrast + 0.5, col[1] = (col[1] - 0.5) * u_contrast + 0.5, col[2] = (col[2] - 0.5) * u_contrast + 0.5, col);
    var hsv = rgb2hsv(col);
    hsv[0] += u_hue / 360.0;
    hsv[1] *= u_saturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    gl_FragColor = [col[0], col[1], col[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
pi=3.1415926;
main();return Array.from(gl_FragColor); };
},
"melt": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uZoom = cloneValue(U.uZoom);
var uDetail = cloneValue(U.uDetail);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var uContrast = cloneValue(U.uContrast);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function f(p) {
    p = p.slice();
    var t = uTime * uSpeed;
    return (sin(p[0] + sin(p[1] + t * 0.2))) * (sin((p[1] * p[0]) * 0.1 + t * 0.2));
}
;
function main() {
    var p = [(gl_FragCoord[0] * 2.0 - uResolution[0]) / (min(uResolution[0], uResolution[1])), (gl_FragCoord[1] * 2.0 - uResolution[1]) / (min(uResolution[0], uResolution[1]))];
    var scale = max(0.1, uZoom);
    p = [p[0] * scale, p[1] * scale];
    var rz = [0.0, 0.0];
    var stepMul = mix(0.0, 0.1, clamp(uDetail, 0.0, 1.0));
    for (var i = 0; i < 15; i++) {
        var t0 = f(p);
        var t1 = f([p[0] + 0.05, p[1]]);
        var g = [(t1 - t0) / 0.05, (f([p[0], p[1] + 0.05]) - t0) / 0.05];
        var t = [-g[1], g[0]];
        (p[0] += 0.05 * t[0] + g[0] * (0.2 + stepMul), p[1] += 0.05 * t[1] + g[1] * (0.2 + stepMul), p);
        (rz[0] = g[0], rz[1] = g[1], rz);
    }
    ;
    var col = [rz[0] * 0.5 + 0.5, rz[1] * 0.5 + 0.5, 1];
    var hsv = rgb2hsv(col);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (col[0] = (col[0] - 0.5) * uContrast + 0.5, col[1] = (col[1] - 0.5) * uContrast + 0.5, col[2] = (col[2] - 0.5) * uContrast + 0.5, col);
    gl_FragColor = [col[0], col[1], col[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
main();return Array.from(gl_FragColor); };
},
"truchet": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.multiply = function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uZoom = cloneValue(U.uZoom);
var uBorderThickness = cloneValue(U.uBorderThickness);
var uSectors = cloneValue(U.uSectors);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
var s = [1, 1.7320508];
function calcHexDistance(p) {
    p = p.slice();
    abs(p).reduce((res, el, i) => (res[i] = el, res), p);
    return max(dot(p, [s[0] * .5, s[1] * .5]), p[0]);
}
;
function random(co) {
    co = co.slice();
    return fract((sin(dot(co, [12.9898, 78.233]))) * 43758.5453);
}
;
function calcHexInfo(uv) {
    uv = uv.slice();
    var uv2 = [uv[0] / s[0], uv[1] / s[1], (uv[0] - 0.5) / s[0], (uv[1] - 1.) / s[1]];
    var hexCenter = [floor(uv2[0] + 0.5), floor(uv2[1] + 0.5), floor(uv2[2] + 0.5), floor(uv2[3] + 0.5)];
    var offset = [uv[0] - hexCenter[0] * s[0], uv[1] - hexCenter[1] * s[1], uv[0] - (hexCenter[2] + .5) * s[0], uv[1] - (hexCenter[3] + .5) * s[1]];
    return (dot([offset[0], offset[1]], [offset[0], offset[1]])) < (dot([offset[2], offset[3]], [offset[2], offset[3]])) ? [offset[0], offset[1], hexCenter[0], hexCenter[1]] : [offset[2], offset[3], hexCenter[2], hexCenter[3]];
}
;
function palette(t) {
    var a = [0.8, 0.5, 0.4];
    var b = [1, 1, 0.2];
    var c = [1, 1, 1];
    var d = [0, 0.25, 0.25];
    return vec3.add([], a, vec3.multiply([], b, cos([6.28318 * (c[0] * t + d[0]), 6.28318 * (c[1] * t + d[1]), 6.28318 * (c[2] * t + d[2])])));
}
;
function circle(uv, c, r) {
    uv = uv.slice();
    c = c.slice();
    var s = 0.01;
    var l = 0.05;
    return smoothstep(l, l + s, (length([uv[0] + c[0], uv[1] + c[1]])) * r) + 1. - smoothstep(l, l + s, (length([uv[0] + c[0], uv[1] + c[1]])) * (r * 2.));
}
;
function main() {
    var uv = [(gl_FragCoord[0] / uResolution[0]) * 2. - 1., (gl_FragCoord[1] / uResolution[1]) * 2. - 1.];
    uv[1] *= uResolution[1] / uResolution[0];
    uv = [uv[0] * uZoom, uv[1] * uZoom];
    var PI = 3.14159;
    var sectors = cloneValue(uSectors);
    var halfSector = sectors * 0.5;
    var angle = atan(uv[1], uv[0]);
    angle = abs(mod(angle, PI / halfSector) - PI / sectors);
    (uv[0] = cos(angle) * length(uv), uv[1] = sin(angle) * length(uv), uv);
    var hexInfo = calcHexInfo(uv);
    var totalDist = calcHexDistance([hexInfo[0], hexInfo[1]]) + uBorderThickness;
    var rand = random([hexInfo[2], hexInfo[3]]);
    var d = 1.0;
    var t = (0.25 * uTime) * uSpeed;
    var index1 = mod(rand * 117.0 + t, 5.0) | 0;
    var index2 = mod(rand * 13.0 - t, 5.0) | 0;
    var index3 = mod(rand * 53.0 - t, 5.0) | 0;
    var index4 = mod(rand * 22.0 - t, 5.0) | 0;
    var cv = [hexInfo[0], hexInfo[1]];
    if (index1 == 0) {
        d = min(d, circle(cv, [0.5, 0.25], 0.15));
    }
    ;
    if (index1 == 1) {
        d = min(d, circle(cv, [-0.5, 0.25], 0.15));
    }
    ;
    if (index1 == 2) {
        d = min(d, circle(cv, [0., -0.6], 0.15));
    }
    ;
    if (index1 == 3) {
        d = min(d, circle(cv, [0.5, -0.3], 0.15));
    }
    ;
    if (index1 == 4) {
        d = min(d, circle(cv, [-0.5, -0.3], 0.15));
    }
    ;
    if (index2 == 0) {
        d = min(d, circle(cv, [0.5, 0.25], 0.15));
    }
    ;
    if (index2 == 1) {
        d = min(d, circle(cv, [-0.5, 0.25], 0.15));
    }
    ;
    if (index2 == 2) {
        d = min(d, circle(cv, [0., -0.6], 0.15));
    }
    ;
    if (index2 == 3) {
        d = min(d, circle(cv, [0.5, -0.3], 0.15));
    }
    ;
    if (index2 == 4) {
        d = min(d, circle(cv, [-0.5, -0.3], 0.15));
    }
    ;
    if (index3 == 0) {
        d = min(d, circle(cv, [0.5, 0.25], 0.15));
    }
    ;
    if (index3 == 1) {
        d = min(d, circle(cv, [-0.5, 0.25], 0.15));
    }
    ;
    if (index3 == 2) {
        d = min(d, circle(cv, [0., -0.6], 0.15));
    }
    ;
    if (index3 == 3) {
        d = min(d, circle(cv, [0.5, -0.3], 0.15));
    }
    ;
    if (index3 == 4) {
        d = min(d, circle(cv, [-0.5, -0.3], 0.15));
    }
    ;
    if (index4 == 0) {
        d = min(d, circle(cv, [0.5, 0.25], 0.15));
    }
    ;
    if (index4 == 1) {
        d = min(d, circle(cv, [-0.5, 0.25], 0.15));
    }
    ;
    if (index4 == 2) {
        d = min(d, circle(cv, [0., -0.6], 0.15));
    }
    ;
    if (index4 == 3) {
        d = min(d, circle(cv, [0.5, -0.3], 0.15));
    }
    ;
    if (index4 == 4) {
        d = min(d, circle(cv, [-0.5, -0.3], 0.15));
    }
    ;
    var fgColor = [0., 0., 0.];
    var bgColor = palette(uTime * 0.1 + index1 * 0.05);
    vec3.multiply([], [length(bgColor), length(bgColor), length(bgColor)], palette(0.5)).reduce((res, el, i) => (res[i] = el, res), bgColor);
    var color = mix(fgColor, bgColor, 1. - d);
    var hsv = rgb2hsv(color);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), color);
    gl_FragColor = [color[0], color[1], color[2], 1.];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
s=[1, 1.7320508];
main();return Array.from(gl_FragColor); };
},
"neonPolygon": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uSides = cloneValue(U.uSides);
var uGlow = cloneValue(U.uGlow);
var uColor1 = cloneValue(U.uColor1);
var uColor2 = cloneValue(U.uColor2);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function bandRadius(i, sides) {
    var base = 0.5 + (i - 7.0) * 0.01;
    return base;
}
;
function main() {
    var FC = [gl_FragCoord[0], gl_FragCoord[1]];
    var p = [(FC[0] * 2.0 - uResolution[0]) / uResolution[1], (FC[1] * 2.0 - uResolution[1]) / uResolution[1]];
    var time = uTime * uSpeed;
    var a = atan(p[1], p[0]);
    var l = length(p);
    var c = [0, 0, 0];
    var edgeFreq = max(uSides, 3.0);
    for (var i = 0.0; i < 15.0; i++) {
        var radius = bandRadius(i, edgeFreq);
        var m = (sin(a * edgeFreq + time * (2.0 + i * 0.5) - l * 20.0)) * 0.05;
        var tCol = i / 14.0;
        var bandColor = mix(uColor1, uColor2, tCol);
        var dist = abs(l - radius - m + i * 0.015);
        var intensity = uGlow / dist;
        (c[0] += ((bandColor[0] * 0.0008) * intensity) * 150.0, c[1] += ((bandColor[1] * 0.0008) * intensity) * 150.0, c[2] += ((bandColor[2] * 0.0008) * intensity) * 150.0, c);
    }
    ;
    var hsv = rgb2hsv(c);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), c);
    gl_FragColor = [c[0], c[1], c[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
main();return Array.from(gl_FragColor); };
},
"exposedFilm": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSectors = cloneValue(U.uSectors);
var uRotationSpeed = cloneValue(U.uRotationSpeed);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function hash(p) {
    p = p.slice();
    fract([p[0] * 123.34, p[1] * 456.21]).reduce((res, el, i) => (res[i] = el, res), p);
    p = [p[0] + dot(p, [p[0] + 45.32, p[1] + 45.32]), p[1] + dot(p, [p[0] + 45.32, p[1] + 45.32])];
    return fract(p[0] * p[1]);
}
;
function noise(p) {
    p = p.slice();
    var i = floor(p);
    var f = fract(p);
    var u = [(f[0] * f[0]) * (3.0 - 2.0 * f[0]), (f[1] * f[1]) * (3.0 - 2.0 * f[1])];
    var a = hash([i[0], i[1]]);
    var b = hash([i[0] + 1, i[1]]);
    var c = hash([i[0], i[1] + 1]);
    var d = hash([i[0] + 1, i[1] + 1]);
    return mix(mix(a, b, u[0]), mix(c, d, u[0]), u[1]);
}
;
function fbm(p) {
    p = p.slice();
    var f = 0.0;
    var amp = 0.5;
    var m = [0.8, 0.6, -0.6, 0.8];
    for (var i = 0; i < 4; i++) {
        f += amp * noise(p);
        assignComponents(p, [0, 1], [(m[0] * p[0] + m[2] * p[1]) * 2.0, (m[1] * p[0] + m[3] * p[1]) * 2.0]);
        amp *= 0.5;
    }
    ;
    return f;
}
;
function main() {
    var uv = [(gl_FragCoord[0] / uResolution[0]) * 2.0 - 1.0, (gl_FragCoord[1] / uResolution[1]) * 2.0 - 1.0];
    uv[0] *= uResolution[0] / uResolution[1];
    var time = cloneValue(uTime);
    var sym = max(uSectors, 1.0);
    var rot = cloneValue(uRotationSpeed);
    var angle = atan(uv[1], uv[0]);
    var radius = length(uv);
    var sector = 6.2831853 / sym;
    var a = mod(angle + time * rot, sector) - 0.5 * sector;
    var p = [radius * (cos(a * sym)), radius * (sin(a * sym))];
    var field = fbm([p[0] * 4.0 + time * 0.3, p[1] * 4.0 + time * 0.3]);
    var petal = cos((a * sym) * 0.5);
    petal = max(petal, 0.0);
    var ring = exp(-pow(radius * 2.5, 2.0));
    var energy = ((field * petal) * ring) * 3.0;
    var base = [energy, energy, energy];
    clamp(base, 0.0, 1.0).reduce((res, el, i) => (res[i] = el, res), base);
    var hsv = rgb2hsv(base);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    var color = hsv2rgb(hsv);
    gl_FragColor = [color[0], color[1], color[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
main();return Array.from(gl_FragColor); };
},
"psychedelicGlass": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.multiply = function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function sqrt(x) {
    if (x.length)
        return x.map(sqrt);
    return Math.sqrt(x);
}
function sign(x) {
    if (x.length)
        return x.map(sign);
    return Math.sign(x);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uSides = cloneValue(U.uSides);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var uContrast = cloneValue(U.uContrast);
var uDensity = cloneValue(U.uDensity);
var uGlow = cloneValue(U.uGlow);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function palette(t) {
    var a = [0.8, 0.5, 0.4];
    var b = [1, 1, 0.2];
    var c = [1, 1, 1];
    var d = [0, 0.25, 0.25];
    return vec3.add([], a, vec3.multiply([], b, cos([6.28318 * (c[0] * t + d[0]), 6.28318 * (c[1] * t + d[1]), 6.28318 * (c[2] * t + d[2])])));
}
;
function sdParallelogram(p, wi, he, sk) {
    p = p.slice();
    var e = [sk, he];
    (p[1] < 0.0) ? [-p[0], -p[1]] : p.reduce((res, el, i) => (res[i] = el, res), p);
    var w = [p[0] - e[0], p[1] - e[1]];
    w[0] -= clamp(w[0], -wi, wi);
    var d = [dot(w, w), -w[1]];
    var s = p[0] * e[1] - p[1] * e[0];
    (s < 0.0) ? [-p[0], -p[1]] : p.reduce((res, el, i) => (res[i] = el, res), p);
    var v = [p[0] - wi, p[1]];
    (v[0] -= e[0] * (clamp((dot(v, e)) / (dot(e, e)), -1.0, 1.0)), v[1] -= e[1] * (clamp((dot(v, e)) / (dot(e, e)), -1.0, 1.0)), v);
    min(d, [dot(v, v), wi * he - abs(s)]).reduce((res, el, i) => (res[i] = el, res), d);
    return sqrt(d[0]) * sign(-d[1]);
}
;
function sdLine(p) {
    p = p.slice();
    var size = 0.5;
    var width = size * 0.33;
    return min(sdParallelogram([p[0] + -0.12, p[1] + -0.5], 0.1, size * 1.5, size * 0.75), sdParallelogram([p[0] + width + size * 0.175, p[1] + size * 1.52], 0.1, size, 0.));
}
;
function sdfDon(uv) {
    uv = uv.slice();
    var d1 = sdLine(uv);
    var d2 = sdLine([uv[0] + 0.315, uv[1]]);
    var d3 = sdLine([uv[0] + 0.63, uv[1]]);
    return min(min(d1, d2), d3);
}
;
function main() {
    var uv = [(gl_FragCoord[0] / uResolution[0]) * 2.0 - 1.0, (gl_FragCoord[1] / uResolution[1]) * 2.0 - 1.0];
    uv[1] *= uResolution[1] / uResolution[0];
    var t = uTime * uSpeed;
    var PI = 3.14159;
    var sectors = max(uSides, 2.0);
    var halfSector = sectors * 0.5;
    var angle = atan(uv[1], uv[0]);
    angle = abs(mod(angle, PI / halfSector) - PI / sectors);
    (uv[0] = cos(angle) * length(uv), uv[1] = sin(angle) * length(uv), uv);
    var puv = [uv[0] + 0.1, uv[1] + 0.05];
    var ind = floor((uv[1] + uv[0]) * 6.0) + t * 0.1;
    var g = mod(((uv[1] + uv[0]) * 6.0), 1.0);
    assignComponents(uv, [0, 1], [uv[0] + ind * 0.285 + t * 0.1, uv[1] + uv[0] + t * 0.1]);
    uv = [uv[0] * uDensity, uv[1] * uDensity];
    mod(uv, 2.5).map(function (_) { return _ - 1.25; }).reduce((res, el, i) => (res[i] = el, res), uv);
    assignComponents(puv, [0, 1], [puv[0] + ind * 0.285 + t * 0.1, puv[1] + puv[0] + t * 0.1]);
    puv = [puv[0] * uDensity, puv[1] * uDensity];
    mod(puv, 2.5).map(function (_) { return _ - 1.25; }).reduce((res, el, i) => (res[i] = el, res), puv);
    var d = sdfDon(uv);
    var p = sdfDon(puv);
    d = smoothstep(0.0, 0.02, d);
    p = smoothstep(0.0, 0.01, p);
    var fgColor = palette(-t + ind * 0.1).map(function (_) { return _ * g; }).map(function (_) { return _ * 1.579; }).map(function (_) { return _ * uGlow; });
    var bgColor = palette(-t + ind * 0.1).map(function (_) { return _ * g; }).map(function (_) { return _ * 0.1; });
    if (g > 0.95) {
        mix(fgColor, palette(-t + uv[0] + uv[1]), 0.5).reduce((res, el, i) => (res[i] = el, res), bgColor);
    }
    ;
    var color = mix(fgColor, bgColor, d);
    mix([color[0] * 2.0, color[1] * 2.0, color[2] * 2.0], color, p).reduce((res, el, i) => (res[i] = el, res), color);
    (color[0] = (color[0] - 0.5) * uContrast + 0.5, color[1] = (color[1] - 0.5) * uContrast + 0.5, color[2] = (color[2] - 0.5) * uContrast + 0.5, color);
    var hsv = rgb2hsv(color);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), color);
    gl_FragColor = [color[0], color[1], color[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
main();return Array.from(gl_FragColor); };
},
"solarWhirls": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var uColor1 = cloneValue(U.uColor1);
var uColor2 = cloneValue(U.uColor2);
var uColor3 = cloneValue(U.uColor3);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function hash1(n) {
    return fract(sin(n) * 43758.5453);
}
;
function hash2(p) {
    p = p.slice();
    (p[0] = dot(p, [127.1, 311.7]), p[1] = dot(p, [269.5, 183.3]), p);
    return fract(sin(p).map(function (_) { return _ * 43758.5453; }));
}
;
function voronoi(x, w, time) {
    x = x.slice();
    var n = floor(x);
    var f = fract(x);
    var m = [8, 0, 0, 0];
    for (var j = -2; j <= 2; j++) {
        for (var i = -2; i <= 2; i++) {
            var g = [i, j];
            var o = hash2([n[0] + g[0], n[1] + g[1]]);
            sin([time + 6.2831 * o[0], time + 6.2831 * o[1]]).map(function (_) { return 0.5 * _; }).map(function (_) { return 0.5 + _; }).reduce((res, el, i) => (res[i] = el, res), o);
            var d = length([g[0] - f[0] + o[0], g[1] - f[1] + o[1]]);
            var col = sin([(hash1(dot([n[0] + g[0], n[1] + g[1]], [7.0, 113.0]))) * 2.5 + 3.5 + 2, (hash1(dot([n[0] + g[0], n[1] + g[1]], [7.0, 113.0]))) * 2.5 + 3.5 + 3, (hash1(dot([n[0] + g[0], n[1] + g[1]], [7.0, 113.0]))) * 2.5 + 3.5]).map(function (_) { return 0.5 * _; }).map(function (_) { return 0.5 + _; });
            (col[0] = col[0] * col[0], col[1] = col[1] * col[1], col[2] = col[2] * col[2], col);
            var h = smoothstep(-1.0, 1.0, (m[0] - d) / w);
            m[0] = mix(m[0], d, h) - ((h * (1.0 - h)) * w) / (1.0 + 3.0 * w);
            m = [null, 0, 1, 2].map(function (idx, i) { return idx == null ? m[i] : this[idx]; }, mix([m[1], m[2], m[3]], col, h).map(function (_) { return _ - ((h * (1.0 - h)) * w) / (1.0 + 3.0 * w); }));
        }
        ;
    }
    ;
    return m;
}
;
function paletteSolar(t) {
    t = clamp(t, 0.0, 1.0);
    if (t < 0.5) {
        var k = t / 0.5;
        return mix(uColor1, uColor2, k);
    }
    else {
        var k = (t - 0.5) / 0.5;
        return mix(uColor2, uColor3, k);
    }
    ;
}
;
function main() {
    var uv = [(gl_FragCoord[0] / uResolution[0]) * 2.0 - 1.0, (gl_FragCoord[1] / uResolution[1]) * 2.0 - 1.0];
    uv[1] *= uResolution[1] / uResolution[0];
    var t = (uTime * 0.1) * uSpeed;
    var v = voronoi([2.0 * uv[0] + t, 2.0 * uv[1] + t], 1.0, t);
    voronoi([3.0 * v[0], 3.0 * v[1]], 1.0, t).reduce((res, el, i) => (res[i] = el, res), v);
    voronoi([3.0 * v[0], 3.0 * v[1]], 1.0, t).reduce((res, el, i) => (res[i] = el, res), v);
    voronoi([3.0 * v[0], 3.0 * v[1]], 1.0, t).reduce((res, el, i) => (res[i] = el, res), v);
    var d = 0.0;
    d = max(v[0], d);
    d = smoothstep(0.1, 0.5 + v[1] * 0.1, d);
    var fgColor = paletteSolar(v[0]);
    var bgColor = paletteSolar(v[1]);
    var color = mix(bgColor, fgColor, d);
    var hsv = rgb2hsv(color);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), color);
    gl_FragColor = [color[0], color[1], color[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
main();return Array.from(gl_FragColor); };
},
"chargedCells": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uScale = cloneValue(U.uScale);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var uColor1 = cloneValue(U.uColor1);
var uColor2 = cloneValue(U.uColor2);
var uColor3 = cloneValue(U.uColor3);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function hash1(n) {
    return fract(sin(n) * 43758.5453);
}
;
function hash2(p) {
    p = p.slice();
    (p[0] = dot(p, [127.1, 311.7]), p[1] = dot(p, [269.5, 183.3]), p);
    return fract(sin(p).map(function (_) { return _ * 43758.5453; }));
}
;
function voronoi(x, w) {
    x = x.slice();
    var n = floor(x);
    var f = fract(x);
    var m = [8, 0, 0, 0];
    for (var j = -2; j <= 2; j++) {
        for (var i = -2; i <= 2; i++) {
            var g = [i, j];
            var o = hash2([n[0] + g[0], n[1] + g[1]]);
            sin([uTime + 6.2831 * o[0], uTime + 6.2831 * o[1]]).map(function (_) { return 0.5 * _; }).map(function (_) { return 0.5 + _; }).reduce((res, el, i) => (res[i] = el, res), o);
            var d = length([g[0] - f[0] + o[0], g[1] - f[1] + o[1]]);
            var col = sin([(hash1(dot([n[0] + g[0], n[1] + g[1]], [7.0, 113.0]))) * 2.5 + 3.5 + 2, (hash1(dot([n[0] + g[0], n[1] + g[1]], [7.0, 113.0]))) * 2.5 + 3.5 + 3, (hash1(dot([n[0] + g[0], n[1] + g[1]], [7.0, 113.0]))) * 2.5 + 3.5]).map(function (_) { return 0.5 * _; }).map(function (_) { return 0.5 + _; });
            (col[0] = col[0] * col[0], col[1] = col[1] * col[1], col[2] = col[2] * col[2], col);
            var h = smoothstep(-1.0, 1.0, (m[0] - d) / w);
            m[0] = mix(m[0], d, h) - ((h * (1.0 - h)) * w) / (1.0 + 3.0 * w);
            m = [null, 0, 1, 2].map(function (idx, i) { return idx == null ? m[i] : this[idx]; }, mix([m[1], m[2], m[3]], col, h).map(function (_) { return _ - ((h * (1.0 - h)) * w) / (1.0 + 3.0 * w); }));
        }
        ;
    }
    ;
    return m;
}
;
function random(co) {
    co = co.slice();
    return fract((sin(dot(co, [12.9898, 78.233]))) * 43758.5453);
}
;
function sdfGrid(uv, r) {
    uv = uv.slice();
    var c = [(uv[0] * 4.0) * r, (uv[1] * 4.0) * r];
    var angle = cloneValue(r);
    var thickness = 0.5 + r;
    var one = (abs(0.5 - mod(c[1] + cos(angle) * c[0], 1.0))) * thickness;
    var two = (abs(0.5 - mod(c[1] - cos(angle) * c[0], 1.0))) * thickness;
    return min(one, two);
}
;
function paletteCharged(t) {
    t = clamp(t, 0.0, 1.0);
    if (t < 0.5) {
        var k = t / 0.5;
        return mix(uColor1, uColor2, k);
    }
    else {
        var k = (t - 0.5) / 0.5;
        return mix(uColor2, uColor3, k);
    }
    ;
}
;
function main() {
    var uv = [(gl_FragCoord[0] / uResolution[0]) * 2.0 - 1.0, (gl_FragCoord[1] / uResolution[1]) * 2.0 - 1.0];
    uv[1] *= uResolution[1] / uResolution[0];
    var t = sin((uTime * 0.1) * uSpeed);
    var v = voronoi([uScale * uv[0], uScale * uv[1]], 0.5);
    var r = pow(v[1], 0.5);
    var d = 0.0;
    d = max(sdfGrid([uv[0] - t, uv[1] - t], r), d);
    d = max(sdfGrid([uv[0] + t, uv[1] + t], 1.0 - r), -d);
    d = smoothstep(0.1, 0.15 + r * 0.1, d);
    var fgColor = paletteCharged(0.6 * r);
    var bgColor = paletteCharged(0.1 * r);
    var edgeColor = paletteCharged(clamp(r + d * 0.5, 0.0, 1.0));
    var color = mix(fgColor, bgColor, d);
    mix(color, edgeColor, 0.35).reduce((res, el, i) => (res[i] = el, res), color);
    var hsv = rgb2hsv(color);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), color);
    gl_FragColor = [color[0], color[1], color[2], 1];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
main();return Array.from(gl_FragColor); };
},
"refractedWave": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uSoftness = cloneValue(U.uSoftness);
var uIntensity = cloneValue(U.uIntensity);
var uNoise = cloneValue(U.uNoise);
var uShape = cloneValue(U.uShape);
var uColorBack = cloneValue(U.uColorBack);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var fragColor = [0, 0, 0, 0];
function hash11(p) {
    p = fract(p * .1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}
;
function main() {
    var shape_uv = [(gl_FragCoord[0] * 2.0 - uResolution[0]) / uResolution[1], (gl_FragCoord[1] * 2.0 - uResolution[1]) / uResolution[1]];
    var t = (0.1 * uTime) * uSpeed;
    var shape = 0.0;
    if (uShape < 1.5) {
        var wave = (cos(0.5 * shape_uv[0] - 4. * t)) * (sin(1.5 * shape_uv[0] + 2. * t));
        shape = 1. - smoothstep(-1., 1., shape_uv[1] + wave);
    }
    else {
        if (uShape < 2.5) {
            shape = (sin(shape_uv[0] * 5.0)) * (cos(shape_uv[1] * 5.0 - t));
            shape = pow(abs(shape), 4.0);
        }
        else {
            var dist = length(shape_uv);
            shape = (sin(dist * 4.0 - t * 5.0)) * 0.5 + 0.5;
        }
        ;
    }
    ;
    var warpNoise = hash11(gl_FragCoord[0] * uIntensity + gl_FragCoord[1]);
    shape += (uIntensity * 0.2) * (warpNoise - 0.5);
    shape += (uNoise * 0.1) * (hash11(gl_FragCoord[1] + t) - 0.5);
    shape = clamp(shape, 0.0, 1.0);
    var mixer = shape * (uColorCount - 1.0);
    var gradient = cloneValue(uColors[0]);
    for (var i = 1; i < 7; i++) {
        if (i > (uColorCount - 1.0)) {
            break;
        }
        ;
        var localT = clamp(mixer - i - 1, 0.0, 1.0);
        localT = smoothstep(0.5 - 0.5 * uSoftness, 0.5 + 0.5 * uSoftness, localT);
        mix(gradient, uColors[i], localT).reduce((res, el, i) => (res[i] = el, res), gradient);
    }
    ;
    mix(uColorBack, gradient, gradient[3]).reduce((res, el, i) => (res[i] = el, res), fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"swirl": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function ceil(x) {
    if (x.length)
        return x.map(ceil);
    return Math.ceil(x);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function fwidth(x) { return derivative(x); }
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uColorBack = cloneValue(U.uColorBack);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uBandCount = cloneValue(U.uBandCount);
var uTwist = cloneValue(U.uTwist);
var uCenter = cloneValue(U.uCenter);
var uProportion = cloneValue(U.uProportion);
var uSoftness = cloneValue(U.uSoftness);
var uNoise = cloneValue(U.uNoise);
var uNoiseFrequency = cloneValue(U.uNoiseFrequency);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
var TWO_PI = 6.28318530718;
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function permute(x) {
    x = x.slice();
    return mod([((x[0] * 34.0) + 1.0) * x[0], ((x[1] * 34.0) + 1.0) * x[1], ((x[2] * 34.0) + 1.0) * x[2]], 289.0);
}
;
function snoise(v) {
    v = v.slice();
    var C = [0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439];
    var i = floor([v[0] + dot(v, [C[1], C[1]]), v[1] + dot(v, [C[1], C[1]])]);
    var x0 = [v[0] - i[0] + dot(i, [C[0], C[0]]), v[1] - i[1] + dot(i, [C[0], C[0]])];
    var i1 = [0, 0];
    (x0[0] > x0[1]) ? [1.0, 0.0] : [0.0, 1.0].reduce((res, el, i) => (res[i] = el, res), i1);
    var x12 = [x0[0] + C[0], x0[1] + C[0], x0[0] + C[2], x0[1] + C[2]];
    x12 = [x12[0] - i1[0], x12[1] - i1[1], x12[2], x12[3]];
    mod(i, 289.0).reduce((res, el, i) => (res[i] = el, res), i);
    var p = permute(vec3.add([], permute([i[1], i[1] + i1[1], i[1] + 1]).map(function (_) { return _ + i[0]; }), [0, i1[0], 1]));
    var m = max([0.5 - dot(x0, x0), 0.5 - dot([x12[0], x12[1]], [x12[0], x12[1]]), 0.5 - dot([x12[2], x12[3]], [x12[2], x12[3]])], 0.0);
    (m[0] = m[0] * m[0], m[1] = m[1] * m[1], m[2] = m[2] * m[2], m);
    (m[0] = m[0] * m[0], m[1] = m[1] * m[1], m[2] = m[2] * m[2], m);
    var x = fract([p[0] * C[3], p[1] * C[3], p[2] * C[3]]).map(function (_) { return 2.0 * _; }).map(function (_) { return _ - 1.0; });
    var h = abs(x).map(function (_) { return _ - 0.5; });
    var ox = floor([x[0] + 0.5, x[1] + 0.5, x[2] + 0.5]);
    var a0 = [x[0] - ox[0], x[1] - ox[1], x[2] - ox[2]];
    (m[0] *= 1.79284291400159 - 0.85373472095314 * (a0[0] * a0[0] + h[0] * h[0]), m[1] *= 1.79284291400159 - 0.85373472095314 * (a0[1] * a0[1] + h[1] * h[1]), m[2] *= 1.79284291400159 - 0.85373472095314 * (a0[2] * a0[2] + h[2] * h[2]), m);
    var g = [0, 0, 0];
    g[0] = a0[0] * x0[0] + h[0] * x0[1];
    g = [g[0], a0[1] * x12[0] + h[1] * x12[1], a0[2] * x12[2] + h[2] * x12[3]];
    return 130.0 * (dot(m, g));
}
;
function main() {
    var shape_uv = [(gl_FragCoord[0] * 2.0 - uResolution[0]) / uResolution[1], (gl_FragCoord[1] * 2.0 - uResolution[1]) / uResolution[1]];
    var l = length(shape_uv);
    l = max(1e-4, l);
    var t = uTime * uSpeed;
    var angle = ceil(uBandCount) * (atan(shape_uv[1], shape_uv[0])) + t;
    var angle_norm = angle / TWO_PI;
    var twist = 3.0 * (clamp(uTwist, 0.0, 1.0));
    var offset = pow(l, -twist) + angle_norm;
    var shape = fract(offset);
    shape = 1.0 - abs(2.0 * shape - 1.0);
    shape += uNoise * (snoise([(15.0 * (pow(uNoiseFrequency, 2.0))) * shape_uv[0], (15.0 * (pow(uNoiseFrequency, 2.0))) * shape_uv[1]]));
    var mid = smoothstep(0.2, 0.2 + 0.8 * uCenter, pow(l, twist));
    shape = mix(0.0, shape, mid);
    var proportion = clamp(uProportion, 0.0, 1.0);
    var exponent = mix(0.25, 1.0, proportion * 2.0);
    exponent = mix(exponent, 10.0, max(0.0, proportion * 2.0 - 1.0));
    // Noise can make the base negative; fractional powers are undefined in GLSL.
    shape = pow(max(shape, 0.0), exponent);
    var mixer = shape * uColorCount;
    var gradient = cloneValue(uColors[0]);
    gradient = [gradient[0] * gradient[3], gradient[1] * gradient[3], gradient[2] * gradient[3], gradient[3]];
    var outerShape = 0.0;
    for (var i = 1; i < 11; i++) {
        if (i > uColorCount) {
            break;
        }
        ;
        var m = clamp(mixer - i - 1, 0.0, 1.0);
        var aa = fwidth(m);
        m = smoothstep(0.5 - 0.5 * uSoftness - aa, 0.5 + 0.5 * uSoftness + aa, m);
        if (i == 1) {
            outerShape = m;
        }
        ;
        var c = cloneValue(uColors[i - 1]);
        c = [c[0] * c[3], c[1] * c[3], c[2] * c[3], c[3]];
        mix(gradient, c, m).reduce((res, el, i) => (res[i] = el, res), gradient);
    }
    ;
    var midAA = 0.1 * (fwidth(pow(l, -twist)));
    var outerMid = smoothstep(0.2, 0.2 + midAA, pow(l, twist));
    outerShape = mix(0.0, outerShape, outerMid);
    var baseColor = [gradient[0] * outerShape, gradient[1] * outerShape, gradient[2] * outerShape];
    var opacity = gradient[3] * outerShape;
    var bgColor = [uColorBack[0] * uColorBack[3], uColorBack[1] * uColorBack[3], uColorBack[2] * uColorBack[3]];
    (baseColor[0] = baseColor[0] + bgColor[0] * (1.0 - opacity), baseColor[1] = baseColor[1] + bgColor[1] * (1.0 - opacity), baseColor[2] = baseColor[2] + bgColor[2] * (1.0 - opacity), baseColor);
    opacity = opacity + uColorBack[3] * (1.0 - opacity);
    var hsv = rgb2hsv(baseColor);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), baseColor);
    (fragColor[0] = baseColor[0], fragColor[1] = baseColor[1], fragColor[2] = baseColor[2], fragColor[3] = opacity, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
TWO_PI=6.28318530718;
main();return Array.from(fragColor); };
},
"spiral": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function fwidth(x) { return derivative(x); }
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var u_colorBack = cloneValue(U.u_colorBack);
var u_colorFront = cloneValue(U.u_colorFront);
var u_density = cloneValue(U.u_density);
var u_distortion = cloneValue(U.u_distortion);
var u_strokeWidth = cloneValue(U.u_strokeWidth);
var u_strokeTaper = cloneValue(U.u_strokeTaper);
var u_noiseFrequency = cloneValue(U.u_noiseFrequency);
var u_noise = cloneValue(U.u_noise);
var u_softness = cloneValue(U.u_softness);
var u_fit = cloneValue(U.u_fit);
var u_scale = cloneValue(U.u_scale);
var u_rotation = cloneValue(U.u_rotation);
var u_offsetX = cloneValue(U.u_offsetX);
var u_offsetY = cloneValue(U.u_offsetY);
var u_originX = cloneValue(U.u_originX);
var u_originY = cloneValue(U.u_originY);
var u_worldWidth = cloneValue(U.u_worldWidth);
var u_worldHeight = cloneValue(U.u_worldHeight);
var fragColor = [0, 0, 0, 0];
function permute(x) {
    x = x.slice();
    return mod([((x[0] * 34.0) + 1.0) * x[0], ((x[1] * 34.0) + 1.0) * x[1], ((x[2] * 34.0) + 1.0) * x[2]], 289.0);
}
;
function snoise(v) {
    v = v.slice();
    var C = [0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439];
    var i = floor([v[0] + dot(v, [C[1], C[1]]), v[1] + dot(v, [C[1], C[1]])]);
    var x0 = [v[0] - i[0] + dot(i, [C[0], C[0]]), v[1] - i[1] + dot(i, [C[0], C[0]])];
    var i1 = (x0[0] > x0[1]) ? [1.0, 0.0] : [0.0, 1.0];
    var x12 = [x0[0] + C[0], x0[1] + C[0], x0[0] + C[2], x0[1] + C[2]];
    x12 = [x12[0] - i1[0], x12[1] - i1[1], x12[2], x12[3]];
    mod(i, 289.0).reduce((res, el, i) => (res[i] = el, res), i);
    var p = permute(vec3.add([], permute([i[1], i[1] + i1[1], i[1] + 1]).map(function (_) { return _ + i[0]; }), [0, i1[0], 1]));
    var m = max([0.5 - dot(x0, x0), 0.5 - dot([x12[0], x12[1]], [x12[0], x12[1]]), 0.5 - dot([x12[2], x12[3]], [x12[2], x12[3]])], 0.0);
    (m[0] = m[0] * m[0], m[1] = m[1] * m[1], m[2] = m[2] * m[2], m);
    (m[0] = m[0] * m[0], m[1] = m[1] * m[1], m[2] = m[2] * m[2], m);
    var x = fract([p[0] * C[3], p[1] * C[3], p[2] * C[3]]).map(function (_) { return 2.0 * _; }).map(function (_) { return _ - 1.0; });
    var h = abs(x).map(function (_) { return _ - 0.5; });
    var ox = floor([x[0] + 0.5, x[1] + 0.5, x[2] + 0.5]);
    var a0 = [x[0] - ox[0], x[1] - ox[1], x[2] - ox[2]];
    (m[0] *= 1.79284291400159 - 0.85373472095314 * (a0[0] * a0[0] + h[0] * h[0]), m[1] *= 1.79284291400159 - 0.85373472095314 * (a0[1] * a0[1] + h[1] * h[1]), m[2] *= 1.79284291400159 - 0.85373472095314 * (a0[2] * a0[2] + h[2] * h[2]), m);
    var g = [0, 0, 0];
    g[0] = a0[0] * x0[0] + h[0] * x0[1];
    g = [g[0], a0[1] * x12[0] + h[1] * x12[1], a0[2] * x12[2] + h[2] * x12[3]];
    return 130.0 * (dot(m, g));
}
;
function main() {
    var st = [gl_FragCoord[0] / uResolution[0], gl_FragCoord[1] / uResolution[1]];
    var aspect = uResolution[0] / uResolution[1];
    var uv = [st[0] - u_originX, st[1] - u_originY];
    uv[0] *= aspect;
    var cosR = cos(u_rotation);
    var sinR = sin(u_rotation);
    assignComponents(uv, [0, 1], [uv[0] * cosR - uv[1] * sinR, uv[0] * sinR + uv[1] * cosR]);
    uv = [uv[0] / (max(0.001, u_scale)), uv[1] / (max(0.001, u_scale))];
    (uv[0] -= u_offsetX, uv[1] -= u_offsetY, uv);
    var radius = length(uv);
    var angle = atan(uv[1], uv[0]);
    if (u_noise > 0.0) {
        var noiseUV = [uv[0] * u_noiseFrequency, uv[1] * u_noiseFrequency + uTime * 0.2];
        var n = snoise(noiseUV);
        radius += (n * u_noise) * 0.15;
        angle += (n * u_noise) * 0.25;
    }
    ;
    var spiralValue = angle / 6.28318530718 + (radius * u_density) - uTime;
    if (u_distortion > 0.0) {
        spiralValue += ((sin(radius * 8.0 - uTime)) * u_distortion) * 0.1;
    }
    ;
    var pattern = fract(spiralValue);
    var currentStrokeWidth = cloneValue(u_strokeWidth);
    if (u_strokeTaper > 0.0) {
        currentStrokeWidth *= mix(1.0, clamp(radius, 0.0, 1.0), u_strokeTaper);
    }
    ;
    var halfWidth = currentStrokeWidth * 0.5;
    var edgeDist = abs(pattern - 0.5);
    var aaRange = fwidth(edgeDist) + u_softness * 0.1;
    var mask = smoothstep(halfWidth + aaRange, halfWidth - aaRange, edgeDist);
    var backColor = cloneValue(u_colorBack);
    var frontColor = cloneValue(u_colorFront);
    backColor = [backColor[0] * backColor[3], backColor[1] * backColor[3], backColor[2] * backColor[3], backColor[3]];
    frontColor = [frontColor[0] * frontColor[3], frontColor[1] * frontColor[3], frontColor[2] * frontColor[3], frontColor[3]];
    mix(backColor, frontColor, mask).reduce((res, el, i) => (res[i] = el, res), fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"neuralNoise": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
var u_time = cloneValue(U.u_time);
var u_ratio = cloneValue(U.u_ratio);
var u_scale = cloneValue(U.u_scale);
var u_baseColor = cloneValue(U.u_baseColor);
var u_hue = cloneValue(U.u_hue);
var u_saturation = cloneValue(U.u_saturation);
var u_iterations = cloneValue(U.u_iterations);
var u_complexity = cloneValue(U.u_complexity);
var u_distance = cloneValue(U.u_distance);
var u_brightness = cloneValue(U.u_brightness);
var u_contrast = cloneValue(U.u_contrast);
var u_colorShiftSpeed = cloneValue(U.u_colorShiftSpeed);
var u_vignette = cloneValue(U.u_vignette);
var vUv = cloneValue(UV);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function rotate(uv, th) {
    uv = uv.slice();
    return [cos(th) * uv[0] + -sin(th) * uv[1], sin(th) * uv[0] + cos(th) * uv[1]];
}
;
function neuro_shape(uv, t, initialScale) {
    uv = uv.slice();
    var sine_acc = [0., 0.];
    var res = [0., 0.];
    var currentScale = cloneValue(initialScale);
    for (var j = 0; j < 32; j++) {
        if (j >= u_iterations) {
            break;
        }
        ;
        rotate(uv, 1.).reduce((res, el, i) => (res[i] = el, res), uv);
        rotate(sine_acc, 1.).reduce((res, el, i) => (res[i] = el, res), sine_acc);
        var layer = [uv[0] * currentScale + j + sine_acc[0] - t, uv[1] * currentScale + j + sine_acc[1] - t];
        sin(layer).map(function (_) { return _ + u_complexity; }).reduce((res, el, i) => (res[i] += el, res), sine_acc);
        (cos(layer).map(function (_) { return .5 * _; }).map(function (_) { return .5 + _; })).map(function (_) { return _ / currentScale; }).reduce((res, el, i) => (res[i] += el, res), res);
        currentScale *= u_distance;
    }
    ;
    return res[0] + res[1];
}
;
function main() {
    var uv = [.5 * vUv[0], .5 * vUv[1]];
    uv[0] *= u_ratio;
    var t = .001 * u_time;
    var initialScale = 8.0 / (max(0.001, u_scale));
    var noise = neuro_shape(uv, t, initialScale);
    noise = u_brightness * (pow(noise, 3.));
    noise += pow(noise, 10.);
    noise = max(.0, noise - u_contrast);
    noise *= (1. - u_vignette * (length([vUv[0] - .5, vUv[1] - .5])));
    var baseHsv = rgb2hsv([u_baseColor[0], u_baseColor[1], u_baseColor[2]]);
    var dynamicHue = baseHsv[0] + (u_hue / 360.0) + ((t * u_colorShiftSpeed) * 0.1);
    var targetSat = baseHsv[1] * u_saturation;
    var finalColor = hsv2rgb([fract(dynamicHue), targetSat, baseHsv[2]]);
    (finalColor[0] = (finalColor[0] * noise) * u_baseColor[3], finalColor[1] = (finalColor[1] * noise) * u_baseColor[3], finalColor[2] = (finalColor[2] * noise) * u_baseColor[3], finalColor);
    (fragColor[0] = finalColor[0], fragColor[1] = finalColor[1], fragColor[2] = finalColor[2], fragColor[3] = noise * u_baseColor[3], fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
vUv=cloneValue(UV);
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"interstellar": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
var iResolution = cloneValue(U.iResolution);
var iTime = cloneValue(U.iTime);
var u_renderPasses = cloneValue(U.u_renderPasses);
var u_sceneTimeScale = cloneValue(U.u_sceneTimeScale);
var u_grainIntensity = cloneValue(U.u_grainIntensity);
var u_globalLuminance = cloneValue(U.u_globalLuminance);
var u_stepPrecision = cloneValue(U.u_stepPrecision);
var u_rayIterations = cloneValue(U.u_rayIterations);
var u_surfaceSolidity = cloneValue(U.u_surfaceSolidity);
var u_camPosX = cloneValue(U.u_camPosX);
var u_camPosY = cloneValue(U.u_camPosY);
var u_camPitch = cloneValue(U.u_camPitch);
var u_camFov = cloneValue(U.u_camFov);
var u_camShiftX = cloneValue(U.u_camShiftX);
var u_camShiftY = cloneValue(U.u_camShiftY);
var outColor = [0, 0, 0, 0];
function calcRotation(theta) {
    var sine = sin(theta);
    var cosine = cos(theta);
    return [cosine, -sine, sine, cosine];
}
;
function applyCinematicGrade(rawColor) {
    rawColor = rawColor.slice();
    var colorSpaceA = [0.59719, 0.07600, 0.02840, 0.35458, 0.90834, 0.13383, 0.04823, 0.01566, 0.83777];
    var colorSpaceB = [1.60475, -0.10208, -0.00327, -0.53108, 1.10813, -0.07276, -0.07367, -0.00605, 1.07602];
    var graded = [colorSpaceA[0] * rawColor[0] + colorSpaceA[3] * rawColor[1] + colorSpaceA[6] * rawColor[2], colorSpaceA[1] * rawColor[0] + colorSpaceA[4] * rawColor[1] + colorSpaceA[7] * rawColor[2], colorSpaceA[2] * rawColor[0] + colorSpaceA[5] * rawColor[1] + colorSpaceA[8] * rawColor[2]];
    var numerator = [graded[0] * (graded[0] + 0.0945786) - 0.000090537, graded[1] * (graded[1] + 0.0945786) - 0.000090537, graded[2] * (graded[2] + 0.0945786) - 0.000090537];
    var denominator = [graded[0] * (0.783729 * graded[0] + 0.4329510) + 0.238081, graded[1] * (0.783729 * graded[1] + 0.4329510) + 0.238081, graded[2] * (0.783729 * graded[2] + 0.4329510) + 0.238081];
    return ([numerator[0] / denominator[0], numerator[1] / denominator[1], numerator[2] / denominator[2]]).map(function (x, i, v) { var sum = 0; for (var j = 0; j < 3; j++) {
        sum += this[j * 3 + i] * v[j];
    } return sum; }, colorSpaceB);
}
;
function computeStructuralDensity(pos) {
    pos = pos.slice();
    var phaseShift = 0.228033988;
    var structuralBasis = [0.388535087, 0.054921382, -0.743402928, 0.441955127, 4.336973341, 0.258518454, 0.272087367, 0.174042493, -0.021246185];
    return dot(cos([structuralBasis[0] * pos[0] + structuralBasis[3] * pos[1] + structuralBasis[6] * pos[2], structuralBasis[1] * pos[0] + structuralBasis[4] * pos[1] + structuralBasis[7] * pos[2], structuralBasis[2] * pos[0] + structuralBasis[5] * pos[1] + structuralBasis[8] * pos[2]]), sin([dot([phaseShift * pos[0], phaseShift * pos[1], phaseShift * pos[2]], [structuralBasis[0], structuralBasis[1], structuralBasis[2]]), dot([phaseShift * pos[0], phaseShift * pos[1], phaseShift * pos[2]], [structuralBasis[3], structuralBasis[4], structuralBasis[5]]), dot([phaseShift * pos[0], phaseShift * pos[1], phaseShift * pos[2]], [structuralBasis[6], structuralBasis[7], structuralBasis[8]])]));
}
;
function getFilmGrain(seed3D) {
    seed3D = seed3D.slice();
    fract([seed3D[0] * 0.1031, seed3D[1] * 0.1031, seed3D[2] * 0.1031]).reduce((res, el, i) => (res[i] = el, res), seed3D);
    seed3D = [seed3D[0] + dot(seed3D, [seed3D[2] + 31.32, seed3D[1] + 31.32, seed3D[0] + 31.32]), seed3D[1] + dot(seed3D, [seed3D[2] + 31.32, seed3D[1] + 31.32, seed3D[0] + 31.32]), seed3D[2] + dot(seed3D, [seed3D[2] + 31.32, seed3D[1] + 31.32, seed3D[0] + 31.32])];
    return fract((seed3D[0] + seed3D[1]) * seed3D[2]);
}
;
function mainImage(fragColor, fragCoord) {
    fragCoord = fragCoord.slice();
    var finalImage = [0, 0, 0];
    var globalTime = iTime * u_sceneTimeScale;
    for (var passX = 0; passX < 4; passX++) {
        if (passX >= u_renderPasses) {
            break;
        }
        ;
        for (var passY = 0; passY < 4; passY++) {
            if (passY >= u_renderPasses) {
                break;
            }
            ;
            var pixelOffset = [(passX + 0.5) / u_renderPasses - 0.5, (passY + 0.5) / u_renderPasses - 0.5];
            var uv = [fragCoord[0] + pixelOffset[0], fragCoord[1] + pixelOffset[1]];
            var rayOrigin = [u_camPosX, u_camPosY, globalTime];
            var lightAccumulator = [0, 0, 0];
            var viewDir = normalize([u_camFov * uv[0] - iResolution[0] * u_camShiftX, u_camFov * uv[1] - iResolution[1] * u_camShiftY, iResolution[1]]);
            viewDir = [null, 0, 1].map(function (idx, i) { return idx == null ? viewDir[i] : this[idx]; }, [viewDir[1], viewDir[2]].map(function (x, i, v) { var sum = 0; for (var j = 0; j < 2; j++) {
                sum += this[j * 2 + i] * v[j];
            } return sum; }, calcRotation(u_camPitch)));
            var stepDistance = 0;
            for (var iter = 0.0; iter < 100.0; iter += 1.0) {
                if (iter >= u_rayIterations) {
                    break;
                }
                ;
                var samplePos = cloneValue(rayOrigin);
                var detailNoise = (computeStructuralDensity([samplePos[0] * 20.0, samplePos[1] * 20.0, samplePos[2] * 20.0])) / 20.0;
                var baseNoise = computeStructuralDensity(samplePos);
                stepDistance = 0.005 + (abs(detailNoise - baseNoise)) * 0.7;
                var heightMod = (sin(samplePos[2] * 2.0 + abs(samplePos[0]) * 0.5)) * 0.5;
                stepDistance += (abs(rayOrigin[1] + heightMod)) * 0.4;
                var safeStep = stepDistance * u_stepPrecision;
                (rayOrigin[0] += viewDir[0] * safeStep, rayOrigin[1] += viewDir[1] * safeStep, rayOrigin[2] += viewDir[2] * safeStep, rayOrigin);
                var colorPhase = (iter * u_stepPrecision) - 0.4;
                var wavePhase = colorPhase + length([rayOrigin[0] * 0.1, rayOrigin[2] * 0.1]) + 2.0;
                var spectrumShift = [3, 1.5, 0.5];
                var spectralGlow = sin([wavePhase + spectrumShift[0], wavePhase + spectrumShift[1], wavePhase + spectrumShift[2]]).map(function (_) { return 1.5 * _; }).map(function (_) { return 1.0 + _; });
                var rawDensity = 1.0 / stepDistance;
                var sharpDensity = (pow(rawDensity, u_surfaceSolidity)) * 0.15;
                (lightAccumulator[0] += (spectralGlow[0] * sharpDensity) * u_stepPrecision, lightAccumulator[1] += (spectralGlow[1] * sharpDensity) * u_stepPrecision, lightAccumulator[2] += (spectralGlow[2] * sharpDensity) * u_stepPrecision, lightAccumulator);
            }
            ;
            lightAccumulator = [lightAccumulator[0] * u_globalLuminance, lightAccumulator[1] * u_globalLuminance, lightAccumulator[2] * u_globalLuminance];
            applyCinematicGrade([(lightAccumulator[0] * lightAccumulator[0]) / 1000.0, (lightAccumulator[1] * lightAccumulator[1]) / 1000.0, (lightAccumulator[2] * lightAccumulator[2]) / 1000.0]).reduce((res, el, i) => (res[i] += el, res), finalImage);
        }
        ;
    }
    ;
    finalImage = [finalImage[0] * (4.0 / (u_renderPasses * u_renderPasses)), finalImage[1] * (4.0 / (u_renderPasses * u_renderPasses)), finalImage[2] * (4.0 / (u_renderPasses * u_renderPasses))];
    (finalImage[0] = (finalImage[0] - 0.5) * 0.5 + 0.5, finalImage[1] = (finalImage[1] - 0.5) * 0.5 + 0.5, finalImage[2] = (finalImage[2] - 0.5) * 0.5 + 0.5, finalImage);
    finalImage = [finalImage[0] * 0.3, finalImage[1] * 0.3, finalImage[2] * 0.3];
    var grainValue = getFilmGrain([fragCoord[0], fragCoord[1], iTime]);
    finalImage = [finalImage[0] + (grainValue - 0.5) * u_grainIntensity, finalImage[1] + (grainValue - 0.5) * u_grainIntensity, finalImage[2] + (grainValue - 0.5) * u_grainIntensity];
    (fragColor[0] = finalImage[0], fragColor[1] = finalImage[1], fragColor[2] = finalImage[2], fragColor[3] = 1, fragColor);
    mainImage.__out__ = [fragColor];
}
;
function main() {
    (mainImage(outColor, [gl_FragCoord[0], gl_FragCoord[1]]), [outColor] = mainImage.__out__, mainImage.__return__);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
outColor=[0, 0, 0, 0];
main();return Array.from(outColor); };
},
"corrodedSpiral": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uCorrosionZoom = cloneValue(U.uCorrosionZoom);
var uOctaves = cloneValue(U.uOctaves);
var uPersistence = cloneValue(U.uPersistence);
var uLacunarity = cloneValue(U.uLacunarity);
var uSpiralDensity = cloneValue(U.uSpiralDensity);
var uColorShift = cloneValue(U.uColorShift);
var uIntensity = cloneValue(U.uIntensity);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var uResolution = cloneValue(U.uResolution);
var vUv = cloneValue(UV);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function rand(n) {
    n = n.slice();
    return fract((sin(dot(n, [12.9898, 4.1414]))) * 43758.5453);
}
;
function noise(p) {
    p = p.slice();
    var ip = floor(p);
    var u = fract(p);
    (u[0] = (u[0] * u[0]) * (3.0 - 2.0 * u[0]), u[1] = (u[1] * u[1]) * (3.0 - 2.0 * u[1]), u);
    var res = mix(mix(rand(ip), rand([ip[0] + 1, ip[1]]), u[0]), mix(rand([ip[0], ip[1] + 1]), rand([ip[0] + 1, ip[1] + 1]), u[0]), u[1]);
    return res * res;
}
;
var mtx = [0.80, 0.60, -0.60, 0.80];
function fbm(p) {
    p = p.slice();
    var f = 0.0;
    var amp = 1.0;
    var freq = 1.0;
    var time = uTime * uSpeed;
    for (var i = 0.0; i < 8.0; i++) {
        if (i >= uOctaves) {
            break;
        }
        ;
        f += amp * (noise([p[0] * freq + time, p[1] * freq + time]));
        freq *= uLacunarity;
        amp *= uPersistence;
    }
    ;
    return f;
}
;
function main() {
    var uv = cloneValue(vUv);
    var centered = [uv[0] * 2.0 - 1.0, uv[1] * 2.0 - 1.0];
    var angle = atan(centered[1], centered[0]);
    var radius = length(centered);
    var time = uTime * uSpeed;
    var vortexUV = cloneValue(centered);
    vortexUV[0] += (sin(angle * 3.0 + time * 0.5)) * 0.1;
    vortexUV[1] += (cos(angle * 2.0 + time * 0.3)) * 0.1;
    var pattern = fbm([vortexUV[0] * uCorrosionZoom, vortexUV[1] * uCorrosionZoom]);
    pattern = pow(pattern, uIntensity);
    var spiral = sin(angle * uSpiralDensity + radius * (uSpiralDensity * 1.25) - time);
    pattern = mix(pattern, spiral * 0.5 + 0.5, 0.3);
    var color = [pattern, pattern, pattern];
    color[0] += (sin(pattern * 6.28)) * 0.2;
    color[1] += (cos(pattern * 6.28)) * 0.2;
    color[2] += (sin(pattern * 6.28 + 2.0)) * 0.2;
    var hsv = rgb2hsv(color);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), color);
    var vignette = 1.0 - radius * 0.5;
    color = [color[0] * vignette, color[1] * vignette, color[2] * vignette];
    (fragColor[0] = color[0], fragColor[1] = color[1], fragColor[2] = color[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
vUv=cloneValue(UV);
fragColor=[0, 0, 0, 0];
mtx=[0.80, 0.60, -0.60, 0.80];
main();return Array.from(fragColor); };
},
"spiralTunnel": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function radians(degrees) {
    if (degrees.length)
        return degrees.map(radians);
    return degrees * 0.017453292519943295;
}
function tan(angle) {
    if (angle.length)
        return angle.map(tan);
    return Math.tan(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uFlightSpeed = cloneValue(U.uFlightSpeed);
var uFieldOfView = cloneValue(U.uFieldOfView);
var uLuminosity = cloneValue(U.uLuminosity);
var uOpeningSize = cloneValue(U.uOpeningSize);
var uRibbonCount = cloneValue(U.uRibbonCount);
var uRibbonWidth = cloneValue(U.uRibbonWidth);
var uSpiralDensity = cloneValue(U.uSpiralDensity);
var uSpiralCount = cloneValue(U.uSpiralCount);
var uLightIntensity = cloneValue(U.uLightIntensity);
var uDistortion = cloneValue(U.uDistortion);
var uLineColors = cloneValue(U.uLineColors);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function main() {
    var fovFactor = tan(radians(uFieldOfView * 0.5));
    var uv = [((gl_FragCoord[0] * 2.0 - uResolution[0]) / uResolution[1]) * fovFactor, ((gl_FragCoord[1] * 2.0 - uResolution[1]) / uResolution[1]) * fovFactor];
    var r = length(uv);
    var angle = atan(uv[1], uv[0]);
    var openingMask = smoothstep(uOpeningSize * 0.002, uOpeningSize * 0.005, r);
    if (openingMask <= 0.0) {
        (fragColor[0] = 0, fragColor[1] = 0, fragColor[2] = 0, fragColor[3] = 1, fragColor);
        return;
    }
    ;
    var depth = 1.0 / (max(r, 0.001)) + uTime * (uFlightSpeed * 0.1);
    var outColor = [0, 0, 0];
    var ribbons = uRibbonCount / 10.0;
    for (var i = 0; i < 4; i++) {
        if (i >= uSpiralCount) {
            break;
        }
        ;
        var offset = i * (6.28318 / (max(uSpiralCount, 1.0)));
        var stripPattern = (sin(angle * ribbons + depth * uSpiralDensity + offset)) * (cos(depth * uDistortion + i));
        var edgeWidth = uRibbonWidth * 2.0;
        var segmentColor = [uLineColors[i][0] * (smoothstep(0.5 - edgeWidth, 0.5 + edgeWidth, stripPattern)), uLineColors[i][1] * (smoothstep(0.5 - edgeWidth, 0.5 + edgeWidth, stripPattern)), uLineColors[i][2] * (smoothstep(0.5 - edgeWidth, 0.5 + edgeWidth, stripPattern))];
        (outColor[0] += segmentColor[0], outColor[1] += segmentColor[1], outColor[2] += segmentColor[2], outColor);
    }
    ;
    outColor = [outColor[0] * ((uLightIntensity * (1.0 / ((r * (19.0 - uLuminosity)) * 0.1))) * openingMask), outColor[1] * ((uLightIntensity * (1.0 / ((r * (19.0 - uLuminosity)) * 0.1))) * openingMask), outColor[2] * ((uLightIntensity * (1.0 / ((r * (19.0 - uLuminosity)) * 0.1))) * openingMask)];
    var brightness = dot(outColor, [0.2126, 0.7152, 0.0722]);
    if (brightness > 0.3) {
        (outColor[0] += (outColor[0] * 0.3) * (1.15), outColor[1] += (outColor[1] * 0.3) * (1.15), outColor[2] += (outColor[2] * 0.3) * (1.15), outColor);
    }
    ;
    var hsv = rgb2hsv(outColor);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), outColor);
    (fragColor[0] = outColor[0], fragColor[1] = outColor[1], fragColor[2] = outColor[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"fractalVortex": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uTraceSteps = cloneValue(U.uTraceSteps);
var uCameraSpeed = cloneValue(U.uCameraSpeed);
var uFractalSpeed = cloneValue(U.uFractalSpeed);
var uFov = cloneValue(U.uFov);
var uFractalScale = cloneValue(U.uFractalScale);
var uTurbulence = cloneValue(U.uTurbulence);
var uBoxSize = cloneValue(U.uBoxSize);
var uGlowStrength = cloneValue(U.uGlowStrength);
var uGlowWidth = cloneValue(U.uGlowWidth);
var uMirrorTileSize = cloneValue(U.uMirrorTileSize);
var uWallNormalScale = cloneValue(U.uWallNormalScale);
var uSoftTint = cloneValue(U.uSoftTint);
var uCoreTint = cloneValue(U.uCoreTint);
var uBackgroundColor = cloneValue(U.uBackgroundColor);
var uExposure = cloneValue(U.uExposure);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var uContrast = cloneValue(U.uContrast);
var uColor1 = cloneValue(U.uColor1);
var uColor2 = cloneValue(U.uColor2);
var uColor3 = cloneValue(U.uColor3);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
var TUNNEL_HALF_SIZE = [4.6, 2.15];
var COLOR_OFFSET = [-0.75, 0.409, 1.31];
function buildTransformAxis(time) {
    var axisPhase = [5 + time * 0.25, time * 0.25, 1 + time * 0.25];
    return normalize(cos(axisPhase));
}
;
function transformPoint(point, axis) {
    point = point.slice();
    axis = axis.slice();
    return vec3.subtract([], [axis[0] * (dot(axis, point)), axis[1] * (dot(axis, point)), axis[2] * (dot(axis, point))], cross(axis, point));
}
;
function sampleLightField(point, axis, time, animationPhase) {
    point = point.slice();
    axis = axis.slice();
    var basePoint = transformPoint(point, axis);
    var distortedPoint = cloneValue(basePoint);
    var frequency = cloneValue(uFractalScale);
    var cells = floor([distortedPoint[0] * frequency + 0.5, distortedPoint[1] * frequency + 0.5, distortedPoint[2] * frequency + 0.5]);
    new Float32Array([2, 0, 1].map(function (x, i) { return this[x]; }, sin([cells[0] + time, cells[1] + time, cells[2] + time]))).map(function (_) { return _ * (uTurbulence / (max(frequency, 0.0001))); }).map(function (_) { return _ * 0.6; }).reduce((res, el, i) => (res[i] -= el, res), distortedPoint);
    animationPhase = distortedPoint[1] + time;
    var boxPoint = abs(basePoint);
    var boxField = max(boxPoint[0], max(boxPoint[1], boxPoint[2])) - uBoxSize;
    var foldedField = max(boxField, -boxField * 0.2);
    var animatedSurface = 0.2 * abs(cos(animationPhase));
    sampleLightField.__return__ = foldedField + animatedSurface;
    sampleLightField.__out__ = [animationPhase];
    return sampleLightField.__return__;
}
;
function computeFieldGlow(fieldValue) {
    return uGlowStrength / (uGlowWidth + fieldValue * fieldValue + 0.0001);
}
;
function mirroredTileCoordinate(coordinate, tileSize) {
    var safeTileSize = max(tileSize, 0.001);
    var doubleTile = safeTileSize * 2.0;
    var localCoordinate = mod(abs(coordinate), doubleTile);
    return 1.0 - (abs(localCoordinate - safeTileSize)) / safeTileSize;
}
;
function getTunnelSurfaceData(point) {
    point = point.slice();
    var signedVerticalWall = abs(point[0]) - TUNNEL_HALF_SIZE[0];
    var signedHorizontalWall = abs(point[1]) - TUNNEL_HALF_SIZE[1];
    var verticalDistance = abs(signedVerticalWall);
    var horizontalDistance = abs(signedHorizontalWall);
    var wallDistance = 0;
    var normalCoordinate = 0;
    var tangentCoordinate = 0;
    if (verticalDistance < horizontalDistance) {
        wallDistance = verticalDistance;
        normalCoordinate = signedVerticalWall * uWallNormalScale;
        tangentCoordinate = point[1];
    }
    else {
        wallDistance = horizontalDistance;
        normalCoordinate = signedHorizontalWall * uWallNormalScale;
        tangentCoordinate = point[0];
    }
    ;
    var mirrorCoordinate = mirroredTileCoordinate(tangentCoordinate, uMirrorTileSize);
    return [wallDistance, normalCoordinate, mirrorCoordinate];
}
;
function computeEmissionColor(phase, time, fieldGlow) {
    var colorPhase = phase - time * 0.3;
    var originalPalette = cos([colorPhase + COLOR_OFFSET[0], colorPhase + COLOR_OFFSET[1], colorPhase + COLOR_OFFSET[2]]).map(function (_) { return _ + 1.1; });
    var coreMix = clamp(fieldGlow * 0.22, 0.0, 1.0);
    var tint = mix(uSoftTint, uCoreTint, coreMix);
    return [originalPalette[0] * tint[0], originalPalette[1] * tint[1], originalPalette[2] * tint[2]];
}
;
function computeWallDensity(wallDistance, mirrorCoordinate, repeatedDepth, fieldGlow) {
    var squaredDistance = wallDistance * wallDistance;
    var softWall = 1.0 / (1.0 + squaredDistance * 120.0);
    var sharpWall = 1.2 / (1.0 + squaredDistance * 1400.0);
    var reflectionPattern = 0.55 + 0.45 * (cos(mirrorCoordinate * 10.0 + repeatedDepth * 0.45));
    var density = softWall * (0.08 + fieldGlow * 0.76);
    density += sharpWall * (0.14 + fieldGlow * 3.4);
    density *= 0.81 + reflectionPattern * 0.16;
    return density;
}
;
function computeDepthAttenuation(distanceFromCamera) {
    return 1.0 / (1.0 + distanceFromCamera * 0.06 + (distanceFromCamera * distanceFromCamera) * 0.0025);
}
;
function renderTunnel(rayOrigin, rayDirection, animationTime) {
    rayOrigin = rayOrigin.slice();
    rayDirection = rayDirection.slice();
    var accumulatedLight = [0, 0, 0];
    var transformAxis = buildTransformAxis(animationTime);
    var travelDistance = 2.86;
    var steps = min(uTraceSteps, 128);
    for (var stepIndex = 0; stepIndex < 128; stepIndex++) {
        if (stepIndex >= steps) {
            break;
        }
        ;
        var samplePoint = [rayOrigin[0] + rayDirection[0] * travelDistance, rayOrigin[1] + rayDirection[1] * travelDistance, rayOrigin[2] + rayDirection[2] * travelDistance];
        var surfaceData = getTunnelSurfaceData([samplePoint[0], samplePoint[1]]);
        var wallDistance = cloneValue(surfaceData[0]);
        var normalCoordinate = cloneValue(surfaceData[1]);
        var mirrorCoordinate = surfaceData[2] * 2.0 - 1.0;
        var repeatedDepth = mod(samplePoint[2] + 3.1, 10.0) - 5.0;
        var fieldPoint = [normalCoordinate, mirrorCoordinate * 2.8, repeatedDepth * 0.82];
        var animationPhase = 0;
        var fieldValue = (sampleLightField(fieldPoint, transformAxis, animationTime, animationPhase), [animationPhase] = sampleLightField.__out__, sampleLightField.__return__);
        var fieldGlow = computeFieldGlow(fieldValue);
        var emissionColor = computeEmissionColor(animationPhase, animationTime, fieldGlow);
        var wallDensity = computeWallDensity(wallDistance, mirrorCoordinate, repeatedDepth, fieldGlow);
        var depthAttenuation = computeDepthAttenuation(travelDistance);
        (accumulatedLight[0] += ((emissionColor[0] * wallDensity) * depthAttenuation) * 0.09, accumulatedLight[1] += ((emissionColor[1] * wallDensity) * depthAttenuation) * 0.09, accumulatedLight[2] += ((emissionColor[2] * wallDensity) * depthAttenuation) * 0.09, accumulatedLight);
        if ((dot(accumulatedLight, [0.333, 0.333, 0.333])) > 4.5) {
            break;
        }
        ;
        travelDistance += 0.15 - travelDistance * 0.0008;
    }
    ;
    return accumulatedLight;
}
;
function renderScene(fragCoord, resolution) {
    fragCoord = fragCoord.slice();
    resolution = resolution.slice();
    var screenPosition = [(fragCoord[0] * 2.0 - resolution[0]) / resolution[1], (fragCoord[1] * 2.0 - resolution[1]) / resolution[1]];
    var animationTime = uTime * uFractalSpeed;
    var cameraOrigin = [0, 0, uTime * uCameraSpeed];
    var cameraDirection = normalize([screenPosition[0], screenPosition[1] * 1.19, uFov]);
    var color = renderTunnel(cameraOrigin, cameraDirection, animationTime);
    var distanceFromCenter = length(screenPosition);
    var blackOpening = smoothstep(-0.04, 0.1, distanceFromCenter);
    color = [color[0] * blackOpening, color[1] * blackOpening, color[2] * blackOpening];
    exp([-color[0] * uExposure, -color[1] * uExposure, -color[2] * uExposure]).map(function (_) { return 1.0 - _; }).reduce((res, el, i) => (res[i] = el, res), color);
    pow(color, [max(uContrast, 0.001), max(uContrast, 0.001), max(uContrast, 0.001)]).reduce((res, el, i) => (res[i] = el, res), color);
    var hsv = rgb2hsv(max(color, [0, 0, 0]));
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), color);
    mix(uBackgroundColor, color, blackOpening).reduce((res, el, i) => (res[i] = el, res), color);
    var tintMix = clamp(blackOpening, 0.0, 1.0);
    var balatroTint = [uColor1[0] * (1.0 - tintMix) + uColor2[0] * (tintMix * 0.5) + uColor3[0] * (tintMix * 0.5), uColor1[1] * (1.0 - tintMix) + uColor2[1] * (tintMix * 0.5) + uColor3[1] * (tintMix * 0.5), uColor1[2] * (1.0 - tintMix) + uColor2[2] * (tintMix * 0.5) + uColor3[2] * (tintMix * 0.5)];
    mix(color, balatroTint, 0.15).reduce((res, el, i) => (res[i] = el, res), color);
    return color;
}
;
function main() {
    var color = renderScene([gl_FragCoord[0], gl_FragCoord[1]], uResolution);
    (fragColor[0] = color[0], fragColor[1] = color[1], fragColor[2] = color[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
TUNNEL_HALF_SIZE=[4.6, 2.15];
COLOR_OFFSET=[-0.75, 0.409, 1.31];
main();return Array.from(fragColor); };
},
"infiniteCorridor": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function vec2(x, y) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    return [x, y];
}
vec2.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function radians(degrees) {
    if (degrees.length)
        return degrees.map(radians);
    return degrees * 0.017453292519943295;
}
function tan(angle) {
    if (angle.length)
        return angle.map(tan);
    return Math.tan(angle);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
var fragColor = [0, 0, 0, 0];
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var uFloorY = cloneValue(U.uFloorY);
var uApexY = cloneValue(U.uApexY);
var uHalfWidth = cloneValue(U.uHalfWidth);
var uFocalLength = cloneValue(U.uFocalLength);
var uFogDensity = cloneValue(U.uFogDensity);
var uFractalTimeScale = cloneValue(U.uFractalTimeScale);
var uTrailTimeScale = cloneValue(U.uTrailTimeScale);
var uFractalScale = cloneValue(U.uFractalScale);
var uFractalScroll = cloneValue(U.uFractalScroll);
var uFractalLevels = cloneValue(U.uFractalLevels);
var uLineWidthNear = cloneValue(U.uLineWidthNear);
var uLineWidthFar = cloneValue(U.uLineWidthFar);
var uLineSoftness = cloneValue(U.uLineSoftness);
var uCameraSpeed = cloneValue(U.uCameraSpeed);
var uCameraPosition = cloneValue(U.uCameraPosition);
var uCameraSway = cloneValue(U.uCameraSway);
var uSeamStrength = cloneValue(U.uSeamStrength);
var uTrailBrightness = cloneValue(U.uTrailBrightness);
var uKaleidoscopeSpeed = cloneValue(U.uKaleidoscopeSpeed);
var uFateSpeed = cloneValue(U.uFateSpeed);
var uMirrors = cloneValue(U.uMirrors);
var uNoiseStrength = cloneValue(U.uNoiseStrength);
var uDistortionStrength = cloneValue(U.uDistortionStrength);
var u_useFilter = cloneValue(U.u_useFilter);
var u_filterColor = cloneValue(U.u_filterColor);
var uLightColor = cloneValue(U.uLightColor);
var uGlowColor = cloneValue(U.uGlowColor);
var uSubstrateColor = cloneValue(U.uSubstrateColor);
var uBackgroundColor = cloneValue(U.uBackgroundColor);
var PI = 3.14159265359;
var TAU = 6.28318530718;
var FAR_DISTANCE = 1000.0;
function hash21(p) {
    p = p.slice();
    fract([p[0] * 123.34, p[1] * 345.44]).reduce((res, el, i) => (res[i] = el, res), p);
    p = [p[0] + dot(p, [p[0] + 34.345, p[1] + 34.345]), p[1] + dot(p, [p[0] + 34.345, p[1] + 34.345])];
    return fract(p[0] * p[1]);
}
;
function hash13(p3) {
    p3 = p3.slice();
    fract([p3[0] * .1031, p3[1] * .1031, p3[2] * .1031]).reduce((res, el, i) => (res[i] = el, res), p3);
    p3 = [p3[0] + dot(p3, [p3[2] + 31.32, p3[1] + 31.32, p3[0] + 31.32]), p3[1] + dot(p3, [p3[2] + 31.32, p3[1] + 31.32, p3[0] + 31.32]), p3[2] + dot(p3, [p3[2] + 31.32, p3[1] + 31.32, p3[0] + 31.32])];
    return fract((p3[0] + p3[1]) * p3[2]);
}
;
function randomGradient(p) {
    p = p.slice();
    var the = hash13(p) * TAU;
    var phi = (hash13([p[0] + 3, p[1] + 2, p[2] + 1])) * TAU;
    return [sin(the) * cos(phi), sin(the) * sin(phi), cos(the)];
}
;
function noise(p) {
    p = p.slice();
    var i = floor(p);
    var f = fract(p);
    var g000 = randomGradient([i[0], i[1], i[2]]);
    var g100 = randomGradient([i[0] + 1, i[1], i[2]]);
    var g010 = randomGradient([i[0], i[1] + 1, i[2]]);
    var g001 = randomGradient([i[0], i[1], i[2] + 1]);
    var g011 = randomGradient([i[0], i[1] + 1, i[2] + 1]);
    var g101 = randomGradient([i[0] + 1, i[1], i[2] + 1]);
    var g110 = randomGradient([i[0] + 1, i[1] + 1, i[2]]);
    var g111 = randomGradient([i[0] + 1, i[1] + 1, i[2] + 1]);
    var v000 = dot(g000, [f[0], f[1], f[2]]);
    var v100 = dot(g100, [f[0] - 1, f[1], f[2]]);
    var v010 = dot(g010, [f[0], f[1] - 1, f[2]]);
    var v001 = dot(g001, [f[0], f[1], f[2] - 1]);
    var v011 = dot(g011, [f[0], f[1] - 1, f[2] - 1]);
    var v101 = dot(g101, [f[0] - 1, f[1], f[2] - 1]);
    var v110 = dot(g110, [f[0] - 1, f[1] - 1, f[2]]);
    var v111 = dot(g111, [f[0] - 1, f[1] - 1, f[2] - 1]);
    var u = [((f[0] * f[0]) * f[0]) * (f[0] * (f[0] * 6.0 - 15.0) + 10.0), ((f[1] * f[1]) * f[1]) * (f[1] * (f[1] * 6.0 - 15.0) + 10.0), ((f[2] * f[2]) * f[2]) * (f[2] * (f[2] * 6.0 - 15.0) + 10.0)];
    return mix(mix(mix(v000, v100, u[0]), mix(v010, v110, u[0]), u[1]), mix(mix(v001, v101, u[0]), mix(v011, v111, u[0]), u[1]), u[2]);
}
;
function fbm(p) {
    p = p.slice();
    var amp = 1.;
    var fre = 1.;
    var n = 0.;
    for (var i = 0.; i < 4.; i++) {
        n += (noise([fre * p[0], fre * p[1], fre * p[2]])) * amp;
        amp *= .5;
        fre *= 2.;
    }
    ;
    return n;
}
;
function fbmWrap(p) {
    p = p.slice();
    var q = [fbm([p[0] + 13.24, p[1] + 42.74, p[2] + 44.32]), fbm([p[0] + 51.16, p[1] + 17.93, p[2] + 98.23]), fbm([p[0] + 43.46, p[1] + 85.43, p[2] + 64.91])];
    return fbm(q);
}
;
function snoise(v) {
    v = v.slice();
    return fract((sin(dot(v, [12.9898, 78.233]))) * 43758.5453123);
}
;
function sdBox2D(p, b) {
    p = p.slice();
    b = b.slice();
    var d = vec2.subtract([], abs(p), b);
    return length(max(d, 0.0)) + min(max(d[0], d[1]), 0.0);
}
;
function sdSegment2D(p, a, b) {
    p = p.slice();
    a = a.slice();
    b = b.slice();
    var pa = [p[0] - a[0], p[1] - a[1]];
    var ba = [b[0] - a[0], b[1] - a[1]];
    var h = clamp((dot(pa, ba)) / (dot(ba, ba)), 0.0, 1.0);
    return length([pa[0] - ba[0] * h, pa[1] - ba[1] * h]);
}
;
function lineMask(distanceToLine, width) {
    return 1.0 - smoothstep(width, width + uLineSoftness, distanceToLine);
}
;
function periodicDistance(a, b) {
    var d = abs(a - b);
    return min(d, 1.0 - d);
}
;
function movingTrailOnSegment(p, a, b, width, trailTime, speed, phase, direction) {
    p = p.slice();
    a = a.slice();
    b = b.slice();
    var ba = [b[0] - a[0], b[1] - a[1]];
    var segmentLength = max(length(ba), 0.0001);
    var axis = [ba[0] / segmentLength, ba[1] / segmentLength];
    var pa = [p[0] - a[0], p[1] - a[1]];
    var projection = clamp(dot(pa, axis), 0.1, segmentLength);
    var distanceToSegment = length([pa[0] - axis[0] * projection, pa[1] - axis[1] * projection]);
    var line = 1.0 - smoothstep(width, width + 0.008, distanceToSegment);
    var u = projection / segmentLength;
    var flow = fract(direction * u - trailTime * speed + phase);
    var headDistance = periodicDistance(flow, 0.0);
    var tailDistance = periodicDistance(flow, -0.325);
    var sparkDistance = periodicDistance(flow, 0.53);
    var head = exp((-190.0 * headDistance) * headDistance);
    var tail = 0.50 * (exp((-72.0 * tailDistance) * tailDistance));
    var spark = 0.32 * (exp((-260.0 * sparkDistance) * sparkDistance));
    return line * (clamp(head + tail + spark, 0.0, 1.0));
}
;
function movingTrailOnBox(p, halfSize, width, trailTime, speed, phase, direction) {
    p = p.slice();
    halfSize = halfSize.slice();
    var topLeft = [-halfSize[0], halfSize[1]];
    var topRight = [halfSize[0], halfSize[1]];
    var bottomRight = [halfSize[0], -halfSize[1]];
    var bottomLeft = [-halfSize[0], -halfSize[1]];
    var trail = 0.0;
    trail += movingTrailOnSegment(p, topLeft, topRight, width, trailTime, speed, phase, direction);
    trail += movingTrailOnSegment(p, topRight, bottomRight, width, trailTime, speed, phase + 0.07, direction);
    trail += movingTrailOnSegment(p, bottomRight, bottomLeft, width, trailTime, speed, phase + 0.19, direction);
    trail += movingTrailOnSegment(p, bottomLeft, topLeft, width, trailTime, speed, phase + 0.32, direction);
    return clamp(trail, 0.0, 1.0);
}
;
function cyberPalette(position, accent) {
    var blendA = 1.1 + 0.1 * (sin(position * 0.22));
    var blendB = 0.5 + 0.5 * (sin(position * 0.81 + 1.3));
    var dynamicBase = [0.02, 0.02, 0.07];
    var neon = mix(dynamicBase, [0.137, 0.373, 0.624], blendA);
    mix(neon, [0.12, 0.88, 1], accent * 0.71 + blendB * 0.14).reduce((res, el, i) => (res[i] = el, res), neon);
    return mix([0, 0, 0], mix([uSubstrateColor[0], uSubstrateColor[1], uSubstrateColor[2]], neon, 0.29), 1.39);
}
;
function renderInterestingFractal(surfacePosition, geometryTime, trailTime) {
    surfacePosition = surfacePosition.slice();
    var fateT = geometryTime * uFateSpeed;
    var kFate = 0.8;
    var fateCoord = [kFate * sin(surfacePosition[0]), kFate * cos(surfacePosition[0]), surfacePosition[1] - fateT * 1.2];
    var fateNoiseVal = fbmWrap(fateCoord);
    surfacePosition[0] += fateNoiseVal * uNoiseStrength;
    surfacePosition[1] += (sin(fateNoiseVal * PI)) * uDistortionStrength;
    var p = [surfacePosition[0] * uFractalScale[0], surfacePosition[1] * uFractalScale[1]];
    p[1] -= geometryTime * uFractalScroll;
    var recursiveP = cloneValue(p);
    var core = 0.0;
    var halo = 0.0;
    var trailLight = 0.0;
    var colorIndex = 0.0;
    for (var level = 0; level < 6; level++) {
        if (level >= uFractalLevels) {
            break;
        }
        ;
        var levelF = cloneValue(level);
        var cellId = floor(recursiveP);
        var q = fract(recursiveP).map(function (_) { return _ - 0.5; });
        var randomValue = hash21([cellId[0] + levelF * 18.94, cellId[1] + levelF * 18.94]);
        var randomB = hash21([cellId[1] + levelF * 37.11 + 4.7, cellId[0] + levelF * 37.11 + 4.7]);
        var randomD = hash21([cellId[1] + levelF * 7.43 + 17.6, cellId[0] + levelF * 7.43 + 17.6]);
        if (randomValue > 0.2) {
            assignComponents(q, [0, 1], [q[1], q[0]]);
        }
        ;
        q[0] *= randomB > 0.3 ? 1.0 : -1.0;
        q[1] *= (fract(randomValue * 4.31)) > 0.5 ? 1.0 : -1.0;
        var levelWeight = exp(-0.17 * levelF);
        var lineWidth = mix(uLineWidthNear, uLineWidthFar, levelF / 5.0);
        var microWidth = lineWidth * 0.52;
        var frameDistance = abs(sdBox2D(q, [0.355, 0.355]));
        var frame = lineMask(frameDistance, lineWidth);
        var innerFrameDistance = abs(sdBox2D(q, [0.235, 0.235]));
        var innerFrame = lineMask(innerFrameDistance, microWidth * 0.85);
        var horizontalGap = smoothstep(0.055, 0.105, abs(q[1]));
        var verticalGap = smoothstep(0.045, 0.095, abs(q[0]));
        frame *= (randomValue > 0.5 ? horizontalGap : verticalGap);
        var corner = [0.355, 0.355];
        var bend = [0.0, 0.355];
        var terminal = [0.0, 0.045];
        if (randomB > 0.5) {
            (bend[0] = 0.355, bend[1] = 0, bend);
            (terminal[0] = 0.045, terminal[1] = 0, terminal);
        }
        ;
        var traceA = lineMask(sdSegment2D(q, corner, bend), lineWidth * 0.72);
        var traceB = lineMask(sdSegment2D(q, bend, terminal), lineWidth * 0.72);
        var trace = max(traceA, traceB);
        var terminalDistance = abs(sdBox2D([q[0] - terminal[0], q[1] - terminal[1]], [0.034, 0.034]));
        var terminalMask = lineMask(terminalDistance, lineWidth * 0.68);
        var visibility = 1.0;
        if (level == 3) {
            visibility = step(0.34, randomValue);
        }
        ;
        if (level == 4) {
            visibility = step(0.58, randomValue);
        }
        ;
        var structure = ((frame * 0.80 + innerFrame * 0.34 + trace + terminalMask * 1.24) * levelWeight) * visibility;
        var directionMain = randomValue > 0.5 ? 1.0 : -1.0;
        var directionFrame = randomD > 0.5 ? 1.0 : -1.0;
        var frameTrail = movingTrailOnBox(q, [0.425, 0.425], lineWidth * 0.92, trailTime, 0.24 + levelF * 0.022, randomValue * 0.81, directionFrame);
        var bigTrail = frameTrail * 0.60;
        bigTrail += movingTrailOnSegment(q, corner, bend, lineWidth * 0.95, trailTime, 0.38 + levelF * 0.028, randomValue * 0.73, directionMain);
        core += structure;
        halo += structure * (mix(0.72, 0.25, levelF / 4.0));
        trailLight += (bigTrail * levelWeight) * visibility;
        colorIndex += randomValue * structure;
        var offset = [randomValue > 0.5 ? 0.37 : -0.37, randomB > 0.5 ? 0.29 : -0.29];
        (recursiveP[0] = recursiveP[0] * 2.02 + offset[0], recursiveP[1] = recursiveP[1] * 2.02 + offset[1], recursiveP);
    }
    ;
    core = clamp(core, 0.0, 0.9);
    halo = clamp(halo, 0.0, 3.6);
    trailLight = clamp(trailLight, 0.0, 1.6);
    var normalizedColorIndex = colorIndex / (max(core, 0.001));
    var accent = clamp(trailLight * 0.95, 0.0, 1.0);
    var neon = cyberPalette(surfacePosition[1] * 0.22 + normalizedColorIndex * 2.4, accent);
    var beamSnoise = (snoise([surfacePosition[0] + geometryTime * 0.1, surfacePosition[1] + geometryTime * 0.1])) * uNoiseStrength;
    var structuredBeam = abs(1.0 / (30.0 * (p[0] - 0.5))) + beamSnoise;
    var color = [uSubstrateColor[0] * (1.0 - core) + (neon[0] * core) * 0.86 + (neon[0] * halo) * 0.16 + (0.28 * trailLight) * uTrailBrightness, uSubstrateColor[1] * (1.0 - core) + (neon[1] * core) * 0.86 + (neon[1] * halo) * 0.16 + (0.72 * trailLight) * uTrailBrightness, uSubstrateColor[2] * (1.0 - core) + (neon[2] * core) * 0.86 + (neon[2] * halo) * 0.16 + trailLight * uTrailBrightness];
    (color[0] += structuredBeam * 0.15, color[1] += structuredBeam * 0.15, color[2] += structuredBeam * 0.15, color);
    if (u_useFilter) {
        (color[0] *= u_filterColor[0], color[1] *= u_filterColor[1], color[2] *= u_filterColor[2], color);
    }
    ;
    return color;
}
;
function intersectCorridorPlane(rayOrigin, rayDirection, inwardNormal, planeOffset) {
    rayOrigin = rayOrigin.slice();
    rayDirection = rayDirection.slice();
    inwardNormal = inwardNormal.slice();
    var originDistance = dot(inwardNormal, rayOrigin) + planeOffset;
    var denominator = dot(inwardNormal, rayDirection);
    if (denominator >= -0.00001) {
        return FAR_DISTANCE;
    }
    ;
    var distance = -originDistance / denominator;
    return distance > 0.0 ? distance : FAR_DISTANCE;
}
;
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function main() {
    var fovFactor = tan(radians(45));
    var uv = [((gl_FragCoord[0] * 2.0 - uResolution[0]) / uResolution[1]) * fovFactor, ((gl_FragCoord[1] * 2.0 - uResolution[1]) / uResolution[1]) * fovFactor];
    var uv0 = cloneValue(uv);
    for (var i = 0.0; i < 4.0; i++) {
        if (i >= uMirrors) {
            break;
        }
        ;
        fract([uv[0] * 1.5, uv[1] * 1.5]).map(function (_) { return _ - 0.5; }).reduce((res, el, i) => (res[i] = el, res), uv);
        var kDist = length(uv) * exp(-length(uv0));
        kDist = (sin(kDist * 8.0 + uTime * uKaleidoscopeSpeed)) / 8.0;
        uv = [uv[0] + abs(kDist), uv[1] + abs(kDist)];
    }
    ;
    var time = cloneValue(uTime);
    var rayOrigin = [uCameraPosition[0] + (sin(time * 0.18)) * uCameraSway[0], uCameraPosition[1], uCameraPosition[2] + time * uCameraSpeed];
    var cameraTarget = [rayOrigin[0], rayOrigin[1] + 0.028, rayOrigin[2] + 1];
    var forward = normalize([cameraTarget[0] - rayOrigin[0], cameraTarget[1] - rayOrigin[1], cameraTarget[2] - rayOrigin[2]]);
    var right = normalize(cross([0, 1, 0], forward));
    var up = normalize(cross(forward, right));
    var rayDirection = normalize([forward[0] * uFocalLength + right[0] * uv[0] + up[0] * uv[1], forward[1] * uFocalLength + right[1] * uv[0] + up[1] * uv[1], forward[2] * uFocalLength + right[2] * uv[0] + up[2] * uv[1]]);
    var corridorHeight = uApexY - uFloorY;
    var slope = uHalfWidth / corridorHeight;
    var leftNormalUnnormalized = [1, -slope, 0];
    var rightNormalUnnormalized = [-1, -slope, 0];
    var sideOffset = uHalfWidth + slope * uFloorY;
    var floorDistance = intersectCorridorPlane(rayOrigin, rayDirection, [0, 1, 0], -uFloorY);
    var leftDistance = intersectCorridorPlane(rayOrigin, rayDirection, leftNormalUnnormalized, sideOffset);
    var rightDistance = intersectCorridorPlane(rayOrigin, rayDirection, rightNormalUnnormalized, sideOffset);
    var hitDistance = cloneValue(floorDistance);
    var surfaceID = 0.0;
    var surfaceNormal = [0, 1, 0];
    if (leftDistance < hitDistance) {
        hitDistance = leftDistance;
        surfaceID = 1.0;
        normalize(leftNormalUnnormalized).reduce((res, el, i) => (res[i] = el, res), surfaceNormal);
    }
    ;
    if (rightDistance < hitDistance) {
        hitDistance = rightDistance;
        surfaceID = 2.0;
        normalize(rightNormalUnnormalized).reduce((res, el, i) => (res[i] = el, res), surfaceNormal);
    }
    ;
    if (hitDistance >= FAR_DISTANCE) {
        (fragColor[0] = uBackgroundColor[0], fragColor[1] = uBackgroundColor[1], fragColor[2] = uBackgroundColor[2], fragColor[3] = uBackgroundColor[3], fragColor);
        return;
    }
    ;
    var hitPosition = [rayOrigin[0] + rayDirection[0] * hitDistance, rayOrigin[1] + rayDirection[1] * hitDistance, rayOrigin[2] + rayDirection[2] * hitDistance];
    var wallLength = length([uHalfWidth, corridorHeight]);
    var surfaceU = 0.0;
    if (surfaceID < 0.5) {
        surfaceU = hitPosition[0];
    }
    else {
        if (surfaceID < 1.5) {
            surfaceU = dot([hitPosition[0] - -uHalfWidth, hitPosition[1] - uFloorY], normalize([uHalfWidth, corridorHeight])) - wallLength * 0.5;
        }
        else {
            surfaceU = dot([hitPosition[0] - uHalfWidth, hitPosition[1] - uFloorY], normalize([-uHalfWidth, corridorHeight])) - wallLength * 0.7;
        }
        ;
    }
    ;
    var fractalColor = renderInterestingFractal([surfaceU, hitPosition[2]], time * uFractalTimeScale, time * uTrailTimeScale);
    var facing = max(dot(surfaceNormal, normalize([rayOrigin[0] - hitPosition[0], rayOrigin[1] - hitPosition[1], rayOrigin[2] - hitPosition[2]])), 0.0);
    var color = [fractalColor[0] * (0.61 + -0.59 * facing) + -0.05 + (fractalColor[0] * (pow(clamp(1.0 - facing, 0.0, 1.0), 3.5))) * 0.08, fractalColor[1] * (0.61 + -0.59 * facing) + -0.02 + (fractalColor[1] * (pow(clamp(1.0 - facing, 0.0, 1.0), 3.5))) * 0.08, fractalColor[2] * (0.61 + -0.59 * facing) + 0.01 + (fractalColor[2] * (pow(clamp(1.0 - facing, 0.0, 1.0), 3.5))) * 0.08];
    var seamDistance = (surfaceID < 0.5) ? min((hitPosition[0] - -uHalfWidth), (hitPosition[0] - uHalfWidth)) : hitPosition[1] - uFloorY;
    mix([0.18, 0.03, 0.26], [0.02, 0.32, 0.52], 0.96).map(function (_) { return _ * this; }, exp((-max(seamDistance, -2.0)) * 6.9)).map(function (_) { return _ * uSeamStrength; }).reduce((res, el, i) => (res[i] += el, res), color);
    var farGlowColor = mix([uLightColor[0], uLightColor[1], uLightColor[2]], [uGlowColor[0], uGlowColor[1], uGlowColor[2]], 0.14);
    mix(farGlowColor, color, exp(-hitDistance * uFogDensity)).reduce((res, el, i) => (res[i] = el, res), color);
    var hsv = rgb2hsv(color);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), color);
    (fragColor[0] = color[0], fragColor[1] = color[1], fragColor[2] = color[2], fragColor[3] = uLightColor[3], fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
PI=3.14159265359;
TAU=6.28318530718;
FAR_DISTANCE=1000.0;
main();return Array.from(fragColor); };
},
"spaceFlower": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.multiply = function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function sign(x) {
    if (x.length)
        return x.map(sign);
    return Math.sign(x);
}
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function transpose(m) {
    var l = m.length === 16 ? 4 : m.length === 9 ? 3 : 2;
    var out = Array(m.length);
    for (var i = 0; i < l; i++) {
        for (var j = 0; j < l; j++) {
            out[j * l + i] = m[i * l + j];
        }
    }
    return out;
}
function sqrt(x) {
    if (x.length)
        return x.map(sqrt);
    return Math.sqrt(x);
}
function exp2(x) {
    if (x.length)
        return x.map(exp2);
    return Math.pow(2, x);
}
function log2(x) {
    if (x.length)
        return x.map(log2);
    return Math.log2(x);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uColorBack = cloneValue(U.uColorBack);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uBandCount = cloneValue(U.uBandCount);
var uTwist = cloneValue(U.uTwist);
var uCenter = cloneValue(U.uCenter);
var uProportion = cloneValue(U.uProportion);
var uSoftness = cloneValue(U.uSoftness);
var uNoise = cloneValue(U.uNoise);
var uNoiseFrequency = cloneValue(U.uNoiseFrequency);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var uOpacity = cloneValue(U.uOpacity);
var uSymmetry = cloneValue(U.uSymmetry);
var fragColor = [0, 0, 0, 0];
var zoom = 1.925999;
function permute(x) {
    x = x.slice();
    return mod([((x[0] * 34.0) + 1.0) * x[0], ((x[1] * 34.0) + 1.0) * x[1], ((x[2] * 34.0) + 1.0) * x[2]], 289.0);
}
;
function snoise(v) {
    v = v.slice();
    var C = [0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439];
    var i = floor([v[0] + dot(v, [C[1], C[1]]), v[1] + dot(v, [C[1], C[1]])]);
    var x0 = [v[0] - i[0] + dot(i, [C[0], C[0]]), v[1] - i[1] + dot(i, [C[0], C[0]])];
    var i1 = (x0[0] > x0[1]) ? [1.0, 0.0] : [0.0, 1.0];
    var x12 = [x0[0] + C[0], x0[1] + C[0], x0[0] + C[2], x0[1] + C[2]];
    x12 = [x12[0] - i1[0], x12[1] - i1[1], x12[2], x12[3]];
    mod(i, 289.0).reduce((res, el, i) => (res[i] = el, res), i);
    var p = permute(vec3.add([], permute([i[1], i[1] + i1[1], i[1] + 1]).map(function (_) { return _ + i[0]; }), [0, i1[0], 1]));
    var m = max([0.5 - dot(x0, x0), 0.5 - dot([x12[0], x12[1]], [x12[0], x12[1]]), 0.5 - dot([x12[2], x12[3]], [x12[2], x12[3]])], 0.0);
    (m[0] = m[0] * m[0], m[1] = m[1] * m[1], m[2] = m[2] * m[2], m);
    (m[0] = m[0] * m[0], m[1] = m[1] * m[1], m[2] = m[2] * m[2], m);
    var x = fract([p[0] * C[3], p[1] * C[3], p[2] * C[3]]).map(function (_) { return 2.0 * _; }).map(function (_) { return _ - 1.0; });
    var h = abs(x).map(function (_) { return _ - 0.5; });
    var ox = floor([x[0] + 0.5, x[1] + 0.5, x[2] + 0.5]);
    var a0 = [x[0] - ox[0], x[1] - ox[1], x[2] - ox[2]];
    (m[0] *= 1.79284291400159 - 0.85373472095314 * (a0[0] * a0[0] + h[0] * h[0]), m[1] *= 1.79284291400159 - 0.85373472095314 * (a0[1] * a0[1] + h[1] * h[1]), m[2] *= 1.79284291400159 - 0.85373472095314 * (a0[2] * a0[2] + h[2] * h[2]), m);
    var g = [0, 0, 0];
    g[0] = a0[0] * x0[0] + h[0] * x0[1];
    g = [g[0], a0[1] * x12[0] + h[1] * x12[1], a0[2] * x12[2] + h[2] * x12[3]];
    return 130.0 * (dot(m, g));
}
;
function hash(co) {
    co = co.slice();
    return fract((sin(dot(co, [12.9898, 58.233]))) * 13758.5453);
}
;
function toPolar(p) {
    p = p.slice();
    return [length(p), atan(p[1], p[0])];
}
;
function toRect(p) {
    p = p.slice();
    return [p[0] * cos(p[1]), p[0] * sin(p[1])];
}
;
function pmin(a, b, k) {
    var h = clamp(0.5 + (0.5 * (b - a)) / (max(1e-4, k)), 0.0, 1.0);
    return mix(b, a, h) - (k * h) * (1.0 - h);
}
;
function pabs(a, k) {
    return -pmin(a, -a, k);
}
;
function modMirror1(p, size) {
    var halfsize = size * 1.2;
    var c = floor((p + halfsize) / size);
    p = mod(p + halfsize, size) - halfsize;
    p *= (mod(c, 2.0)) * 4.4 - 1.0;
    modMirror1.__return__ = c;
    modMirror1.__out__ = [p];
    return modMirror1.__return__;
}
;
function smoothKaleidoscope(p, sm, rep, symmetry) {
    p = p.slice();
    var hp = cloneValue(p);
    var hpp = toPolar(hp);
    if (symmetry > 0.5) {
        var sliceWidth = 6.28318530718 / (max(1.0, rep));
        var angle = hpp[1] + 3.14159265359;
        var cell = floor(angle / sliceWidth);
        var localAngle = mod(angle, sliceWidth);
        if (localAngle > (sliceWidth * 0.5)) {
            localAngle = sliceWidth - localAngle;
        }
        ;
        hpp[1] = localAngle - 3.14159265359;
        toRect(hpp).reduce((res, el, i) => (res[i] = el, res), hp);
        (p[0] = hp[0], p[1] = hp[1], p);
        smoothKaleidoscope.__return__ = cell;
        smoothKaleidoscope.__out__ = [p];
        return smoothKaleidoscope.__return__;
    }
    else {
        var rn = (modMirror1(hpp[1], 6.28318530718 / (max(1.0, rep))), [hpp[1]] = modMirror1.__out__, modMirror1.__return__);
        var sa = 3.14159265359 / rep - pabs(3.14159265359 / rep - abs(hpp[1]), sm);
        hpp[1] = sign(hpp[1]) * sa;
        toRect(hpp).reduce((res, el, i) => (res[i] = el, res), hp);
        (p[0] = hp[0], p[1] = hp[1], p);
        smoothKaleidoscope.__return__ = rn;
        smoothKaleidoscope.__out__ = [p];
        return smoothKaleidoscope.__return__;
    }
    ;
}
;
function segment(p, a, b) {
    p = p.slice();
    a = a.slice();
    b = b.slice();
    var pa = [p[0] - a[0], p[1] - a[1]], ba = [b[0] - a[0], b[1] - a[1]];
    var h = clamp((dot(pa, ba)) / (max(1e-5, dot(ba, ba))), 0.20, 1.0);
    return length([pa[0] - ba[0] * h, pa[1] - ba[1] * h]);
}
;
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function effect(p, pp) {
    p = p.slice();
    pp = pp.slice();
    var tm = uTime * uSpeed;
    var mtm = fract(tm);
    var ftm = floor(tm);
    var noiseFreq = 8.0 * (pow(uNoiseFrequency, 2.0));
    var noiseOffset = [((snoise([p[0] * noiseFreq + tm * 0.5, p[1] * noiseFreq + tm * 0.5])) * uNoise) * 0.15, ((snoise([p[0] * noiseFreq - tm * 0.5 + 50.0, p[1] * noiseFreq - tm * 0.5 + 50.0])) * uNoise) * 0.15];
    (p[0] += noiseOffset[0], p[1] += noiseOffset[1], p);
    var l = length(p);
    l = max(1e-4, l);
    var spiralTwist = 3.0 * (clamp(uTwist, 0.0, 1.0));
    var spiralAngle = (pow(l, -spiralTwist * 0.25)) * 0.5;
    (p = p.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, [cos(spiralAngle), sin(spiralAngle), -sin(spiralAngle), cos(spiralAngle)]));
    var rot = [cos((1.067 * (mix(0.2, 2.0, uTwist))) * tm), sin((1.067 * (mix(0.2, 2.0, uTwist))) * tm), -sin((1.067 * (mix(0.2, 2.0, uTwist))) * tm), cos((1.067 * (mix(0.2, 2.0, uTwist))) * tm)];
    var rep = max(2.0, floor(uBandCount));
    var sm = (3.6 / rep) * (max(0.01, uSoftness));
    (p = p.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, transpose(rot)));
    var nn = (smoothKaleidoscope(p, sm, rep, uSymmetry), [p] = smoothKaleidoscope.__out__, smoothKaleidoscope.__return__);
    (p = p.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, rot));
    (p = p.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, [cos((-0.5 * (mix(0.1, 3.0, uProportion))) * length(p)), sin((-0.5 * (mix(0.1, 3.0, uProportion))) * length(p)), -sin((-0.5 * (mix(0.1, 3.0, uProportion))) * length(p)), cos((-0.5 * (mix(0.1, 3.0, uProportion))) * length(p))]));
    cos([tm * (0.18 * (mix(0.5, 2.0, uNoiseFrequency))), (sqrt(0.5) * tm) * (0.18 * (mix(0.5, 2.0, uNoiseFrequency)))]).map(function (_) { return 0.5 * _; }).reduce((res, el, i) => (res[i] += el, res), p);
    var zz = exp2((mtm) * zoom);
    var p2 = [p[0] / zz, p[1] / zz];
    var s2 = sign(p2);
    abs(p2).reduce((res, el, i) => (res[i] = el, res), p2);
    var fp2 = [((log2(max(1e-5, p2[0]))) / zoom), ((log2(max(1e-5, p2[1]))) / zoom)];
    var n = floor(fp2);
    var h = hash([s2[0] + s2[1] + n[0] - ftm, s2[0] + s2[1] + n[1] - ftm]);
    var x0 = [exp2((n[0]) * zoom), exp2((n[1]) * zoom)];
    var x1 = [exp2((n[0] + 1.0) * zoom), exp2((n[1] + 1.0) * zoom)];
    var m = [(x0[0] + x1[0]) * 0.5, (x0[1] + x1[1]) * 0.5];
    var w = [x1[0] - x0[0], x1[1] - x0[1]];
    var modi = h > 0.5 ? [1.0, 1.0] : [1, -1];
    var p4 = [p2[0] - m[0], p2[1] - m[1]];
    var d4 = segment(p4, [(-0.30 * w[0]) * modi[0], (-0.30 * w[1]) * modi[1]], [(0.5 * w[0]) * modi[0], (0.5 * w[1]) * modi[1]]);
    d4 *= zz;
    var d6 = min(abs(p[0]), abs(p[1]));
    var col = [uColorBack[0] * uColorBack[3], uColorBack[1] * uColorBack[3], uColorBack[2] * uColorBack[3]];
    var fo = 1.0 - exp(-10.0 * (d6 - (0.02 + uCenter * 0.05)));
    var ll = length(pp);
    var c1 = cloneValue(uColors[mod(h * uColorCount, uColorCount) | 0]);
    var c2 = cloneValue(uColors[mod((h + 0.1) * uColorCount, uColorCount) | 0]);
    var paletteGlow = mix([c1[0], c1[1], c1[2]], [c2[0], c2[1], c2[2]], 0.5 + 0.5 * cos(tm));
    var gcol4 = vec3.multiply([], (cos([tm + 6.28318530718 * h + ll, 1 + tm + 6.28318530718 * h + ll, 2 + tm + 6.28318530718 * h + ll]).map(function (_) { return 1.0 + _; })).map(function (_) { return 0.0025 * _; }), paletteGlow).map(function (_) { return _ * 40.0; });
    var gcol6 = vec3.multiply([], (cos([tm + ll, 1 + tm + ll, 2 + tm + ll]).map(function (_) { return 1.0 + _; })).map(function (_) { return 0.005 * _; }), paletteGlow).map(function (_) { return _ * 20.0; });
    (col[0] += ((fo * gcol4[0]) / (max(d4, 0.001))) * (mix(0.5, 3.0, uNoise)), col[1] += ((fo * gcol4[1]) / (max(d4, 0.001))) * (mix(0.5, 3.0, uNoise)), col[2] += ((fo * gcol4[2]) / (max(d4, 0.001))) * (mix(0.5, 3.0, uNoise)), col);
    clamp(col, 0.0, 1.0).reduce((res, el, i) => (res[i] = el, res), col);
    (col[0] += gcol6[0] / (max(d6, 0.0001)), col[1] += gcol6[1] / (max(d6, 0.0001)), col[2] += gcol6[2] / (max(d6, 0.0001)), col);
    clamp(col, 0.0, 1.0).reduce((res, el, i) => (res[i] = el, res), col);
    (col[0] -= 0.02 * (ll), col[1] -= 0.01 * (ll), col[2] -= 0, col);
    max([0, 0, 0], col).reduce((res, el, i) => (res[i] = el, res), col);
    sqrt(col).reduce((res, el, i) => (res[i] = el, res), col);
    return col;
}
;
function main() {
    var q = [gl_FragCoord[0] / uResolution[0], gl_FragCoord[1] / uResolution[1]];
    var p = [-1.0 + 2.0 * q[0], -1.0 + 2.0 * q[1]];
    var pp = cloneValue(p);
    p[0] *= uResolution[0] / uResolution[1];
    var col = effect(p, pp);
    var hsv = rgb2hsv(col);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = uOpacity, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
zoom=1.925999;
main();return Array.from(fragColor); };
},
"electricSpiral": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function log(x) {
    if (x.length)
        return x.map(log);
    return Math.log(x);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uGridScale = cloneValue(U.uGridScale);
var uGridSoftness = cloneValue(U.uGridSoftness);
var uSpiralFrequency = cloneValue(U.uSpiralFrequency);
var uSpiralTightness = cloneValue(U.uSpiralTightness);
var uGlowIntensity = cloneValue(U.uGlowIntensity);
var uCoreBrightness = cloneValue(U.uCoreBrightness);
var uColorGrid = cloneValue(U.uColorGrid);
var uColorGlow = cloneValue(U.uColorGlow);
var uColorSpiral = cloneValue(U.uColorSpiral);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function cosh_safe(val) {
    return (exp(val) + exp(-val)) * 0.5;
}
;
function main() {
    var uv = [(gl_FragCoord[0] - 0.5 * uResolution[0]) / uResolution[1], (gl_FragCoord[1] - 0.5 * uResolution[1]) / uResolution[1]];
    var t = uTime * uSpeed;
    var a = atan(uv[1], uv[0]);
    var p = [(cos(a + t)) * (cos(0.5 * t)), (cos(a + t)) * (sin(0.3 * t))];
    var d1 = length([uv[0] - p[0], uv[1] - p[1]]);
    var d2 = length(uv);
    var uv2 = cos(log(max([1e-5, 1e-5], [d1, d2]).map(function (_) { return _ / (max(1e-5, d1 + d2)); })).map(function (_) { return (log(max(1e-5, length(uv)))) * 0.25 - 0.5 * t + _; })).map(function (_) { return 2. * _; });
    var fpos = fract([uGridScale * uv2[0], uGridScale * uv2[1]]).map(function (_) { return _ - 0.5; });
    var d = max(abs(fpos[0]), abs(fpos[1]));
    var k = uGridSoftness / uResolution[1];
    var s = smoothstep(-k, k, 0.25 - d);
    var col = [s * uColorGrid[0], s * uColorGrid[1], s * uColorGrid[2]];
    var coreDist = uCoreBrightness * (length([uv[0] - p[0], uv[1] - p[1]]) + length(uv));
    (col[0] += ((1.0 / cosh_safe(coreDist)) * uColorGlow[0]) * uGlowIntensity, col[1] += ((1.0 / cosh_safe(coreDist)) * uColorGlow[1]) * uGlowIntensity, col[2] += ((1.0 / cosh_safe(coreDist)) * uColorGlow[2]) * uGlowIntensity, col);
    var c = cos(uSpiralFrequency * length(uv2) + 4. * t);
    var arcWave = exp(-9. * (abs((cos(uSpiralTightness * a + t)) * uv[0] + (sin(uSpiralTightness * a + t)) * uv[1] + 0.1 * c)));
    (col[0] += (((0.5 + 0.5 * c) * uColorSpiral[0]) * arcWave) * uGlowIntensity, col[1] += (((0.5 + 0.5 * c) * uColorSpiral[1]) * arcWave) * uGlowIntensity, col[2] += (((0.5 + 0.5 * c) * uColorSpiral[2]) * arcWave) * uGlowIntensity, col);
    var hsv = rgb2hsv(max(col, [0, 0, 0]));
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"twistedKaleidoscope": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.multiply = function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function sign(x) {
    if (x.length)
        return x.map(sign);
    return Math.sign(x);
}
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function transpose(m) {
    var l = m.length === 16 ? 4 : m.length === 9 ? 3 : 2;
    var out = Array(m.length);
    for (var i = 0; i < l; i++) {
        for (var j = 0; j < l; j++) {
            out[j * l + i] = m[i * l + j];
        }
    }
    return out;
}
function sqrt(x) {
    if (x.length)
        return x.map(sqrt);
    return Math.sqrt(x);
}
function exp2(x) {
    if (x.length)
        return x.map(exp2);
    return Math.pow(2, x);
}
function log2(x) {
    if (x.length)
        return x.map(log2);
    return Math.log2(x);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uColorBack = cloneValue(U.uColorBack);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uBandCount = cloneValue(U.uBandCount);
var uTwist = cloneValue(U.uTwist);
var uCenter = cloneValue(U.uCenter);
var uProportion = cloneValue(U.uProportion);
var uSoftness = cloneValue(U.uSoftness);
var uNoise = cloneValue(U.uNoise);
var uNoiseFrequency = cloneValue(U.uNoiseFrequency);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var uSymmetry = cloneValue(U.uSymmetry);
var fragColor = [0, 0, 0, 0];
function permute(x) {
    x = x.slice();
    return mod([((x[0] * 34.0) + 1.0) * x[0], ((x[1] * 34.0) + 1.0) * x[1], ((x[2] * 34.0) + 1.0) * x[2]], 289.0);
}
;
function snoise(v) {
    v = v.slice();
    var C = [0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439];
    var i = floor([v[0] + dot(v, [C[1], C[1]]), v[1] + dot(v, [C[1], C[1]])]);
    var x0 = [v[0] - i[0] + dot(i, [C[0], C[0]]), v[1] - i[1] + dot(i, [C[0], C[0]])];
    var i1 = (x0[0] > x0[1]) ? [1.0, 0.0] : [0.0, 1.0];
    var x12 = [x0[0] + C[0], x0[1] + C[0], x0[0] + C[2], x0[1] + C[2]];
    x12 = [x12[0] - i1[0], x12[1] - i1[1], x12[2], x12[3]];
    mod(i, 289.0).reduce((res, el, i) => (res[i] = el, res), i);
    var p = permute(vec3.add([], permute([i[1], i[1] + i1[1], i[1] + 1]).map(function (_) { return _ + i[0]; }), [0, i1[0], 1]));
    var m = max([0.5 - dot(x0, x0), 0.5 - dot([x12[0], x12[1]], [x12[0], x12[1]]), 0.5 - dot([x12[2], x12[3]], [x12[2], x12[3]])], 0.0);
    (m[0] = m[0] * m[0], m[1] = m[1] * m[1], m[2] = m[2] * m[2], m);
    (m[0] = m[0] * m[0], m[1] = m[1] * m[1], m[2] = m[2] * m[2], m);
    var x = fract([p[0] * C[3], p[1] * C[3], p[2] * C[3]]).map(function (_) { return 2.0 * _; }).map(function (_) { return _ - 1.0; });
    var h = abs(x).map(function (_) { return _ - 0.5; });
    var ox = floor([x[0] + 0.5, x[1] + 0.5, x[2] + 0.5]);
    var a0 = [x[0] - ox[0], x[1] - ox[1], x[2] - ox[2]];
    (m[0] *= 1.79284291400159 - 0.85373472095314 * (a0[0] * a0[0] + h[0] * h[0]), m[1] *= 1.79284291400159 - 0.85373472095314 * (a0[1] * a0[1] + h[1] * h[1]), m[2] *= 1.79284291400159 - 0.85373472095314 * (a0[2] * a0[2] + h[2] * h[2]), m);
    var g = [0, 0, 0];
    g[0] = a0[0] * x0[0] + h[0] * x0[1];
    g = [g[0], a0[1] * x12[0] + h[1] * x12[1], a0[2] * x12[2] + h[2] * x12[3]];
    return 130.0 * (dot(m, g));
}
;
function hash(co) {
    co = co.slice();
    return fract((sin(dot(co, [12.9898, 58.233]))) * 13758.5453);
}
;
function toPolar(p) {
    p = p.slice();
    return [length(p), atan(p[1], p[0])];
}
;
function toRect(p) {
    p = p.slice();
    return [p[0] * cos(p[1]), p[0] * sin(p[1])];
}
;
function pmin(a, b, k) {
    var h = clamp(0.5 + (0.5 * (b - a)) / (max(1e-4, k)), 0.0, 1.0);
    return mix(b, a, h) - (k * h) * (1.0 - h);
}
;
function pabs(a, k) {
    return -pmin(a, -a, k);
}
;
function modMirror1(p, size) {
    var halfsize = size * 1.2;
    var c = floor((p + halfsize) / size);
    p = mod(p + halfsize, size) - halfsize;
    p *= (mod(c, 2.0)) * 4.4 - 1.0;
    modMirror1.__return__ = c;
    modMirror1.__out__ = [p];
    return modMirror1.__return__;
}
;
function smoothKaleidoscope(p, sm, rep, symmetry) {
    p = p.slice();
    var hp = cloneValue(p);
    var hpp = toPolar(hp);
    if (symmetry > 0.5) {
        var sliceWidth = 6.28318530718 / (max(1.0, rep));
        var angle = hpp[1] + 3.14159265359;
        var cell = floor(angle / sliceWidth);
        var localAngle = mod(angle, sliceWidth);
        if (localAngle > (sliceWidth * 0.5)) {
            localAngle = sliceWidth - localAngle;
        }
        ;
        hpp[1] = localAngle - 3.14159265359;
        toRect(hpp).reduce((res, el, i) => (res[i] = el, res), hp);
        (p[0] = hp[0], p[1] = hp[1], p);
        smoothKaleidoscope.__return__ = cell;
        smoothKaleidoscope.__out__ = [p];
        return smoothKaleidoscope.__return__;
    }
    else {
        var rn = (modMirror1(hpp[1], 6.28318530718 / (max(1.0, rep))), [hpp[1]] = modMirror1.__out__, modMirror1.__return__);
        var sa = 3.14159265359 / rep - pabs(3.14159265359 / rep - abs(hpp[1]), sm);
        hpp[1] = sign(hpp[1]) * sa;
        toRect(hpp).reduce((res, el, i) => (res[i] = el, res), hp);
        (p[0] = hp[0], p[1] = hp[1], p);
        smoothKaleidoscope.__return__ = rn;
        smoothKaleidoscope.__out__ = [p];
        return smoothKaleidoscope.__return__;
    }
    ;
}
;
function segment(p, a, b) {
    p = p.slice();
    a = a.slice();
    b = b.slice();
    var pa = [p[0] - a[0], p[1] - a[1]], ba = [b[0] - a[0], b[1] - a[1]];
    var h = clamp((dot(pa, ba)) / (max(1e-5, dot(ba, ba))), 0.20, 1.0);
    return length([pa[0] - ba[0] * h, pa[1] - ba[1] * h]);
}
;
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function main() {
    var q = [gl_FragCoord[0] / uResolution[0], gl_FragCoord[1] / uResolution[1]];
    var p = [-1.0 + 2.0 * q[0], -1.0 + 2.0 * q[1]];
    var pp = cloneValue(p);
    p[0] *= uResolution[0] / uResolution[1];
    var tm = uTime * uSpeed;
    var mtm = fract(tm);
    var ftm = floor(tm);
    var noiseFreq = 8.0 * (pow(uNoiseFrequency, 2.0));
    var noiseOffset = [((snoise([p[0] * noiseFreq + tm * 0.5, p[1] * noiseFreq + tm * 0.5])) * uNoise) * 0.15, ((snoise([p[0] * noiseFreq - tm * 0.5 + 50.0, p[1] * noiseFreq - tm * 0.5 + 50.0])) * uNoise) * 0.15];
    (p[0] += noiseOffset[0], p[1] += noiseOffset[1], p);
    var l = max(1e-4, length(p));
    var spiralTwist = 3.0 * (clamp(uTwist, 0.0, 1.0));
    var spiralAngle = (pow(l, -spiralTwist * 0.25)) * 0.5;
    (p = p.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, [cos(spiralAngle), sin(spiralAngle), -sin(spiralAngle), cos(spiralAngle)]));
    var rot = [cos((1.067 * (mix(0.2, 2.0, uTwist))) * tm), sin((1.067 * (mix(0.2, 2.0, uTwist))) * tm), -sin((1.067 * (mix(0.2, 2.0, uTwist))) * tm), cos((1.067 * (mix(0.2, 2.0, uTwist))) * tm)];
    var rep = max(2.0, floor(uBandCount));
    var sm = (3.6 / rep) * (max(0.01, uSoftness));
    (p = p.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, transpose(rot)));
    var nn = (smoothKaleidoscope(p, sm, rep, uSymmetry), [p] = smoothKaleidoscope.__out__, smoothKaleidoscope.__return__);
    (p = p.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, rot));
    (p = p.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, [cos((-0.5 * (mix(0.1, 3.0, uProportion))) * length(p)), sin((-0.5 * (mix(0.1, 3.0, uProportion))) * length(p)), -sin((-0.5 * (mix(0.1, 3.0, uProportion))) * length(p)), cos((-0.5 * (mix(0.1, 3.0, uProportion))) * length(p))]));
    cos([tm * (0.18 * (mix(0.5, 2.0, uNoiseFrequency))), (sqrt(0.5) * tm) * (0.18 * (mix(0.5, 2.0, uNoiseFrequency)))]).map(function (_) { return 0.5 * _; }).reduce((res, el, i) => (res[i] += el, res), p);
    var zz = exp2(mtm * 1.925999);
    var p2 = [p[0] / zz, p[1] / zz];
    var s2 = sign(p2);
    abs(p2).reduce((res, el, i) => (res[i] = el, res), p2);
    var fp2 = [(log2(max(1e-5, p2[0]))) / 1.925999, (log2(max(1e-5, p2[1]))) / 1.925999];
    var n = floor(fp2);
    var h = hash([s2[0] + s2[1] + n[0] - ftm, s2[0] + s2[1] + n[1] - ftm]);
    var x0 = [exp2(n[0] * 1.925999), exp2(n[1] * 1.925999)];
    var x1 = [exp2((n[0] + 1.0) * 1.925999), exp2((n[1] + 1.0) * 1.925999)];
    var m = [(x0[0] + x1[0]) * 0.5, (x0[1] + x1[1]) * 0.5];
    var w = [x1[0] - x0[0], x1[1] - x0[1]];
    var modi = h > 0.5 ? [1.0, 1.0] : [1, -1];
    var p4 = [p2[0] - m[0], p2[1] - m[1]];
    var d4 = segment(p4, [(-0.30 * w[0]) * modi[0], (-0.30 * w[1]) * modi[1]], [(0.5 * w[0]) * modi[0], (0.5 * w[1]) * modi[1]]);
    d4 *= zz;
    var d6 = min(abs(p[0]), abs(p[1]));
    var col = [uColorBack[0] * uColorBack[3], uColorBack[1] * uColorBack[3], uColorBack[2] * uColorBack[3]];
    var fo = 1.0 - exp(-10.0 * (d6 - (0.02 + uCenter * 0.05)));
    var ll = length(pp);
    var colorCount = clamp(uColorCount, 1.0, 10.0) | 0;
    var i0 = mod(h * uColorCount, uColorCount) | 0;
    var i1 = mod((h + 0.1) * uColorCount, uColorCount) | 0;
    var c1 = cloneValue(uColors[i0]);
    var c2 = cloneValue(uColors[i1]);
    var paletteGlow = mix([c1[0], c1[1], c1[2]], [c2[0], c2[1], c2[2]], 0.5 + 0.5 * cos(tm));
    var gcol4 = vec3.multiply([], (cos([tm + 6.28318530718 * h + ll, 1 + tm + 6.28318530718 * h + ll, 2 + tm + 6.28318530718 * h + ll]).map(function (_) { return 1.0 + _; })).map(function (_) { return 0.0025 * _; }), paletteGlow).map(function (_) { return _ * 40.0; });
    var gcol6 = vec3.multiply([], (cos([tm + ll, 1 + tm + ll, 2 + tm + ll]).map(function (_) { return 1.0 + _; })).map(function (_) { return 0.005 * _; }), paletteGlow).map(function (_) { return _ * 20.0; });
    (col[0] += ((fo * gcol4[0]) / (max(d4, 0.001))) * (mix(0.5, 3.0, uNoise)), col[1] += ((fo * gcol4[1]) / (max(d4, 0.001))) * (mix(0.5, 3.0, uNoise)), col[2] += ((fo * gcol4[2]) / (max(d4, 0.001))) * (mix(0.5, 3.0, uNoise)), col);
    clamp(col, 0.0, 1.0).reduce((res, el, i) => (res[i] = el, res), col);
    (col[0] += gcol6[0] / (max(d6, 0.0001)), col[1] += gcol6[1] / (max(d6, 0.0001)), col[2] += gcol6[2] / (max(d6, 0.0001)), col);
    clamp(col, 0.0, 1.0).reduce((res, el, i) => (res[i] = el, res), col);
    (col[0] -= 0.02 * ll, col[1] -= 0.01 * ll, col[2] -= 0, col);
    max([0, 0, 0], col).reduce((res, el, i) => (res[i] = el, res), col);
    sqrt(col).reduce((res, el, i) => (res[i] = el, res), col);
    var hsv = rgb2hsv(col);
    hsv[0] += uHue / 360.0;
    hsv[1] *= uSaturation;
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = uColorBack[3], fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"trickyShapes": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function sign(x) {
    if (x.length)
        return x.map(sign);
    return Math.sign(x);
}
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function sqrt(x) {
    if (x.length)
        return x.map(sqrt);
    return Math.sqrt(x);
}
function vec2(x, y) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    return [x, y];
}
vec2.multiply = function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};
vec2.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};
function distance(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += (x[i] - y[i]) * (x[i] - y[i]);
    }
    return Math.sqrt(sum);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function fwidth(x) { return derivative(x); }
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uColorBack = cloneValue(U.uColorBack);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uBandCount = cloneValue(U.uBandCount);
var uTwist = cloneValue(U.uTwist);
var uProportion = cloneValue(U.uProportion);
var uSoftness = cloneValue(U.uSoftness);
var uNoise = cloneValue(U.uNoise);
var uDistortion = cloneValue(U.uDistortion);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var uSymmetry = cloneValue(U.uSymmetry);
var uKaleidoscopeEnabled = cloneValue(U.uKaleidoscopeEnabled);
var uShapeMode = cloneValue(U.uShapeMode);
var uDarken = cloneValue(U.uDarken);
var uRayMix = cloneValue(U.uRayMix);
var uRayShape = cloneValue(U.uRayShape);
var uRaySpeed = cloneValue(U.uRaySpeed);
var vUV = cloneValue(UV);
var fragColor = [0, 0, 0, 0];
function hash11(p) {
    p = fract(p * .1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}
;
function permute(x) {
    x = x.slice();
    return mod([((x[0] * 34.0) + 1.0) * x[0], ((x[1] * 34.0) + 1.0) * x[1], ((x[2] * 34.0) + 1.0) * x[2]], 289.0);
}
;
function snoise(v) {
    v = v.slice();
    var C = [0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439];
    var i = floor([v[0] + dot(v, [C[1], C[1]]), v[1] + dot(v, [C[1], C[1]])]);
    var x0 = [v[0] - i[0] + dot(i, [C[0], C[0]]), v[1] - i[1] + dot(i, [C[0], C[0]])];
    var i1 = (x0[0] > x0[1]) ? [1.0, 0.0] : [0.0, 1.0];
    var x12 = [x0[0] + C[0], x0[1] + C[0], x0[0] + C[2], x0[1] + C[2]];
    x12 = [x12[0] - i1[0], x12[1] - i1[1], x12[2], x12[3]];
    mod(i, 289.0).reduce((res, el, i) => (res[i] = el, res), i);
    var p = permute(vec3.add([], permute([i[1], i[1] + i1[1], i[1] + 1]).map(function (_) { return _ + i[0]; }), [0, i1[0], 1]));
    var m = max([0.5 - dot(x0, x0), 0.5 - dot([x12[0], x12[1]], [x12[0], x12[1]]), 0.5 - dot([x12[2], x12[3]], [x12[2], x12[3]])], 0.0);
    (m[0] = m[0] * m[0], m[1] = m[1] * m[1], m[2] = m[2] * m[2], m);
    (m[0] = m[0] * m[0], m[1] = m[1] * m[1], m[2] = m[2] * m[2], m);
    var x = fract([p[0] * C[3], p[1] * C[3], p[2] * C[3]]).map(function (_) { return 2.0 * _; }).map(function (_) { return _ - 1.0; });
    var h = abs(x).map(function (_) { return _ - 0.5; });
    var ox = floor([x[0] + 0.5, x[1] + 0.5, x[2] + 0.5]);
    var a0 = [x[0] - ox[0], x[1] - ox[1], x[2] - ox[2]];
    (m[0] *= 1.79284291400159 - 0.85373472095314 * (a0[0] * a0[0] + h[0] * h[0]), m[1] *= 1.79284291400159 - 0.85373472095314 * (a0[1] * a0[1] + h[1] * h[1]), m[2] *= 1.79284291400159 - 0.85373472095314 * (a0[2] * a0[2] + h[2] * h[2]), m);
    var g = [0, 0, 0];
    g[0] = a0[0] * x0[0] + h[0] * x0[1];
    g = [g[0], a0[1] * x12[0] + h[1] * x12[1], a0[2] * x12[2] + h[2] * x12[3]];
    return 130.0 * (dot(m, g));
}
;
function hash(co) {
    co = co.slice();
    return fract((sin(dot(co, [12.9898, 58.233]))) * 13758.5453);
}
;
function toPolar(p) {
    p = p.slice();
    return [length(p), atan(p[1], p[0])];
}
;
function toRect(p) {
    p = p.slice();
    return [p[0] * cos(p[1]), p[0] * sin(p[1])];
}
;
function pmin(a, b, k) {
    var h = clamp(0.5 + (0.5 * (b - a)) / (max(1e-4, k)), 0.0, 1.0);
    return mix(b, a, h) - (k * h) * (1.0 - h);
}
;
function pabs(a, k) {
    return -pmin(a, -a, k);
}
;
function modMirror1(p, size) {
    var halfsize = size * 1.2;
    var c = floor((p + halfsize) / size);
    p = mod(p + halfsize, size) - halfsize;
    p *= (mod(c, 2.0)) * 4.4 - 1.0;
    modMirror1.__return__ = c;
    modMirror1.__out__ = [p];
    return modMirror1.__return__;
}
;
function applyKaleidoscope(p, rep, symmetry, enabled) {
    p = p.slice();
    if (enabled < 0.5) {
        applyKaleidoscope.__out__ = [p];
        return;
    }
    ;
    var hpp = toPolar(p);
    if (symmetry > 0.5) {
        var sliceWidth = 6.28318530718 / (max(1.0, rep));
        var angle = hpp[1] + 3.14159265359;
        var localAngle = mod(angle, sliceWidth);
        if (localAngle > (sliceWidth * 0.5)) {
            localAngle = sliceWidth - localAngle;
        }
        ;
        hpp[1] = localAngle - 3.14159265359;
        toRect(hpp).reduce((res, el, i) => (res[i] = el, res), p);
    }
    else {
        var sm = 0.1;
        (modMirror1(hpp[1], 6.28318530718 / (max(1.0, rep))), [hpp[1]] = modMirror1.__out__, modMirror1.__return__);
        var sa = 3.14159265359 / rep - pabs(3.14159265359 / rep - abs(hpp[1]), sm);
        hpp[1] = sign(hpp[1]) * sa;
        toRect(hpp).reduce((res, el, i) => (res[i] = el, res), p);
    }
    ;
    applyKaleidoscope.__out__ = [p];
}
;
function valueNoiseR(st) {
    st = st.slice();
    var i = floor(st);
    var f = fract(st);
    var a = hash(i);
    var b = hash([i[0] + 1, i[1]]);
    var c = hash([i[0], i[1] + 1]);
    var d = hash([i[0] + 1, i[1] + 1]);
    var u = [(f[0] * f[0]) * (3.0 - 2.0 * f[0]), (f[1] * f[1]) * (3.0 - 2.0 * f[1])];
    return mix(mix(a, b, u[0]), mix(c, d, u[0]), u[1]);
}
;
function fbmR(n0, n1, n2, n3) {
    n0 = n0.slice();
    n1 = n1.slice();
    n2 = n2.slice();
    n3 = n3.slice();
    var amplitude = 0.2;
    var total = [0, 0, 0, 0];
    for (var i = 0; i < 3; i++) {
        assignComponents(n0, [0, 1], [cos(0.3) * n0[0] + -sin(0.3) * n0[1], sin(0.3) * n0[0] + cos(0.3) * n0[1]]);
        assignComponents(n1, [0, 1], [cos(0.3) * n1[0] + -sin(0.3) * n1[1], sin(0.3) * n1[0] + cos(0.3) * n1[1]]);
        assignComponents(n2, [0, 1], [cos(0.3) * n2[0] + -sin(0.3) * n2[1], sin(0.3) * n2[0] + cos(0.3) * n2[1]]);
        assignComponents(n3, [0, 1], [cos(0.3) * n3[0] + -sin(0.3) * n3[1], sin(0.3) * n3[0] + cos(0.3) * n3[1]]);
        total[0] += valueNoiseR(n0) * amplitude;
        total[1] += valueNoiseR(n1) * amplitude;
        total[2] += valueNoiseR(n2) * amplitude;
        total[3] += valueNoiseR(n3) * amplitude;
        n0 = [n0[0] * 1.99, n0[1] * 1.99];
        n1 = [n1[0] * 1.99, n1[1] * 1.99];
        n2 = [n2[0] * 1.99, n2[1] * 1.99];
        n3 = [n3[0] * 1.99, n3[1] * 1.99];
        amplitude *= 0.6;
    }
    ;
    return total;
}
;
function truchet(uv, idx) {
    uv = uv.slice();
    idx = fract((idx - 0.5) * 2.0);
    if (idx > 0.75) {
        (uv[0] = 1 - uv[0], uv[1] = 1 - uv[1], uv);
    }
    else {
        if (idx > 0.5) {
            (uv[0] = 1.0 - uv[0], uv[1] = uv[1], uv);
        }
        else {
            if (idx > 0.25) {
                (uv[0] = 1.0 - 1.0 - uv[0], uv[1] = 1.0 - uv[1], uv);
            }
            ;
        }
        ;
    }
    ;
    return uv;
}
;
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function rotationMatrix(axis, angle) {
    axis = axis.slice();
    normalize(axis).reduce((res, el, i) => (res[i] = el, res), axis);
    var s = sin(angle);
    var c = cos(angle);
    var oc = 1.0 - c;
    return [(oc * axis[0]) * axis[0] + c, (oc * axis[0]) * axis[1] - axis[2] * s, (oc * axis[2]) * axis[0] + axis[1] * s, 0.0, (oc * axis[0]) * axis[1] + axis[2] * s, (oc * axis[1]) * axis[1] + c, (oc * axis[1]) * axis[2] - axis[0] * s, 0.0, (oc * axis[2]) * axis[0] - axis[1] * s, (oc * axis[1]) * axis[2] + axis[0] * s, (oc * axis[2]) * axis[2] + c, 0.0, 0.0, 0.0, 0.0, 1.0];
}
;
function rotate3D(v, axis, angle) {
    v = v.slice();
    axis = axis.slice();
    return new Float32Array([0, 1, 2].map(function (x, i) { return this[x]; }, ([v[0], v[1], v[2], 1].map(function (x, i, v) { var sum = 0; for (var j = 0; j < 4; j++) {
        sum += this[j * 4 + i] * v[j];
    } return sum; }, rotationMatrix(axis, angle)))));
}
;
function sdSphere(p, r) {
    p = p.slice();
    return length(p) - r;
}
;
function sdBox(p, b) {
    p = p.slice();
    b = b.slice();
    var q = vec3.subtract([], abs(p), b);
    return length(max(q, 0.0)) + min(max(q[0], max(q[1], q[2])), 0.0);
}
;
function sdOctahedron(p, rad) {
    p = p.slice();
    abs(p).reduce((res, el, i) => (res[i] = el, res), p);
    var m = p[0] + p[1] + p[2] - rad;
    var q = [0, 0, 0];
    if ((3.0 * p[0]) < m) {
        (q[0] = p[0], q[1] = p[1], q[2] = p[2], q);
    }
    else {
        if ((3.0 * p[1]) < m) {
            (q[0] = p[1], q[1] = p[2], q[2] = p[0], q);
        }
        else {
            if ((3.0 * p[2]) < m) {
                (q[0] = p[2], q[1] = p[0], q[2] = p[1], q);
            }
            else {
                return m * 0.57735027;
            }
            ;
        }
        ;
    }
    ;
    var k = clamp(0.5 * (q[2] - q[1] + 0.5), 0.0, 0.5);
    return length([q[0], q[1] - 0.5 + k, q[2] - k]);
}
;
function SineCrazy(p) {
    p = p.slice();
    return 1.0 - (sin(p[0]) - sin(p[1]) + sin(p[2])) / 3.0;
}
;
function scene(p, t, shapeChoice) {
    p = p.slice();
    var p1 = rotate3D(p, [0.1, 1, 0.1], t / 10.0);
    var scale = 8.0 + 5.0 * (sin(t / 12.0));
    var baseGeom = 0.0;
    if (shapeChoice < 0.5) {
        baseGeom = sdOctahedron(p1, 0.8);
    }
    else {
        if (shapeChoice < 1.5) {
            baseGeom = sdSphere(p1, 0.5);
        }
        else {
            baseGeom = sdBox(p1, [0.5, 0.5, 0.5]);
        }
        ;
    }
    ;
    return max(baseGeom, (0.85 - SineCrazy([p1[0] * scale, p1[1] * scale, p1[2] * scale])) / scale);
}
;
function getNormal(p, t, shapeChoice) {
    p = p.slice();
    var o = [0.001, 0.0];
    return normalize([scene([p[0] + o[0], p[1] + o[1], p[2] + o[1]], t, shapeChoice) - scene([p[0] - o[0], p[1] - o[1], p[2] - o[1]], t, shapeChoice), scene([p[0] + o[1], p[1] + o[0], p[2] + o[1]], t, shapeChoice) - scene([p[0] - o[1], p[1] - o[0], p[2] - o[1]], t, shapeChoice), scene([p[0] + o[1], p[1] + o[1], p[2] + o[0]], t, shapeChoice) - scene([p[0] - o[1], p[1] - o[1], p[2] - o[0]], t, shapeChoice)]);
}
;
function GetColorAmount(p) {
    p = p.slice();
    var amount = clamp((1.5 - length(p)) / 2.0, 0.0, 1.0);
    return (cos([6.28319 * (0.2 + amount), 6.28319 * (amount), 6.28319 * (amount * 0.5)]).map(function (_) { return 0.5 * _; }).map(function (_) { return 0.5 + _; })).map(function (_) { return _ * amount; });
}
;
function rayMarchSpaceFlower(uv, t, shapeChoice) {
    uv = uv.slice();
    var camPos = [-0.5, 0, 2.0 + 0.5 * (sin(t / 4.0))];
    var ray = normalize([uv[0], uv[1], -1]);
    var rayPos = cloneValue(camPos);
    var rayLen = 0.0;
    var light = [-1, 1, 1];
    var color = [0, 0, 0];
    for (var i = 0; i < 64; ++i) {
        var curDist = scene(rayPos, t, shapeChoice);
        rayLen += 0.6 * curDist;
        (rayPos[0] = camPos[0] + ray[0] * rayLen, rayPos[1] = camPos[1] + ray[1] * rayLen, rayPos[2] = camPos[2] + ray[2] * rayLen, rayPos);
        if (abs(curDist) < 0.001) {
            var n = getNormal(rayPos, t, shapeChoice);
            GetColorAmount(rayPos).map(function (_) { return (max(dot(n, normalize(light)), 0.0)) * _; }).reduce((res, el, i) => (res[i] += el, res), color);
            break;
        }
        ;
        GetColorAmount(rayPos).map(function (_) { return 0.04 * _; }).reduce((res, el, i) => (res[i] += el, res), color);
    }
    ;
    return clamp(dot(color, [0.3333, 0.3333, 0.3333]), 0.0, 1.0);
}
;
function aces_approx(v) {
    v = v.slice();
    max(v, 0.0).map(function (_) { return _ * 0.6; }).reduce((res, el, i) => (res[i] = el, res), v);
    return clamp([(v[0] * (2.51 * v[0] + 0.03)) / (v[0] * (2.43 * v[0] + 0.59) + 0.14), (v[1] * (2.51 * v[1] + 0.03)) / (v[1] * (2.43 * v[1] + 0.59) + 0.14), (v[2] * (2.51 * v[2] + 0.03)) / (v[2] * (2.43 * v[2] + 0.59) + 0.14)], 0.0, 1.0);
}
;
function pathOffset(z) {
    return [...vec2.multiply([], [1.0, sqrt(0.5)], sin([0.31 * z, 0.41 * z])), z];
}
;
function pathDOffset(z) {
    return [...vec2.multiply([], [0.31, 0.41 * sqrt(0.5)], cos([0.31 * z, 0.41 * z])), 1];
}
;
function pathDDOffset(z) {
    return [...vec2.multiply([], [-0.0961, -0.16809999999999997 * sqrt(0.5)], sin([0.31 * z, 0.41 * z])), 0];
}
;
function alphaBlend(back, front) {
    back = back.slice();
    front = front.slice();
    var w = front[3] + back[3] * (1.0 - front[3]);
    return w > 0.0 ? [(front[0] * front[3] + (back[0] * back[3]) * (1.0 - front[3])) / w, (front[1] * front[3] + (back[1] * back[3]) * (1.0 - front[3])) / w, (front[2] * front[3] + (back[2] * back[3]) * (1.0 - front[3])) / w, w] : [0, 0, 0, 0];
}
;
function star5(p, r, rf, sm) {
    p = p.slice();
    (p[0] = -p[0], p[1] = -p[1], p);
    var k1 = [0.809016994375, -0.587785252292];
    var k2 = [-k1[0], k1[1]];
    p[0] = abs(p[0]);
    (p[0] -= (2.0 * (max(dot(k1, p), 0.0))) * k1[0], p[1] -= (2.0 * (max(dot(k1, p), 0.0))) * k1[1], p);
    (p[0] -= (2.0 * (max(dot(k2, p), 0.0))) * k2[0], p[1] -= (2.0 * (max(dot(k2, p), 0.0))) * k2[1], p);
    p[0] = pabs(p[0], sm);
    p[1] -= r;
    var ba = [rf * -k1[1], rf * k1[0] - 1];
    return (length([p[0] - ba[0] * (clamp((dot(p, ba)) / (dot(ba, ba)), 0.0, r)), p[1] - ba[1] * (clamp((dot(p, ba)) / (dot(ba, ba)), 0.0, r))])) * (sign(p[1] * ba[0] - p[0] * ba[1]));
}
;
function getDynamicPalette(n) {
    var maxIdx = uColorCount | 0 - 1;
    var param = (fract(n * 0.1)) * maxIdx;
    var idx = floor(param) | 0;
    var f = fract(param);
    return mix([uColors[idx][0], uColors[idx][1], uColors[idx][2]], [uColors[min(idx + 1, maxIdx)][0], uColors[min(idx + 1, maxIdx)][1], uColors[min(idx + 1, maxIdx)][2]], f);
}
;
function evaluatePlane(pp, npp, pd, n) {
    pp = pp.slice();
    npp = npp.slice();
    var aa = (3.0 * pd) * (distance(pp, npp));
    var p2 = vec2.subtract([], pp, new Float32Array([0, 1].map(function (x, i) { return this[x]; }, pathOffset(n))));
    var dd = dot(new Float32Array([0, 2].map(function (x, i) { return this[x]; }, pathDDOffset(n))), new Float32Array([0, 2].map(function (x, i) { return this[x]; }, pathDOffset(n))));
    (p2 = p2.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, [cos((dd * 3.14159265359) * 5.0), sin((dd * 3.14159265359) * 5.0), -sin((dd * 3.14159265359) * 5.0), cos((dd * 3.14159265359) * 5.0)]));
    var d0 = star5(p2, 0.45, 1.6, 0.2) - 0.02;
    var d2 = length(p2);
    var col = [0, 0, 0, 0];
    col = [0, 1, 2, null].map(function (idx, i) { return idx == null ? col[i] : this[idx]; }, getDynamicPalette(0.5 * n + 2.0 * d2).map(function (_) { return _ * (mix(0.5 / (d2 * d2), 1.0, smoothstep(-0.5 + aa * 200.0, 0.5 + aa * 200.0, sin(d2 * (314.159265359))))); }).map(function (_) { return _ / (max((3.0 * d2) * d2, 1e-1)); }));
    col = [0, 1, 2, null].map(function (idx, i) { return idx == null ? col[i] : this[idx]; }, mix([col[0], col[1], col[2]], [2, 2, 2], smoothstep(aa, -aa, d0 - 0.01)));
    col[3] = smoothstep(aa, -aa, -d0);
    return col;
}
;
function renderStarryPlanes(p, t) {
    p = p.slice();
    var pd = 0.5;
    var tm = pd * t;
    var ro = pathOffset(tm);
    var dro = pathDOffset(tm);
    var ddro = pathDDOffset(tm);
    var ww = normalize(dro);
    var uu = normalize(cross([ddro[0], 1 + ddro[1], ddro[2]], ww));
    var vv = cross(ww, uu);
    var np = [p[0] + 1.0 / uResolution[0], p[1] + 1.0 / uResolution[1]];
    var rd = normalize([p[0] * uu[0] + p[1] * vv[0] + 1.75 * ww[0], p[0] * uu[1] + p[1] * vv[1] + 1.75 * ww[1], p[0] * uu[2] + p[1] * vv[2] + 1.75 * ww[2]]);
    var nrd = normalize([np[0] * uu[0] + np[1] * vv[0] + 1.75 * ww[0], np[0] * uu[1] + np[1] * vv[1] + 1.75 * ww[1], np[0] * uu[2] + np[1] * vv[2] + 1.75 * ww[2]]);
    var nz = floor(ro[2] / pd);
    var acol = [0, 0, 0, 0];
    var aro = cloneValue(ro);
    var apd = 0.0;
    for (var i = 1.0; i <= 16.0; ++i) {
        if (acol[3] > 0.95) {
            break;
        }
        ;
        var pz = pd * nz + pd * i;
        var lpd = (pz - aro[2]) / rd[2];
        var npd = (pz - aro[2]) / nrd[2];
        var pp = [aro[0] + rd[0] * lpd, aro[1] + rd[1] * lpd, aro[2] + rd[2] * lpd];
        var npp = [aro[0] + nrd[0] * npd, aro[1] + nrd[1] * npd, aro[2] + nrd[2] * npd];
        apd += lpd;
        var dz = pp[2] - ro[2];
        var fadeIn = smoothstep(pd * 16.0, pd * 8.0, dz);
        var fadeOut = smoothstep(0.0, pd * 0.1, dz);
        var pcol = evaluatePlane([pp[0], pp[1]], [npp[0], npp[1]], apd, pz);
        pcol[3] *= fadeOut * fadeIn;
        alphaBlend(pcol, acol).reduce((res, el, i) => (res[i] = el, res), acol);
        (aro[0] = pp[0], aro[1] = pp[1], aro[2] = pp[2], aro);
    }
    ;
    var finalC = [acol[0] * acol[3], acol[1] * acol[3], acol[2] * acol[3]];
    return sqrt(aces_approx(finalC));
}
;
function main() {
    var uv = [(gl_FragCoord[0] - 0.5 * uResolution[0]) / uResolution[1], (gl_FragCoord[1] - 0.5 * uResolution[1]) / uResolution[1]];
    var t = uTime * uSpeed;
    if (!((uShapeMode >= 1.5) && (uShapeMode < 2.5) && (uSymmetry > 0.5) && (uKaleidoscopeEnabled > 0.5))) {
        assignComponents(uv, [0, 1], [(cos((uTwist * length(uv)) * 5.0)) * uv[0] + (-sin((uTwist * length(uv)) * 5.0)) * uv[1], (sin((uTwist * length(uv)) * 5.0)) * uv[0] + (cos((uTwist * length(uv)) * 5.0)) * uv[1]]);
    }
    ;
    (applyKaleidoscope(uv, uBandCount, uSymmetry, uKaleidoscopeEnabled), [uv] = applyKaleidoscope.__out__, applyKaleidoscope.__return__);
    var grainShape = 0.0;
    var shape_uv = [uv[0] * 3.0, uv[1] * 3.0];
    if (uShapeMode < 0.5) {
        var wave = (cos(0.5 * shape_uv[0] - 4.0 * t)) * (sin(1.5 * shape_uv[0] + 2.0 * t)) * (0.75 + 0.25 * (cos(6.0 * t)));
        grainShape = 1.0 - smoothstep(-1.0, 1.0, shape_uv[1] + wave);
    }
    else {
        if (uShapeMode < 1.5) {
            var stripeIdx = floor((2.0 * shape_uv[0]) / 6.28318530718);
            var randVal = hash([stripeIdx * 100.0, stripeIdx + 3.1]);
            randVal = (sign(randVal - 0.5)) * (pow(4.0 * abs(randVal), 0.3));
            grainShape = pow(abs(sin(shape_uv[0]) * (cos(shape_uv[1] - (5.0 * randVal) * t))), 4.0);
        }
        else {
            if (uShapeMode < 2.5) {
                var n2 = valueNoiseR([shape_uv[0] * 0.4 - 3.75 * t, shape_uv[1] * 0.4 - 3.75 * t]) - 0.5;
                shape_uv[0] += 10.0;
                shape_uv = [shape_uv[0] * 0.6, shape_uv[1] * 0.6];
                var tile = truchet(fract(shape_uv), hash(floor(shape_uv)));
                grainShape = (smoothstep(0.2, 0.55, length(tile) + n2 * 0.1)) * (1.0 - smoothstep(0.45, 0.8, length(tile) - n2 * 0.1)) + (smoothstep(0.2, 0.55, length([tile[0] - 1, tile[1] - 1]) + n2 * 0.1)) * (1.0 - smoothstep(0.45, 0.8, length([tile[0] - 1, tile[1] - 1]) - n2 * 0.1));
                grainShape = pow(grainShape, 1.5);
            }
            else {
                if (uShapeMode < 3.5) {
                    grainShape = (sin((pow(length(shape_uv), 1.2)) * 5.0 - 3.0 * t)) * 0.5 + 0.5;
                }
                else {
                    if (uShapeMode < 4.5) {
                        grainShape = rayMarchSpaceFlower(uv, t * uRaySpeed, uRayShape);
                    }
                    else {
                        grainShape = clamp(dot(renderStarryPlanes(uv, t), [0.3333, 0.3333, 0.3333]), 0.0, 1.0);
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
    }
    ;
    grainShape += (uNoise * 0.2) * (hash11(gl_FragCoord[0] * uNoise + gl_FragCoord[1]) - 0.5) + (uNoise * 0.1) * (hash11(gl_FragCoord[1] + t) - 0.5);
    var grain_uv = [(uv[0] * uDistortion) * 15.0, (uv[1] * uDistortion) * 15.0];
    var fbmVals = fbmR([0.002 * grain_uv[0] + 10.0, 0.002 * grain_uv[1] + 10.0], [0.003 * grain_uv[0], 0.003 * grain_uv[1]], [0.001 * grain_uv[0], 0.001 * grain_uv[1]], [cos(0.4) * grain_uv[0] + -sin(0.4) * grain_uv[1], sin(0.4) * grain_uv[0] + cos(0.4) * grain_uv[1]]);
    grainShape += (uProportion * 2.0) / (max(1.0, uColorCount)) * ((snoise([grain_uv[0] * 0.5, grain_uv[1] * 0.5])) * (snoise([grain_uv[0] * 0.2, grain_uv[1] * 0.2])) - fbmVals[0] - fbmVals[1] + 0.5) + (uNoise * 10.0) / (max(1.0, uColorCount)) * (clamp(0.75 * (snoise([grain_uv[0] * 0.5, grain_uv[1] * 0.5])) - fbmVals[3] - fbmVals[2], 0.0, 1.0));
    var aa = fwidth(grainShape);
    grainShape = clamp(grainShape - 0.5 / (max(1.0, uColorCount)), 0.0, 1.0);
    var totalShape = smoothstep(0.0, uSoftness + 2.0 * aa, clamp(grainShape * uColorCount, 0.0, 1.0));
    var mixer = grainShape * (uColorCount - 1.0);
    var cntStop = uColorCount | 0 - 1;
    var gradientColor = cloneValue(uColors[0]);
    gradientColor = [gradientColor[0] * gradientColor[3], gradientColor[1] * gradientColor[3], gradientColor[2] * gradientColor[3], gradientColor[3]];
    for (var i = 1; i < 10; i++) {
        if (i > cntStop) {
            break;
        }
        ;
        var localT = smoothstep(0.5 - 0.5 * uSoftness - aa, 0.5 + 0.5 * uSoftness + aa, clamp(mixer - i - 1, 0.0, 1.0));
        var c = cloneValue(uColors[i]);
        c = [c[0] * c[3], c[1] * c[3], c[2] * c[3], c[3]];
        mix(gradientColor, c, localT).reduce((res, el, i) => (res[i] = el, res), gradientColor);
    }
    ;
    var finalGrainRGB = [gradientColor[0] * totalShape, gradientColor[1] * totalShape, gradientColor[2] * totalShape];
    var hsv = rgb2hsv(finalGrainRGB);
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    var mixRGB = hsv2rgb(hsv);
    if ((uShapeMode >= 3.5) && (uShapeMode < 4.5)) {
        mix(mixRGB, GetColorAmount([uv[0], uv[1], grainShape]), uRayMix).reduce((res, el, i) => (res[i] = el, res), mixRGB);
    }
    else {
        if (uShapeMode >= 4.5) {
            mix(mixRGB, renderStarryPlanes(uv, t), uDarken).reduce((res, el, i) => (res[i] = el, res), mixRGB);
        }
        ;
    }
    ;
    var bgRGB = [uColorBack[0] * uColorBack[3], uColorBack[1] * uColorBack[3], uColorBack[2] * uColorBack[3]];
    [...mix(bgRGB, mixRGB, mix(totalShape, grainShape, uDarken)), clamp(gradientColor[3] * totalShape + (grainShape * uDarken), 0.0, 1.0)].reduce((res, el, i) => (res[i] = el, res), fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
vUV=cloneValue(UV);
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"gridAttractor": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
var uTime = cloneValue(U.uTime);
var uResolution = cloneValue(U.uResolution);
var uSpeed = cloneValue(U.uSpeed);
var uCellSize = cloneValue(U.uCellSize);
var uSphereSize = cloneValue(U.uSphereSize);
var uBoxHeight = cloneValue(U.uBoxHeight);
var uPulseHeight = cloneValue(U.uPulseHeight);
var uColorSphere = cloneValue(U.uColorSphere);
var uColorTop = cloneValue(U.uColorTop);
var uColorSide = cloneValue(U.uColorSide);
var uColorFront = cloneValue(U.uColorFront);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
var MAX_DIST = 1000.0;
var SURF_DIST = 0.0001;
var EPS = 0.0001;
var PI2 = 6.283185307;
function gaRand(co) {
    co = co.slice();
    return fract((sin(dot(co, [12.9898, 78.233]))) * 43758.5453);
}
;
function gaSdSphere(p, s) {
    p = p.slice();
    return length(p) - s;
}
;
function gaSdBox(p, b) {
    p = p.slice();
    b = b.slice();
    var q = vec3.subtract([], abs(p), b);
    return length(max(q, 0.0)) + min(max(q[0], max(q[1], q[2])), 0.0);
}
;
function gaMinMat(d1, d2) {
    d1 = d1.slice();
    d2 = d2.slice();
    return (d1[0] < d2[0]) ? d1 : d2;
}
;
function gaScene(p) {
    p = p.slice();
    var d = [100000.0, 0.0];
    var t = uTime * uSpeed;
    var q = cloneValue(p);
    var rep = cloneValue(uCellSize);
    var spo = [(sin(t * 1.8)) * 0.25, 0.32, (cos(t * 2.2)) * 0.3];
    var sp = [q[0] - spo[0], q[1] - spo[1], q[2] - spo[2]];
    d[0] = gaSdSphere(sp, uSphereSize);
    var id = floor([q[0] / rep, q[2] / rep]);
    var hash = gaRand([id[0] * 0.001, id[1] * 0.001]);
    q = [0, null, 1].map(function (idx, i) { return idx == null ? q[i] : this[idx]; }, mod([q[0], q[2]], rep).map(function (_) { return _ - rep * 0.5; }));
    var bcp = [0, 0, 0];
    bcp = [id[0] * rep + rep * 0.5, bcp[1], id[1] * rep + rep * 0.5];
    var bsDist = length([spo[0] - bcp[0], spo[2] - bcp[2]]);
    var s = smoothstep(0.0, 0.5, bsDist);
    (q[0] -= 0, q[1] -= uBoxHeight * 1.25 - ((sin(hash * PI2 + t * (2.0 + bsDist * 0.015))) * uPulseHeight) * (1.0 - pow(s, 0.9)), q[2] -= 0, q);
    gaMinMat(d, [gaSdBox(q, [rep * 0.5, uBoxHeight, rep * 0.5]), 1.0]).reduce((res, el, i) => (res[i] = el, res), d);
    return d;
}
;
function gaGetNormal(p) {
    p = p.slice();
    var e = [EPS, 0.0];
    return normalize([gaScene([p[0] + e[0], p[1] + e[1], p[2] + e[1]])[0] - gaScene([p[0] - e[0], p[1] - e[1], p[2] - e[1]])[0], gaScene([p[0] + e[1], p[1] + e[0], p[2] + e[1]])[0] - gaScene([p[0] - e[1], p[1] - e[0], p[2] - e[1]])[0], gaScene([p[0] + e[1], p[1] + e[1], p[2] + e[0]])[0] - gaScene([p[0] - e[1], p[1] - e[1], p[2] - e[0]])[0]]);
}
;
function gaRaymarch(ro, rd, side) {
    ro = ro.slice();
    rd = rd.slice();
    var accDist = 0.0;
    var mat = 0.0;
    var rep = cloneValue(uCellSize);
    for (var i = 0; i < 128; i++) {
        var p = [ro[0] + rd[0] * accDist, ro[1] + rd[1] * accDist, ro[2] + rd[2] * accDist];
        var result = gaScene(p);
        var dist = result[0] * side;
        var rdi = [1.0 / rd[0], 1.0 / rd[1], 1.0 / rd[2]];
        mat = result[1];
        if ((abs(dist) < SURF_DIST) || (accDist > MAX_DIST)) {
            break;
        }
        ;
        accDist += min(min((step(0.0, rd[0]) - mod(p[0], rep)) * rdi[0], (step(0.0, rd[2]) - mod(p[2], rep)) * rdi[2]) + 0.0001, dist);
    }
    ;
    return [accDist, mat];
}
;
function gaGetRayDir(uv, p, l, z) {
    uv = uv.slice();
    p = p.slice();
    l = l.slice();
    var forward = normalize([l[0] - p[0], l[1] - p[1], l[2] - p[2]]);
    var right = normalize(cross(forward, [0, 1, 0]));
    var up = normalize(cross(right, forward));
    return normalize([right[0] * uv[0] + up[0] * uv[1] + forward[0] * z, right[1] * uv[0] + up[1] * uv[1] + forward[1] * z, right[2] * uv[0] + up[2] * uv[1] + forward[2] * z]);
}
;
function main() {
    var uv = [(gl_FragCoord[0] * 2.0 - uResolution[0]) / (min(uResolution[0], uResolution[1])), (gl_FragCoord[1] * 2.0 - uResolution[1]) / (min(uResolution[0], uResolution[1]))];
    var ro = [1, 1, 1.2];
    var ta = [0, 0.2, 0];
    var rd = gaGetRayDir(uv, ro, ta, 3.5);
    var result = gaRaymarch(ro, rd, 1.0);
    var dist = cloneValue(result[0]);
    var mat = cloneValue(result[1]);
    var col = [0, 0, 0];
    var alpha = 0.0;
    if (dist < MAX_DIST) {
        var p = [ro[0] + rd[0] * dist, ro[1] + rd[1] * dist, ro[2] + rd[2] * dist];
        var l = normalize([1, 1, -1]);
        var n = gaGetNormal(p);
        var diffuse = (dot(l, n)) * 0.5 + 0.5;
        var diffuseColor = [0, 0, 0];
        if (mat < 0.5) {
            (diffuseColor[0] = diffuse * uColorSphere[0], diffuseColor[1] = diffuse * uColorSphere[1], diffuseColor[2] = diffuse * uColorSphere[2], diffuseColor);
        }
        else {
            (diffuseColor[0] = diffuse * uColorSide[0], diffuseColor[1] = diffuse * uColorSide[1], diffuseColor[2] = diffuse * uColorSide[2], diffuseColor);
            if (n[0] > 0.5) {
                (diffuseColor[0] = diffuse * uColorSide[0], diffuseColor[1] = diffuse * uColorSide[1], diffuseColor[2] = diffuse * uColorSide[2], diffuseColor);
            }
            ;
            if (n[1] > 0.5) {
                (diffuseColor[0] = diffuse * uColorTop[0], diffuseColor[1] = diffuse * uColorTop[1], diffuseColor[2] = diffuse * uColorTop[2], diffuseColor);
            }
            ;
            if (n[2] > 0.5) {
                (diffuseColor[0] = diffuse * uColorFront[0], diffuseColor[1] = diffuse * uColorFront[1], diffuseColor[2] = diffuse * uColorFront[2], diffuseColor);
            }
            ;
        }
        ;
        (col[0] = diffuseColor[0], col[1] = diffuseColor[1], col[2] = diffuseColor[2], col);
        alpha = 1.0;
    }
    ;
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    pow(col, [0.4545, 0.4545, 0.4545]).reduce((res, el, i) => (res[i] = el, res), col);
    gl_FragColor = [col[0], col[1], col[2], alpha];
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
MAX_DIST=1000.0;
SURF_DIST=0.0001;
EPS=0.0001;
PI2=6.283185307;
main();return Array.from(gl_FragColor); };
},
"tunnelCylinders": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function ceil(x) {
    if (x.length)
        return x.map(ceil);
    return Math.ceil(x);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uTravelSpeed = cloneValue(U.uTravelSpeed);
var uTunnelRadius = cloneValue(U.uTunnelRadius);
var uSegments = cloneValue(U.uSegments);
var uRingFrequency = cloneValue(U.uRingFrequency);
var uCylinderThickness = cloneValue(U.uCylinderThickness);
var uThicknessVariation = cloneValue(U.uThicknessVariation);
var uGlowIntensity = cloneValue(U.uGlowIntensity);
var uTunnelMix = cloneValue(U.uTunnelMix);
var uSwirlMix = cloneValue(U.uSwirlMix);
var uSpiralMix = cloneValue(U.uSpiralMix);
var uSwirlBandCount = cloneValue(U.uSwirlBandCount);
var uSwirlTwist = cloneValue(U.uSwirlTwist);
var uSpiralRibbonCount = cloneValue(U.uSpiralRibbonCount);
var uSpiralDensity = cloneValue(U.uSpiralDensity);
var uSpiralDistortion = cloneValue(U.uSpiralDistortion);
var uNoiseIntensity = cloneValue(U.uNoiseIntensity);
var uNoiseScale = cloneValue(U.uNoiseScale);
var uNoiseSpeed = cloneValue(U.uNoiseSpeed);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function paletteColor(t) {
    var m = (clamp(t * 0.5 + 0.5, 0.0, 1.0)) * uColorCount;
    var grad = cloneValue(uColors[0]);
    grad = [grad[0] * grad[3], grad[1] * grad[3], grad[2] * grad[3], grad[3]];
    for (var i = 1; i < 10; i++) {
        if (i > uColorCount) {
            break;
        }
        ;
        var mm = clamp(m - i - 1, 0.0, 1.0);
        mm = smoothstep(0.15, 0.85, mm);
        var c = cloneValue(uColors[i - 1]);
        c = [c[0] * c[3], c[1] * c[3], c[2] * c[3], c[3]];
        mix(grad, c, mm).reduce((res, el, i) => (res[i] = el, res), grad);
    }
    ;
    return [grad[0], grad[1], grad[2]];
}
;
function permute3(x) {
    x = x.slice();
    return mod([((x[0] * 34.0) + 1.0) * x[0], ((x[1] * 34.0) + 1.0) * x[1], ((x[2] * 34.0) + 1.0) * x[2]], 289.0);
}
;
function snoise(v) {
    v = v.slice();
    var C = [0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439];
    var i = floor([v[0] + dot(v, [C[1], C[1]]), v[1] + dot(v, [C[1], C[1]])]);
    var x0 = [v[0] - i[0] + dot(i, [C[0], C[0]]), v[1] - i[1] + dot(i, [C[0], C[0]])];
    var i1 = (x0[0] > x0[1]) ? [1.0, 0.0] : [0.0, 1.0];
    var x12 = [x0[0] + C[0], x0[1] + C[0], x0[0] + C[2], x0[1] + C[2]];
    x12 = [x12[0] - i1[0], x12[1] - i1[1], x12[2], x12[3]];
    mod(i, 289.0).reduce((res, el, i) => (res[i] = el, res), i);
    var p = permute3(vec3.add([], permute3([i[1], i[1] + i1[1], i[1] + 1]).map(function (_) { return _ + i[0]; }), [0, i1[0], 1]));
    var m = max([0.5 - dot(x0, x0), 0.5 - dot([x12[0], x12[1]], [x12[0], x12[1]]), 0.5 - dot([x12[2], x12[3]], [x12[2], x12[3]])], 0.0);
    (m[0] = m[0] * m[0], m[1] = m[1] * m[1], m[2] = m[2] * m[2], m);
    (m[0] = m[0] * m[0], m[1] = m[1] * m[1], m[2] = m[2] * m[2], m);
    var x = fract([p[0] * C[3], p[1] * C[3], p[2] * C[3]]).map(function (_) { return 2.0 * _; }).map(function (_) { return _ - 1.0; });
    var h = abs(x).map(function (_) { return _ - 0.5; });
    var ox = floor([x[0] + 0.5, x[1] + 0.5, x[2] + 0.5]);
    var a0 = [x[0] - ox[0], x[1] - ox[1], x[2] - ox[2]];
    (m[0] *= 1.79284291400159 - 0.85373472095314 * (a0[0] * a0[0] + h[0] * h[0]), m[1] *= 1.79284291400159 - 0.85373472095314 * (a0[1] * a0[1] + h[1] * h[1]), m[2] *= 1.79284291400159 - 0.85373472095314 * (a0[2] * a0[2] + h[2] * h[2]), m);
    var g = [0, 0, 0];
    g[0] = a0[0] * x0[0] + h[0] * x0[1];
    g = [g[0], a0[1] * x12[0] + h[1] * x12[1], a0[2] * x12[2] + h[2] * x12[3]];
    return 130.0 * (dot(m, g));
}
;
var tcT = 0;
var tcH = [0, 0, 0];
var tcVar = 0;
function modA(p, count) {
    p = p.slice();
    var an = 6.28318530718 / count;
    var a = atan(p[1], p[0]) + an * 0.5;
    a = mod(a, an) - an * 0.5;
    return [cos(a) * length(p), sin(a) * length(p)];
}
;
function scene(p) {
    p = p.slice();
    var op = cloneValue(p);
    var ang = atan(p[0], p[1]);
    var rad = length([p[0], p[1]]);
    var tunnelVar = cos(ang + floor(p[2]) + tcT * ((mod(floor(p[2]), 2.0) - 1.0) == 0.0 ? -1.0 : 1.0));
    var bands = ceil(max(uSwirlBandCount, 1.0));
    var swirlAngNorm = (bands * ang + tcT * 2.0) / 6.28318530718;
    var twistAmt = 3.0 * (clamp(uSwirlTwist, 0.0, 1.0));
    var swirlOffset = pow(max(rad, 1e-3), -twistAmt) + swirlAngNorm;
    var swirlShape = fract(swirlOffset);
    swirlShape = 1.0 - abs(2.0 * swirlShape - 1.0);
    var swirlVar = swirlShape * 2.0 - 1.0;
    var spiralRibbons = max(floor(uSpiralRibbonCount / 10.0 + 0.5), 1.0);
    var depth = p[2] * uSpiralDensity + tcT * (uTravelSpeed * 0.5);
    var spiralVar = (sin(ang * spiralRibbons + depth)) * (cos(depth * uSpiralDistortion));
    var wSum = max(uTunnelMix + uSwirlMix + uSpiralMix, 0.0001);
    var variationField = (tunnelVar * uTunnelMix + swirlVar * uSwirlMix + spiralVar * uSpiralMix) / wSum;
    if (uNoiseIntensity > 0.0001) {
        var noiseCoord = [(ang * 1.5) * uNoiseScale, (p[2] * 0.35 + tcT * uNoiseSpeed) * uNoiseScale];
        variationField += snoise(noiseCoord) * uNoiseIntensity;
    }
    ;
    tcVar = variationField;
    var dist_cylinder = 1e5;
    var mind = rad - uTunnelRadius + 0.1 * variationField;
    mind = max(mind, -(rad - (uTunnelRadius - 0.1) + 0.1 * variationField));
    p = [0, 1, null].map(function (idx, i) { return idx == null ? p[i] : this[idx]; }, modA([p[1], p[0]], uSegments + uSegments * (sin(p[2] * 0.25))));
    p[2] = fract(p[2] * uRingFrequency) - 0.5;
    if (variationField != 0.0) {
        dist_cylinder = length([p[2], p[1]]) - uCylinderThickness - uThicknessVariation * (sin(op[2] * 5.5));
        dist_cylinder = max(dist_cylinder, -p[0] + 0.4 + clamp(variationField, 0.0, 1.0));
    }
    ;
    mind = min(mind, dist_cylinder);
    (tcH[0] += ((0.5 * (variationField != 0.0 ? 1.0 : 0.0)) * 0.0125) / (0.01 + (max(mind - variationField * 0.1, 0.0001)) * (max(mind - variationField * 0.1, 0.0001))), tcH[1] += ((0.8 * (variationField != 0.0 ? 1.0 : 0.0)) * 0.0125) / (0.01 + (max(mind - variationField * 0.1, 0.0001)) * (max(mind - variationField * 0.1, 0.0001))), tcH[2] += ((0.5 * (variationField != 0.0 ? 1.0 : 0.0)) * 0.0125) / (0.01 + (max(mind - variationField * 0.1, 0.0001)) * (max(mind - variationField * 0.1, 0.0001))), tcH);
    return mind;
}
;
function march(pos, dir) {
    pos = pos.slice();
    dir = dir.slice();
    var dist = [0.0, 0.0];
    var p = [0, 0, 0];
    var s = [0.0, 0.0];
    for (var i = -1.0; i < 200.0; ++i) {
        (p[0] = pos[0] + dir[0] * dist[1], p[1] = pos[1] + dir[1] * dist[1], p[2] = pos[2] + dir[2] * dist[1], p);
        dist[0] = scene(p);
        dist[1] += dist[0] * 0.2;
        if ((dist[0] < 0.0001) || (dist[1] > 50.0)) {
            break;
        }
        ;
        s[0]++;
    }
    ;
    s[1] = dist[1];
    return s;
}
;
function tunnelCamera(uv) {
    uv = uv.slice();
    var forw = [0, 0, -1];
    var right = [1, 0, 0];
    var up = [0, 1, 0];
    return normalize([uv[0] * right[0] + uv[1] * up[0] + forw[0], uv[0] * right[1] + uv[1] * up[1] + forw[1], uv[0] * right[2] + uv[1] * up[2] + forw[2]]);
}
;
function main() {
    tcT = uTime * uSpeed;
    (tcH[0] = 0, tcH[1] = 0, tcH[2] = 0, tcH);
    var R = cloneValue(uResolution);
    var uv = [(gl_FragCoord[0] - R[0] * 0.5) / R[1], (gl_FragCoord[1] - R[1] * 0.5) / R[1]];
    var dir = tunnelCamera(uv);
    var pos = [0, 0, 4.5 - uTime * uTravelSpeed];
    var inter = march(pos, dir);
    var col = [0, 0, 0];
    if (inter[1] <= 50.0) {
        paletteColor(tcVar).map(function (_) { return _ * (1.0 - inter[0] * 0.0025); }).reduce((res, el, i) => (res[i] = el, res), col);
    }
    ;
    (col[0] += (tcH[0] * 0.005125) * uGlowIntensity, col[1] += (tcH[1] * 0.005125) * uGlowIntensity, col[2] += (tcH[2] * 0.005125) * uGlowIntensity, col);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    var alpha = clamp((dot(col, [0.2126, 0.7152, 0.0722])) * 1.6, 0.0, 1.0);
    (fragColor[0] = col[0] * alpha, fragColor[1] = col[1] * alpha, fragColor[2] = col[2] * alpha, fragColor[3] = alpha, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
tcT=0;
tcH=[0, 0, 0];
tcVar=0;
main();return Array.from(fragColor); };
},
"psychedelicFlowerTunnel": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uTravelSpeed = cloneValue(U.uTravelSpeed);
var uRepeatSpacing = cloneValue(U.uRepeatSpacing);
var uBoxSize = cloneValue(U.uBoxSize);
var uEdgeThickness = cloneValue(U.uEdgeThickness);
var uScaleFactor = cloneValue(U.uScaleFactor);
var uIterations = cloneValue(U.uIterations);
var uPetalCount = cloneValue(U.uPetalCount);
var uRotationSpeed = cloneValue(U.uRotationSpeed);
var uFov = cloneValue(U.uFov);
var uFogDensity = cloneValue(U.uFogDensity);
var uColorShiftSpeed = cloneValue(U.uColorShiftSpeed);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uColorBack = cloneValue(U.uColorBack);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
var stopThreshold = .0001;
function minMat(d1, d2) {
    d1 = d1.slice();
    d2 = d2.slice();
    return (d1[0] < d2[0]) ? d1 : d2;
}
;
function n3(p) {
    p = p.slice();
    var r = [1, 99, 999];
    var s = [dot(floor(p), r), dot(floor(p), r) + r[1], dot(floor(p), r) + r[2], dot(floor(p), r) + r[1] + r[2]];
    smoothstep(0.0, 1.0, fract(p)).reduce((res, el, i) => (res[i] = el, res), p);
    var a = mix(fract(sin(s).map(function (_) { return _ * 5555.0; })), fract(sin([s[0] + 1.0, s[1] + 1.0, s[2] + 1.0, s[3] + 1.0]).map(function (_) { return _ * 5555.0; })), p[0]);
    var b = mix([a[0], a[2]], [a[1], a[3]], p[1]);
    return mix(b[0], b[1], p[2]);
}
;
function rot(a) {
    var c = cos(a), s = sin(a);
    return [c, s, -s, c];
}
;
function sdBox(p, b) {
    p = p.slice();
    b = b.slice();
    var d = vec3.subtract([], abs(p), b);
    return length(max(d, 0.0)) + min(max(d[0], max(d[1], d[2])), 0.0);
}
;
function opSub(d1, d2) {
    return max(-d1, d2);
}
;
function sdWireBox(p, s, b) {
    p = p.slice();
    var d = 0.0;
    var o = s + 0.01;
    var i = s - b;
    d = opSub(sdBox(p, [o, i, i]), sdBox(p, [s, s, s]));
    d = opSub(sdBox(p, [i, o, i]), d);
    d = opSub(sdBox(p, [i, i, o]), d);
    return d;
}
;
function pmod(p, r) {
    p = p.slice();
    var a = atan(p[0], p[1]) + 3.1415 / r;
    var n = 6.283 / r;
    a = (floor(a / n)) * n;
    return [dot(p, rot(-a).slice(0, 2)), dot(p, rot(-a).slice(2, 4))];
}
;
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function paletteColor(t) {
    var m = (clamp(t, 0.0, 1.0)) * uColorCount;
    var grad = cloneValue(uColors[0]);
    grad = [grad[0] * grad[3], grad[1] * grad[3], grad[2] * grad[3], grad[3]];
    for (var i = 1; i < 10; i++) {
        if (i > uColorCount) {
            break;
        }
        ;
        var mm = clamp(m - i - 1, 0.0, 1.0);
        mm = smoothstep(0.15, 0.85, mm);
        var c = cloneValue(uColors[i - 1]);
        c = [c[0] * c[3], c[1] * c[3], c[2] * c[3], c[3]];
        mix(grad, c, mm).reduce((res, el, i) => (res[i] = el, res), grad);
    }
    ;
    return [grad[0], grad[1], grad[2]];
}
;
var m_ = 0;
function sceneMap(p) {
    p = p.slice();
    var d = 0.0;
    var _p = cloneValue(p);
    mod(_p, uRepeatSpacing).map(function (_) { return _ - uRepeatSpacing * .5; }).reduce((res, el, i) => (res[i] = el, res), _p);
    d = sdWireBox(_p, uBoxSize, uEdgeThickness);
    var obj = [d, 1.0];
    _p = [0, 1, null].map(function (idx, i) { return idx == null ? _p[i] : this[idx]; }, pmod([_p[0], _p[1]], max(uPetalCount, 1.0)));
    var size = [1, 1, 1];
    for (var i = 0; i < 12; i++) {
        if (i >= uIterations) {
            break;
        }
        ;
        _p[1] -= size[0] * 0.32;
        _p[1] -= size[1];
        assignComponents(_p, [0, 2], [_p[0], _p[2]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, rot(((sin(uTime * uRotationSpeed + i * uRotationSpeed)) * 3.1415) * 2.0)));
        var currentDist = sdWireBox(p, uBoxSize * size[1], uEdgeThickness * size[1]);
        var currentObj = [currentDist, i + 1.0];
        m_ = minMat(obj, currentObj)[1];
        obj[0] = min(obj[0], currentObj[0]);
        obj[1] = m_;
        (p[0] = _p[0], p[1] = _p[1], p[2] = _p[2], p);
        size = [size[0] * uScaleFactor, size[1] * uScaleFactor, size[2] * uScaleFactor];
    }
    ;
    return obj;
}
;
function lookCamera(o, t, u) {
    o = o.slice();
    t = t.slice();
    u = u.slice();
    var forward = normalize([t[0] - o[0], t[1] - o[1], t[2] - o[2]]);
    var right = cross(forward, u);
    var up = cross(right, forward);
    return [...right, ...up, ...forward];
}
;
function getNormal(p, e) {
    p = p.slice();
    var eo = [e, 0.0];
    return normalize([sceneMap([p[0] + eo[0], p[1] + eo[1], p[2] + eo[1]])[0] - sceneMap([p[0] - eo[0], p[1] - eo[1], p[2] - eo[1]])[0], sceneMap([p[0] + eo[1], p[1] + eo[0], p[2] + eo[1]])[0] - sceneMap([p[0] - eo[1], p[1] - eo[0], p[2] - eo[1]])[0], sceneMap([p[0] + eo[1], p[1] + eo[1], p[2] + eo[0]])[0] - sceneMap([p[0] - eo[1], p[1] - eo[1], p[2] - eo[0]])[0]]);
}
;
function applyFog(color, distance, fogColor, density) {
    color = color.slice();
    fogColor = fogColor.slice();
    var fogAmount = 1.0 - exp(-distance * density);
    return mix(color, fogColor, fogAmount);
}
;
function main() {
    var uv = [(gl_FragCoord[0] - uResolution[0] * 0.5) / (min(uResolution[0], uResolution[1])), (gl_FragCoord[1] - uResolution[1] * 0.5) / (min(uResolution[0], uResolution[1]))];
    var nois = (n3([...normalize(uv).map(function (_) { return _ * 20.0; }), 1]) + (n3([...normalize(uv).map(function (_) { return _ * 40.0; }), 2])) * 1.5 + (n3([...normalize(uv).map(function (_) { return _ * 100.0; }), 3])) * 1.5) / 4.0;
    nois = (pow(nois, 4.0)) * 2.0 - 1.0;
    var flightPhase = (uTime * uSpeed) * 0.11 + (nois * 0.01 + (n3([uv[0] * 600.0, uv[1] * 600.0, 0])) * 0.003) * (pow(dot(uv, uv), 0.3));
    var movement = [0, 0, (flightPhase * 50.0) * uTravelSpeed];
    var ro = [6 + movement[0], 6 + movement[1], 4 + movement[2]];
    var target = [ro[0] + movement[0], ro[1] + movement[1], ro[2] + movement[2]];
    var up = [0, 1, 0];
    assignComponents(up, [0, 1], [up[0], up[1]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, rot((uTime * uRotationSpeed) * 0.3)));
    var rd = normalize([uv[0], uv[1], uFov]).map(function (x, i, v) { var sum = 0; for (var j = 0; j < 3; j++) {
        sum += this[j * 3 + i] * v[j];
    } return sum; }, lookCamera(ro, target, up));
    var depth = 0.0;
    var dist = 0.0;
    var result = [0.0, 0.0];
    for (var i = 0; i < 64; i++) {
        sceneMap([ro[0] + rd[0] * depth, ro[1] + rd[1] * depth, ro[2] + rd[2] * depth]).reduce((res, el, i) => (res[i] = el, res), result);
        dist = result[0];
        if (dist < stopThreshold) {
            break;
        }
        ;
        depth += result[0];
    }
    ;
    var position = [ro[0] + rd[0] * depth, ro[1] + rd[1] * depth, ro[2] + rd[2] * depth];
    var normal = getNormal(position, 0.01);
    var bgColor = [uColorBack[0], uColorBack[1], uColorBack[2]];
    var sceneColor = [0, 0, 0];
    if (dist >= stopThreshold) {
        (sceneColor[0] = bgColor[0], sceneColor[1] = bgColor[1], sceneColor[2] = bgColor[2], sceneColor);
    }
    else {
        vec3.add([], paletteColor(fract(result[1] / (max(uIterations, 1.0)))).map(function (_) { return _ * ((max(0.0, dot(normal, normalize([-0.2, 0.2, -1])))) * 0.8); }), [0.2, 0.2, 0.2]).reduce((res, el, i) => (res[i] = el, res), sceneColor);
    }
    ;
    applyFog(sceneColor, depth, bgColor, uFogDensity).reduce((res, el, i) => (res[i] = el, res), sceneColor);
    sceneColor = [sceneColor[0] * (smoothstep(1.3, 0.6, length(uv))), sceneColor[1] * (smoothstep(1.3, 0.6, length(uv))), sceneColor[2] * (smoothstep(1.3, 0.6, length(uv)))];
    var hsv = rgb2hsv(clamp(sceneColor, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0 + (uTime * uColorShiftSpeed) * 0.05);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), sceneColor);
    (fragColor[0] = sceneColor[0], fragColor[1] = sceneColor[1], fragColor[2] = sceneColor[2], fragColor[3] = uColorBack[3], fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
stopThreshold=.0001;
m_=0;
main();return Array.from(fragColor); };
},
"celestialJourney": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function exp2(x) {
    if (x.length)
        return x.map(exp2);
    return Math.pow(2, x);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uCameraSpeed = cloneValue(U.uCameraSpeed);
var uFocalLength = cloneValue(U.uFocalLength);
var uMaxDistance = cloneValue(U.uMaxDistance);
var uTunnelRadius = cloneValue(U.uTunnelRadius);
var uTunnelRoughness = cloneValue(U.uTunnelRoughness);
var uVolumeDensity = cloneValue(U.uVolumeDensity);
var uGlowStrength = cloneValue(U.uGlowStrength);
var uExposure = cloneValue(U.uExposure);
var uColor1 = cloneValue(U.uColor1);
var uColor2 = cloneValue(U.uColor2);
var uColor3 = cloneValue(U.uColor3);
var uColor4 = cloneValue(U.uColor4);
var uColor5 = cloneValue(U.uColor5);
var uColor6 = cloneValue(U.uColor6);
var uColor7 = cloneValue(U.uColor7);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
var VOLUME_STEPS = 106;
var INV_LN2 = 1.44269504089;
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function saturateF(value) {
    return clamp(value, 0.0, 1.0);
}
;
function rotation2(angle) {
    var sineValue = sin(angle);
    var cosineValue = cos(angle);
    return [cosineValue, -sineValue, sineValue, cosineValue];
}
;
function hash31(position) {
    position = position.slice();
    fract([position[0] * 0.1031, position[1] * 0.1031, position[2] * 0.1031]).reduce((res, el, i) => (res[i] = el, res), position);
    position = [position[0] + dot(position, [position[1] + 33.33, position[2] + 33.33, position[0] + 33.33]), position[1] + dot(position, [position[1] + 33.33, position[2] + 33.33, position[0] + 33.33]), position[2] + dot(position, [position[1] + 33.33, position[2] + 33.33, position[0] + 33.33])];
    return fract((position[0] + position[1]) * position[2]);
}
;
function noise3(position) {
    position = position.slice();
    var cell = floor(position);
    var localPosition = fract(position);
    (localPosition[0] = (localPosition[0] * localPosition[0]) * (3.0 - 2.0 * localPosition[0]), localPosition[1] = (localPosition[1] * localPosition[1]) * (3.0 - 2.0 * localPosition[1]), localPosition[2] = (localPosition[2] * localPosition[2]) * (3.0 - 2.0 * localPosition[2]), localPosition);
    var value000 = hash31([cell[0], cell[1], cell[2]]);
    var value100 = hash31([cell[0] + 1, cell[1], cell[2]]);
    var value010 = hash31([cell[0], cell[1] + 1, cell[2]]);
    var value110 = hash31([cell[0] + 1, cell[1] + 1, cell[2]]);
    var value001 = hash31([cell[0], cell[1], cell[2] + 1]);
    var value101 = hash31([cell[0] + 1, cell[1], cell[2] + 1]);
    var value011 = hash31([cell[0], cell[1] + 1, cell[2] + 1]);
    var value111 = hash31([cell[0] + 1, cell[1] + 1, cell[2] + 1]);
    var valueX00 = mix(value000, value100, localPosition[0]);
    var valueX10 = mix(value010, value110, localPosition[0]);
    var valueX01 = mix(value001, value101, localPosition[0]);
    var valueX11 = mix(value011, value111, localPosition[0]);
    var valueXY0 = mix(valueX00, valueX10, localPosition[1]);
    var valueXY1 = mix(valueX01, valueX11, localPosition[1]);
    return mix(valueXY0, valueXY1, localPosition[2]);
}
;
function layeredNoise(position, detail) {
    position = position.slice();
    var noiseRotation = [0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64];
    var octave0 = noise3(position);
    assignComponents(position, [0, 1, 2], [(noiseRotation[0] * position[0] + noiseRotation[3] * position[1] + noiseRotation[6] * position[2]) * 2.03 + 1.71, (noiseRotation[1] * position[0] + noiseRotation[4] * position[1] + noiseRotation[7] * position[2]) * 2.03 + -2.13, (noiseRotation[2] * position[0] + noiseRotation[5] * position[1] + noiseRotation[8] * position[2]) * 2.03 + 0.83]);
    var octave1 = noise3(position);
    assignComponents(position, [0, 1, 2], [(noiseRotation[0] * position[0] + noiseRotation[3] * position[1] + noiseRotation[6] * position[2]) * 2.01 + -1.17, (noiseRotation[1] * position[0] + noiseRotation[4] * position[1] + noiseRotation[7] * position[2]) * 2.01 + 2.41, (noiseRotation[2] * position[0] + noiseRotation[5] * position[1] + noiseRotation[8] * position[2]) * 2.01 + -0.91]);
    var octave2 = noise3(position);
    assignComponents(position, [0, 1, 2], [(noiseRotation[0] * position[0] + noiseRotation[3] * position[1] + noiseRotation[6] * position[2]) * 2.04 + 2.03, (noiseRotation[1] * position[0] + noiseRotation[4] * position[1] + noiseRotation[7] * position[2]) * 2.04 + 0.37, (noiseRotation[2] * position[0] + noiseRotation[5] * position[1] + noiseRotation[8] * position[2]) * 2.04 + 1.53]);
    var octave3 = noise3(position);
    detail = saturateF(octave2 * 0.64 + octave3 * 0.36);
    layeredNoise.__return__ = octave0 * 0.52 + octave1 * 0.27 + octave2 * 0.14 + octave3 * 0.07;
    layeredNoise.__out__ = [detail];
    return layeredNoise.__return__;
}
;
function tunnelPath(depth) {
    return [0.16 * (sin(depth * 0.190)) + 0.07 * (sin(depth * 0.071 + 1.20)), 0.13 * (cos(depth * 0.160 + 0.30)) + 0.06 * (sin(depth * 0.093 - 0.80))];
}
;
function evaluateNebula(position, flowOffset, macroField, detailField, warmField) {
    position = position.slice();
    flowOffset = flowOffset.slice();
    var tunnelCenter = tunnelPath(position[2]);
    var localPosition = [position[0] - tunnelCenter[0], position[1] - tunnelCenter[1]];
    var radius = length(localPosition);
    var angle = atan(localPosition[1], localPosition[0]);
    var tunnelTwist = position[2] * 0.180 + 0.12 * (sin(position[2] * 0.070));
    var rotatedPosition = localPosition.map(function (x, i, v) { var sum = 0; for (var j = 0; j < 2; j++) {
        sum += this[j * 2 + i] * v[j];
    } return sum; }, rotation2(tunnelTwist));
    var noisePosition = [rotatedPosition[0] * 0.94 + flowOffset[0], rotatedPosition[1] * 0.94 + flowOffset[1], position[2] * 0.285 + flowOffset[2]];
    macroField = (layeredNoise(noisePosition, detailField), [detailField] = layeredNoise.__out__, layeredNoise.__return__);
    var angularShape = 0.110 * (sin(angle * 3.0 + position[2] * 0.52)) + 0.055 * (sin(angle * 7.0 - position[2] * 0.29)) + 0.030 * (sin(angle * 13.0 + position[2] * 0.17));
    var localTunnelRadius = uTunnelRadius + uTunnelRoughness * (macroField - 0.5) + angularShape;
    var shellDistance = abs(radius - localTunnelRadius);
    var broadShell = exp2((-7.0 * shellDistance) * shellDistance);
    var denseShell = exp2((-38.0 * shellDistance) * shellDistance);
    var innerShellDistance = radius - (localTunnelRadius - 0.30);
    var innerShell = exp2((-54.0 * innerShellDistance) * innerShellDistance);
    var ridgeField = 1.0 - abs(detailField * 2.0 - 1.0);
    var cloudMask = smoothstep(0.34, 0.73, macroField + ridgeField * 0.15);
    var filamentMask = smoothstep(0.47, 0.88, detailField + macroField * 0.16);
    var density = broadShell * (0.09 + cloudMask * 1.05) + denseShell * (0.16 + filamentMask * 1.24) + (innerShell * cloudMask) * 0.42;
    density *= smoothstep(0.22, 0.54, radius);
    warmField = smoothstep(0.74, 0.97, detailField + 0.17 * (sin(angle * 2.0 - position[2] * 0.31)) + macroField * 0.10);
    evaluateNebula.__return__ = max(density, 0.0);
    evaluateNebula.__out__ = [macroField, detailField, warmField];
    return evaluateNebula.__return__;
}
;
function getNebulaColor(macroField, detailField, warmField) {
    var cloudBrightness = smoothstep(0.24, 0.78, macroField);
    var cyanAmount = smoothstep(0.54, 0.91, detailField);
    var filamentAmount = pow(smoothstep(0.58, 0.96, detailField + macroField * 0.11), 2.2);
    var color = mix(uColor3, uColor4, cloudBrightness);
    mix(color, uColor5, cyanAmount * 0.72).reduce((res, el, i) => (res[i] = el, res), color);
    (color[0] += (uColor6[0] * filamentAmount) * uGlowStrength, color[1] += (uColor6[1] * filamentAmount) * uGlowStrength, color[2] += (uColor6[2] * filamentAmount) * uGlowStrength, color);
    mix(color, uColor7, warmField * 0.24).reduce((res, el, i) => (res[i] = el, res), color);
    return color;
}
;
function renderVolume(rayOrigin, rayDirection, fragmentCoordinate, animationTime, centerIllumination) {
    rayOrigin = rayOrigin.slice();
    rayDirection = rayDirection.slice();
    fragmentCoordinate = fragmentCoordinate.slice();
    var baseStep = uMaxDistance / VOLUME_STEPS;
    var extinction = (uVolumeDensity * baseStep) * INV_LN2;
    var jitter = hash31([fragmentCoordinate[0], fragmentCoordinate[1], 17]);
    var travel = 0.16 + jitter * baseStep;
    var transmittance = 1.0;
    var accumulatedColor = [0, 0, 0];
    var flowOffset = [0.07 * (sin(animationTime * 0.11)), 0.06 * (cos(animationTime * 0.09)), animationTime * 0.035];
    var farFadeStart = uMaxDistance * 0.82;
    var MIN_TRANSMITTANCE = 0.025;
    for (var index = 0; index < VOLUME_STEPS; index++) {
        if ((travel > uMaxDistance) || (transmittance < MIN_TRANSMITTANCE)) {
            break;
        }
        ;
        var samplePosition = [rayOrigin[0] + rayDirection[0] * travel, rayOrigin[1] + rayDirection[1] * travel, rayOrigin[2] + rayDirection[2] * travel];
        var macroField = 0;
        var detailField = 0;
        var warmField = 0;
        var density = (evaluateNebula(samplePosition, flowOffset, macroField, detailField, warmField), [macroField, detailField, warmField] = evaluateNebula.__out__, evaluateNebula.__return__);
        var nearFade = smoothstep(0.20, 0.82, travel);
        var farFade = 1.0 - smoothstep(farFadeStart, uMaxDistance, travel);
        density *= nearFade * farFade;
        if (density > 0.002) {
            var sampleColor = getNebulaColor(macroField, detailField, warmField);
            var distanceBrightness = 1.20 - 0.34 * (smoothstep(0.0, uMaxDistance, travel));
            sampleColor = [sampleColor[0] * (distanceBrightness * centerIllumination), sampleColor[1] * (distanceBrightness * centerIllumination), sampleColor[2] * (distanceBrightness * centerIllumination)];
            var alpha = 1.0 - exp2(-density * extinction);
            alpha = saturateF(alpha);
            (accumulatedColor[0] += (transmittance * sampleColor[0]) * alpha, accumulatedColor[1] += (transmittance * sampleColor[1]) * alpha, accumulatedColor[2] += (transmittance * sampleColor[2]) * alpha, accumulatedColor);
            transmittance *= 1.0 - alpha;
            travel += baseStep;
        }
        else {
            travel += baseStep * 1.22;
        }
        ;
    }
    ;
    return [accumulatedColor[0], accumulatedColor[1], accumulatedColor[2], transmittance];
}
;
function createCamera(screenPosition, animationTime, rayOrigin, rayDirection) {
    screenPosition = screenPosition.slice();
    var cameraDepth = animationTime * uCameraSpeed;
    [...tunnelPath(cameraDepth), cameraDepth].reduce((res, el, i) => (res[i] = el, res), rayOrigin);
    var lookAhead = 3.60;
    var cameraTarget = [...tunnelPath(cameraDepth + lookAhead), cameraDepth + lookAhead];
    var forward = normalize([cameraTarget[0] - rayOrigin[0], cameraTarget[1] - rayOrigin[1], cameraTarget[2] - rayOrigin[2]]);
    var right = normalize(cross([0, 1, 0], forward));
    var up = normalize(cross(forward, right));
    var cameraRoll = 0.060 * (sin(cameraDepth * 0.095));
    var rollSine = sin(cameraRoll);
    var rollCosine = cos(cameraRoll);
    var originalRight = cloneValue(right);
    (right[0] = originalRight[0] * rollCosine + up[0] * rollSine, right[1] = originalRight[1] * rollCosine + up[1] * rollSine, right[2] = originalRight[2] * rollCosine + up[2] * rollSine, right);
    (up[0] = up[0] * rollCosine - originalRight[0] * rollSine, up[1] = up[1] * rollCosine - originalRight[1] * rollSine, up[2] = up[2] * rollCosine - originalRight[2] * rollSine, up);
    normalize([forward[0] * uFocalLength + right[0] * screenPosition[0] + up[0] * screenPosition[1], forward[1] * uFocalLength + right[1] * screenPosition[0] + up[1] * screenPosition[1], forward[2] * uFocalLength + right[2] * screenPosition[0] + up[2] * screenPosition[1]]).reduce((res, el, i) => (res[i] = el, res), rayDirection);
    createCamera.__out__ = [rayOrigin, rayDirection];
}
;
function main() {
    var fragmentCoordinate = [gl_FragCoord[0], gl_FragCoord[1]];
    var screenPosition = [(fragmentCoordinate[0] * 2.0 - uResolution[0]) / (max(uResolution[1], 1.0)), (fragmentCoordinate[1] * 2.0 - uResolution[1]) / (max(uResolution[1], 1.0))];
    var rayOrigin = [0, 0, 0];
    var rayDirection = [0, 0, 0];
    (createCamera(screenPosition, uTime, rayOrigin, rayDirection), [rayOrigin, rayDirection] = createCamera.__out__, createCamera.__return__);
    var screenRadius = length(screenPosition);
    var backgroundAmount = exp(-screenRadius * 0.95);
    var background = mix(uColor1, uColor2, backgroundAmount);
    var centerIllumination = 1.0 + 0.32 * (1.0 - smoothstep(0.10, 0.78, screenRadius));
    var volume = renderVolume(rayOrigin, rayDirection, fragmentCoordinate, uTime, centerIllumination);
    var color = [volume[0] + background[0] * volume[3], volume[1] + background[1] * volume[3], volume[2] + background[2] * volume[3]];
    var depthHaze = exp(-screenRadius * 3.8);
    (color[0] += (uColor2[0] * depthHaze) * 0.18, color[1] += (uColor2[1] * depthHaze) * 0.18, color[2] += (uColor2[2] * depthHaze) * 0.18, color);
    var vignette = 1.0 - 0.28 * (smoothstep(0.48, 1.46, screenRadius));
    color = [color[0] * vignette, color[1] * vignette, color[2] * vignette];
    vec3.subtract([], [1, 1, 1], exp([-color[0] * uExposure, -color[1] * uExposure, -color[2] * uExposure])).reduce((res, el, i) => (res[i] = el, res), color);
    pow(max(color, [0, 0, 0]), [0.45454545454545453, 0.45454545454545453, 0.45454545454545453]).reduce((res, el, i) => (res[i] = el, res), color);
    var hsv = rgb2hsv(clamp(color, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), color);
    (fragColor[0] = color[0], fragColor[1] = color[1], fragColor[2] = color[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
VOLUME_STEPS=106;
INV_LN2=1.44269504089;
main();return Array.from(fragColor); };
},
"discoHive": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function vec2(x, y) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    return [x, y];
}
vec2.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uColorFlowSpeed = cloneValue(U.uColorFlowSpeed);
var uCamSpeed = cloneValue(U.uCamSpeed);
var uFov = cloneValue(U.uFov);
var uRollAmount = cloneValue(U.uRollAmount);
var uRollSpeed = cloneValue(U.uRollSpeed);
var uPathAmpX = cloneValue(U.uPathAmpX);
var uPathFreqX = cloneValue(U.uPathFreqX);
var uPathAmpY = cloneValue(U.uPathAmpY);
var uPathFreqY = cloneValue(U.uPathFreqY);
var uTunnelRadius = cloneValue(U.uTunnelRadius);
var uHexesAround = cloneValue(U.uHexesAround);
var uHexBorder = cloneValue(U.uHexBorder);
var uHexDotSize = cloneValue(U.uHexDotSize);
var uFogDensity = cloneValue(U.uFogDensity);
var uVignetteStrength = cloneValue(U.uVignetteStrength);
var uColors = cloneValue(U.uColors);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
var dhTime = 0;
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function paletteColor(t) {
    var m = (clamp(t, 0.0, 1.0)) * 3.0;
    var grad = cloneValue(uColors[0]);
    grad = [grad[0] * grad[3], grad[1] * grad[3], grad[2] * grad[3], grad[3]];
    for (var i = 1; i < 4; i++) {
        var mm = clamp(m - i - 1, 0.0, 1.0);
        mm = smoothstep(0.1, 0.9, mm);
        var c = cloneValue(uColors[i]);
        c = [c[0] * c[3], c[1] * c[3], c[2] * c[3], c[3]];
        mix(grad, c, mm).reduce((res, el, i) => (res[i] = el, res), grad);
    }
    ;
    return [grad[0], grad[1], grad[2]];
}
;
function discoColors(p) {
    p = p.slice();
    (p[0] += dhTime * uColorFlowSpeed, p[1] += dhTime * uColorFlowSpeed, p);
    var l = (pow(0.5 + (0.5 * (cos((p[0] * 3.1415926535) * 2.0 + cos(p[1]) * 8.0))) * (sin(p[1] * 2.0)), 4.0)) * 2.0;
    var c = pow((vec3.add([], paletteColor(0.5 + 0.5 * (cos((p[0] * 3.1415926535) * 12.0 + (sin(p[1] * 10.0)) * 3.0))), paletteColor(0.5 + 0.5 * (cos((p[0] * 3.1415926535) * 6.0 + (sin(p[1] * 3.0)) * 3.0))))).map(function (_) { return l * _; }), [1.2, 1.2, 1.2]).map(function (_) { return _ * 0.7; });
    var highlight = paletteColor(0.95);
    (c[0] += (highlight[0] * (pow(0.5 + (0.5 * (cos((p[0] * 3.1415926535) * 6.0))) * (sin(p[1] * 12.0)), 20.0))) * 2.0, c[1] += (highlight[1] * (pow(0.5 + (0.5 * (cos((p[0] * 3.1415926535) * 6.0))) * (sin(p[1] * 12.0)), 20.0))) * 2.0, c[2] += (highlight[2] * (pow(0.5 + (0.5 * (cos((p[0] * 3.1415926535) * 6.0))) * (sin(p[1] * 12.0)), 20.0))) * 2.0, c);
    var tint = paletteColor(0.05);
    (c[0] += (0.1 * tint[0]) * 0.7, c[1] += ((0.5 + 0.5 * (cos([(p[0] * 3.1415926535) * 6.0, (p[1] * 3.1415926535) * 6.0])[0])) * tint[1]) * 0.7, c[2] += ((0.5 + 0.5 * (cos([(p[0] * 3.1415926535) * 6.0, (p[1] * 3.1415926535) * 6.0])[1])) * tint[2]) * 0.7, c);
    return c;
}
;
function hexCoords(uv) {
    uv = uv.slice();
    var r = [1.0, 1.7320508];
    var h = [r[0] * 0.5, r[1] * 0.5];
    var a = vec2.subtract([], mod(uv, r), h);
    var b = vec2.subtract([], mod([uv[0] - h[0], uv[1] - h[1]], r), h);
    var gv = (dot(a, a)) < (dot(b, b)) ? a : b;
    var id = [uv[0] - gv[0], uv[1] - gv[1]];
    return [gv[0], gv[1], id[0], id[1]];
}
;
function hexTex(p, border) {
    p = p.slice();
    var hc = hexCoords(p);
    var gv = [hc[0], hc[1]];
    var id = [hc[2] * 0.125, hc[3] * 0.125];
    var d = max(abs(gv[0]), dot(abs(gv), [0.5, 0.8660254]));
    var sm = 0.03;
    var m = 1.0 - smoothstep(border - sm, border, d);
    m += 1.0 - smoothstep(0.0, uHexDotSize, length(gv));
    return discoColors(id).map(function (_) { return m * _; });
}
;
function tunnelPath(z) {
    return [(sin(z * uPathFreqX)) * uPathAmpX, (cos(z * uPathFreqY)) * uPathAmpY];
}
;
function sceneMap(p) {
    p = p.slice();
    return uTunnelRadius - length(vec2.subtract([], [p[0], p[1]], tunnelPath(p[2])));
}
;
function main() {
    dhTime = uTime * uSpeed + 1.0;
    var uv = [(gl_FragCoord[0] - 0.5 * uResolution[0]) / uResolution[1], (gl_FragCoord[1] - 0.5 * uResolution[1]) / uResolution[1]];
    var camZ = dhTime * uCamSpeed;
    var ro = [...tunnelPath(camZ), camZ];
    var ta = [...tunnelPath(camZ + 3.0), camZ + 3.0];
    var fwd = normalize([ta[0] - ro[0], ta[1] - ro[1], ta[2] - ro[2]]);
    var right = normalize(cross(fwd, [0, 1, 0]));
    var up = cross(right, fwd);
    var roll = (sin(dhTime * uRollSpeed)) * uRollAmount;
    var rollRot = [cos(roll), -sin(roll), sin(roll), cos(roll)];
    (uv = uv.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, rollRot));
    var rd = normalize([uv[0] * right[0] + uv[1] * up[0] + uFov * fwd[0], uv[0] * right[1] + uv[1] * up[1] + uFov * fwd[1], uv[0] * right[2] + uv[1] * up[2] + uFov * fwd[2]]);
    var t = 0.0;
    for (var i = 0; i < 80; i++) {
        var p = [ro[0] + rd[0] * t, ro[1] + rd[1] * t, ro[2] + rd[2] * t];
        var d = sceneMap(p);
        if ((d < 0.01) || (t > 100.0)) {
            break;
        }
        ;
        t += d * 0.7;
    }
    ;
    var col = [0, 0, 0];
    if (t < 100.0) {
        var p = [ro[0] + rd[0] * t, ro[1] + rd[1] * t, ro[2] + rd[2] * t];
        var tunObj = vec2.subtract([], [p[0], p[1]], tunnelPath(p[2]));
        var a = atan(tunObj[1], tunObj[0]);
        var hexesAround = max(uHexesAround, 2.0);
        var xuv = (a / 3.1415926535) * (hexesAround * 0.5);
        var yuv = p[2] * (hexesAround / ((uTunnelRadius * 2.0) * 3.1415926535));
        var tUv = [xuv, yuv];
        hexTex(tUv, uHexBorder).reduce((res, el, i) => (res[i] = el, res), col);
        var fog = exp((-uFogDensity * t) * t);
        col = [col[0] * fog, col[1] * fog, col[2] * fog];
        col = [col[0] * 1.3, col[1] * 1.3, col[2] * 1.3];
    }
    ;
    var q = [gl_FragCoord[0] / uResolution[0], gl_FragCoord[1] / uResolution[1]];
    col = [col[0] * (mix(1.0, 0.5 + 0.5 * (pow(((16.0 * q[0]) * q[1]) * (1.0 - q[0]) * (1.0 - q[1]), 0.1)), uVignetteStrength)), col[1] * (mix(1.0, 0.5 + 0.5 * (pow(((16.0 * q[0]) * q[1]) * (1.0 - q[0]) * (1.0 - q[1]), 0.1)), uVignetteStrength)), col[2] * (mix(1.0, 0.5 + 0.5 * (pow(((16.0 * q[0]) * q[1]) * (1.0 - q[0]) * (1.0 - q[1]), 0.1)), uVignetteStrength))];
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
dhTime=0;
main();return Array.from(fragColor); };
},
"discoHexnel": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function vec2(x, y) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    return [x, y];
}
vec2.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function log(x) {
    if (x.length)
        return x.map(log);
    return Math.log(x);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uCameraSpeed = cloneValue(U.uCameraSpeed);
var uFov = cloneValue(U.uFov);
var uMaxDistance = cloneValue(U.uMaxDistance);
var uMaxSteps = cloneValue(U.uMaxSteps);
var uTunnelRadius = cloneValue(U.uTunnelRadius);
var uTunnelPulseAmount = cloneValue(U.uTunnelPulseAmount);
var uTunnelPulseSpeed = cloneValue(U.uTunnelPulseSpeed);
var uHexWrapCount = cloneValue(U.uHexWrapCount);
var uHexBevelAmount = cloneValue(U.uHexBevelAmount);
var uRayCount = cloneValue(U.uRayCount);
var uRaySpinSpeed = cloneValue(U.uRaySpinSpeed);
var uStrobeSpeed = cloneValue(U.uStrobeSpeed);
var uCenterGlowSize = cloneValue(U.uCenterGlowSize);
var uFogDensity = cloneValue(U.uFogDensity);
var uWhirlpoolScale = cloneValue(U.uWhirlpoolScale);
var uWhirlpoolArms = cloneValue(U.uWhirlpoolArms);
var uWhirlpoolRings = cloneValue(U.uWhirlpoolRings);
var uWhirlpoolTwistX = cloneValue(U.uWhirlpoolTwistX);
var uWhirlpoolTwistY = cloneValue(U.uWhirlpoolTwistY);
var uWhirlpoolFlowSpeedX = cloneValue(U.uWhirlpoolFlowSpeedX);
var uWhirlpoolFlowSpeedY = cloneValue(U.uWhirlpoolFlowSpeedY);
var uLiquidSwirlSpeed = cloneValue(U.uLiquidSwirlSpeed);
var uLiquidRotSpeed = cloneValue(U.uLiquidRotSpeed);
var uLiquidDetail = cloneValue(U.uLiquidDetail);
var uLiquidGlowRadius = cloneValue(U.uLiquidGlowRadius);
var uLiquidGlowPulseAmount = cloneValue(U.uLiquidGlowPulseAmount);
var uPulseAFrequency = cloneValue(U.uPulseAFrequency);
var uPulseBFrequency = cloneValue(U.uPulseBFrequency);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function paletteColor(t) {
    var m = (clamp(fract(t), 0.0, 1.0)) * uColorCount;
    var grad = cloneValue(uColors[0]);
    grad = [grad[0] * grad[3], grad[1] * grad[3], grad[2] * grad[3], grad[3]];
    for (var i = 1; i < 10; i++) {
        if (i > uColorCount) {
            break;
        }
        ;
        var mm = clamp(m - i - 1, 0.0, 1.0);
        mm = smoothstep(0.0, 1.0, mm);
        var c = cloneValue(uColors[i - 1]);
        c = [c[0] * c[3], c[1] * c[3], c[2] * c[3], c[3]];
        mix(grad, c, mm).reduce((res, el, i) => (res[i] = el, res), grad);
    }
    ;
    return [grad[0], grad[1], grad[2]];
}
;
function hash1(n) {
    return fract(sin(n) * 437518.56453) + 0.1;
}
;
function rot2(v, t) {
    v = v.slice();
    var s = sin(t), c = cos(t);
    return [c * v[0] + s * v[1], -s * v[0] + c * v[1]];
}
;
function acesApprox(c) {
    c = c.slice();
    var m1 = [0.59719, 0.07600, 0.02840, 0.35458, 0.90834, 0.13383, 0.04823, 0.01566, 0.83777];
    var m2 = [1.60475, -0.10208, -0.00327, -0.53108, 1.10813, -0.07276, -0.07367, -0.00605, 1.07602];
    var v = [m1[0] * c[0] + m1[3] * c[1] + m1[6] * c[2], m1[1] * c[0] + m1[4] * c[1] + m1[7] * c[2], m1[2] * c[0] + m1[5] * c[1] + m1[8] * c[2]];
    var av = [v[0] * (v[0] + 0.0245786) - 0.000090537, v[1] * (v[1] + 0.0245786) - 0.000090537, v[2] * (v[2] + 0.0245786) - 0.000090537];
    var b = [v[0] * (0.983729 * v[0] + 0.4329510) + 0.238081, v[1] * (0.983729 * v[1] + 0.4329510) + 0.238081, v[2] * (0.983729 * v[2] + 0.4329510) + 0.238081];
    return ([av[0] / b[0], av[1] / b[1], av[2] / b[2]]).map(function (x, i, v) { var sum = 0; for (var j = 0; j < 3; j++) {
        sum += this[j * 3 + i] * v[j];
    } return sum; }, m2);
}
;
function dotNoise(p) {
    p = p.slice();
    var PHI = 1.618033988;
    var GOLD = [-0.571464913, 0.814921382, 0.096597072, -0.278044873, -0.303026659, 0.911518454, 0.772087367, 0.494042493, 0.399753815];
    return dot(cos([GOLD[0] * p[0] + GOLD[3] * p[1] + GOLD[6] * p[2], GOLD[1] * p[0] + GOLD[4] * p[1] + GOLD[7] * p[2], GOLD[2] * p[0] + GOLD[5] * p[1] + GOLD[8] * p[2]]), sin([dot([PHI * p[0], PHI * p[1], PHI * p[2]], [GOLD[0], GOLD[1], GOLD[2]]), dot([PHI * p[0], PHI * p[1], PHI * p[2]], [GOLD[3], GOLD[4], GOLD[5]]), dot([PHI * p[0], PHI * p[1], PHI * p[2]], [GOLD[6], GOLD[7], GOLD[8]])]));
}
;
function hexGrid(uv, hexCenterId) {
    uv = uv.slice();
    var hexProp = [1.0, 1.7320508];
    var halfProp = [hexProp[0] * 0.5, hexProp[1] * 0.5];
    var gA = vec2.subtract([], mod(uv, hexProp), halfProp);
    var gB = vec2.subtract([], mod([uv[0] - halfProp[0], uv[1] - halfProp[1]], hexProp), halfProp);
    if ((dot(gA, gA)) < (dot(gB, gB))) {
        (hexCenterId[0] = uv[0] - gA[0], hexCenterId[1] = uv[1] - gA[1], hexCenterId);
        hexGrid.__return__ = gA;
        hexGrid.__out__ = [hexCenterId];
        return hexGrid.__return__;
    }
    else {
        (hexCenterId[0] = uv[0] - gB[0], hexCenterId[1] = uv[1] - gB[1], hexCenterId);
        hexGrid.__return__ = gB;
        hexGrid.__out__ = [hexCenterId];
        return hexGrid.__return__;
    }
    ;
}
;
function sceneMap(rp, pulseA, pulseB) {
    rp = rp.slice();
    var cylR = length([rp[0], rp[1]]);
    var cylA = atan(rp[1], rp[0]);
    var smoothTunnelOsc = (sin(uTime * uTunnelPulseSpeed)) * 0.5 + 0.5;
    var dynTunnelRadius = uTunnelRadius + ((pulseB * uTunnelPulseAmount) * smoothTunnelOsc);
    var wrapScale = uHexWrapCount / (6.28318530718 * uTunnelRadius);
    var surfCoords = [(cylA * uTunnelRadius) * wrapScale, rp[2] * wrapScale];
    var hexCenterId = [0, 0];
    var hexLocal = (hexGrid(surfCoords, hexCenterId), [hexCenterId] = hexGrid.__out__, hexGrid.__return__);
    var distToEdge = max(abs(hexLocal[0]), dot(abs(hexLocal), [0.5, 0.8660254]));
    var invEdgeDist = 0.5 - distToEdge;
    var bevelHeight = clamp(invEdgeDist * 3.0, 0.0, uHexBevelAmount);
    var uHexPopAmount = 0.0;
    var uHexPopSpeed = 0.0;
    var smoothBlockOsc = (sin(uTime * uHexPopSpeed + hexCenterId[1] * 0.8)) * 0.5 + 0.5;
    var popIntensity = (pulseA * uHexPopAmount) * smoothBlockOsc;
    var extrusion = bevelHeight + popIntensity;
    var sd = (dynTunnelRadius - cylR) - extrusion;
    var snappedId = floor([hexCenterId[0] * 10.0 + 0.5, hexCenterId[1] * 10.0 + 0.5]).map(function (_) { return _ / 10.0; });
    var wrapAngle = (snappedId[0] / uHexWrapCount) * 6.28318530718;
    var seamX = [cos(wrapAngle), sin(wrapAngle)];
    var cellSeed = seamX[0] * 12.345 + seamX[1] * 67.891 + snappedId[1] * 45.678;
    var hueSeed = hash1(cellSeed);
    var angle = atan(hexLocal[1], hexLocal[0]);
    var radius = length(hexLocal);
    var spinDir = (hash1(hueSeed) > 0.5) ? 1.0 : -1.0;
    var rayRot = (uTime * uRaySpinSpeed) * spinDir;
    var rays = max(0.0, sin(angle * uRayCount + rayRot));
    rays = pow(rays, 8.0);
    var strobe = (sin(uTime * uStrobeSpeed + hueSeed * 6.2831)) * 0.5 + 0.5;
    var centerGlow = smoothstep(uCenterGlowSize, 0.0, radius);
    var lightIntensity = (centerGlow * 0.6) + (((rays * centerGlow) * strobe) * 4.0);
    var baseColor = paletteColor(hueSeed);
    var texColor = [(baseColor[0] * 0.2) + (baseColor[0] * lightIntensity), (baseColor[1] * 0.2) + (baseColor[1] * lightIntensity), (baseColor[2] * 0.2) + (baseColor[2] * lightIntensity)];
    sd *= 0.25;
    return [sd, texColor[0], texColor[1], texColor[2]];
}
;
function renderWhirlpool(fragCoord, pulseA, pulseB) {
    fragCoord = fragCoord.slice();
    var scale = cloneValue(uWhirlpoolScale);
    var uv = [((fragCoord[0] - 0.5 * uResolution[0]) / uResolution[1]) * scale, ((fragCoord[1] - 0.5 * uResolution[1]) / uResolution[1]) * scale];
    var r = length(uv);
    var aAng = atan(uv[1], uv[0]);
    var st = [(aAng / 6.28318530718) * uWhirlpoolArms + log(r) * uWhirlpoolTwistX, (aAng / 6.28318530718) * uWhirlpoolRings + log(r) * uWhirlpoolTwistY];
    var stTiles = [st[0] + uTime * uWhirlpoolFlowSpeedX, st[1] + uTime * uWhirlpoolFlowSpeedY];
    var grid = fract(stTiles);
    var center = [grid[0] - 0.5, grid[1] - 0.5];
    var dist = (max(abs(center[0]), abs(center[1]))) * 2.0;
    var mask = smoothstep(0.98, 0.85, dist);
    var normal = normalize([center[0] * 2.5, center[1] * 2.5, 1.0 - pow(dist, 3.0)]);
    var colorProgression = (st[0] / (max(uWhirlpoolArms, 0.001))) + uTime * 0.05;
    var armColor = paletteColor(colorProgression);
    var baseColor = mix([1, 0.8, 0.2], armColor, smoothstep(0.02, 0.3, r));
    var liquidUvScreen = [fragCoord[0] + normal[0] * (30.0 / scale), fragCoord[1] + normal[1] * (30.0 / scale)];
    var luv = [((liquidUvScreen[0] - 0.5 * uResolution[0]) / uResolution[1]) * scale, ((liquidUvScreen[1] - 0.5 * uResolution[1]) / uResolution[1]) * scale];
    var lr = length(luv);
    var la = atan(luv[1], luv[0]);
    la -= log(lr) * 2.0 + uTime * (uLiquidRotSpeed + pulseB * 0.2);
    var swirledUv = [lr * cos(la), lr * sin(la)];
    var t = uTime + pulseA * 0.5;
    var p = [0, 0, 0], l = [0, 0, 0], b = [0, 0, 0], d = [0, 0, 0];
    p[2] = -1.0 - 0.5 * (sin(t * 0.1));
    normalize([swirledUv[0] * 2.0, swirledUv[1] * 2.0, 1]).reduce((res, el, i) => (res[i] = el, res), d);
    var s = 0.0;
    var iStep = 0.0;
    for (var j = 0; j < 16; j++) {
        if (j >= uLiquidDetail) {
            break;
        }
        ;
        (b[0] = p[0], b[1] = p[1], b[2] = p[2], b);
        b = [0, 1, null].map(function (idx, i) { return idx == null ? b[i] : this[idx]; }, rot2(sin([b[0] * 0.25, b[1] * 0.25]), (t * uLiquidSwirlSpeed) * 0.25 + b[2] * 2.0));
        s = 0.001 + (abs((dotNoise([b[0] * 20.0, b[1] * 20.0, b[2] * 20.0])) / 20.0 - dotNoise(b))) * 0.7;
        s += (abs(p[1] * 0.2 + sin(p[2] * 2.0 + (abs(p[0]) * 0.5)))) * 0.5;
        (p[0] += d[0] * s, p[1] += d[1] * s, p[2] += d[2] * s, p);
        (l[0] += (baseColor[0] * (1.0 + 1.5 * (sin(iStep + length([p[0] * 0.1, p[1] * 0.1]) + pulseA * 3.0)))) / s, l[1] += (baseColor[1] * (1.0 + 1.5 * (sin(iStep + length([p[0] * 0.1, p[1] * 0.1]) + pulseA * 3.0)))) / s, l[2] += (baseColor[2] * (1.0 + 1.5 * (sin(iStep + length([p[0] * 0.1, p[1] * 0.1]) + pulseA * 3.0)))) / s, l);
        iStep += 1.0;
    }
    ;
    var liquidColor = acesApprox([(l[0] * l[0]) / 400.0, (l[1] * l[1]) / 400.0, (l[2] * l[2]) / 400.0]);
    var viewDir = [0, 0, 1];
    var fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);
    var finalCol = cloneValue(liquidColor);
    (finalCol[0] += ((baseColor[0] * fresnel) * 1.5) * mask, finalCol[1] += ((baseColor[1] * fresnel) * 1.5) * mask, finalCol[2] += ((baseColor[2] * fresnel) * 1.5) * mask, finalCol);
    mix([0.01, 0.01, 0.02], finalCol, mask).reduce((res, el, i) => (res[i] = el, res), finalCol);
    finalCol = [finalCol[0] * (smoothstep(0.0, 0.15, r)), finalCol[1] * (smoothstep(0.0, 0.15, r)), finalCol[2] * (smoothstep(0.0, 0.15, r))];
    var glowRadius = uLiquidGlowRadius - (pulseA * uLiquidGlowPulseAmount);
    (finalCol[0] += (exp(-r * glowRadius)) * (2.0 + pulseA * 2.0), finalCol[1] += (0.8 * (exp(-r * glowRadius))) * (2.0 + pulseA * 2.0), finalCol[2] += (0.2 * (exp(-r * glowRadius))) * (2.0 + pulseA * 2.0), finalCol);
    return finalCol;
}
;
function raymarch(ro, rd, pulseA, pulseB) {
    ro = ro.slice();
    rd = rd.slice();
    var result = [-1, -1, -1, -1];
    var dist = 0.1;
    var maxSteps = uMaxSteps | 0;
    for (var i = 0; i < 220; i++) {
        if ((i >= maxSteps) || (dist >= uMaxDistance)) {
            break;
        }
        ;
        var rp = [ro[0] + rd[0] * dist, ro[1] + rd[1] * dist, ro[2] + rd[2] * dist];
        var info = sceneMap(rp, pulseA, pulseB);
        if (abs(info[0]) < (0.001 * dist)) {
            (result[0] = dist, result[1] = info[1], result[2] = info[2], result[3] = info[3], result);
            break;
        }
        ;
        dist += info[0];
    }
    ;
    return result;
}
;
function surfaceNormal(p, pulseA, pulseB) {
    p = p.slice();
    var n = [0, 0, 0];
    for (var i = 0; i < 4; i++) {
        var e = [0.5773 * (2.0 * (((i + 3) >> 1) & 1) - 1.0), 0.5773 * (2.0 * ((i >> 1) & 1) - 1.0), 0.5773 * (2.0 * ((i & 1) & 1) - 1.0)];
        (n[0] += e[0] * (sceneMap([p[0] + 0.0025 * e[0], p[1] + 0.0025 * e[1], p[2] + 0.0025 * e[2]], pulseA, pulseB)[0]), n[1] += e[1] * (sceneMap([p[0] + 0.0025 * e[0], p[1] + 0.0025 * e[1], p[2] + 0.0025 * e[2]], pulseA, pulseB)[0]), n[2] += e[2] * (sceneMap([p[0] + 0.0025 * e[0], p[1] + 0.0025 * e[1], p[2] + 0.0025 * e[2]], pulseA, pulseB)[0]), n);
    }
    ;
    return normalize(n);
}
;
function camMatrix(ro, ta) {
    ro = ro.slice();
    ta = ta.slice();
    var fw = normalize([ta[0] - ro[0], ta[1] - ro[1], ta[2] - ro[2]]);
    var up = [0, 1, 0];
    var right = normalize(cross(fw, up));
    var trueUp = cross(right, fw);
    return [...right, ...trueUp, ...fw];
}
;
function main() {
    var t = uTime * uSpeed;
    var pulseA = 0.5 + 0.5 * (sin(t * uPulseAFrequency));
    var pulseB = 0.5 + 0.5 * (cos(t * uPulseBFrequency));
    var fragCoord = [gl_FragCoord[0], gl_FragCoord[1]];
    var camZ = t * uCameraSpeed;
    var ro = [0, 0, camZ];
    var ta = [ro[0], ro[1], ro[2] + 1];
    var cm = camMatrix(ro, ta);
    var nuv = [(2.0 * fragCoord[0] - uResolution[0]) / uResolution[1], (2.0 * fragCoord[1] - uResolution[1]) / uResolution[1]];
    var rd = normalize([nuv[0], nuv[1], uFov]).map(function (x, i, v) { var sum = 0; for (var j = 0; j < 3; j++) {
        sum += this[j * 3 + i] * v[j];
    } return sum; }, cm);
    var hit = raymarch(ro, rd, pulseA, pulseB);
    var distTravelled = cloneValue(hit[0]);
    var col = [0, 0, 0];
    var bgFog = [0, 0, 0.01];
    if ((distTravelled > 0.0) && (distTravelled < (uMaxDistance - 0.1))) {
        var hitPos = [ro[0] + distTravelled * rd[0], ro[1] + distTravelled * rd[1], ro[2] + distTravelled * rd[2]];
        var n = surfaceNormal(hitPos, pulseA, pulseB);
        var viewDir = [-rd[0], -rd[1], -rd[2]];
        var surfColor = [hit[1], hit[2], hit[3]];
        var fres = pow(clamp(1.0 - dot(n, viewDir), 0.0, 1.0), 3.0);
        var lightDir = normalize([0, 0, 1]);
        var halfV = normalize([lightDir[0] + viewDir[0], lightDir[1] + viewDir[1], lightDir[2] + viewDir[2]]);
        var spec = (pow(clamp(dot(n, halfV), 0.0, 1.0), 128.0)) * 2.0;
        var tunnelColor = [surfColor[0] + ((surfColor[0] * fres) * 0.8) + spec, surfColor[1] + ((surfColor[1] * fres) * 0.8) + spec, surfColor[2] + ((surfColor[2] * fres) * 0.8) + spec];
        var fog = 1.0 - exp(((-uFogDensity * distTravelled) * distTravelled) * distTravelled);
        mix(tunnelColor, bgFog, fog).reduce((res, el, i) => (res[i] = el, res), col);
    }
    else {
        renderWhirlpool(fragCoord, pulseA, pulseB).reduce((res, el, i) => (res[i] = el, res), col);
    }
    ;
    clamp(col, 0.0, 1.0).reduce((res, el, i) => (res[i] = el, res), col);
    pow(col, [0.4545, 0.4545, 0.4545]).reduce((res, el, i) => (res[i] = el, res), col);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"kaleidoscopeWheels": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function sign(x) {
    if (x.length)
        return x.map(sign);
    return Math.sign(x);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uPathAmplitude = cloneValue(U.uPathAmplitude);
var uPathTwistFrequency = cloneValue(U.uPathTwistFrequency);
var uPathSecondaryFrequency = cloneValue(U.uPathSecondaryFrequency);
var uPathTertiaryFrequency = cloneValue(U.uPathTertiaryFrequency);
var uPathQuaternaryFrequency = cloneValue(U.uPathQuaternaryFrequency);
var uPathDriftSpeed = cloneValue(U.uPathDriftSpeed);
var uSegmentsMin = cloneValue(U.uSegmentsMin);
var uSegmentsMax = cloneValue(U.uSegmentsMax);
var uSegmentsSpeed = cloneValue(U.uSegmentsSpeed);
var uKaleidoscopeSoftness = cloneValue(U.uKaleidoscopeSoftness);
var uPlaneRotationSpeed = cloneValue(U.uPlaneRotationSpeed);
var uPlaneRotationAmplitude = cloneValue(U.uPlaneRotationAmplitude);
var uInternalSpinSpeed = cloneValue(U.uInternalSpinSpeed);
var uZoomMin = cloneValue(U.uZoomMin);
var uZoomMax = cloneValue(U.uZoomMax);
var uTruchetRadiusMin = cloneValue(U.uTruchetRadiusMin);
var uTruchetRadiusMax = cloneValue(U.uTruchetRadiusMax);
var uTruchetRadiusFrequency = cloneValue(U.uTruchetRadiusFrequency);
var uLineWidth = cloneValue(U.uLineWidth);
var uPlaneSpacing = cloneValue(U.uPlaneSpacing);
var uPlaneCount = cloneValue(U.uPlaneCount);
var uColorDistanceScale = cloneValue(U.uColorDistanceScale);
var uColorTimeSpeed = cloneValue(U.uColorTimeSpeed);
var uColorPlaneScale = cloneValue(U.uColorPlaneScale);
var uWaveSpeed = cloneValue(U.uWaveSpeed);
var uWaveFrequency = cloneValue(U.uWaveFrequency);
var uFovBase = cloneValue(U.uFovBase);
var uFovVariation = cloneValue(U.uFovVariation);
var uPulseColorSpeed = cloneValue(U.uPulseColorSpeed);
var uPulseColorPower = cloneValue(U.uPulseColorPower);
var uContrastAmount = cloneValue(U.uContrastAmount);
var uVignetteStrength = cloneValue(U.uVignetteStrength);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function paletteColor(t) {
    var m = (clamp(fract(t), 0.0, 1.0)) * uColorCount;
    var grad = cloneValue(uColors[0]);
    grad = [grad[0] * grad[3], grad[1] * grad[3], grad[2] * grad[3], grad[3]];
    for (var i = 1; i < 10; i++) {
        if (i > uColorCount) {
            break;
        }
        ;
        var mm = clamp(m - i - 1, 0.0, 1.0);
        mm = smoothstep(0.0, 1.0, mm);
        var c = cloneValue(uColors[i - 1]);
        c = [c[0] * c[3], c[1] * c[3], c[2] * c[3], c[3]];
        mix(grad, c, mm).reduce((res, el, i) => (res[i] = el, res), grad);
    }
    ;
    return [grad[0], grad[1], grad[2]];
}
;
function rotate2D(a) {
    var c = cos(a), s = sin(a);
    return [c, s, -s, c];
}
;
function hash11(p) {
    return fract((sin(p * 12.9898)) * 13758.5453);
}
;
function hash21(p) {
    p = p.slice();
    return fract((sin(dot(p, [127.1, 311.7]))) * 43758.5453123);
}
;
function smoothMax(a, b, k) {
    var h = clamp(0.5 + (0.5 * (a - b)) / k, 0.0, 1.0);
    return mix(b, a, h) + (k * h) * (1.0 - h);
}
;
function smoothAbs(a, k) {
    return smoothMax(a, -a, k);
}
;
function blendColors(front, back) {
    front = front.slice();
    back = back.slice();
    var weight = front[3] + back[3] * (1.0 - front[3]);
    var rgb = [(front[0] * front[3] + (back[0] * back[3]) * (1.0 - front[3])) / weight, (front[1] * front[3] + (back[1] * back[3]) * (1.0 - front[3])) / weight, (front[2] * front[3] + (back[2] * back[3]) * (1.0 - front[3])) / weight];
    return weight > 0.0 ? [rgb[0], rgb[1], rgb[2], weight] : [0, 0, 0, 0];
}
;
function applyKaleidoscope(uv, smoothFactor, segments) {
    uv = uv.slice();
    var angle = atan(uv[1], uv[0]);
    var radius = length(uv);
    var segAngle = (2.0 * PI) / segments;
    var halfSeg = segAngle * 0.5;
    var cellId = floor((angle + halfSeg) / segAngle);
    angle = mod(angle + halfSeg, segAngle) - halfSeg;
    angle *= (mod(cellId, 2.0)) * 2.0 - 1.0;
    var smoothAngle = 3.141592654 / segments - smoothAbs(3.141592654 / segments - abs(angle), smoothFactor);
    angle = sign(angle) * smoothAngle;
    (uv[0] = radius * cos(angle), uv[1] = radius * sin(angle), uv);
    applyKaleidoscope.__return__ = cellId;
    applyKaleidoscope.__out__ = [uv];
    return applyKaleidoscope.__return__;
}
;
function cameraPath(z) {
    var shift = z * uPathTwistFrequency;
    var xy = [-uPathAmplitude * (cos(shift) + cos(shift * uPathTertiaryFrequency)), -uPathAmplitude * (sin(shift * uPathSecondaryFrequency) + sin(shift * uPathQuaternaryFrequency + (uTime * uSpeed) * uPathDriftSpeed))];
    return [xy[0], xy[1], z];
}
;
function cameraDerivative(z) {
    return (vec3.subtract([], cameraPath(z + 0.1), cameraPath(z - 0.1))).map(function (_) { return 0.5 * _; }).map(function (_) { return _ / 0.1; });
}
;
function truchetField(radius, uv) {
    uv = uv.slice();
    var cellId = floor([uv[0] + 0.5, uv[1] + 0.5]);
    var localUv = fract([uv[0] + 0.5, uv[1] + 0.5]).map(function (_) { return _ - 0.5; });
    var randVal = hash21(cellId);
    var absUv = abs(localUv).map(function (_) { return _ - 0.5; });
    var circleDist = length(absUv);
    var lineDist = abs(circleDist - radius);
    var diag1 = abs(dot(normalize([1.0, 1.0]), localUv));
    var diag2 = abs(dot(normalize([1, -1]), localUv));
    var dist = min(circleDist, lineDist);
    if (randVal > 0.85) {
        dist = min(dist, min(diag1, diag2));
    }
    else {
        if (randVal > 0.5) {
            dist = min(dist, diag1);
        }
        else {
            if (randVal > 0.15) {
                dist = min(dist, diag2);
            }
            ;
        }
        ;
    }
    ;
    return [dist, circleDist - radius];
}
;
function renderDepthPlane(hitPos, pathOffset, antiAlias, planeId) {
    hitPos = hitPos.slice();
    pathOffset = pathOffset.slice();
    var h = hash11(planeId);
    var distToCam = length(hitPos);
    var uv = new Float32Array([0, 1].map(function (x, i) { return this[x]; }, ([hitPos[0] - pathOffset[0], hitPos[1] - pathOffset[1], hitPos[2]])));
    (uv = uv.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, rotate2D((sin((uTime * uSpeed) * uPlaneRotationSpeed)) * uPlaneRotationAmplitude)));
    var segRange = (uTime * uSpeed) * uSegmentsSpeed + h * (2.0 * PI);
    var segments = 2.0 * (floor((mix(uSegmentsMin, uSegmentsMax, 0.5 + 0.5 * sin(segRange))) / 2.0 + 0.5));
    var smoothFactor = uKaleidoscopeSoftness / segments;
    (applyKaleidoscope(uv, smoothFactor, segments), [uv] = applyKaleidoscope.__out__, applyKaleidoscope.__return__);
    (uv = uv.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, rotate2D((2.0 * PI) * (fract(1777.0 * h)) + (uTime * uSpeed) * uInternalSpinSpeed)));
    var zoom = mix(uZoomMin, uZoomMax, fract(3167.0 * h));
    uv = [uv[0] / zoom, uv[1] / zoom];
    uv = [uv[0] + 0.5 + floor((fract(2087.0 * h)) * 1000.0), uv[1] + 0.5 + floor((fract(2087.0 * h)) * 1000.0)];
    var radius = mix(uTruchetRadiusMin, uTruchetRadiusMax, 0.5 + 0.5 * (cos(uTruchetRadiusFrequency * planeId)));
    var truchetDist = truchetField(radius, uv);
    truchetDist = [truchetDist[0] * zoom, truchetDist[1] * zoom];
    var lineW = uLineWidth * zoom;
    var dist = truchetDist[0] - lineW;
    var psychColor = paletteColor(distToCam * uColorDistanceScale - (uTime * uSpeed) * uColorTimeSpeed + planeId * uColorPlaneScale);
    var col = mix(psychColor, [0, 0, 0], smoothstep(antiAlias, -antiAlias, dist));
    var wave = sin((3.141592654 * uWaveFrequency) * dist + (uTime * uSpeed) * uWaveSpeed);
    mix(col, [psychColor[0] * 0.2, psychColor[1] * 0.2, psychColor[2] * 0.2], smoothstep(0.5, 1.0, wave)).reduce((res, el, i) => (res[i] = el, res), col);
    mix(col, [0, 0, 0], step(truchetDist[1], 0.0)).reduce((res, el, i) => (res[i] = el, res), col);
    var alpha = (smoothstep(antiAlias, -antiAlias, -truchetDist[1] - 3.0 * lineW)) * (mix(0.5, 1.0, smoothstep(antiAlias, -antiAlias, -truchetDist[1] - lineW)));
    return [col[0], col[1], col[2], alpha];
}
;
function renderScene(camForward, camRight, camUp, rayOrigin, uv) {
    camForward = camForward.slice();
    camRight = camRight.slice();
    camUp = camUp.slice();
    rayOrigin = rayOrigin.slice();
    uv = uv.slice();
    var fov = uFovBase + uFovVariation * (clamp(length(uv), -1.0, 1.0));
    var rayDir = normalize([uv[0] * camRight[0] + uv[1] * camUp[0] + fov * camForward[0], uv[0] * camRight[1] + uv[1] * camUp[1] + fov * camForward[1], uv[0] * camRight[2] + uv[1] * camUp[2] + fov * camForward[2]]);
    var uvOffset = [uv[0] + 1.0 / uResolution[0], uv[1] + 1.0 / uResolution[1]];
    var rayDirAA = normalize([uvOffset[0] * camRight[0] + uvOffset[1] * camUp[0] + fov * camForward[0], uvOffset[0] * camRight[1] + uvOffset[1] * camUp[1] + fov * camForward[1], uvOffset[0] * camRight[2] + uvOffset[1] * camUp[2] + fov * camForward[2]]);
    var startZ = floor(rayOrigin[2] / uPlaneSpacing);
    var accumColor = [0, 0, 0, 0];
    var pulseColor = paletteColor((uTime * uSpeed) * uPulseColorSpeed).map(function (_) { return _ * (pow(max(dot(rayDir, [0, 0, 1]), 0.0), uPulseColorPower)); });
    var maxPlanes = uPlaneCount | 0;
    for (var i = 1; i <= 16; i++) {
        if (i > maxPlanes) {
            break;
        }
        ;
        var planeZ = uPlaneSpacing * startZ + uPlaneSpacing * i;
        var t = (planeZ - rayOrigin[2]) / rayDir[2];
        if ((t > 0.0) && (accumColor[3] < 0.95)) {
            var hitPos = [rayOrigin[0] + rayDir[0] * t, rayOrigin[1] + rayDir[1] * t, rayOrigin[2] + rayDir[2] * t];
            var hitPosAA = [rayOrigin[0] + rayDirAA[0] * t, rayOrigin[1] + rayDirAA[1] * t, rayOrigin[2] + rayDirAA[2] * t];
            var antiAlias = 3.0 * (length([hitPos[0] - hitPosAA[0], hitPos[1] - hitPosAA[1], hitPos[2] - hitPosAA[2]]));
            var pathOffset = cameraPath(hitPos[2]);
            var planeCol = renderDepthPlane(hitPos, pathOffset, antiAlias, startZ + i);
            var distZ = hitPos[2] - rayOrigin[2];
            var fadeIn = smoothstep(uPlaneSpacing * uPlaneCount, uPlaneSpacing, distZ);
            var fadeOut = smoothstep(0.0, uPlaneSpacing * 0.1, distZ);
            planeCol = [0, 1, 2, null].map(function (idx, i) { return idx == null ? planeCol[i] : this[idx]; }, mix(pulseColor, [planeCol[0], planeCol[1], planeCol[2]], fadeIn));
            planeCol[3] *= fadeOut;
            clamp(planeCol, 0.0, 1.0).reduce((res, el, i) => (res[i] = el, res), planeCol);
            blendColors(planeCol, accumColor).reduce((res, el, i) => (res[i] = el, res), accumColor);
        }
        else {
            break;
        }
        ;
    }
    ;
    return mix(pulseColor, [accumColor[0], accumColor[1], accumColor[2]], accumColor[3]);
}
;
function main() {
    var uv = [(gl_FragCoord[0] - 0.5 * uResolution[0]) / uResolution[1], (gl_FragCoord[1] - 0.5 * uResolution[1]) / uResolution[1]];
    var timeScaled = uTime * uSpeed;
    var rayOrigin = cameraPath(timeScaled);
    var camForward = normalize(cameraDerivative(timeScaled));
    var camDeriv2 = (vec3.subtract([], cameraDerivative(timeScaled + 0.1), cameraDerivative(timeScaled - 0.1))).map(function (_) { return 0.125 * _; }).map(function (_) { return _ / 0.1; });
    var camRight = normalize(cross(normalize([camDeriv2[0], 1 + camDeriv2[1], camDeriv2[2]]), camForward));
    var camUp = normalize(cross(camForward, camRight));
    var col = renderScene(camForward, camRight, camUp, rayOrigin, uv);
    clamp(col, 0.0, 1.0).reduce((res, el, i) => (res[i] = el, res), col);
    pow(col, [0.45454545454545453, 0.45454545454545453, 0.45454545454545453]).reduce((res, el, i) => (res[i] = el, res), col);
    mix(col, [(col[0] * col[0]) * (3.0 - 2.0 * col[0]), (col[1] * col[1]) * (3.0 - 2.0 * col[1]), (col[2] * col[2]) * (3.0 - 2.0 * col[2])], uContrastAmount).reduce((res, el, i) => (res[i] = el, res), col);
    var screenUv = [gl_FragCoord[0] / uResolution[0], gl_FragCoord[1] / uResolution[1]];
    col = [col[0] * (mix(1.0, 0.5 + 0.5 * (pow(((16.0 * screenUv[0]) * screenUv[1]) * (1.0 - screenUv[0]) * (1.0 - screenUv[1]), 0.3)), uVignetteStrength)), col[1] * (mix(1.0, 0.5 + 0.5 * (pow(((16.0 * screenUv[0]) * screenUv[1]) * (1.0 - screenUv[0]) * (1.0 - screenUv[1]), 0.3)), uVignetteStrength)), col[2] * (mix(1.0, 0.5 + 0.5 * (pow(((16.0 * screenUv[0]) * screenUv[1]) * (1.0 - screenUv[0]) * (1.0 - screenUv[1]), 0.3)), uVignetteStrength))];
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"discoFever": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function vec2(x, y) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    return [x, y];
}
vec2.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uCameraSpeed = cloneValue(U.uCameraSpeed);
var uFov = cloneValue(U.uFov);
var uRollAmount = cloneValue(U.uRollAmount);
var uRollSpeed = cloneValue(U.uRollSpeed);
var uPathAmpX = cloneValue(U.uPathAmpX);
var uPathFreqX = cloneValue(U.uPathFreqX);
var uPathAmpY = cloneValue(U.uPathAmpY);
var uPathFreqY = cloneValue(U.uPathFreqY);
var uTunnelRadius = cloneValue(U.uTunnelRadius);
var uTilesAround = cloneValue(U.uTilesAround);
var uTileBorder = cloneValue(U.uTileBorder);
var uTileGlowStrength = cloneValue(U.uTileGlowStrength);
var uTileGlowMin = cloneValue(U.uTileGlowMin);
var uTileTwist = cloneValue(U.uTileTwist);
var uFbmSpeed = cloneValue(U.uFbmSpeed);
var uFbmPower = cloneValue(U.uFbmPower);
var uFbmMin = cloneValue(U.uFbmMin);
var uFogDensity = cloneValue(U.uFogDensity);
var uVignetteStrength = cloneValue(U.uVignetteStrength);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
var dfTime = 0;
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function paletteColor(t) {
    var m = (clamp(fract(t), 0.0, 1.0)) * uColorCount;
    var grad = cloneValue(uColors[0]);
    grad = [grad[0] * grad[3], grad[1] * grad[3], grad[2] * grad[3], grad[3]];
    for (var i = 1; i < 10; i++) {
        if (i > uColorCount) {
            break;
        }
        ;
        var mm = clamp(m - i - 1, 0.0, 1.0);
        mm = smoothstep(0.0, 1.0, mm);
        var c = cloneValue(uColors[i - 1]);
        c = [c[0] * c[3], c[1] * c[3], c[2] * c[3], c[3]];
        mix(grad, c, mm).reduce((res, el, i) => (res[i] = el, res), grad);
    }
    ;
    return [grad[0], grad[1], grad[2]];
}
;
function hash1(n) {
    return fract(sin(n) * 437518.56453) + 0.1;
}
;
function fbmValue(st) {
    st = st.slice();
    var value = (sin((dfTime * uFbmSpeed) * (hash1(st[0] + hash1(st[1])))) + 4.0) * 0.25;
    return max(uFbmMin, pow(value, uFbmPower));
}
;
function squaresColours(p) {
    p = p.slice();
    var hueSeed = fract(hash1(p[1] + hash1(p[0])));
    var baseColor = paletteColor(hueSeed);
    mix([1, 1, 1], baseColor, 1.0).reduce((res, el, i) => (res[i] = el, res), baseColor);
    return [baseColor[0] * fbmValue(p), baseColor[1] * fbmValue(p), baseColor[2] * fbmValue(p)];
}
;
function squaresTex(p, border) {
    p = p.slice();
    var ip = floor(p);
    var fp = fract(p);
    ip[0] = mod(ip[0], uTilesAround);
    var tileColor = squaresColours(ip);
    var glow = 1.0 - (length([fp[0] - 0.5, fp[1] - 0.5])) * uTileGlowStrength;
    glow = clamp(glow, uTileGlowMin, 1.0);
    tileColor = [tileColor[0] * glow, tileColor[1] * glow, tileColor[2] * glow];
    var edgeDist = max(abs(fp[0] - 0.5), abs(fp[1] - 0.5));
    var sm = 0.03;
    var borderMask = smoothstep(border - sm, border, edgeDist);
    return mix(tileColor, [0.01, 0.01, 0.01], borderMask);
}
;
function tunnelPath(z) {
    return [(sin(z * uPathFreqX)) * uPathAmpX, (cos(z * uPathFreqY)) * uPathAmpY];
}
;
function sceneMap(p) {
    p = p.slice();
    return uTunnelRadius - length(vec2.subtract([], [p[0], p[1]], tunnelPath(p[2])));
}
;
function main() {
    dfTime = uTime * uSpeed + 1.0;
    var uv = [(gl_FragCoord[0] - 0.5 * uResolution[0]) / uResolution[1], (gl_FragCoord[1] - 0.5 * uResolution[1]) / uResolution[1]];
    var camZ = dfTime * uCameraSpeed;
    var ro = [...tunnelPath(camZ), camZ];
    var ta = [...tunnelPath(camZ + 3.0), camZ + 3.0];
    var fwd = normalize([ta[0] - ro[0], ta[1] - ro[1], ta[2] - ro[2]]);
    var right = normalize(cross(fwd, [0, 1, 0]));
    var up = cross(right, fwd);
    var roll = (sin(dfTime * uRollSpeed)) * uRollAmount;
    var rollRot = [cos(roll), -sin(roll), sin(roll), cos(roll)];
    (uv = uv.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, rollRot));
    var rd = normalize([uv[0] * right[0] + uv[1] * up[0] + uFov * fwd[0], uv[0] * right[1] + uv[1] * up[1] + uFov * fwd[1], uv[0] * right[2] + uv[1] * up[2] + uFov * fwd[2]]);
    var t = 0.0;
    for (var i = 0; i < 80; i++) {
        var p = [ro[0] + rd[0] * t, ro[1] + rd[1] * t, ro[2] + rd[2] * t];
        var d = sceneMap(p);
        if ((d < 0.01) || (t > 100.0)) {
            break;
        }
        ;
        t += d * 0.7;
    }
    ;
    var col = [0, 0, 0];
    if (t < 100.0) {
        var p = [ro[0] + rd[0] * t, ro[1] + rd[1] * t, ro[2] + rd[2] * t];
        var tunObj = vec2.subtract([], [p[0], p[1]], tunnelPath(p[2]));
        var a = atan(tunObj[1], tunObj[0]);
        a += p[2] * uTileTwist;
        var tilesAround = max(uTilesAround, 2.0);
        var xuv = (a / 3.1415926535) * (tilesAround * 0.5);
        var yuv = p[2] * (tilesAround / ((uTunnelRadius * 2.0) * 3.1415926535));
        var tUv = [xuv, yuv];
        squaresTex(tUv, uTileBorder).reduce((res, el, i) => (res[i] = el, res), col);
        var fog = exp((-uFogDensity * t) * t);
        col = [col[0] * fog, col[1] * fog, col[2] * fog];
    }
    ;
    var q = [gl_FragCoord[0] / uResolution[0], gl_FragCoord[1] / uResolution[1]];
    col = [col[0] * (mix(1.0, 0.5 + 0.5 * (pow(((16.0 * q[0]) * q[1]) * (1.0 - q[0]) * (1.0 - q[1]), 0.1)), uVignetteStrength)), col[1] * (mix(1.0, 0.5 + 0.5 * (pow(((16.0 * q[0]) * q[1]) * (1.0 - q[0]) * (1.0 - q[1]), 0.1)), uVignetteStrength)), col[2] * (mix(1.0, 0.5 + 0.5 * (pow(((16.0 * q[0]) * q[1]) * (1.0 - q[0]) * (1.0 - q[1]), 0.1)), uVignetteStrength))];
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
dfTime=0;
main();return Array.from(fragColor); };
},
"quantumShapes": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uCameraOrbitRadius = cloneValue(U.uCameraOrbitRadius);
var uCameraOrbitSpeed = cloneValue(U.uCameraOrbitSpeed);
var uCameraForwardSpeed = cloneValue(U.uCameraForwardSpeed);
var uFov = cloneValue(U.uFov);
var uGridSize = cloneValue(U.uGridSize);
var uFoldIterations = cloneValue(U.uFoldIterations);
var uFoldWarpAmount = cloneValue(U.uFoldWarpAmount);
var uFoldWarpFrequency = cloneValue(U.uFoldWarpFrequency);
var uMorphSpeed = cloneValue(U.uMorphSpeed);
var uPyramidRadius = cloneValue(U.uPyramidRadius);
var uPyramidTwist = cloneValue(U.uPyramidTwist);
var uSphereRadius = cloneValue(U.uSphereRadius);
var uSphereOffsetBase = cloneValue(U.uSphereOffsetBase);
var uSphereOffsetAmp = cloneValue(U.uSphereOffsetAmp);
var uCubeRadius = cloneValue(U.uCubeRadius);
var uCubeOffsetBase = cloneValue(U.uCubeOffsetBase);
var uCubeOffsetAmp = cloneValue(U.uCubeOffsetAmp);
var uMarchSteps = cloneValue(U.uMarchSteps);
var uStepScale = cloneValue(U.uStepScale);
var uColorPhaseScale = cloneValue(U.uColorPhaseScale);
var uColorTimeSpeed = cloneValue(U.uColorTimeSpeed);
var uFogDensity = cloneValue(U.uFogDensity);
var uExposure = cloneValue(U.uExposure);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function paletteColor(t) {
    var m = (clamp(fract(t), 0.0, 1.0)) * uColorCount;
    var grad = cloneValue(uColors[0]);
    grad = [grad[0] * grad[3], grad[1] * grad[3], grad[2] * grad[3], grad[3]];
    for (var i = 1; i < 10; i++) {
        if (i > uColorCount) {
            break;
        }
        ;
        var mm = clamp(m - i - 1, 0.0, 1.0);
        mm = smoothstep(0.0, 1.0, mm);
        var c = cloneValue(uColors[i - 1]);
        c = [c[0] * c[3], c[1] * c[3], c[2] * c[3], c[3]];
        mix(grad, c, mm).reduce((res, el, i) => (res[i] = el, res), grad);
    }
    ;
    return [grad[0], grad[1], grad[2]];
}
;
function qsHash(p) {
    p = p.slice();
    return fract((sin(dot(p, [12.9898, 78.233]))) * 43758.5453);
}
;
function toneMapACES(x) {
    x = x.slice();
    var a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
    return clamp([(x[0] * (a * x[0] + b)) / (x[0] * (c * x[0] + d) + e), (x[1] * (a * x[1] + b)) / (x[1] * (c * x[1] + d) + e), (x[2] * (a * x[2] + b)) / (x[2] * (c * x[2] + d) + e)], 0.0, 1.0);
}
;
function qsRot(a) {
    return [cos(a), sin(a), -sin(a), cos(a)];
}
;
function qsMap(p) {
    p = p.slice();
    sin([p[2] * uFoldWarpFrequency, p[0] * uFoldWarpFrequency, p[1] * uFoldWarpFrequency]).map(function (_) { return _ * uFoldWarpAmount; }).reduce((res, el, i) => (res[i] += el, res), p);
    var a = cloneValue(uGridSize);
    var pGrid = mod([p[0] - a, p[1] - a, p[2] - a], a * 2.0).map(function (_) { return _ - a; });
    var cellId = floor([(p[0] - a) / (a * 2.0), (p[1] - a) / (a * 2.0), (p[2] - a) / (a * 2.0)]);
    var shapeType = mod(abs(cellId[0] + cellId[1] + cellId[2]), 3.0);
    var d = 1e10;
    var s = 1.0;
    var e = 0;
    var n = cloneValue(pGrid);
    var iterations = clamp(uFoldIterations, 1.0, 12.0) | 0;
    if (shapeType < 1.0) {
        for (var j = 0; j < 12; j++) {
            if (j >= iterations) {
                break;
            }
            ;
            if ((n[0] + n[1]) < 0.0) {
                n = [-n[1], -n[0], n[2]];
            }
            ;
            if ((n[0] + n[2]) < 0.0) {
                n = [-n[2], n[1], -n[0]];
            }
            ;
            if ((n[1] + n[2]) < 0.0) {
                n = [n[0], -n[2], -n[1]];
            }
            ;
            assignComponents(n, [0, 2], [n[0], n[2]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, qsRot(uPyramidTwist)));
            e = 1.6 + (sin(uTime * uMorphSpeed)) * 0.05;
            (n[0] = n[0] * e - 0.8, n[1] = n[1] * e - 1, n[2] = n[2] * e - 0.8, n);
            s *= e;
        }
        ;
        d = (length(n) - uPyramidRadius) / s;
    }
    else {
        if (shapeType < 2.0) {
            for (var j = 0; j < 12; j++) {
                if (j >= iterations) {
                    break;
                }
                ;
                abs(n).map(function (_) { return 0.4 - _; }).reduce((res, el, i) => (res[i] = el, res), n);
                if (n[0] < n[2]) {
                    n = [n[2], n[1], n[0]];
                }
                ;
                if (n[2] < n[1]) {
                    n = [n[0], n[2], n[1]];
                }
                ;
                if (n[1] < n[0]) {
                    n = [n[1], n[0], n[2]];
                }
                ;
                assignComponents(n, [0, 2], [n[0], n[2]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, qsRot(0.45)));
                assignComponents(n, [1, 2], [n[1], n[2]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, qsRot(0.35)));
                assignComponents(n, [0, 1], [n[0], n[1]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, qsRot(0.25)));
                var r2 = dot(n, n);
                if (r2 < 1.0) {
                    var k = 1.0 / r2;
                    n = [n[0] * k, n[1] * k, n[2] * k];
                    s *= k;
                }
                ;
                s *= e = 1.4 + (sin(uTime * uMorphSpeed)) * 0.05;
                vec3.subtract([], abs(n).map(function (_) { return _ * e; }), [uSphereOffsetBase + (cos(uTime * 0.2)) * uSphereOffsetAmp, 2.5, uSphereOffsetBase + (sin(uTime * 0.3)) * uSphereOffsetAmp]).reduce((res, el, i) => (res[i] = el, res), n);
            }
            ;
            d = (length(n) - uSphereRadius) / s;
        }
        else {
            for (var j = 0; j < 12; j++) {
                if (j >= iterations) {
                    break;
                }
                ;
                abs(n).map(function (_) { return 0.4 - _; }).reduce((res, el, i) => (res[i] = el, res), n);
                if (n[0] < n[2]) {
                    n = [n[2], n[1], n[0]];
                }
                ;
                if (n[2] < n[1]) {
                    n = [n[0], n[2], n[1]];
                }
                ;
                if (n[1] < n[0]) {
                    n = [n[1], n[0], n[2]];
                }
                ;
                assignComponents(n, [0, 2], [n[0], n[2]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, qsRot(0.15 + cellId[0] * 0.01)));
                s *= e = 1.4 + (sin(uTime * uMorphSpeed)) * 0.05;
                vec3.subtract([], abs(n).map(function (_) { return _ * e; }), [uCubeOffsetBase + (cos(uTime * 0.2)) * uCubeOffsetAmp, 2.5, uCubeOffsetBase + (sin(uTime * 0.3)) * uCubeOffsetAmp]).reduce((res, el, i) => (res[i] = el, res), n);
            }
            ;
            var boxDist = max(abs(n[0]), max(abs(n[1]), abs(n[2])));
            d = (boxDist - uCubeRadius) / s;
        }
        ;
    }
    ;
    return [d, shapeType];
}
;
function main() {
    var uv = [(gl_FragCoord[0] - 0.5 * uResolution[0]) / uResolution[1], (gl_FragCoord[1] - 0.5 * uResolution[1]) / uResolution[1]];
    var t = uTime * uSpeed;
    var ro = [6.0 + (sin(t * uCameraOrbitSpeed)) * uCameraOrbitRadius, 6.0 + (cos((t * uCameraOrbitSpeed) * 0.75)) * uCameraOrbitRadius, t * uCameraForwardSpeed];
    var ta = [ro[0] + (sin(t * 0.2)) * 0.4, ro[1] + (cos(t * 0.2)) * 0.4, ro[2] + 1];
    var cw = normalize([ta[0] - ro[0], ta[1] - ro[1], ta[2] - ro[2]]);
    var cu = normalize(cross(cw, [0, 1, 0]));
    var cv = normalize(cross(cu, cw));
    var rd = normalize([uv[0] * cu[0] + uv[1] * cv[0] + uFov * cw[0], uv[0] * cu[1] + uv[1] * cv[1] + uFov * cw[1], uv[0] * cu[2] + uv[1] * cv[2] + uFov * cw[2]]);
    var g = (qsHash([uv[0] + t, uv[1] + t])) * 0.15;
    var col = [0, 0, 0];
    var steps = clamp(uMarchSteps, 1.0, 200.0) | 0;
    for (var i = 0; i < 200; i++) {
        if (i >= steps) {
            break;
        }
        ;
        var p = [ro[0] + g * rd[0], ro[1] + g * rd[1], ro[2] + g * rd[2]];
        var res = qsMap(p);
        var dist = cloneValue(res[0]);
        g += dist * uStepScale;
        var phase = g * uColorPhaseScale - t * uColorTimeSpeed;
        var colSample = paletteColor(phase);
        var intensity = 0.015 / (0.02 + (dist * dist) * 40.0);
        (col[0] += colSample[0] * intensity, col[1] += colSample[1] * intensity, col[2] += colSample[2] * intensity, col);
    }
    ;
    col = col.map(function (_) { return _ * this; }, exp(-g * uFogDensity));
    col = [col[0] * uExposure, col[1] * uExposure, col[2] * uExposure];
    toneMapACES(col).reduce((res, el, i) => (res[i] = el, res), col);
    pow(col, [0.45454545454545453, 0.45454545454545453, 0.45454545454545453]).reduce((res, el, i) => (res[i] = el, res), col);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"glassOrigin": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function tanh(x) { return x?.length ? x.map(tanh) : Math.tanh(x); }
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uPathRadius = cloneValue(U.uPathRadius);
var uPathFreqX = cloneValue(U.uPathFreqX);
var uPathYAmp = cloneValue(U.uPathYAmp);
var uPathFreqY = cloneValue(U.uPathFreqY);
var uRotTwistScale = cloneValue(U.uRotTwistScale);
var uNoiseScale2 = cloneValue(U.uNoiseScale2);
var uNoiseAmp2 = cloneValue(U.uNoiseAmp2);
var uWaveAmp = cloneValue(U.uWaveAmp);
var uWaveOffset = cloneValue(U.uWaveOffset);
var uYInfluence = cloneValue(U.uYInfluence);
var uDistanceThreshold = cloneValue(U.uDistanceThreshold);
var uThresholdFreqZ = cloneValue(U.uThresholdFreqZ);
var uThresholdFreqY = cloneValue(U.uThresholdFreqY);
var uMarchSteps = cloneValue(U.uMarchSteps);
var uStepMinBase = cloneValue(U.uStepMinBase);
var uStepMult = cloneValue(U.uStepMult);
var uColorPhaseScale = cloneValue(U.uColorPhaseScale);
var uColorIterScale = cloneValue(U.uColorIterScale);
var uFov = cloneValue(U.uFov);
var uExposure = cloneValue(U.uExposure);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function paletteColor(t) {
    var m = (clamp(fract(t), 0.0, 1.0)) * uColorCount;
    var grad = cloneValue(uColors[0]);
    grad = [grad[0] * grad[3], grad[1] * grad[3], grad[2] * grad[3], grad[3]];
    for (var i = 1; i < 10; i++) {
        if (i > uColorCount) {
            break;
        }
        ;
        var mm = clamp(m - i - 1, 0.0, 1.0);
        mm = smoothstep(0.0, 1.0, mm);
        var c = cloneValue(uColors[i - 1]);
        c = [c[0] * c[3], c[1] * c[3], c[2] * c[3], c[3]];
        mix(grad, c, mm).reduce((res, el, i) => (res[i] = el, res), grad);
    }
    ;
    return [grad[0], grad[1], grad[2]];
}
;
var G = [-0.57, 0.81, 0.1, -0.28, -0.3, 0.9, 0.77, 0.49, 0.4];
function goNoise(p) {
    p = p.slice();
    return dot(cos([G[0] * p[0] + G[3] * p[1] + G[6] * p[2], G[1] * p[0] + G[4] * p[1] + G[7] * p[2], G[2] * p[0] + G[5] * p[1] + G[8] * p[2]]), sin([dot([1.6 * p[0], 1.6 * p[1], 1.6 * p[2]], [G[0], G[1], G[2]]), dot([1.6 * p[0], 1.6 * p[1], 1.6 * p[2]], [G[3], G[4], G[5]]), dot([1.6 * p[0], 1.6 * p[1], 1.6 * p[2]], [G[6], G[7], G[8]])]));
}
;
function goPath(z, t) {
    return [(cos(z * uPathFreqX)) * uPathRadius, (cos(z * uPathFreqY)) * uPathYAmp, z];
}
;
function goRot(a) {
    return [cos(a), sin(a), -sin(a), cos(a)];
}
;
function main() {
    var goT = uTime * uSpeed;
    var i = 0.0, y = 0, d = 0.0, s = 0.0;
    var g = [0, 0, 0];
    var p = goPath(goT * 10.0, goT);
    var Z = normalize(vec3.subtract([], goPath(goT * 10.0 + 1.0, goT), p));
    var X = normalize([Z[2], 0, -Z[0]]);
    var rd = [dot([(gl_FragCoord[0] - 0.5 * uResolution[0]) / uResolution[1], (gl_FragCoord[1] - 0.5 * uResolution[1]) / uResolution[1], uFov], [-X[0], -X[1], -X[2]]), dot([(gl_FragCoord[0] - 0.5 * uResolution[0]) / uResolution[1], (gl_FragCoord[1] - 0.5 * uResolution[1]) / uResolution[1], uFov], [cross(X, Z)[0], cross(X, Z)[1], cross(X, Z)[2]]), dot([(gl_FragCoord[0] - 0.5 * uResolution[0]) / uResolution[1], (gl_FragCoord[1] - 0.5 * uResolution[1]) / uResolution[1], uFov], [Z[0], Z[1], Z[2]])];
    var o = [0, 0, 0, 0];
    var steps = clamp(uMarchSteps, 1.0, 260.0) | 0;
    for (var stepIndex = 0; stepIndex < 260; stepIndex++) {
        if (stepIndex >= steps) {
            break;
        }
        ;
        i += 1.0;
        s = uStepMinBase + abs(s) * uStepMult;
        d += s;
        o = [0, 1, 2, null].map(function (idx, i) { return idx == null ? o[i] : this[idx]; }, vec3.add([], [o[0], o[1], o[2]], paletteColor(p[2] * uColorPhaseScale + i * uColorIterScale).map(function (_) { return _ / s; })));
        vec3.add([], [rd[0] * d, rd[1] * d, rd[2] * d], goPath(goT * 10.0, goT)).reduce((res, el, i) => (res[i] = el, res), p);
        (g[0] = p[0], g[1] = p[1], g[2] = p[2], g);
        assignComponents(p, [0, 1], [p[0], p[1]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, goRot((length(new Float32Array([0, 1].map(function (x, i) { return this[x]; }, goPath(goT, goT))))) * uRotTwistScale)));
        s = ((sin(p[2] + p[1])) * uWaveAmp) + uWaveOffset;
        y = abs(goNoise(p) + (goNoise([p[0] / 8.0, p[1] / 8.0, p[2] / 8.0])) * uNoiseAmp2);
        s += y + y * uYInfluence;
        s = max(uDistanceThreshold + sin(p[2] * uThresholdFreqZ + p[1] * uThresholdFreqY) - length(new Float32Array([0, 1].map(function (x, i) { return this[x]; }, (vec3.subtract([], g, goPath(p[2], goT)))))), s);
    }
    ;
    var col = tanh([(o[0] * o[0]) / 2e8, (o[1] * o[1]) / 2e8, (o[2] * o[2]) / 2e8]).map(function (_) { return _ * uExposure; });
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
G=[-0.57, 0.81, 0.1, -0.28, -0.3, 0.9, 0.77, 0.49, 0.4];
main();return Array.from(fragColor); };
},
"mandalaDice": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function sign(x) {
    if (x.length)
        return x.map(sign);
    return Math.sign(x);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function sqrt(x) {
    if (x.length)
        return x.map(sqrt);
    return Math.sqrt(x);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
function reflect(I, N) {
    var dot = 0;
    for (var i = 0; i < N.length; i++) {
        dot += N[i] * I[i];
    }
    var out = Array(N.length);
    for (var i = 0; i < N.length; i++) {
        out[i] = I[i] - 2 * dot * N[i];
    }
    return out;
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uRotSpeedYZ = cloneValue(U.uRotSpeedYZ);
var uRotSpeedXZ = cloneValue(U.uRotSpeedXZ);
var uBuckyRadius = cloneValue(U.uBuckyRadius);
var uBuckyBevel = cloneValue(U.uBuckyBevel);
var uBuckyPentagonScale = cloneValue(U.uBuckyPentagonScale);
var uCameraDistance = cloneValue(U.uCameraDistance);
var uCameraFov = cloneValue(U.uCameraFov);
var uMandalaScale = cloneValue(U.uMandalaScale);
var uLogoRadius = cloneValue(U.uLogoRadius);
var uLogoOffset = cloneValue(U.uLogoOffset);
var uLogoWidth = cloneValue(U.uLogoWidth);
var uKaleidoscopeRepMin = cloneValue(U.uKaleidoscopeRepMin);
var uKaleidoscopeRepMax = cloneValue(U.uKaleidoscopeRepMax);
var uKaleidoscopeSoftnessMin = cloneValue(U.uKaleidoscopeSoftnessMin);
var uKaleidoscopeSoftnessMax = cloneValue(U.uKaleidoscopeSoftnessMax);
var uFaceRotationSpeed = cloneValue(U.uFaceRotationSpeed);
var uColorCycleSpeed = cloneValue(U.uColorCycleSpeed);
var uFaceGlowSpeed = cloneValue(U.uFaceGlowSpeed);
var uGlowIntensity = cloneValue(U.uGlowIntensity);
var uSpecularPower = cloneValue(U.uSpecularPower);
var uFresnelStrength = cloneValue(U.uFresnelStrength);
var uContrastAmount = cloneValue(U.uContrastAmount);
var uVignetteStrength = cloneValue(U.uVignetteStrength);
var uColorBack = cloneValue(U.uColorBack);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function paletteColor(t) {
    var m = (clamp(fract(t), 0.0, 1.0)) * uColorCount;
    var grad = cloneValue(uColors[0]);
    grad = [grad[0] * grad[3], grad[1] * grad[3], grad[2] * grad[3], grad[3]];
    for (var i = 1; i < 10; i++) {
        if (i > uColorCount) {
            break;
        }
        ;
        var mm = clamp(m - i - 1, 0.0, 1.0);
        mm = smoothstep(0.0, 1.0, mm);
        var c = cloneValue(uColors[i - 1]);
        c = [c[0] * c[3], c[1] * c[3], c[2] * c[3], c[3]];
        mix(grad, c, mm).reduce((res, el, i) => (res[i] = el, res), grad);
    }
    ;
    return [grad[0], grad[1], grad[2]];
}
;
function mdHash(p) {
    p = p.slice();
    var a = dot(p, [127.1, 311.7]);
    return fract(sin(a) * 43758.5453123);
}
;
function rcp(x) {
    return 1.0 / x;
}
;
function fastAtan2(y, x) {
    var cosatan2 = x * (rcp(abs(x) + abs(y)));
    var t = (1.570796327) - cosatan2 * (1.570796327);
    return y < 0.0 ? -t : t;
}
;
function mdCircle(p, r) {
    p = p.slice();
    return length(p) - r;
}
;
function modPolar(p, repetitions) {
    p = p.slice();
    var angle = (6.283185308) / repetitions;
    var a = atan(p[1], p[0]) + angle / 2.0;
    var r = length(p);
    var c = floor(a / angle);
    a = mod(a, angle) - angle / 2.0;
    (p[0] = cos(a) * r, p[1] = sin(a) * r, p);
    if (abs(c) >= (repetitions / 2.0)) {
        c = abs(c);
    }
    ;
    modPolar.__return__ = c;
    modPolar.__out__ = [p];
    return modPolar.__return__;
}
;
function postProcess(col, q) {
    col = col.slice();
    q = q.slice();
    clamp(col, 0.0, 1.0).reduce((res, el, i) => (res[i] = el, res), col);
    pow(col, [0.45454545454545453, 0.45454545454545453, 0.45454545454545453]).reduce((res, el, i) => (res[i] = el, res), col);
    mix(col, [col[0] * 0.6 + ((0.4 * col[0]) * col[0]) * (3.0 - 2.0 * col[0]), col[1] * 0.6 + ((0.4 * col[1]) * col[1]) * (3.0 - 2.0 * col[1]), col[2] * 0.6 + ((0.4 * col[2]) * col[2]) * (3.0 - 2.0 * col[2])], uContrastAmount).reduce((res, el, i) => (res[i] = el, res), col);
    mix(col, [dot(col, [0.33, 0.33, 0.33]), dot(col, [0.33, 0.33, 0.33]), dot(col, [0.33, 0.33, 0.33])], -0.4).reduce((res, el, i) => (res[i] = el, res), col);
    col = [col[0] * (mix(1.0, 0.5 + 0.5 * (pow(((19.0 * q[0]) * q[1]) * (1.0 - q[0]) * (1.0 - q[1]), 0.7)), uVignetteStrength)), col[1] * (mix(1.0, 0.5 + 0.5 * (pow(((19.0 * q[0]) * q[1]) * (1.0 - q[0]) * (1.0 - q[1]), 0.7)), uVignetteStrength)), col[2] * (mix(1.0, 0.5 + 0.5 * (pow(((19.0 * q[0]) * q[1]) * (1.0 - q[0]) * (1.0 - q[1]), 0.7)), uVignetteStrength))];
    return col;
}
;
function pmin(a, b, k) {
    var h = clamp(0.5 + (0.5 * (b - a)) / k, 0.0, 1.0);
    return mix(b, a, h) - (k * h) * (1.0 - h);
}
;
function pmax(a, b, k) {
    return -pmin(-a, -b, k);
}
;
function pabs(a, k) {
    return pmax(a, -a, k);
}
;
function modMirror1(p, size) {
    var halfsize = size * 0.5;
    var c = floor((p + halfsize) / size);
    p = mod(p + halfsize, size) - halfsize;
    p *= (mod(c, 2.0)) * 2.0 - 1.0;
    modMirror1.__return__ = c;
    modMirror1.__out__ = [p];
    return modMirror1.__return__;
}
;
function toPolar(p) {
    p = p.slice();
    return [length(p), atan(p[1], p[0])];
}
;
function toRect(p) {
    p = p.slice();
    return [p[0] * cos(p[1]), p[0] * sin(p[1])];
}
;
function smoothKaleidoscope(p, sm, rep) {
    p = p.slice();
    var hpp = toPolar(p);
    (modMirror1(hpp[1], (6.283185308) / rep), [hpp[1]] = modMirror1.__out__, modMirror1.__return__);
    var sa = 3.141592654 / rep - pabs(3.141592654 / rep - abs(hpp[1]), sm);
    hpp[1] = sign(hpp[1]) * sa;
    toRect(hpp).reduce((res, el, i) => (res[i] = el, res), p);
    smoothKaleidoscope.__return__ = 0.0;
    smoothKaleidoscope.__out__ = [p];
    return smoothKaleidoscope.__return__;
}
;
function stripes(d, lw) {
    var cc = 0.42;
    d = abs(d) - lw * cc;
    d = abs(d) - (lw * cc) * 0.5;
    return d;
}
;
function mdMerge(s0, s1) {
    s0 = s0.slice();
    s1 = s1.slice();
    var dt = s0[2] < s1[2];
    var b = dt ? s0 : s1;
    var t = dt ? s1 : s0;
    b[0] *= 1.0 - exp(-max(80.0 * (t[3]), 0.0));
    return [...mix([b[0], b[1]], [t[0], t[1]], t[1]), ...[b[3] < t[3] ? b[2] : t[2], min(b[3], t[3])]];
}
;
function figure8(aa, p, logoRadius, logoOff, logoWidth) {
    p = p.slice();
    var p1 = [p[0] - 0.5 / sqrt(3.0), p[1] - -logoOff];
    var d1 = abs(mdCircle(p1, logoRadius));
    var a1 = fastAtan2(-p1[0], -p1[1]);
    var s1 = stripes(d1, logoWidth);
    var o1 = d1 - logoWidth;
    var p2 = [p[0] - 0.5 / sqrt(3.0), p[1] - logoOff];
    var d2 = abs(mdCircle(p2, logoRadius));
    var a2 = fastAtan2(p2[0], p2[1]);
    var s2 = stripes(d2, logoWidth);
    var o2 = d2 - logoWidth;
    return mdMerge([smoothstep(aa, -aa, s1), smoothstep(aa, -aa, o1), a1, o1], [smoothstep(aa, -aa, s2), smoothstep(aa, -aa, o2), a2, o2]);
}
;
function figureHalf8(aa, p, logoRadius, logoOff, logoWidth) {
    p = p.slice();
    var p1 = [p[0] - 0.5 / sqrt(3.0), p[1] - -logoOff];
    var d1 = abs(mdCircle(p1, logoRadius));
    var a1 = fastAtan2(-p1[0], -p1[1]);
    var s1 = stripes(d1, logoWidth);
    var o1 = d1 - logoWidth;
    return [smoothstep(aa, -aa, s1), smoothstep(aa, -aa, o1), a1, o1];
}
;
function flipy(p) {
    p = p.slice();
    return [p[0], -p[1]];
}
;
function clogo(p, z, d, baseAA, logoRadius, logoOff, logoWidth) {
    p = p.slice();
    var iz = 1.0 / z;
    p = [p[0] * iz, p[1] * iz];
    var aa = baseAA * iz;
    (modPolar(p, 3.0), [p] = modPolar.__out__, modPolar.__return__);
    var s0 = figure8(aa, p, logoRadius, logoOff, logoWidth);
    var s1 = figureHalf8(aa, [dot(p, [cos(2.0943951026666667), sin(2.0943951026666667)]), dot(p, [-sin(2.0943951026666667), cos(2.0943951026666667)])], logoRadius, logoOff, logoWidth);
    var s2 = figureHalf8(aa, flipy([dot(p, [cos(4.1887902053333335), sin(4.1887902053333335)]), dot(p, [-sin(4.1887902053333335), cos(4.1887902053333335)])]), logoRadius, logoOff, logoWidth);
    s1[2] += -3.141592654;
    var s = mdMerge(mdMerge(s0, s1), s2);
    d = s[3];
    var baseColor = paletteColor(fract(s[2] / 3.141592654 + (uTime * uSpeed) * uColorCycleSpeed));
    clogo.__return__ = [baseColor[0] * s[0], baseColor[1] * s[0], baseColor[2] * s[0], s[1]];
    clogo.__out__ = [d];
    return clogo.__return__;
}
;
function rotateP(p) {
    p = p.slice();
    assignComponents(p, [1, 2], [p[1], p[2]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, [cos((uTime * uSpeed) * uRotSpeedYZ), sin((uTime * uSpeed) * uRotSpeedYZ), -sin((uTime * uSpeed) * uRotSpeedYZ), cos((uTime * uSpeed) * uRotSpeedYZ)]));
    assignComponents(p, [0, 2], [p[0], p[2]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, [cos((uTime * uSpeed) * uRotSpeedXZ), sin((uTime * uSpeed) * uRotSpeedXZ), -sin((uTime * uSpeed) * uRotSpeedXZ), cos((uTime * uSpeed) * uRotSpeedXZ)]));
    return p;
}
;
function sdBuckyball(p, r) {
    p = p.slice();
    abs(p).reduce((res, el, i) => (res[i] = el, res), p);
    var phi = 1.61803398875;
    var i1 = normalize([phi * phi, 1, 0]);
    var i2 = normalize([0, phi * phi, 1]);
    var i3 = normalize([1, 0, phi * phi]);
    var d1 = max(max(dot(p, i1), dot(p, i2)), dot(p, i3));
    var d_1 = normalize([0, 1, phi]);
    var d_2 = normalize([1, phi, 0]);
    var d_3 = normalize([phi, 0, 1]);
    var d2 = max(max(dot(p, d_1), dot(p, d_2)), dot(p, d_3));
    return max(d1 - r, d2 - r * uBuckyPentagonScale);
}
;
function sceneMap(p) {
    p = p.slice();
    return sdBuckyball(rotateP(p), uBuckyRadius) - uBuckyBevel;
}
;
function calcNormal(p) {
    p = p.slice();
    var e = [0.01, 0.0];
    return normalize([sceneMap([p[0] + e[0], p[1] + e[1], p[2] + e[1]]) - sceneMap([p[0] - e[0], p[1] - e[1], p[2] - e[1]]), sceneMap([p[0] + e[1], p[1] + e[0], p[2] + e[1]]) - sceneMap([p[0] - e[1], p[1] - e[0], p[2] - e[1]]), sceneMap([p[0] + e[1], p[1] + e[1], p[2] + e[0]]) - sceneMap([p[0] - e[1], p[1] - e[1], p[2] - e[0]])]);
}
;
function getFaceNormal(p) {
    p = p.slice();
    var ap = abs(p);
    var s = sign([p[0] + 0.0000001, p[1] + 0.0000001, p[2] + 0.0000001]);
    var phi = 1.61803398875;
    var i1 = normalize([phi * phi, 1, 0]);
    var i2 = normalize([0, phi * phi, 1]);
    var i3 = normalize([1, 0, phi * phi]);
    var d1 = normalize([0, 1, phi]);
    var d2 = normalize([1, phi, 0]);
    var d3 = normalize([phi, 0, 1]);
    var best_n = cloneValue(i1);
    var best_val = dot(ap, i1);
    var val = 0;
    val = dot(ap, i2);
    if (val > best_val) {
        best_val = val;
        (best_n[0] = i2[0], best_n[1] = i2[1], best_n[2] = i2[2], best_n);
    }
    ;
    val = dot(ap, i3);
    if (val > best_val) {
        best_val = val;
        (best_n[0] = i3[0], best_n[1] = i3[1], best_n[2] = i3[2], best_n);
    }
    ;
    var f = cloneValue(uBuckyPentagonScale);
    val = (dot(ap, d1)) / f;
    if (val > best_val) {
        best_val = val;
        (best_n[0] = d1[0], best_n[1] = d1[1], best_n[2] = d1[2], best_n);
    }
    ;
    val = (dot(ap, d2)) / f;
    if (val > best_val) {
        best_val = val;
        (best_n[0] = d2[0], best_n[1] = d2[1], best_n[2] = d2[2], best_n);
    }
    ;
    val = (dot(ap, d3)) / f;
    if (val > best_val) {
        best_val = val;
        (best_n[0] = d3[0], best_n[1] = d3[1], best_n[2] = d3[2], best_n);
    }
    ;
    return [best_n[0] * s[0], best_n[1] * s[1], best_n[2] * s[2]];
}
;
function main() {
    var q = [gl_FragCoord[0] / uResolution[0], gl_FragCoord[1] / uResolution[1]];
    var p = [-1.0 + 2.0 * q[0], -1.0 + 2.0 * q[1]];
    p[0] *= uResolution[0] / uResolution[1];
    var ro = [0, 0, uCameraDistance];
    var rd = normalize([p[0], p[1], -uCameraFov]);
    var t = 0.0;
    for (var i = 0; i < 150; i++) {
        if (i >= 150.0) {
            break;
        }
        ;
        var pos = [ro[0] + rd[0] * t, ro[1] + rd[1] * t, ro[2] + rd[2] * t];
        var d = sceneMap(pos);
        if ((d < 0.001) || (t > 12.0)) {
            break;
        }
        ;
        t += d;
    }
    ;
    var col = [uColorBack[0] * (1.0 - length(p) * 0.4), uColorBack[1] * (1.0 - length(p) * 0.4), uColorBack[2] * (1.0 - length(p) * 0.4)];
    if (t < 12.0) {
        var pos = [ro[0] + rd[0] * t, ro[1] + rd[1] * t, ro[2] + rd[2] * t];
        var n = calcNormal(pos);
        var lp = rotateP(pos);
        var fn = getFaceNormal(lp);
        var up = abs(fn[1]) < 0.999 ? [0, 1, 0] : [1, 0, 0];
        var right = normalize(cross(up, fn));
        var top = cross(fn, right);
        var uv = [dot(lp, right), dot(lp, top)];
        var cp = [uv[0] * uMandalaScale, uv[1] * uMandalaScale];
        var faceSeed = mdHash([fn[0] * 13.37 + fn[2] * 73.1, fn[1] * 13.37 + fn[2] * 73.1]);
        var hh = fract(137.0 * faceSeed);
        var sm = mix(mix(uKaleidoscopeSoftnessMin, uKaleidoscopeSoftnessMax, hh), uKaleidoscopeSoftnessMin, faceSeed);
        var rep = 2.0 * (floor(mix(uKaleidoscopeRepMin, uKaleidoscopeRepMax, faceSeed)));
        var aa = ((t * uMandalaScale) * 1.5) / uResolution[1];
        (smoothKaleidoscope(cp, sm, rep), [cp] = smoothKaleidoscope.__out__, smoothKaleidoscope.__return__);
        (cp = cp.map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, [cos((uTime * uSpeed) * uFaceRotationSpeed + (6.283185308) * faceSeed), sin((uTime * uSpeed) * uFaceRotationSpeed + (6.283185308) * faceSeed), -sin((uTime * uSpeed) * uFaceRotationSpeed + (6.283185308) * faceSeed), cos((uTime * uSpeed) * uFaceRotationSpeed + (6.283185308) * faceSeed)]));
        var dMandala = 0;
        var ccol = (clogo(cp, 0.6, dMandala, aa, uLogoRadius, uLogoOffset, uLogoWidth), [dMandala] = clogo.__out__, clogo.__return__);
        var gcol = paletteColor(fract(faceSeed + (uTime * uSpeed) * uFaceGlowSpeed)).map(function (_) { return _ * uGlowIntensity; });
        var faceCol = [0.01, 0.01, 0.01];
        (faceCol[0] += gcol[0] * (exp(-50.0 * (max(dMandala, 0.0)))), faceCol[1] += gcol[1] * (exp(-50.0 * (max(dMandala, 0.0)))), faceCol[2] += gcol[2] * (exp(-50.0 * (max(dMandala, 0.0)))), faceCol);
        mix(faceCol, [ccol[0], ccol[1], ccol[2]], ccol[3]).reduce((res, el, i) => (res[i] = el, res), faceCol);
        var light1 = normalize([1, 1, 1]);
        var light2 = normalize([-1, -0.5, 0.5]);
        var diff1 = max(dot(n, light1), 0.1);
        var diff2 = max(dot(n, light2), 0.05);
        var ref = reflect(rd, n);
        var spec = (pow(max(dot(ref, light1), 0.0), uSpecularPower)) * 0.7;
        var fresnel = (pow(1.0 - max(dot(n, [-rd[0], -rd[1], -rd[2]]), 0.0), 4.0)) * uFresnelStrength;
        (col[0] = faceCol[0] * (diff1 + diff2 * 0.3) + spec + fresnel * gcol[0], col[1] = faceCol[1] * (diff1 + diff2 * 0.3) + spec + fresnel * gcol[1], col[2] = faceCol[2] * (diff1 + diff2 * 0.3) + spec + fresnel * gcol[2], col);
    }
    ;
    postProcess(col, q).reduce((res, el, i) => (res[i] = el, res), col);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"chromaticUniverse": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function tanh(x) { return x?.length ? x.map(tanh) : Math.tanh(x); }
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uPathRadius = cloneValue(U.uPathRadius);
var uPathFreqX = cloneValue(U.uPathFreqX);
var uPathFreqY = cloneValue(U.uPathFreqY);
var uLookAheadDistance = cloneValue(U.uLookAheadDistance);
var uMarchSteps = cloneValue(U.uMarchSteps);
var uMaxDistance = cloneValue(U.uMaxDistance);
var uOrbSize = cloneValue(U.uOrbSize);
var uOrbSwayAmp = cloneValue(U.uOrbSwayAmp);
var uBaseRadiusAmp = cloneValue(U.uBaseRadiusAmp);
var uBaseRadiusFreq = cloneValue(U.uBaseRadiusFreq);
var uTunnelOffsetX = cloneValue(U.uTunnelOffsetX);
var uScoopFrequency = cloneValue(U.uScoopFrequency);
var uScoopScale = cloneValue(U.uScoopScale);
var uDetailFrequency = cloneValue(U.uDetailFrequency);
var uDetailScale = cloneValue(U.uDetailScale);
var uFluidIterations = cloneValue(U.uFluidIterations);
var uFluidTunnelScale = cloneValue(U.uFluidTunnelScale);
var uWallBrightness = cloneValue(U.uWallBrightness);
var uOrbBrightness = cloneValue(U.uOrbBrightness);
var uOrbMinDist = cloneValue(U.uOrbMinDist);
var uToneMapDivisor = cloneValue(U.uToneMapDivisor);
var uPaletteBrightness = cloneValue(U.uPaletteBrightness);
var uColorIterScale = cloneValue(U.uColorIterScale);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function paletteColor(t) {
    var m = (clamp(fract(t), 0.0, 1.0)) * uColorCount;
    var grad = cloneValue(uColors[0]);
    grad = [grad[0] * grad[3], grad[1] * grad[3], grad[2] * grad[3], grad[3]];
    for (var i = 1; i < 10; i++) {
        if (i > uColorCount) {
            break;
        }
        ;
        var mm = clamp(m - i - 1, 0.0, 1.0);
        mm = smoothstep(0.0, 1.0, mm);
        var c = cloneValue(uColors[i - 1]);
        c = [c[0] * c[3], c[1] * c[3], c[2] * c[3], c[3]];
        mix(grad, c, mm).reduce((res, el, i) => (res[i] = el, res), grad);
    }
    ;
    return [grad[0], grad[1], grad[2]];
}
;
function getPathPosition(z) {
    return [...cos([z * uPathFreqX, z * uPathFreqY]).map(function (_) { return uPathRadius * _; }), z];
}
;
function main() {
    var uv = [(gl_FragCoord[0] - uResolution[0] * 0.5) / uResolution[1], (gl_FragCoord[1] - uResolution[1] * 0.5) / uResolution[1]];
    var animTime = (uTime * uSpeed) * 4.0 + 5.0 + 5.0 * (sin((uTime * uSpeed) * 0.3));
    var rayOrigin = getPathPosition(animTime);
    var lookTarget = getPathPosition(animTime + uLookAheadDistance);
    var forward = normalize([lookTarget[0] - rayOrigin[0], lookTarget[1] - rayOrigin[1], lookTarget[2] - rayOrigin[2]]);
    var right = normalize([-forward[2], 0, forward[0]]);
    var up = cross(forward, right);
    var rayDir = normalize([uv[0] * right[0] + uv[1] * up[0] + forward[0], uv[0] * right[1] + uv[1] * up[1] + forward[1], uv[0] * right[2] + uv[1] * up[2] + forward[2]]);
    var stepDist = 1.0;
    var totalDist = 0.0;
    var orbDist = 1.0;
    var accumulatedColor = [0, 0, 0];
    var rayPos = cloneValue(rayOrigin);
    var steps = clamp(uMarchSteps, 1.0, 60.0) | 0;
    for (var idx = 0; idx < 60; idx++) {
        if (idx >= steps) {
            break;
        }
        ;
        var i = idx + 1.0;
        if (totalDist >= uMaxDistance) {
            break;
        }
        ;
        (rayPos[0] += rayDir[0] * stepDist, rayPos[1] += rayDir[1] * stepDist, rayPos[2] += rayDir[2] * stepDist, rayPos);
        var pathCenter = getPathPosition(rayPos[2]);
        var sineTime = sin(uTime * uSpeed);
        var orbCenter = [pathCenter[0] + sineTime, pathCenter[1] + sineTime * uOrbSwayAmp, 6.0 + animTime + sineTime * uOrbSwayAmp];
        orbDist = length([rayPos[0] - orbCenter[0], rayPos[1] - orbCenter[1], rayPos[2] - orbCenter[2]]) - uOrbSize;
        var baseRadius = (cos(rayPos[2] * uBaseRadiusFreq)) * uBaseRadiusAmp + 4.0;
        var tunnelStructure = min(length([rayPos[0] - pathCenter[0] - uTunnelOffsetX, rayPos[1] - pathCenter[0] - uTunnelOffsetX]), length(new Float32Array([0, 1].map(function (x, i) { return this[x]; }, ([rayPos[0] - pathCenter[0], rayPos[1] - pathCenter[1], rayPos[2] - pathCenter[2]])))));
        var largeScoops = (abs(dot(sin([uScoopFrequency * rayPos[0], uScoopFrequency * rayPos[1], uScoopFrequency * rayPos[2]]), [uScoopScale, uScoopScale, uScoopScale]))) / 0.1;
        var detailTexture = (abs(dot(sin([animTime + uDetailFrequency * rayPos[0], animTime + uDetailFrequency * rayPos[1], animTime + uDetailFrequency * rayPos[2]]), [uDetailScale, uDetailScale, uDetailScale]))) / 2.0;
        var carvedDist = baseRadius - tunnelStructure + largeScoops + detailTexture;
        var fluidPos = cloneValue(rayPos);
        var fIter = clamp(uFluidIterations, 1.0, 12.0) | 0;
        for (var jdx = 0; jdx < 12; jdx++) {
            if (jdx >= fIter) {
                break;
            }
            ;
            var j = jdx + 1.0;
            sin([fluidPos[1] * j + uTime * uSpeed + 0.5 * i, fluidPos[2] * j + uTime * uSpeed + 0.5 * i, fluidPos[0] * j + uTime * uSpeed + 0.5 * i]).map(function (_) { return _ / j; }).reduce((res, el, i) => (res[i] += el, res), fluidPos);
        }
        ;
        var fluidTunnelDist = uFluidTunnelScale * (length([...cos(fluidPos).map(function (_) { return 0.3 * _; }).map(function (_) { return _ - 0.3; }), carvedDist]));
        stepDist = min(orbDist, fluidTunnelDist);
        totalDist += stepDist;
        var palette = paletteColor(fluidPos[1] * 0.15 + i * uColorIterScale).map(function (_) { return _ * uPaletteBrightness; });
        (accumulatedColor[0] += ((uWallBrightness * palette[0]) / stepDist + (uOrbBrightness * palette[0]) / (max(orbDist, uOrbMinDist))) / i, accumulatedColor[1] += ((uWallBrightness * palette[1]) / stepDist + (uOrbBrightness * palette[1]) / (max(orbDist, uOrbMinDist))) / i, accumulatedColor[2] += ((uWallBrightness * palette[2]) / stepDist + (uOrbBrightness * palette[2]) / (max(orbDist, uOrbMinDist))) / i, accumulatedColor);
    }
    ;
    var col = tanh([(accumulatedColor[0] * accumulatedColor[0]) / uToneMapDivisor, (accumulatedColor[1] * accumulatedColor[1]) / uToneMapDivisor, (accumulatedColor[2] * accumulatedColor[2]) / uToneMapDivisor]);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"cubicSpin": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uTwistTimeScale = cloneValue(U.uTwistTimeScale);
var uTwistAmount = cloneValue(U.uTwistAmount);
var uCubeSize = cloneValue(U.uCubeSize);
var uCubeRotSpeedA = cloneValue(U.uCubeRotSpeedA);
var uCubeRotSpeedB = cloneValue(U.uCubeRotSpeedB);
var uTunnelRadius = cloneValue(U.uTunnelRadius);
var uCameraSwaySpeed = cloneValue(U.uCameraSwaySpeed);
var uCameraSwayAmount = cloneValue(U.uCameraSwayAmount);
var uMarchSteps = cloneValue(U.uMarchSteps);
var uMaxDistance = cloneValue(U.uMaxDistance);
var uStepMultiplier = cloneValue(U.uStepMultiplier);
var uColorTimeSpeed = cloneValue(U.uColorTimeSpeed);
var uColorZFreq = cloneValue(U.uColorZFreq);
var uColorXYFreq = cloneValue(U.uColorXYFreq);
var uCoreLightZOffset = cloneValue(U.uCoreLightZOffset);
var uCoreLightAttenuation = cloneValue(U.uCoreLightAttenuation);
var uCoreLightIntensity = cloneValue(U.uCoreLightIntensity);
var uCamLightIntensity = cloneValue(U.uCamLightIntensity);
var uAmbientStrength = cloneValue(U.uAmbientStrength);
var uPulseSpeed = cloneValue(U.uPulseSpeed);
var uPulseZFreq = cloneValue(U.uPulseZFreq);
var uPulsePower = cloneValue(U.uPulsePower);
var uPulseIntensity = cloneValue(U.uPulseIntensity);
var uFogDistanceScale = cloneValue(U.uFogDistanceScale);
var uColorA = cloneValue(U.uColorA);
var uColorB = cloneValue(U.uColorB);
var uColorC = cloneValue(U.uColorC);
var uCoreLightColor = cloneValue(U.uCoreLightColor);
var uCamLightColor = cloneValue(U.uCamLightColor);
var uPulseColor = cloneValue(U.uPulseColor);
var uColorBack = cloneValue(U.uColorBack);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
var TAU = 6.28318530718;
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function csRot(a) {
    a = mod(a, TAU);
    var c = cos(a), s = sin(a);
    return [c, s, -s, c];
}
;
function sdBox(p, b) {
    p = p.slice();
    b = b.slice();
    var d = vec3.subtract([], abs(p), b);
    return length(max(d, 0.0)) + min(max(d[0], max(d[1], d[2])), 0.0);
}
;
var csTime = 0;
function sceneMap(p) {
    p = p.slice();
    p[2] -= csTime * 2.5;
    var safeTwistTime = mod(csTime * uTwistTimeScale, TAU);
    var twist = sin(safeTwistTime) * uTwistAmount;
    assignComponents(p, [0, 1], [p[0], p[1]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, csRot(p[2] * twist)));
    var q = cloneValue(p);
    q[0] = mod(q[0] + 1.0, 2.0) - 1.0;
    q[1] = mod(q[1] + 1.0, 2.0) - 1.0;
    q[2] = mod(q[2] + 1.0, 2.0) - 1.0;
    assignComponents(q, [0, 1], [q[0], q[1]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, csRot(mod(csTime * uCubeRotSpeedA, TAU))));
    assignComponents(q, [2, 0], [q[2], q[0]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, csRot(mod(-csTime * uCubeRotSpeedB, TAU))));
    var cubes = sdBox(q, [uCubeSize, uCubeSize, uCubeSize]);
    var tunnel = length([p[0], p[1]]) - uTunnelRadius;
    return max(cubes, -tunnel);
}
;
function calcNormal(p) {
    p = p.slice();
    var e = [0.005, 0.0];
    return normalize([sceneMap([p[0] + e[0], p[1] + e[1], p[2] + e[1]]) - sceneMap([p[0] - e[0], p[1] - e[1], p[2] - e[1]]), sceneMap([p[0] + e[1], p[1] + e[0], p[2] + e[1]]) - sceneMap([p[0] - e[1], p[1] - e[0], p[2] - e[1]]), sceneMap([p[0] + e[1], p[1] + e[1], p[2] + e[0]]) - sceneMap([p[0] - e[1], p[1] - e[1], p[2] - e[0]])]);
}
;
function main() {
    csTime = (uTime * uSpeed) / 2.5;
    var uv = [(gl_FragCoord[0] * 2.0 - uResolution[0]) / (min(uResolution[0], uResolution[1])), (gl_FragCoord[1] * 2.0 - uResolution[1]) / (min(uResolution[0], uResolution[1]))];
    var ro = [0, 0, 0];
    var rd = normalize([uv[0], uv[1], 1]);
    var safeSwayTime = mod(csTime * uCameraSwaySpeed, TAU);
    assignComponents(rd, [0, 1], [rd[0], rd[1]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, csRot(sin(safeSwayTime) * uCameraSwayAmount)));
    var t = 0.0;
    var steps = clamp(uMarchSteps, 1.0, 220.0) | 0;
    for (var i = 0; i < 220; i++) {
        if (i >= steps) {
            break;
        }
        ;
        var p = [ro[0] + rd[0] * t, ro[1] + rd[1] * t, ro[2] + rd[2] * t];
        var d = sceneMap(p);
        if ((d < 0.001) || (t > uMaxDistance)) {
            break;
        }
        ;
        t += d * uStepMultiplier;
    }
    ;
    var col = [0, 0, 0];
    if (t < uMaxDistance) {
        var p = [ro[0] + rd[0] * t, ro[1] + rd[1] * t, ro[2] + rd[2] * t];
        var n = calcNormal(p);
        var safeColorTime = mod(csTime * uColorTimeSpeed, TAU);
        var plasmaMap = cos([safeColorTime + p[2] * uColorZFreq + p[0] * uColorXYFreq, safeColorTime + p[2] * uColorZFreq + p[1] * uColorXYFreq + 2, safeColorTime + p[2] * uColorZFreq + p[0] * uColorXYFreq + 4]).map(function (_) { return 0.5 * _; }).map(function (_) { return 0.5 + _; });
        var objColor = mix(uColorA, uColorB, plasmaMap[1]);
        mix(objColor, uColorC, plasmaMap[2] * 0.4).reduce((res, el, i) => (res[i] = el, res), objColor);
        var coreLightPos = [0, 0, ro[2] + uCoreLightZOffset];
        var coreLightDir = normalize([coreLightPos[0] - p[0], coreLightPos[1] - p[1], coreLightPos[2] - p[2]]);
        var coreDiff = max(dot(n, coreLightDir), 0.0);
        var distToCore = length([coreLightPos[0] - p[0], coreLightPos[1] - p[1], coreLightPos[2] - p[2]]);
        var coreAttenuation = 1.0 / (1.0 + distToCore * uCoreLightAttenuation);
        var pinkLight = [((uCoreLightColor[0] * coreDiff) * coreAttenuation) * uCoreLightIntensity, ((uCoreLightColor[1] * coreDiff) * coreAttenuation) * uCoreLightIntensity, ((uCoreLightColor[2] * coreDiff) * coreAttenuation) * uCoreLightIntensity];
        var camLightDir = normalize([0.5, 0.5, -1]);
        var camDiff = max(dot(n, camLightDir), 0.0);
        var blueLight = [(uCamLightColor[0] * camDiff) * uCamLightIntensity, (uCamLightColor[1] * camDiff) * uCamLightIntensity, (uCamLightColor[2] * camDiff) * uCamLightIntensity];
        var ambient = [objColor[0] * uAmbientStrength, objColor[1] * uAmbientStrength, objColor[2] * uAmbientStrength];
        (col[0] = ambient[0] + pinkLight[0] + blueLight[0], col[1] = ambient[1] + pinkLight[1] + blueLight[1], col[2] = ambient[2] + pinkLight[2] + blueLight[2], col);
        var safePulseTime = mod(csTime * uPulseSpeed, TAU);
        var pulse = (sin(mod(p[2] * uPulseZFreq - safePulseTime, TAU))) * 0.5 + 0.5;
        pulse = pow(pulse, uPulsePower);
        (col[0] += (uPulseColor[0] * pulse) * uPulseIntensity, col[1] += (uPulseColor[1] * pulse) * uPulseIntensity, col[2] += (uPulseColor[2] * pulse) * uPulseIntensity, col);
    }
    ;
    mix(col, uColorBack, 1.0 - exp((-uFogDistanceScale * t) * t)).reduce((res, el, i) => (res[i] = el, res), col);
    (col[0] = col[0] / (1.0 + col[0]), col[1] = col[1] / (1.0 + col[1]), col[2] = col[2] / (1.0 + col[2]), col);
    pow(col, [0.45454545454545453, 0.45454545454545453, 0.45454545454545453]).reduce((res, el, i) => (res[i] = el, res), col);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
TAU=6.28318530718;
csTime=0;
main();return Array.from(fragColor); };
},
"membranes": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uCameraOrbitAmp = cloneValue(U.uCameraOrbitAmp);
var uCameraOrbitFreqX = cloneValue(U.uCameraOrbitFreqX);
var uCameraOrbitFreqY = cloneValue(U.uCameraOrbitFreqY);
var uLookAheadAmp = cloneValue(U.uLookAheadAmp);
var uLookAheadFreq = cloneValue(U.uLookAheadFreq);
var uLookAheadDistance = cloneValue(U.uLookAheadDistance);
var uFov = cloneValue(U.uFov);
var uSpiralAmount = cloneValue(U.uSpiralAmount);
var uWarpAmpX = cloneValue(U.uWarpAmpX);
var uWarpFreqX = cloneValue(U.uWarpFreqX);
var uWarpTimeX = cloneValue(U.uWarpTimeX);
var uWarpAmpY = cloneValue(U.uWarpAmpY);
var uWarpFreqY = cloneValue(U.uWarpFreqY);
var uWarpTimeY = cloneValue(U.uWarpTimeY);
var uGyroidScale = cloneValue(U.uGyroidScale);
var uRidgeFrequency = cloneValue(U.uRidgeFrequency);
var uRidgeZFrequency = cloneValue(U.uRidgeZFrequency);
var uBaseRadius = cloneValue(U.uBaseRadius);
var uRidgeAmplitude = cloneValue(U.uRidgeAmplitude);
var uDistanceScale = cloneValue(U.uDistanceScale);
var uMarchSteps = cloneValue(U.uMarchSteps);
var uMaxDepth = cloneValue(U.uMaxDepth);
var uStepMinMultiplier = cloneValue(U.uStepMinMultiplier);
var uStepMinFloor = cloneValue(U.uStepMinFloor);
var uCoreThreshold = cloneValue(U.uCoreThreshold);
var uMistIntensity = cloneValue(U.uMistIntensity);
var uCoreIntensity = cloneValue(U.uCoreIntensity);
var uPulseSpeed = cloneValue(U.uPulseSpeed);
var uPulseZFreq = cloneValue(U.uPulseZFreq);
var uPulseAngleFreq = cloneValue(U.uPulseAngleFreq);
var uMix1ZFreq = cloneValue(U.uMix1ZFreq);
var uMix2Freq = cloneValue(U.uMix2Freq);
var uDensityFade = cloneValue(U.uDensityFade);
var uColorBack = cloneValue(U.uColorBack);
var uColor1 = cloneValue(U.uColor1);
var uColor2 = cloneValue(U.uColor2);
var uColor3 = cloneValue(U.uColor3);
var uColor4 = cloneValue(U.uColor4);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function mbRot(a) {
    var s = sin(a), c = cos(a);
    return [c, -s, s, c];
}
;
var mbTime = 0;
function sceneMap(p) {
    p = p.slice();
    var q = cloneValue(p);
    assignComponents(q, [0, 1], [q[0], q[1]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, mbRot(q[2] * uSpiralAmount)));
    q[0] += (sin(q[2] * uWarpFreqX + mbTime * uWarpTimeX)) * uWarpAmpX;
    q[1] += (cos(q[2] * uWarpFreqY - mbTime * uWarpTimeY)) * uWarpAmpY;
    var scale = cloneValue(uGyroidScale);
    var q1 = [q[0] * scale, q[1] * scale, q[2] * scale];
    var q2 = [q[1] * scale, q[2] * scale, q[0] * scale];
    var g1 = dot(sin(q1), cos([q1[2], q1[0], q1[1]]));
    var g2 = dot(sin(q2), cos([q2[2], q2[0], q2[1]]));
    var angle = atan(g1, g2);
    var dist = length([g1, g2]);
    var ridges = sin(angle * uRidgeFrequency + q[2] * uRidgeZFrequency);
    var radius = uBaseRadius + uRidgeAmplitude * ridges;
    var d = (dist - radius) * uDistanceScale;
    return [d, angle];
}
;
function main() {
    mbTime = uTime * uSpeed;
    var uv = [(gl_FragCoord[0] * 2.0 - uResolution[0]) / uResolution[1], (gl_FragCoord[1] * 2.0 - uResolution[1]) / uResolution[1]];
    var ro = [(sin(mbTime * uCameraOrbitFreqX)) * uCameraOrbitAmp, (cos(mbTime * uCameraOrbitFreqY)) * uCameraOrbitAmp, mbTime * 1.5];
    var ta = [(sin(mbTime * uLookAheadFreq)) * uLookAheadAmp, (cos(mbTime * uLookAheadFreq)) * uLookAheadAmp, ro[2] + uLookAheadDistance];
    var ww = normalize([ta[0] - ro[0], ta[1] - ro[1], ta[2] - ro[2]]);
    var uu = normalize(cross(ww, [0, 1, 0]));
    var vv = normalize(cross(uu, ww));
    var rd = normalize([uv[0] * uu[0] + uv[1] * vv[0] + uFov * ww[0], uv[0] * uu[1] + uv[1] * vv[1] + uFov * ww[1], uv[0] * uu[2] + uv[1] * vv[2] + uFov * ww[2]]);
    var finalColor = [0, 0, 0];
    var t = 0.0;
    var steps = clamp(uMarchSteps, 1.0, 200.0) | 0;
    for (var i = 0; i < 200; i++) {
        if (i >= steps) {
            break;
        }
        ;
        var p = [ro[0] + rd[0] * t, ro[1] + rd[1] * t, ro[2] + rd[2] * t];
        var obj = sceneMap(p);
        var d = cloneValue(obj[0]);
        var angle = cloneValue(obj[1]);
        if (d < uCoreThreshold) {
            var core = smoothstep(0.02, 0.0, d);
            var mist = (smoothstep(uCoreThreshold, 0.0, d)) * uMistIntensity;
            var matPulse = sin(p[2] * uPulseZFreq + angle * uPulseAngleFreq - mbTime * uPulseSpeed);
            var pulse = smoothstep(-0.2, 0.8, matPulse);
            var mix1 = (sin(p[2] * uMix1ZFreq + angle)) * 0.5 + 0.5;
            var mix2 = (cos(p[0] * uMix2Freq - p[1] * uMix2Freq)) * 0.5 + 0.5;
            var baseColor = mix(mix(uColor1, uColor2, mix1), mix(uColor3, uColor4, mix1), mix2);
            var emission = cloneValue(baseColor);
            var density = (core * uCoreIntensity + mist) * pulse;
            var fade = smoothstep(uMaxDepth, 0.0, t);
            (finalColor[0] += ((emission[0] * density) * fade) * uDensityFade, finalColor[1] += ((emission[1] * density) * fade) * uDensityFade, finalColor[2] += ((emission[2] * density) * fade) * uDensityFade, finalColor);
        }
        ;
        t += max(d * uStepMinMultiplier, uStepMinFloor);
        if (t > uMaxDepth) {
            break;
        }
        ;
    }
    ;
    var maxCol = max(finalColor[0], max(finalColor[1], finalColor[2]));
    if (maxCol > 1.0) {
        finalColor = [finalColor[0] / maxCol, finalColor[1] / maxCol, finalColor[2] / maxCol];
    }
    ;
    (finalColor[0] = (finalColor[0] * finalColor[0]) * (3.0 - 2.0 * finalColor[0]), finalColor[1] = (finalColor[1] * finalColor[1]) * (3.0 - 2.0 * finalColor[1]), finalColor[2] = (finalColor[2] * finalColor[2]) * (3.0 - 2.0 * finalColor[2]), finalColor);
    pow(finalColor, [0.8, 0.8, 0.8]).reduce((res, el, i) => (res[i] = el, res), finalColor);
    var col = vec3.add([], clamp(finalColor, 0.0, 1.0), uColorBack);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    [...clamp(col, 0.0, 1.0), 1].reduce((res, el, i) => (res[i] = el, res), fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
mbTime=0;
main();return Array.from(fragColor); };
},
"quantumCore": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function reflect(I, N) {
    var dot = 0;
    for (var i = 0; i < N.length; i++) {
        dot += N[i] * I[i];
    }
    var out = Array(N.length);
    for (var i = 0; i < N.length; i++) {
        out[i] = I[i] - 2 * dot * N[i];
    }
    return out;
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function tanh(x) { return x?.length ? x.map(tanh) : Math.tanh(x); }
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uTravelRate = cloneValue(U.uTravelRate);
var uMirrorSpeed = cloneValue(U.uMirrorSpeed);
var uCameraFadeNear = cloneValue(U.uCameraFadeNear);
var uCameraFadeFar = cloneValue(U.uCameraFadeFar);
var uStartDepth = cloneValue(U.uStartDepth);
var uTraceFactor = cloneValue(U.uTraceFactor);
var uPrimaryPeriod = cloneValue(U.uPrimaryPeriod);
var uPrimaryOffset = cloneValue(U.uPrimaryOffset);
var uSecondaryPeriod = cloneValue(U.uSecondaryPeriod);
var uSecondaryOffset = cloneValue(U.uSecondaryOffset);
var uDetailScale = cloneValue(U.uDetailScale);
var uDetailAmount = cloneValue(U.uDetailAmount);
var uVerticalOffset = cloneValue(U.uVerticalOffset);
var uAngularPeriod = cloneValue(U.uAngularPeriod);
var uAngularHalfPeriod = cloneValue(U.uAngularHalfPeriod);
var uMirrorPhase = cloneValue(U.uMirrorPhase);
var uSpectralPhase = cloneValue(U.uSpectralPhase);
var uLightColor = cloneValue(U.uLightColor);
var uLightIntensity = cloneValue(U.uLightIntensity);
var uOutputScale = cloneValue(U.uOutputScale);
var uTraceSteps = cloneValue(U.uTraceSteps);
var uFoldSteps = cloneValue(U.uFoldSteps);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
var MAX_TRACE_STEPS = 128;
var MAX_FOLD_STEPS = 8;
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function applyAngularFold(p) {
    p = p.slice();
    var radius = length([p[0], p[2]]);
    var angle = atan(p[2], p[0]);
    var sector = mod(angle, uAngularPeriod) - uAngularHalfPeriod;
    p[0] = radius;
    p[2] = radius * sector;
    return p;
}
;
function crossSectionDistance(p) {
    p = p.slice();
    return length([p[1], p[2]]);
}
;
function transformSample(p, sceneTime) {
    p = p.slice();
    p[1] += uVerticalOffset;
    var mirrorAxis = normalize(sin([sceneTime * uMirrorSpeed + uMirrorPhase[0], sceneTime * uMirrorSpeed + uMirrorPhase[1], sceneTime * uMirrorSpeed + uMirrorPhase[2]]));
    reflect(p, mirrorAxis).reduce((res, el, i) => (res[i] = el, res), p);
    sin([p[0] * uDetailScale, p[1] * uDetailScale, p[2] * uDetailScale]).map(function (_) { return _ / (max(uDetailAmount, 0.0001)); }).reduce((res, el, i) => (res[i] += el, res), p);
    applyAngularFold(p).reduce((res, el, i) => (res[i] = el, res), p);
    p[1] = mod(p[1], max(uPrimaryPeriod, 0.0001)) - uPrimaryOffset;
    return p;
}
;
function evaluateField(p, sceneTime) {
    p = p.slice();
    var distanceValue = crossSectionDistance(p);
    for (var foldIndex = 0; foldIndex < MAX_FOLD_STEPS; ++foldIndex) {
        if (foldIndex >= uFoldSteps) {
            break;
        }
        ;
        assignComponents(p, [0, 1, 2], [p[2], p[0], p[1]]);
        applyAngularFold(p).reduce((res, el, i) => (res[i] = el, res), p);
        p[1] = mod(p[1] + sceneTime * uTravelRate, max(uSecondaryPeriod, 0.0001)) - uSecondaryOffset;
        distanceValue = min(distanceValue, crossSectionDistance(p));
    }
    ;
    return distanceValue;
}
;
function integrateLight(rayDirection, sceneTime) {
    rayDirection = rayDirection.slice();
    var lightSum = [0, 0, 0];
    var depth = cloneValue(uStartDepth);
    for (var stepIndex = 0; stepIndex < MAX_TRACE_STEPS; ++stepIndex) {
        if (stepIndex >= uTraceSteps) {
            break;
        }
        ;
        var samplePosition = [rayDirection[0] * depth, rayDirection[1] * depth, rayDirection[2] * depth];
        transformSample(samplePosition, sceneTime).reduce((res, el, i) => (res[i] = el, res), samplePosition);
        var fieldDistance = evaluateField(samplePosition, sceneTime);
        depth += fieldDistance * uTraceFactor;
        var cameraFade = smoothstep(uCameraFadeNear, uCameraFadeFar, depth);
        var spectralWave = exp(sin([depth + uSpectralPhase[0], depth + uSpectralPhase[1], depth + uSpectralPhase[2]]));
        var emission = [(uLightColor[0] * uLightIntensity) * spectralWave[0], (uLightColor[1] * uLightIntensity) * spectralWave[1], (uLightColor[2] * uLightIntensity) * spectralWave[2]];
        (lightSum[0] += (emission[0] * cameraFade) / (max(fieldDistance, 0.0001)), lightSum[1] += (emission[1] * cameraFade) / (max(fieldDistance, 0.0001)), lightSum[2] += (emission[2] * cameraFade) / (max(fieldDistance, 0.0001)), lightSum);
    }
    ;
    return lightSum;
}
;
function createViewRay(pixel) {
    pixel = pixel.slice();
    var rayVector = [1 - uResolution[1], pixel[0] * 2.0 - uResolution[0], pixel[1] * 2.0 - uResolution[1]];
    return normalize(rayVector);
}
;
function main() {
    var rayDirection = createViewRay([gl_FragCoord[0], gl_FragCoord[1]]);
    var sceneTime = uTime * uSpeed;
    var radiance = integrateLight(rayDirection, sceneTime);
    var col = tanh([radiance[0] / (max(uOutputScale, 0.0001)), radiance[1] / (max(uOutputScale, 0.0001)), radiance[2] / (max(uOutputScale, 0.0001))]);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
MAX_TRACE_STEPS=128;
MAX_FOLD_STEPS=8;
main();return Array.from(fragColor); };
},
"neonKaleidoscope": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function sign(x) {
    if (x.length)
        return x.map(sign);
    return Math.sign(x);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uIterationCount = cloneValue(U.uIterationCount);
var uCellScale = cloneValue(U.uCellScale);
var uFormRadius = cloneValue(U.uFormRadius);
var uFormAngularity = cloneValue(U.uFormAngularity);
var uCornerWeight = cloneValue(U.uCornerWeight);
var uFacetCount = cloneValue(U.uFacetCount);
var uFacetSmoothness = cloneValue(U.uFacetSmoothness);
var uFacetSpin = cloneValue(U.uFacetSpin);
var uBandFrequency = cloneValue(U.uBandFrequency);
var uBandDivisor = cloneValue(U.uBandDivisor);
var uColorRate = cloneValue(U.uColorRate);
var uPhaseRate = cloneValue(U.uPhaseRate);
var uLayerShift = cloneValue(U.uLayerShift);
var uLightWidth = cloneValue(U.uLightWidth);
var uLightPower = cloneValue(U.uLightPower);
var uBaseColor = cloneValue(U.uBaseColor);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
var MIN_DISTANCE = 0.0001;
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function kaleidoscopeFold(p, facets, smoothing) {
    p = p.slice();
    var n = max(facets, 1.0);
    var angle = atan(p[1], p[0]);
    var radius = length(p);
    var wedge = 6.28318530718 / n;
    var halfWedge = wedge * 0.5;
    var a = mod(angle + halfWedge, wedge) - halfWedge;
    var sm = max(smoothing, 0.0001);
    a = sign(a) * (halfWedge - (halfWedge - abs(a)));
    a = mix(a, sign(a) * abs(a), 1.0 - sm);
    return [radius * cos(a), radius * sin(a)];
}
;
function angularMetric(p) {
    p = p.slice();
    var a = abs(p);
    var rounded = length(a);
    var faceted = (a[0] + a[1]) * uCornerWeight;
    return mix(rounded, faceted, uFormAngularity);
}
;
function shapeField(p) {
    p = p.slice();
    return angularMetric(p) - uFormRadius;
}
;
function nextCell(p) {
    p = p.slice();
    return fract([p[0] * uCellScale, p[1] * uCellScale]).map(function (_) { return _ - 0.5; });
}
;
function luminousBand(fieldValue, timePhase) {
    var wave = (sin(fieldValue * uBandFrequency - timePhase)) / uBandDivisor;
    var distanceToBand = max(abs(wave), MIN_DISTANCE);
    return pow(uLightWidth / distanceToBand, uLightPower);
}
;
function main() {
    var fragCoord = [gl_FragCoord[0], gl_FragCoord[1]];
    var screen = [(2.0 * fragCoord[0] - uResolution[0]) / uResolution[1], (2.0 * fragCoord[1] - uResolution[1]) / uResolution[1]];
    var sceneTime = uTime * uSpeed;
    var spin = sceneTime * uFacetSpin;
    var spun = [screen[0] * cos(spin) - screen[1] * sin(spin), screen[0] * sin(spin) + screen[1] * cos(spin)];
    var domain = kaleidoscopeFold(spun, uFacetCount, uFacetSmoothness);
    var radialDistance = length(screen);
    var radialFalloff = exp(-radialDistance);
    var radiance = [0, 0, 0];
    var baseRgb = [uBaseColor[0] * uBaseColor[3], uBaseColor[1] * uBaseColor[3], uBaseColor[2] * uBaseColor[3]];
    var iterations = clamp(uIterationCount, 1, 12);
    for (var layer = 0; layer < 12; ++layer) {
        if (layer >= iterations) {
            break;
        }
        ;
        var index = cloneValue(layer);
        nextCell(domain).reduce((res, el, i) => (res[i] = el, res), domain);
        var geometryField = shapeField(domain) * radialFalloff;
        var depthShade = 0.6 + 0.4 * (sin(index * uLayerShift + sceneTime * uColorRate));
        var tint = [baseRgb[0] * depthShade, baseRgb[1] * depthShade, baseRgb[2] * depthShade];
        var intensity = luminousBand(geometryField, sceneTime * uPhaseRate);
        (radiance[0] += tint[0] * intensity, radiance[1] += tint[1] * intensity, radiance[2] += tint[2] * intensity, radiance);
    }
    ;
    var col = cloneValue(radiance);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
MIN_DISTANCE=0.0001;
main();return Array.from(fragColor); };
},
"sparkTunnel": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function cross(x, y) {
    var x0 = cloneValue(x[0]), x1 = cloneValue(x[1]), x2 = cloneValue(x[2]), y0 = cloneValue(y[0]), y1 = cloneValue(y[1]), y2 = cloneValue(y[2]);
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function reflect(I, N) {
    var dot = 0;
    for (var i = 0; i < N.length; i++) {
        dot += N[i] * I[i];
    }
    var out = Array(N.length);
    for (var i = 0; i < N.length; i++) {
        out[i] = I[i] - 2 * dot * N[i];
    }
    return out;
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uFacetCount = cloneValue(U.uFacetCount);
var uTunnelRadius = cloneValue(U.uTunnelRadius);
var uBounces = cloneValue(U.uBounces);
var uAlphaFalloff = cloneValue(U.uAlphaFalloff);
var uGridScale = cloneValue(U.uGridScale);
var uDensityThreshold = cloneValue(U.uDensityThreshold);
var uSphereMinRadius = cloneValue(U.uSphereMinRadius);
var uSphereMaxRadius = cloneValue(U.uSphereMaxRadius);
var uGlowIntensity = cloneValue(U.uGlowIntensity);
var uGlowFalloff = cloneValue(U.uGlowFalloff);
var uBrightnessMultiplier = cloneValue(U.uBrightnessMultiplier);
var uFogStrength = cloneValue(U.uFogStrength);
var uFogFalloff = cloneValue(U.uFogFalloff);
var uColorPaletteScale = cloneValue(U.uColorPaletteScale);
var uColorPaletteOffset = cloneValue(U.uColorPaletteOffset);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function paletteColor(t) {
    var count = clamp(uColorCount, 1, 10);
    if (count == 1) {
        return [uColors[0][0] * uColors[0][3], uColors[0][1] * uColors[0][3], uColors[0][2] * uColors[0][3]];
    }
    ;
    var m = (clamp(fract(t), 0.0, 0.9999)) * count;
    var i0 = floor(m) | 0;
    var i1 = min(i0 + 1, count - 1);
    var f = smoothstep(0.0, 1.0, fract(m));
    return mix([uColors[i0][0] * uColors[i0][3], uColors[i0][1] * uColors[i0][3], uColors[i0][2] * uColors[i0][3]], [uColors[i1][0] * uColors[i1][3], uColors[i1][1] * uColors[i1][3], uColors[i1][2] * uColors[i1][3]], f);
}
;
function hash21(p) {
    p = p.slice();
    return fract((sin(dot(p, [127.1, 311.7]))) * 43758.5453);
}
;
function hitPlane(ro, rd, n, dist) {
    ro = ro.slice();
    rd = rd.slice();
    n = n.slice();
    var denom = dot(rd, n);
    if (denom < 0.0) {
        var t = (-dist - dot(ro, n)) / denom;
        if (t > 0.0) {
            return t;
        }
        ;
    }
    ;
    return 1e8;
}
;
function main() {
    var I = [gl_FragCoord[0], gl_FragCoord[1]];
    var uv = [(2.0 * I[0] - uResolution[0]) / uResolution[1], (2.0 * I[1] - uResolution[1]) / uResolution[1]];
    var col = [0, 0, 0];
    var t = uTime * uSpeed;
    var ro = [0, 0, t * 1.7];
    var rd = normalize([uv[0], uv[1], 1]);
    var alpha = 1.0;
    var fogDt = 1.0;
    var facets = clamp(uFacetCount, 3.0, 24) | 0;
    var bounces = clamp(uBounces, 1.0, 8) | 0;
    for (var b = 0; b < 8; b++) {
        if (b >= bounces) {
            break;
        }
        ;
        var bestDt = 1e8;
        var bestN = [0, 1, 0];
        for (var f = 0; f < 24; f++) {
            if (f >= facets) {
                break;
            }
            ;
            var ang = (f / facets) * 6.28318530718;
            var n = [cos(ang), sin(ang), 0];
            var dt = hitPlane(ro, rd, n, uTunnelRadius);
            if (dt < bestDt) {
                bestDt = dt;
                (bestN[0] = n[0], bestN[1] = n[1], bestN[2] = n[2], bestN);
            }
            ;
        }
        ;
        var dt = cloneValue(bestDt);
        if (b == 0) {
            fogDt = dt;
        }
        ;
        var p = [ro[0] + rd[0] * dt, ro[1] + rd[1] * dt, ro[2] + rd[2] * dt];
        var n = cloneValue(bestN);
        var up = abs(n[2]) < 0.999 ? [0, 0, 1] : [1, 0, 0];
        var right = normalize(cross(up, n));
        var fwd = cross(n, right);
        var tuv = [dot(p, right), dot(p, fwd)];
        var gridScale = cloneValue(uGridScale);
        tuv = [tuv[0] * gridScale, tuv[1] * gridScale];
        var cellId = floor(tuv);
        var cellUv = fract(tuv).map(function (_) { return _ - 0.5; });
        var ranDir = (sin(cellId[0] * 0.5 + cellId[1] * 0.3)) * 0.5 + 0.5;
        var hashId = hash21([cellId[0] + 123.4 + b * 456.7, cellId[1] + 567.8 + b * 456.7]);
        var hashP1 = step(uDensityThreshold, hashId * ranDir);
        var cellHash = hash21([cellId[0] + b * 91.3, cellId[1] + b * 91.3]);
        var colD1 = paletteColor(cellHash * uColorPaletteScale + uColorPaletteOffset);
        var sizeHash = hash21([cellId[0] + 37.2 + b * 234.5, cellId[1] + 89.5 + b * 234.5]);
        var rad = mix(uSphereMinRadius, uSphereMaxRadius, sizeHash);
        var sphere = length(cellUv) - rad;
        var sphereMask = (smoothstep(0.3, 0.0, sphere)) * hashP1;
        var glow = ((exp(-sphere * uGlowFalloff)) * uGlowIntensity) * hashP1;
        var layerCol = mix([0, 0, 0], [colD1[0] * uBrightnessMultiplier, colD1[1] * uBrightnessMultiplier, colD1[2] * uBrightnessMultiplier], sphereMask);
        (layerCol[0] += colD1[0] * glow, layerCol[1] += colD1[1] * glow, layerCol[2] += colD1[2] * glow, layerCol);
        (col[0] += layerCol[0] * alpha, col[1] += layerCol[1] * alpha, col[2] += layerCol[2] * alpha, col);
        alpha *= uAlphaFalloff;
        reflect(rd, n).reduce((res, el, i) => (res[i] = el, res), rd);
        (ro[0] = p[0] + n[0] * 0.001, ro[1] = p[1] + n[1] * 0.001, ro[2] = p[2] + n[2] * 0.001, ro);
    }
    ;
    var fog = uFogStrength / (1.0 + (fogDt * fogDt) * uFogFalloff);
    col = [col[0] * fog, col[1] * fog, col[2] * fog];
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"whirlpool": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function log(x) {
    if (x.length)
        return x.map(log);
    return Math.log(x);
}
function atan(y, x) {
    if (arguments.length > 1) {
        if (y.length)
            return y.map(function (y, i) {
                return Math.atan2(y, x[i]);
            });
        return Math.atan2(y, x);
    }
    if (y.length)
        return y.map(function (y, i) {
            return Math.atan(y);
        });
    return Math.atan(y);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uSpiralSpeed = cloneValue(U.uSpiralSpeed);
var uMarchSteps = cloneValue(U.uMarchSteps);
var uSeriesStart = cloneValue(U.uSeriesStart);
var uSeriesMax = cloneValue(U.uSeriesMax);
var uStepScale = cloneValue(U.uStepScale);
var uDensityExponent = cloneValue(U.uDensityExponent);
var uDensityScale = cloneValue(U.uDensityScale);
var uColorIntensity = cloneValue(U.uColorIntensity);
var uCameraOffsetX = cloneValue(U.uCameraOffsetX);
var uCameraOffsetY = cloneValue(U.uCameraOffsetY);
var uColorTint = cloneValue(U.uColorTint);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function main() {
    var I = [gl_FragCoord[0], gl_FragCoord[1]];
    var r = cloneValue(uResolution);
    var o = [0, 0, 0, 0];
    var t = uTime * uSpeed;
    var i = 0.0, e = 0.0, R = 0, s = 0;
    var q = [0, 0, 0], p = [0, 0, 0], d = [(-I[1] / r[0]) * 0.9 + uCameraOffsetX, (-I[0] / r[1]) * 0.9 + uCameraOffsetY, 1];
    var steps = clamp(uMarchSteps, 1.0, 220.0) | 0;
    q = [q[0], -1, -1];
    for (var idx = 0; idx < 220; idx++) {
        if (idx >= steps) {
            break;
        }
        ;
        o = [0, 1, 2, null].map(function (idx, i) { return idx == null ? o[i] : this[idx]; }, vec3.add([], [o[0], o[1], o[2]], uColorTint.map(function (_) { return this * _; }, (0.01 + (exp(-e * uDensityExponent)) * uDensityScale))));
        s = uSeriesStart;
        (p[0] = q[0] += ((d[0] * e) * R) * uStepScale, p[1] = q[1] += ((d[1] * e) * R) * uStepScale, p[2] = q[2] += ((d[2] * e) * R) * uStepScale, p);
        R = length(p);
        assignComponents(p, [0, 1, 2], [log(R) - t * uSpiralSpeed, exp(-p[0] / R - p[2] / R), atan(p[0] - 0.4, p[1])]);
        e = -1.0 + p[1];
        for (var sIter = cloneValue(uSeriesStart); sIter < uSeriesMax; sIter += sIter) {
            e += (dot(sin([p[2] * sIter, p[0] * sIter]), cos([p[0] * sIter + t, p[0] * sIter + t]))) / sIter;
        }
        ;
    }
    ;
    var col = clamp([(o[0] * uColorIntensity) * 10.0, (o[1] * uColorIntensity) * 10.0, (o[2] * uColorIntensity) * 10.0], 0.0, 4.0);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"containerFlow": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function round(x) { return x?.length ? x.map(round) : Math.floor(x + 0.5); }
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function tanh(x) { return x?.length ? x.map(tanh) : Math.tanh(x); }
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uCameraForwardSpeed = cloneValue(U.uCameraForwardSpeed);
var uPathSwayAmpX = cloneValue(U.uPathSwayAmpX);
var uPathSwayAmpY = cloneValue(U.uPathSwayAmpY);
var uPathSwayFreq = cloneValue(U.uPathSwayFreq);
var uRotationSpeed = cloneValue(U.uRotationSpeed);
var uLatticeThickness = cloneValue(U.uLatticeThickness);
var uVoxelResolution = cloneValue(U.uVoxelResolution);
var uMarchSteps = cloneValue(U.uMarchSteps);
var uStepScale = cloneValue(U.uStepScale);
var uColorZFreq = cloneValue(U.uColorZFreq);
var uColorTimeSpeed = cloneValue(U.uColorTimeSpeed);
var uDensityScale = cloneValue(U.uDensityScale);
var uDensityBoost = cloneValue(U.uDensityBoost);
var uToneMapDivisor = cloneValue(U.uToneMapDivisor);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function paletteColor(t) {
    var count = clamp(uColorCount, 1, 10);
    if (count == 1) {
        return [uColors[0][0] * uColors[0][3], uColors[0][1] * uColors[0][3], uColors[0][2] * uColors[0][3]];
    }
    ;
    var m = (clamp(fract(t), 0.0, 0.9999)) * count;
    var i0 = floor(m) | 0;
    var i1 = min(i0 + 1, count - 1);
    var f = smoothstep(0.0, 1.0, fract(m));
    return mix([uColors[i0][0] * uColors[i0][3], uColors[i0][1] * uColors[i0][3], uColors[i0][2] * uColors[i0][3]], [uColors[i1][0] * uColors[i1][3], uColors[i1][1] * uColors[i1][3], uColors[i1][2] * uColors[i1][3]], f);
}
;
function latticeFcc(p) {
    p = p.slice();
    var o = abs(p);
    var q = [o[0] / 2.0, o[1] / 2.0, o[2] / 2.0];
    var s = length([o[0] - (q[0] + q[2]), o[2] - (q[0] + q[2]), o[1]]);
    s = min(s, length([o[1] - (q[1] + q[2]), o[2] - (q[1] + q[2]), o[0]]));
    return s;
}
;
function cfPath(p, t) {
    p = p.slice();
    p[1] += (sin(p[2] * uPathSwayFreq)) * uPathSwayAmpY;
    p[0] += (sin(p[2] * uPathSwayFreq)) * uPathSwayAmpX;
    return p;
}
;
function cfMap(p, t) {
    p = p.slice();
    var rotZ = p[2] * uRotationSpeed;
    var rot = [cos(rotZ), cos(rotZ + 11.0), cos(rotZ + 33.0), cos(rotZ)];
    assignComponents(p, [0, 1], [p[0], p[1]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, rot));
    p[0] += ((sin(p[2] * uPathSwayFreq)) * uPathSwayAmpX) * 2.0;
    p[1] += ((sin(p[2] * uPathSwayFreq)) * uPathSwayAmpY) * 0.2;
    var p1 = cloneValue(p);
    mod(p1, 2.0).map(function (_) { return _ - 1.0; }).reduce((res, el, i) => (res[i] = el, res), p1);
    return latticeFcc(p1) - uLatticeThickness;
}
;
function cfNormal(p, t) {
    p = p.slice();
    var e = 0.001;
    return normalize([cfMap([p[0] + e, p[1], p[2]], t) - cfMap([p[0] - e, p[1], p[2]], t), cfMap([p[0], p[1] + e, p[2]], t) - cfMap([p[0], p[1] - e, p[2]], t), cfMap([p[0], p[1], p[2] + e], t) - cfMap([p[0], p[1], p[2] - e], t)]);
}
;
function main() {
    var I = [gl_FragCoord[0], gl_FragCoord[1]];
    var uv = [(2.0 * I[0] - uResolution[0]) / uResolution[1], (2.0 * I[1] - uResolution[1]) / uResolution[1]];
    var t = uTime * uSpeed;
    var ro = [0, 0, -t * uCameraForwardSpeed];
    cfPath(ro, t).reduce((res, el, i) => (res[i] = el, res), ro);
    var rd = normalize([uv[0] * 5.0, uv[1] * 5.0, -1]);
    var dt = 0.0;
    var voxel = max(uVoxelResolution, 1.0);
    var O = [0, 0, 0, 0];
    var steps = clamp(uMarchSteps, 1.0, 160.0) | 0;
    for (var i = 0; i < 160; i++) {
        if (i >= steps) {
            break;
        }
        ;
        var p = [ro[0] + rd[0] * dt, ro[1] + rd[1] * dt, ro[2] + rd[2] * dt];
        round([p[0] * voxel, p[1] * voxel, p[2] * voxel]).map(function (_) { return _ / voxel; }).reduce((res, el, i) => (res[i] = el, res), p);
        var n = cfNormal(p, t);
        var d = cfMap(p, t);
        dt += d * uStepScale;
        [...paletteColor((n[0] * n[1]) * (n[2] + t * uColorTimeSpeed) * uColorZFreq), 0].map(function (_) { return ((exp(cos(i * 0.1))) / (abs(d * uDensityScale)) * uDensityBoost) * _; }).reduce((res, el, i) => (res[i] += el, res), O);
    }
    ;
    var col = tanh([O[0] / uToneMapDivisor, O[1] / uToneMapDivisor, O[2] / uToneMapDivisor]);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"mandelbrot": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function log2(x) {
    if (x.length)
        return x.map(log2);
    return Math.log2(x);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uZoomSpeed = cloneValue(U.uZoomSpeed);
var uZoomBase = cloneValue(U.uZoomBase);
var uZoomAmplitude = cloneValue(U.uZoomAmplitude);
var uZoomCenterX = cloneValue(U.uZoomCenterX);
var uZoomCenterY = cloneValue(U.uZoomCenterY);
var uRotationSpeed = cloneValue(U.uRotationSpeed);
var uMaxIterations = cloneValue(U.uMaxIterations);
var uEscapeRadius = cloneValue(U.uEscapeRadius);
var uWaveFreqA = cloneValue(U.uWaveFreqA);
var uWaveFreqB = cloneValue(U.uWaveFreqB);
var uWaveTimeSpeedA = cloneValue(U.uWaveTimeSpeedA);
var uWaveTimeSpeedB = cloneValue(U.uWaveTimeSpeedB);
var uWaveSharpness = cloneValue(U.uWaveSharpness);
var uColorBack = cloneValue(U.uColorBack);
var uColorEdge = cloneValue(U.uColorEdge);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function calculateMandelbrotSet(complexPoint, waveEffect, t) {
    complexPoint = complexPoint.slice();
    var escapeRadius = cloneValue(uEscapeRadius);
    var iterationCount = 0.0;
    var z = [0.0, 0.0];
    waveEffect = 1.0;
    var maxIter = clamp(uMaxIterations, 1.0, 1024.0) | 0;
    for (var i = 0; i < 1024; i++) {
        if (i >= maxIter) {
            break;
        }
        ;
        assignComponents(z, [0, 1], [z[0] * z[0] - z[1] * z[1] + complexPoint[0], (2.0 * z[0]) * z[1] + complexPoint[1]]);
        if ((dot(z, z)) > (escapeRadius * escapeRadius)) {
            break;
        }
        ;
        iterationCount += 1.0;
        var waveFactor = (sin(uWaveFreqA * (z[0] + z[1]) + t * uWaveTimeSpeedA)) * (cos(uWaveFreqB * (z[0] - z[1]) + t * uWaveTimeSpeedB));
        waveEffect = min(waveEffect, abs(waveFactor));
    }
    ;
    waveEffect = 1.0 - exp(-uWaveSharpness * waveEffect);
    if (iterationCount > (maxIter - 1.0)) {
        calculateMandelbrotSet.__return__ = 0.0;
        calculateMandelbrotSet.__out__ = [waveEffect];
        return calculateMandelbrotSet.__return__;
    }
    ;
    var smoothIterationCount = iterationCount - log2(log2(dot(z, z))) + 4.0;
    calculateMandelbrotSet.__return__ = smoothIterationCount;
    calculateMandelbrotSet.__out__ = [waveEffect];
    return calculateMandelbrotSet.__return__;
}
;
function main() {
    var fragCoord = [gl_FragCoord[0], gl_FragCoord[1]];
    var normalizedCoords = [(2.0 * fragCoord[0] - uResolution[0]) / uResolution[1], (2.0 * fragCoord[1] - uResolution[1]) / uResolution[1]];
    var t = uTime * uSpeed;
    var zoomFactor = uZoomBase + uZoomAmplitude * (0.5 + 0.5 * (sin(t * uZoomSpeed)));
    var zoomCenter = [uZoomCenterX, uZoomCenterY];
    var adjustedCoords = [(normalizedCoords[0] - zoomCenter[0]) * zoomFactor + zoomCenter[0], (normalizedCoords[1] - zoomCenter[1]) * zoomFactor + zoomCenter[1]];
    var angle = t * uRotationSpeed;
    var rotMat = [cos(angle), -sin(angle), sin(angle), cos(angle)];
    var rotatedCoords = [rotMat[0] * (adjustedCoords[0] - zoomCenter[0]) + rotMat[2] * (adjustedCoords[1] - zoomCenter[1]) + zoomCenter[0], rotMat[1] * (adjustedCoords[0] - zoomCenter[0]) + rotMat[3] * (adjustedCoords[1] - zoomCenter[1]) + zoomCenter[1]];
    var waveEffect = 0;
    (calculateMandelbrotSet(rotatedCoords, waveEffect, t), [waveEffect] = calculateMandelbrotSet.__out__, calculateMandelbrotSet.__return__);
    var col = cloneValue(uColorBack);
    (col[0] += uColorEdge[0] * (clamp(waveEffect, 0.0, 1.0)), col[1] += uColorEdge[1] * (clamp(waveEffect, 0.0, 1.0)), col[2] += uColorEdge[2] * (clamp(waveEffect, 0.0, 1.0)), col);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"neuralGlass": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function floor(x) {
    if (x.length)
        return x.map(floor);
    return Math.floor(x);
}
function smoothstep(edge0, edge1, x) {
    if (!x && !edge0 && !edge1)
        return 0;
    if (x.length) {
        if (edge0.length)
            return x.map(function (x, i) {
                return smoothstep(edge0[i], edge1[i], x);
            });
        return x.map(function (x, i) {
            return smoothstep(edge0, edge1, x);
        });
    }
    var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0.0), 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function sqrt(x) {
    if (x.length)
        return x.map(sqrt);
    return Math.sqrt(x);
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function refract(I, N, eta) {
    var dot = 0;
    for (var i = 0; i < N.length; i++) {
        dot += N[i] * I[i];
    }
    var k = 1 - eta * eta * (1 - dot * dot);
    var out = Array(N.length).fill(0);
    if (k > 0) {
        for (var i = 0; i < N.length; i++) {
            out[i] = eta * I[i] - (eta * dot + Math.sqrt(k)) * N[i];
        }
    }
    return out;
}
function reflect(I, N) {
    var dot = 0;
    for (var i = 0; i < N.length; i++) {
        dot += N[i] * I[i];
    }
    var out = Array(N.length);
    for (var i = 0; i < N.length; i++) {
        out[i] = I[i] - 2 * dot * N[i];
    }
    return out;
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uCameraSpeed = cloneValue(U.uCameraSpeed);
var uPathAmpY = cloneValue(U.uPathAmpY);
var uPathFreqX = cloneValue(U.uPathFreqX);
var uPathFreqZ = cloneValue(U.uPathFreqZ);
var uPathTimeFreq = cloneValue(U.uPathTimeFreq);
var uRot3Base = cloneValue(U.uRot3Base);
var uRot3Offset = cloneValue(U.uRot3Offset);
var uRot4Base = cloneValue(U.uRot4Base);
var uRot4Offset = cloneValue(U.uRot4Offset);
var uOffset2X = cloneValue(U.uOffset2X);
var uOffset2Y = cloneValue(U.uOffset2Y);
var uOffset2Z = cloneValue(U.uOffset2Z);
var uCellSizeX = cloneValue(U.uCellSizeX);
var uCellSizeY = cloneValue(U.uCellSizeY);
var uCellSizeZ = cloneValue(U.uCellSizeZ);
var uCell2X = cloneValue(U.uCell2X);
var uCell2Y = cloneValue(U.uCell2Y);
var uCell2Z = cloneValue(U.uCell2Z);
var uThickness1 = cloneValue(U.uThickness1);
var uThickness2 = cloneValue(U.uThickness2);
var uThickness3 = cloneValue(U.uThickness3);
var uBlendSmooth1 = cloneValue(U.uBlendSmooth1);
var uBlendSmooth2 = cloneValue(U.uBlendSmooth2);
var uLightSpeed = cloneValue(U.uLightSpeed);
var uSpecPower = cloneValue(U.uSpecPower);
var uGlassFade = cloneValue(U.uGlassFade);
var uIOR = cloneValue(U.uIOR);
var uVolPower = cloneValue(U.uVolPower);
var uVolScale = cloneValue(U.uVolScale);
var uFogDensity = cloneValue(U.uFogDensity);
var uMaxDist = cloneValue(U.uMaxDist);
var uMarchSteps = cloneValue(U.uMarchSteps);
var uFov = cloneValue(U.uFov);
var uCameraPosX = cloneValue(U.uCameraPosX);
var uCameraPosY = cloneValue(U.uCameraPosY);
var uCameraPosZ = cloneValue(U.uCameraPosZ);
var uLightCol1 = cloneValue(U.uLightCol1);
var uLightCol2 = cloneValue(U.uLightCol2);
var uColors = cloneValue(U.uColors);
var uColorCount = cloneValue(U.uColorCount);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function paletteColor(t) {
    var count = clamp(uColorCount, 1, 10);
    if (count == 1) {
        return [uColors[0][0] * uColors[0][3], uColors[0][1] * uColors[0][3], uColors[0][2] * uColors[0][3]];
    }
    ;
    var m = (clamp(fract(t), 0.0, 0.9999)) * count;
    var i0 = floor(m) | 0;
    var i1 = min(i0 + 1, count - 1);
    var f = smoothstep(0.0, 1.0, fract(m));
    return mix([uColors[i0][0] * uColors[i0][3], uColors[i0][1] * uColors[i0][3], uColors[i0][2] * uColors[i0][3]], [uColors[i1][0] * uColors[i1][3], uColors[i1][1] * uColors[i1][3], uColors[i1][2] * uColors[i1][3]], f);
}
;
function R2(a) {
    return [sin(a), cos(a), -sin(a), cos(a)];
}
;
function smin(a, b, k) {
    k *= 4.0;
    var h = max(k - abs(a - b), 0.0);
    return min(a, b) - ((h * h) * 0.25) / k;
}
;
function lattice_cc(p) {
    p = p.slice();
    var o = [p[0] * p[0], p[1] * p[1], p[2] * p[2]];
    var s = sqrt(o[0] + o[1]);
    s = min(s, sqrt(o[0] + o[2]));
    s = min(s, sqrt(o[1] + o[2]));
    return [s, 0.0];
}
;
function lattice_cc2(p) {
    p = p.slice();
    var o = [p[0] * p[0], p[1] * p[1], p[2] * p[2]];
    var s = sqrt(o[0] + o[1]);
    s = min(s, sqrt(o[1] + o[2]));
    return [s, 0.0];
}
;
function camPath(p) {
    p = p.slice();
    p[2] -= uTime * uCameraSpeed - 2.5;
    p[1] += (sin(p[0] * uPathFreqX + uTime * uPathTimeFreq)) * uPathAmpY;
    p[1] += (sin(p[2] * uPathFreqZ + uTime * uPathTimeFreq)) * uPathAmpY;
    return p;
}
;
function map(p) {
    p = p.slice();
    camPath(p).reduce((res, el, i) => (res[i] = el, res), p);
    var p1 = cloneValue(p), p2 = cloneValue(p), p3 = cloneValue(p), p4 = cloneValue(p);
    assignComponents(p3, [0, 1], [p3[0], p3[1]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, R2(uRot3Base + uRot3Offset)));
    assignComponents(p4, [0, 2], [p4[0], p4[2]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, R2(uRot4Base + uRot4Offset)));
    p2[0] += uOffset2X;
    p2[1] += uOffset2Y;
    p2[2] += uOffset2Z;
    (p1[0] = mod(p1[0], uCellSizeX) - uCellSizeX * 0.25, p1[1] = mod(p1[1], uCellSizeY) - uCellSizeY * 0.5, p1[2] = mod(p1[2], uCellSizeZ) - uCellSizeZ * 0.5, p1);
    (p2[0] = mod(p2[0], uCell2X) - uCell2X * 0.5, p2[1] = mod(p2[1], uCell2Y) - uCell2Y * 0.5, p2[2] = mod(p2[2], uCell2Z) - uCell2Z * 0.25, p2);
    (p3[0] = mod(p3[0], uCellSizeX) - uCellSizeX * 0.25, p3[1] = mod(p3[1], uCellSizeY) - uCellSizeY * 0.5, p3[2] = mod(p3[2], uCellSizeZ) - uCellSizeZ * 0.5, p3);
    (p4[0] = mod(p4[0], uCellSizeX) - uCellSizeX * 0.25, p4[1] = mod(p4[1], uCellSizeY) - uCellSizeY * 0.5, p4[2] = mod(p4[2], uCellSizeZ) - uCellSizeZ * 0.5, p4);
    var bcc = cloneValue(lattice_cc(p1)[0]);
    var bcc2 = cloneValue(lattice_cc(p3)[0]);
    var bcc3 = cloneValue(lattice_cc2(p4)[0]);
    var d = bcc - uThickness1;
    var d1 = bcc2 - uThickness2;
    var d2 = bcc3 - uThickness3;
    return smin(smin(d1, d2, uBlendSmooth2), d, uBlendSmooth1);
}
;
function calcNormal(p) {
    p = p.slice();
    var e = 0.001;
    return normalize([map([p[0] + e, p[1], p[2]]) - map([p[0] - e, p[1], p[2]]), map([p[0], p[1] + e, p[2]]) - map([p[0], p[1] - e, p[2]]), map([p[0], p[1], p[2] + e]) - map([p[0], p[1], p[2] - e])]);
}
;
function render(ro, rd) {
    ro = ro.slice();
    rd = rd.slice();
    var col = [0, 0, 0];
    var maxdist = cloneValue(uMaxDist);
    var intens = 1.0;
    var spec2 = [0, 0, 0];
    var glassfade = 1.0;
    var ref = 0.0;
    var vol = 0.0;
    var light1 = normalize([cos(uTime * uLightSpeed), (sin((uTime * uLightSpeed) * 3.0)) * 0.5, sin(uTime * uLightSpeed)]);
    var light2 = normalize([cos(uTime * uLightSpeed), (sin((uTime * uLightSpeed) * 3.0)) * 0.5, -sin(uTime * uLightSpeed)]);
    var dt = 0.0;
    var steps = clamp(uMarchSteps, 1.0, 80.0) | 0;
    for (var i = 0; i < 80; i++) {
        if (i >= steps) {
            break;
        }
        ;
        var p = [ro[0] + rd[0] * dt, ro[1] + rd[1] * dt, ro[2] + rd[2] * dt];
        var n = calcNormal(p);
        var d = map(p);
        var distfade = exp(-1.0 * (pow(dt / maxdist, 2.0)));
        intens = min(distfade, glassfade);
        if ((d > 0.0) && (ref > 0.05)) {
            ref = 0.0;
            if ((dot(rd, n)) < -0.5) {
                normalize(refract(rd, n, 1.0 / uIOR)).reduce((res, el, i) => (res[i] = el, res), rd);
            }
            ;
            var refl = reflect(rd, n);
            (spec2[0] += ((uLightCol1[0] * (pow(max(dot(refl, light1), 0.0), uSpecPower))) * intens) * 0.75, spec2[1] += ((uLightCol1[1] * (pow(max(dot(refl, light1), 0.0), uSpecPower))) * intens) * 0.75, spec2[2] += ((uLightCol1[2] * (pow(max(dot(refl, light1), 0.0), uSpecPower))) * intens) * 0.75, spec2);
            (spec2[0] += ((uLightCol2[0] * (pow(max(dot(refl, light2), 0.0), uSpecPower))) * intens) * 0.75, spec2[1] += ((uLightCol2[1] * (pow(max(dot(refl, light2), 0.0), uSpecPower))) * intens) * 0.75, spec2[2] += ((uLightCol2[2] * (pow(max(dot(refl, light2), 0.0), uSpecPower))) * intens) * 0.75, spec2);
        }
        ;
        if ((d < 0.0) && (ref < 0.05)) {
            ref = 1.0;
            if ((dot(rd, n)) < -0.05) {
                normalize(refract(rd, n, uIOR)).reduce((res, el, i) => (res[i] = el, res), rd);
            }
            ;
            var refl = reflect(rd, n);
            glassfade *= uGlassFade;
            (spec2[0] += (uLightCol1[0] * (pow(max(dot(refl, light1), 0.0), uSpecPower))) * intens, spec2[1] += (uLightCol1[1] * (pow(max(dot(refl, light1), 0.0), uSpecPower))) * intens, spec2[2] += (uLightCol1[2] * (pow(max(dot(refl, light1), 0.0), uSpecPower))) * intens, spec2);
            (spec2[0] += (uLightCol2[0] * (pow(max(dot(refl, light2), 0.0), uSpecPower))) * intens, spec2[1] += (uLightCol2[1] * (pow(max(dot(refl, light2), 0.0), uSpecPower))) * intens, spec2[2] += (uLightCol2[2] * (pow(max(dot(refl, light2), 0.0), uSpecPower))) * intens, spec2);
        }
        ;
        dt += max(0.01, abs(d));
        vol += intens;
    }
    ;
    vol = (pow(vol, uVolPower)) * uVolScale;
    var albedo = paletteColor(dt * 0.05);
    (col[0] = albedo[0] + vol + spec2[0] * 2.0, col[1] = albedo[1] + vol + spec2[1] * 2.0, col[2] = albedo[2] + vol + spec2[2] * 2.0, col);
    mix(col, [0, 0, 0], 1.0 - exp(((-uFogDensity * dt) * dt) * dt)).reduce((res, el, i) => (res[i] = el, res), col);
    return col;
}
;
function main() {
    var I = [gl_FragCoord[0], gl_FragCoord[1]];
    var uv = [(2.0 * I[0] - uResolution[0]) / uResolution[1], (2.0 * I[1] - uResolution[1]) / uResolution[1]];
    var ro = [uCameraPosX, uCameraPosY, uCameraPosZ];
    camPath(ro).reduce((res, el, i) => (res[i] += el, res), ro);
    uv = [uv[0] * 2.0, uv[1] * 2.0];
    var rd = normalize([uv[0], uv[1], -uFov]);
    var col = render(ro, rd);
    pow(max(col, 0.0), [0.5, 0.5, 0.5]).reduce((res, el, i) => (res[i] = el, res), col);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"blobbyWorld": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function cos(angle) {
    if (angle.length)
        return angle.map(cos);
    return Math.cos(angle);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
    }
    return sum;
}
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function max(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.max(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.max(x, y);
        });
    }
    return Math.max(x, y);
}
function pow(x, y) {
    if (x.length)
        return x.map(function (x, i) {
            return Math.pow(x, y[i]);
        });
    return Math.pow(x, y);
}
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uCellSize = cloneValue(U.uCellSize);
var uRotSpeedA = cloneValue(U.uRotSpeedA);
var uRotZInfluence = cloneValue(U.uRotZInfluence);
var uRotSpeedB = cloneValue(U.uRotSpeedB);
var uBlobRadius = cloneValue(U.uBlobRadius);
var uFluidFreq = cloneValue(U.uFluidFreq);
var uFluidTimeX = cloneValue(U.uFluidTimeX);
var uFluidTimeY = cloneValue(U.uFluidTimeY);
var uFluidTimeZ = cloneValue(U.uFluidTimeZ);
var uFluidAmount = cloneValue(U.uFluidAmount);
var uFieldScale = cloneValue(U.uFieldScale);
var uCameraDistX = cloneValue(U.uCameraDistX);
var uCameraDistY = cloneValue(U.uCameraDistY);
var uCameraSwayAmpX = cloneValue(U.uCameraSwayAmpX);
var uCameraSwayAmpY = cloneValue(U.uCameraSwayAmpY);
var uCameraSwayFreqX = cloneValue(U.uCameraSwayFreqX);
var uCameraSwayFreqY = cloneValue(U.uCameraSwayFreqY);
var uRayRotAmpA = cloneValue(U.uRayRotAmpA);
var uRayRotFreqA = cloneValue(U.uRayRotFreqA);
var uRayRotAmpB = cloneValue(U.uRayRotAmpB);
var uRayRotFreqB = cloneValue(U.uRayRotFreqB);
var uGlowNumerator = cloneValue(U.uGlowNumerator);
var uGlowEpsilon = cloneValue(U.uGlowEpsilon);
var uMaxSteps = cloneValue(U.uMaxSteps);
var uMaxDist = cloneValue(U.uMaxDist);
var uSurfDist = cloneValue(U.uSurfDist);
var uColorIntensity = cloneValue(U.uColorIntensity);
var uOscTimeFreq1 = cloneValue(U.uOscTimeFreq1);
var uOscDistFreq1 = cloneValue(U.uOscDistFreq1);
var uOscPhase1 = cloneValue(U.uOscPhase1);
var uOscTimeFreq2 = cloneValue(U.uOscTimeFreq2);
var uOscDistFreq2 = cloneValue(U.uOscDistFreq2);
var uOscPhase2 = cloneValue(U.uOscPhase2);
var uOscTimeFreq3 = cloneValue(U.uOscTimeFreq3);
var uOscDistFreq3 = cloneValue(U.uOscDistFreq3);
var uOscPhase3 = cloneValue(U.uOscPhase3);
var uFogDensity = cloneValue(U.uFogDensity);
var uExposure = cloneValue(U.uExposure);
var uSaturationBoost = cloneValue(U.uSaturationBoost);
var uFirstColor = cloneValue(U.uFirstColor);
var uSecondColor = cloneValue(U.uSecondColor);
var uThirdColor = cloneValue(U.uThirdColor);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function rot(a) {
    var s = sin(a), c = cos(a);
    return [c, -s, s, c];
}
;
function map(p) {
    p = p.slice();
    var q = cloneValue(p);
    q[2] -= uTime * uSpeed;
    mod([q[0] + uCellSize * 0.5, q[1] + uCellSize * 0.5, q[2] + uCellSize * 0.5], uCellSize).map(function (_) { return _ - uCellSize * 0.5; }).reduce((res, el, i) => (res[i] = el, res), q);
    assignComponents(q, [0, 1], [q[0], q[1]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, rot(uTime * uRotSpeedA + p[2] * uRotZInfluence)));
    assignComponents(q, [0, 2], [q[0], q[2]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, rot(uTime * uRotSpeedB)));
    var d = length(q) - uBlobRadius;
    var fluid = (sin(p[0] * uFluidFreq + uTime * uFluidTimeX)) * (sin(p[1] * uFluidFreq + uTime * uFluidTimeY)) * (sin(p[2] * uFluidFreq + uTime * uFluidTimeZ));
    return (d + fluid * uFluidAmount) * uFieldScale;
}
;
function main() {
    var I = [gl_FragCoord[0], gl_FragCoord[1]];
    var uv = [(I[0] - 0.5 * uResolution[0]) / uResolution[1], (I[1] - 0.5 * uResolution[1]) / uResolution[1]];
    var ro = [uCameraDistX, uCameraDistY, 0];
    ro[0] += (sin(uTime * uCameraSwayFreqX)) * uCameraSwayAmpX;
    ro[1] += (cos(uTime * uCameraSwayFreqY)) * uCameraSwayAmpY;
    var rd = normalize([uv[0], uv[1], 1]);
    assignComponents(rd, [0, 1], [rd[0], rd[1]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, rot((sin(uTime * uRayRotFreqA)) * uRayRotAmpA)));
    assignComponents(rd, [0, 2], [rd[0], rd[2]].map(function (x, i, v) { var o = i * 2; return this[o] * v[0] + (this[o + 1]) * v[1]; }, rot((cos(uTime * uRayRotFreqB)) * uRayRotAmpB)));
    var d0 = 0.0;
    var glow = 0.0;
    var steps = clamp(uMaxSteps, 1.0, 200.0) | 0;
    for (var i = 0; i < 200; i++) {
        if (i >= steps) {
            break;
        }
        ;
        var p = [ro[0] + rd[0] * d0, ro[1] + rd[1] * d0, ro[2] + rd[2] * d0];
        var dS = map(p);
        glow += uGlowNumerator / (uGlowEpsilon + abs(dS));
        if ((d0 > uMaxDist) || (abs(dS) < uSurfDist)) {
            break;
        }
        ;
        d0 += dS;
    }
    ;
    var col = [0, 0, 0];
    (col[0] += ((uFirstColor[0] * glow) * uColorIntensity) * (0.5 + 0.5 * (sin(uTime * uOscTimeFreq1 + d0 * uOscDistFreq1 + uOscPhase1))), col[1] += ((uFirstColor[1] * glow) * uColorIntensity) * (0.5 + 0.5 * (sin(uTime * uOscTimeFreq1 + d0 * uOscDistFreq1 + uOscPhase1))), col[2] += ((uFirstColor[2] * glow) * uColorIntensity) * (0.5 + 0.5 * (sin(uTime * uOscTimeFreq1 + d0 * uOscDistFreq1 + uOscPhase1))), col);
    (col[0] += ((uSecondColor[0] * glow) * uColorIntensity) * (0.5 + 0.5 * (sin(uTime * uOscTimeFreq2 + d0 * uOscDistFreq2 + uOscPhase2))), col[1] += ((uSecondColor[1] * glow) * uColorIntensity) * (0.5 + 0.5 * (sin(uTime * uOscTimeFreq2 + d0 * uOscDistFreq2 + uOscPhase2))), col[2] += ((uSecondColor[2] * glow) * uColorIntensity) * (0.5 + 0.5 * (sin(uTime * uOscTimeFreq2 + d0 * uOscDistFreq2 + uOscPhase2))), col);
    (col[0] += ((uThirdColor[0] * glow) * uColorIntensity) * (0.5 + 0.5 * (sin(uTime * uOscTimeFreq3 + d0 * uOscDistFreq3 + uOscPhase3))), col[1] += ((uThirdColor[1] * glow) * uColorIntensity) * (0.5 + 0.5 * (sin(uTime * uOscTimeFreq3 + d0 * uOscDistFreq3 + uOscPhase3))), col[2] += ((uThirdColor[2] * glow) * uColorIntensity) * (0.5 + 0.5 * (sin(uTime * uOscTimeFreq3 + d0 * uOscDistFreq3 + uOscPhase3))), col);
    col = col.map(function (_) { return _ * this; }, exp(-d0 * uFogDensity));
    exp([-col[0] * uExposure, -col[1] * uExposure, -col[2] * uExposure]).map(function (_) { return 1.0 - _; }).reduce((res, el, i) => (res[i] = el, res), col);
    var lum = dot(col, [0.299, 0.587, 0.114]);
    mix([lum, lum, lum], col, uSaturationBoost).reduce((res, el, i) => (res[i] = el, res), col);
    pow(max(col, 0.0), [0.45454545454545453, 0.45454545454545453, 0.45454545454545453]).reduce((res, el, i) => (res[i] = el, res), col);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
"spaceThreads": function(U, derivative, width=128,height=64, sampleTexture) {
let gl_FragCoord=[0,0,0,1], gl_FragColor=[0,0,0,1], UV=[0,0], V={}; var PI=Math.PI;
function step(edge, x) {
    if (!x && !edge)
        return 0;
    if (x.length) {
        if (edge.length)
            return x.map(function (x, i) {
                return step(edge[i], x);
            });
        return x.map(function (x, i) {
            return step(edge, x);
        });
    }
    return x < edge ? 0.0 : 1.0;
}
function mix(x, y, a) {
    if (x.length) {
        if (a.length)
            return x.map(function (x, i) {
                return mix(x, y[i], a[i]);
            });
        return x.map(function (x, i) {
            return mix(x, y[i], a);
        });
    }
    return x * (1.0 - a) + y * a;
}
function min(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                return Math.min(x, y[i]);
            });
        return x.map(function (x, i) {
            return Math.min(x, y);
        });
    }
    return Math.min(x, y);
}
function abs(x) {
    if (x.length)
        return x.map(abs);
    return Math.abs(x);
}
function fract(x) {
    if (x.length)
        return x.map(fract);
    return x - Math.floor(x);
}
function vec3(x, y, z) {
    if (x == null)
        x = 0;
    if (y == null)
        y = x;
    if (z == null)
        z = y;
    return [x, y, z];
}
vec3.subtract = function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};
vec3.multiply = function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};
function clamp(x, min, max) {
    if (x.length) {
        if (min.length)
            return x.map(function (x, i) {
                return Math.min(Math.max(x, min[i]), max[i]);
            });
        return x.map(function (x, i) {
            return Math.min(Math.max(x, min), max);
        });
    }
    return Math.min(Math.max(x, min), max);
}
function sqrt(x) {
    if (x.length)
        return x.map(sqrt);
    return Math.sqrt(x);
}
function sin(angle) {
    if (angle.length)
        return angle.map(sin);
    return Math.sin(angle);
}
function mod(x, y) {
    if (x.length) {
        if (y.length)
            return x.map(function (x, i) {
                if (x === 0 || y[i] === 0)
                    return 0;
                return x % y[i];
            });
        return x.map(function (x, i) {
            if (x === 0 || y === 0)
                return 0;
            return x % y;
        });
    }
    return x % y;
}
function normalize(x) {
    var len = 0;
    for (var i = 0; i < x.length; i++) {
        len += x[i] * x[i];
    }
    var out = Array(x.length).fill(0);
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        for (var i = 0; i < x.length; i++) {
            out[i] = x[i] * len;
        }
    }
    return out;
}
function round(x) { return x?.length ? x.map(round) : Math.floor(x + 0.5); }
function length(x) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
        sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
}
function exp(x) {
    if (x.length)
        return x.map(exp);
    return Math.exp(x);
}
function tanh(x) { return x?.length ? x.map(tanh) : Math.tanh(x); }
var uResolution = cloneValue(U.uResolution);
var uTime = cloneValue(U.uTime);
var uSpeed = cloneValue(U.uSpeed);
var uPathFreqY = cloneValue(U.uPathFreqY);
var uPathTimeY = cloneValue(U.uPathTimeY);
var uPathAmpY = cloneValue(U.uPathAmpY);
var uPathFreqX = cloneValue(U.uPathFreqX);
var uPathTimeX = cloneValue(U.uPathTimeX);
var uPathAmpX = cloneValue(U.uPathAmpX);
var uCellSize = cloneValue(U.uCellSize);
var uThreadThickness = cloneValue(U.uThreadThickness);
var uVoxelResolution = cloneValue(U.uVoxelResolution);
var uMarchSteps = cloneValue(U.uMarchSteps);
var uStepScale = cloneValue(U.uStepScale);
var uReflectCellSize = cloneValue(U.uReflectCellSize);
var uCylinderRadius = cloneValue(U.uCylinderRadius);
var uCylinderEpsilon = cloneValue(U.uCylinderEpsilon);
var uColorFreqScale = cloneValue(U.uColorFreqScale);
var uColorTimeSpeed = cloneValue(U.uColorTimeSpeed);
var uColorFloor = cloneValue(U.uColorFloor);
var uPhaseG = cloneValue(U.uPhaseG);
var uPhaseB = cloneValue(U.uPhaseB);
var uToneMapDivisor = cloneValue(U.uToneMapDivisor);
var uFov = cloneValue(U.uFov);
var uColorTint = cloneValue(U.uColorTint);
var uHue = cloneValue(U.uHue);
var uSaturation = cloneValue(U.uSaturation);
var fragColor = [0, 0, 0, 0];
function rgb2hsv(c) {
    c = c.slice();
    var K = [0, -0.3333333333333333, 0.6666666666666666, -1];
    var p = mix([c[2], c[1], K[3], K[2]], [c[1], c[2], K[0], K[1]], step(c[2], c[1]));
    var q = mix([p[0], p[1], p[3], c[0]], [c[0], p[1], p[2], p[0]], step(p[0], c[0]));
    var d = q[0] - min(q[3], q[1]);
    var e = 1.0e-10;
    return [abs(q[2] + (q[3] - q[1]) / (6.0 * d + e)), d / (q[0] + e), q[0]];
}
;
function hsv2rgb(c) {
    c = c.slice();
    var K = [1, 0.6666666666666666, 0.3333333333333333, 3];
    var p = abs(vec3.subtract([], fract([c[0] + K[0], c[0] + K[1], c[0] + K[2]]).map(function (_) { return _ * 6.0; }), [K[3], K[3], K[3]]));
    return mix([K[0], K[0], K[0]], clamp([p[0] - K[0], p[1] - K[0], p[2] - K[0]], 0.0, 1.0), c[1]).map(function (_) { return c[2] * _; });
}
;
function rects(p) {
    p = p.slice();
    var o = [p[0] * p[0], p[1] * p[1], p[2] * p[2]];
    var s = sqrt(o[0] + o[1]);
    s = min(s, sqrt(o[0] + o[2]));
    s = min(s, sqrt(o[1] + o[2]));
    s = min(s, sqrt(o[0] + o[1] + abs(p[0] * p[1])));
    s = min(s, sqrt(o[1] + o[2] + abs(p[1] * p[2])));
    s = min(s, sqrt(o[0] + o[2] + abs(p[0] * p[2])));
    return s;
}
;
function path(p, t) {
    p = p.slice();
    p[1] += (sin(p[2] * uPathFreqY + t * uPathTimeY)) * uPathAmpY;
    p[0] += (sin(p[2] * uPathFreqX + t * uPathTimeX)) * uPathAmpX;
    return p;
}
;
function map(p, t) {
    p = p.slice();
    var p1 = cloneValue(p);
    p1[2] -= t * uSpeed;
    path(p, t).reduce((res, el, i) => (res[i] = el, res), p1);
    mod(p1, uCellSize).map(function (_) { return _ - uCellSize * 0.5; }).reduce((res, el, i) => (res[i] = el, res), p1);
    return rects(p1) - uThreadThickness;
}
;
function main() {
    var I = [gl_FragCoord[0], gl_FragCoord[1]];
    var uv = [(2.0 * I[0] - uResolution[0]) / uResolution[1], (2.0 * I[1] - uResolution[1]) / uResolution[1]];
    var t = cloneValue(uTime);
    var ro = [0, 0, -t * uSpeed];
    var rd = normalize([uv[0] * uFov, uv[1] * uFov, -1]);
    var dt = 0.0;
    var O = [0, 0, 0, 0];
    var steps = clamp(uMarchSteps, 1.0, 120.0) | 0;
    for (var i = 0; i < 120; i++) {
        if (i >= steps) {
            break;
        }
        ;
        var p = [ro[0] + rd[0] * dt, ro[1] + rd[1] * dt, ro[2] + rd[2] * dt];
        path(p, t).reduce((res, el, i) => (res[i] += el, res), p);
        round([p[0] * uVoxelResolution, p[1] * uVoxelResolution, p[2] * uVoxelResolution]).map(function (_) { return _ / uVoxelResolution; }).reduce((res, el, i) => (res[i] = el, res), p);
        var d = map(p, t);
        dt += d * uStepScale;
        var Ic = abs(mod([p[0] - 1.0, p[1] - 1.0], uReflectCellSize).map(function (_) { return _ - 1.0; })).map(function (_) { return _ - 1.0; });
        var dc = abs(length(Ic) - uCylinderRadius) + uCylinderEpsilon;
        var phase = [0, uPhaseG, uPhaseB, 0];
        (abs(sin([((p[0] * p[1]) * p[2]) * uColorFreqScale - t * uColorTimeSpeed + phase[0], ((p[0] * p[1]) * p[2]) * uColorFreqScale - t * uColorTimeSpeed + phase[1], ((p[0] * p[1]) * p[2]) * uColorFreqScale - t * uColorTimeSpeed + phase[2], ((p[0] * p[1]) * p[2]) * uColorFreqScale - t * uColorTimeSpeed + phase[3]])).map(function (_) { return _ + uColorFloor; })).map(function (_) { return this / _; }, exp(-dt) / dc).reduce((res, el, i) => (res[i] += el, res), O);
    }
    ;
    var col = vec3.multiply([], tanh([O[0] / uToneMapDivisor, O[1] / uToneMapDivisor, O[2] / uToneMapDivisor]), uColorTint);
    var hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv[0] = fract(hsv[0] + uHue / 360.0);
    hsv[1] = clamp(hsv[1] * uSaturation, 0.0, 1.0);
    hsv2rgb(hsv).reduce((res, el, i) => (res[i] = el, res), col);
    (fragColor[0] = col[0], fragColor[1] = col[1], fragColor[2] = col[2], fragColor[3] = 1, fragColor);
}
;

return (x,y)=>{ gl_FragCoord[0]=x;gl_FragCoord[1]=y;UV[0]=x/width;UV[1]=y/height;
fragColor=[0, 0, 0, 0];
main();return Array.from(fragColor); };
},
};
