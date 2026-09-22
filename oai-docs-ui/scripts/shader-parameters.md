# Merucav 스타일별 파라미터

패키지 루트에서 실행한다. 로컬 고정 소스의 57개 스타일과 1,333개 설정 항목이다. `enabled`·`opacity`·`transform.*`를 포함한다. 실행법은 [색상·커버 지침](../references/design-system.md)을 따른다. `--param 이름=값` 또는 `--params 파일.json`으로 설정한다.

`--style`은 아래 ID, 하이픈 표기, 표시 이름을 모두 받는다. `step`은 웹 조절 간격이며 소수 입력을 금지하는 조건은 아니다. 범위가 없는 수치는 원본 UI에 범위가 노출되지 않은 설정이다.

| ID | 표시 이름 | default 모드 |
| --- | --- | --- |
| [flow](#flow) | Flow | 단독·합성 |
| [tranquiluxe](#tranquiluxe) | Tranquiluxe | 단독·합성 |
| [kaleidoscope](#kaleidoscope) | Kaleidoscope | 전체 모드·수동 선택 |
| [fate](#fate) | Fate | 단독·합성 |
| [structuredNoise](#structurednoise) | Structured Noise | 단독·합성 |
| [balatro](#balatro) | Balatro | 단독·합성 |
| [electricPulse](#electricpulse) | Electric Pulse | 합성 전용 (layer) |
| [laserBlast](#laserblast) | Laser Blast | 전체 모드·수동 선택 |
| [novatrix](#novatrix) | Novatrix | 단독·합성 |
| [voronoi](#voronoi) | Voronoi | 전체 모드·수동 선택 |
| [discGlare](#discglare) | Disc Glare | 단독·합성 |
| [hydrogen](#hydrogen) | Hydrogen Wavefunction | 전체 모드·수동 선택 |
| [pulse](#pulse) | Pulse | 단독·합성 |
| [melt](#melt) | Melt | 단독·합성 |
| [truchet](#truchet) | Truchet Tiles | 전체 모드·수동 선택 |
| [neonPolygon](#neonpolygon) | Neon Polygon | 합성 전용 (layer) |
| [exposedFilm](#exposedfilm) | Exposed Film | 단독·합성 |
| [psychedelicGlass](#psychedelicglass) | Psychedelic Glass | 전체 모드·수동 선택 |
| [solarWhirls](#solarwhirls) | Solar Whirls | 단독·합성 |
| [chargedCells](#chargedcells) | Charged Cells | 단독·합성 |
| [refractedWave](#refractedwave) | Refracted Wave | 단독·합성 |
| [swirl](#swirl) | Swirl | 합성 전용 (layer) |
| [spiral](#spiral) | Spiral | 전체 모드·수동 선택 |
| [neuralNoise](#neuralnoise) | Neural Noise | 단독·합성 |
| [interstellar](#interstellar) | Interstellar | 합성 전용 (layer) |
| [corrodedSpiral](#corrodedspiral) | Corroded Spiral | 단독·합성 |
| [spiralTunnel](#spiraltunnel) | Spiral Tunnel | 전체 모드·수동 선택 |
| [fractalVortex](#fractalvortex) | Fractal Vortex | 전체 모드·수동 선택 |
| [infiniteCorridor](#infinitecorridor) | Infinite Corridor | 전체 모드·수동 선택 |
| [spaceFlower](#spaceflower) | Space Flower | 전체 모드·수동 선택 |
| [electricSpiral](#electricspiral) | Electric Spiral | 전체 모드·수동 선택 |
| [twistedKaleidoscope](#twistedkaleidoscope) | Twisted Kaleidoscope | 전체 모드·수동 선택 |
| [trickyShapes](#trickyshapes) | Tricky Shapes | 전체 모드·수동 선택 |
| [gridAttractor](#gridattractor) | Grid Attractor | 전체 모드·수동 선택 |
| [tunnelCylinders](#tunnelcylinders) | Tunnel Cylinders | 전체 모드·수동 선택 |
| [psychedelicFlowerTunnel](#psychedelicflowertunnel) | Psychedelic Flower Tunnel | 전체 모드·수동 선택 |
| [celestialJourney](#celestialjourney) | Celestial Journey | 단독·합성 |
| [discoHive](#discohive) | Disco Hive | 전체 모드·수동 선택 |
| [discoHexnel](#discohexnel) | Disco Hexnel | 전체 모드·수동 선택 |
| [kaleidoscopeWheels](#kaleidoscopewheels) | Kaleidoscope Wheels | 전체 모드·수동 선택 |
| [discoFever](#discofever) | Disco Fever | 전체 모드·수동 선택 |
| [cosmicCity](#cosmiccity) | Cosmic City | 전체 모드·수동 선택 |
| [quantumShapes](#quantumshapes) | Quantum Shapes | 단독·합성 |
| [glassOrigin](#glassorigin) | Glass Origin | 단독·합성 |
| [mandalaDice](#mandaladice) | Mandala Dice | 전체 모드·수동 선택 |
| [chromaticUniverse](#chromaticuniverse) | Chromatic Universe | 단독·합성 |
| [cubicSpin](#cubicspin) | Cubic Spin | 전체 모드·수동 선택 |
| [membranes](#membranes) | Membranes | 단독·합성 |
| [quantumCore](#quantumcore) | Quantum Core | 합성 전용 (layer) |
| [neonKaleidoscope](#neonkaleidoscope) | Neon Kaleidoscope | 전체 모드·수동 선택 |
| [sparkTunnel](#sparktunnel) | Spark Tunnel | 전체 모드·수동 선택 |
| [whirlpool](#whirlpool) | Whirlpool | 단독·합성 |
| [containerFlow](#containerflow) | Container Flow | 전체 모드·수동 선택 |
| [mandelbrot](#mandelbrot) | Mandelbrot | 전체 모드·수동 선택 |
| [neuralGlass](#neuralglass) | Neural Glass | 단독·합성 |
| [blobbyWorld](#blobbyworld) | Blobby World | 전체 모드·수동 선택 |
| [spaceThreads](#spacethreads) | Space Threads | 전체 모드·수동 선택 |

## flow

Flow. 조회: `node scripts/generate-cover.mjs --describe flow`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| velocity | number | `0.2` | 0 ~ 5 | 0.1 |
| detail | number | `200` | 10 ~ 1000 | 5 |
| twist | number | `50` | 0 ~ 100 | 1 |
| speed | number | `2.5` | 0 ~ 10 | 0.1 |
| contrast | number | `1` | 0 ~ 2 | 0.01 |
| rgbR | number | `1` | 0 ~ 2 | 0.01 |
| rgbG | number | `1` | 0 ~ 2 | 0.01 |
| rgbB | number | `1` | 0 ~ 2 | 0.01 |
| colorOffset | number | `0` | -1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## tranquiluxe

Tranquiluxe. 조회: `node scripts/generate-cover.mjs --describe tranquiluxe`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| hue | number | `200` | 0 ~ 360 | 1 |
| saturation | number | `62.75` | 0 ~ 100 | 1 |
| speed | number | `0.25` | 0 ~ 2 | 0.01 |

## kaleidoscope

Kaleidoscope. 조회: `node scripts/generate-cover.mjs --describe kaleidoscope`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| speed | number | `1` | 0 ~ 5 | 0.1 |

## fate

Fate. 조회: `node scripts/generate-cover.mjs --describe fate`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| speed | number | `1` | 0 ~ 5 | 0.1 |

## structuredNoise

Structured Noise. 조회: `node scripts/generate-cover.mjs --describe structuredNoise`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 5 | 0.1 |
| mirrors | number | `3` | 1 ~ 10 | 1 |
| noiseStrength | number | `0.5` | 0 ~ 2 | 0.01 |
| distortionStrength | number | `0.25` | 0 ~ 2 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| useFilter | boolean | `false` | - | - |
| filterColor | color | `"#ffffff"` | - | - |

## balatro

Balatro. 조회: `node scripts/generate-cover.mjs --describe balatro`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 10 | 0.1 |
| spinRotation | number | `-2` | -10 ~ 10 | 0.1 |
| spinSpeed | number | `7` | 0 ~ 20 | 0.1 |
| contrast | number | `3.5` | 0 ~ 10 | 0.1 |
| lighting | number | `0.4` | 0 ~ 2 | 0.01 |
| spinAmount | number | `0.25` | 0 ~ 1 | 0.01 |
| pixelFilter | number | `745` | 100 ~ 2000 | 1 |
| spinEase | number | `1` | 0 ~ 2 | 0.01 |
| isRotate | boolean | `false` | - | - |
| color1_r | number | `0.871` | 0 ~ 1 | 0.01 |
| color1_g | number | `0.267` | 0 ~ 1 | 0.01 |
| color1_b | number | `0.231` | 0 ~ 1 | 0.01 |
| color2_r | number | `0` | 0 ~ 1 | 0.01 |
| color2_g | number | `0.42` | 0 ~ 1 | 0.01 |
| color2_b | number | `0.706` | 0 ~ 1 | 0.01 |
| color3_r | number | `0.086` | 0 ~ 1 | 0.01 |
| color3_g | number | `0.137` | 0 ~ 1 | 0.01 |
| color3_b | number | `0.145` | 0 ~ 1 | 0.01 |

## electricPulse

Electric Pulse. 조회: `node scripts/generate-cover.mjs --describe electricPulse`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| speed | number | `1.2` | 0 ~ 40 | 0.1 |
| color1_r | number | `0.2` | 0 ~ 1 | 0.01 |
| color1_g | number | `0.1` | 0 ~ 1 | 0.01 |
| color1_b | number | `0.4` | 0 ~ 1 | 0.01 |

## laserBlast

Laser Blast. 조회: `node scripts/generate-cover.mjs --describe laserBlast`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| speed | number | `1` | 0 ~ 5 | 0.1 |
| power | number | `0.51` | 0 ~ 2 | 0.01 |
| duration | number | `4` | 0 ~ 10 | 0.1 |
| startRadius | number | `0.84` | 0 ~ 5 | 0.1 |
| endRadius | number | `1.6` | 0 ~ 5 | 0.1 |
| color1_r | number | `0` | 0 ~ 1 | 0.01 |
| color1_g | number | `0.64` | 0 ~ 1 | 0.01 |
| color1_b | number | `0.2` | 0 ~ 1 | 0.01 |
| color2_r | number | `0.06` | 0 ~ 1 | 0.01 |
| color2_g | number | `0.35` | 0 ~ 1 | 0.01 |
| color2_b | number | `0.85` | 0 ~ 1 | 0.01 |

## novatrix

Novatrix. 조회: `node scripts/generate-cover.mjs --describe novatrix`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| speed | number | `1` | 0 ~ 5 | 0.1 |
| color_r | number | `0.44` | 0 ~ 1 | 0.01 |
| color_g | number | `0.77` | 0 ~ 1 | 0.01 |
| color_b | number | `0.85` | 0 ~ 1 | 0.01 |

## voronoi

Voronoi. 조회: `node scripts/generate-cover.mjs --describe voronoi`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 5 | 0.1 |
| scale | number | `8` | 1 ~ 50 | 0.5 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## discGlare

Disc Glare. 조회: `node scripts/generate-cover.mjs --describe discGlare`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| phase | number | `1.5` | 0 ~ 10 | 0.01 |
| distortion | number | `0.7` | 0 ~ 2 | 0.01 |
| zoom | number | `1` | 0.1 ~ 5 | 0.01 |
| contrast | number | `5` | 0.1 ~ 50 | 0.1 |
| gamma | number | `1.5` | 0.1 ~ 5 | 0.1 |
| hue | number | `0` | 0 ~ 360 | 1 |

## hydrogen

Hydrogen Wavefunction. 조회: `node scripts/generate-cover.mjs --describe hydrogen`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| n | number | `8` | 0 ~ 12 | 1 |
| l | number | `4` | 0 ~ 40 | 1 |
| m | number | `3` | 0 ~ 10 | 1 |
| zoom | number | `20` | 0.1 ~ 50 | 0.01 |
| contrast | number | `10` | 0.1 ~ 50 | 0.1 |
| gamma | number | `0.2` | 0.001 ~ 5 | 0.001 |
| hue | number | `129` | 0 ~ 360 | 1 |
| saturation | number | `1.2` | 0 ~ 2 | 0.01 |
| color1_r | number | `0` | 0 ~ 1 | 0.01 |
| color1_g | number | `1` | 0 ~ 1 | 0.01 |
| color1_b | number | `0.4` | 0 ~ 1 | 0.01 |
| color2_r | number | `0.1` | 0 ~ 1 | 0.01 |
| color2_g | number | `1` | 0 ~ 1 | 0.01 |
| color2_b | number | `0.46` | 0 ~ 1 | 0.01 |

## pulse

Pulse. 조회: `node scripts/generate-cover.mjs --describe pulse`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 100 | 0.1 |
| factor | number | `0.2` | 0 ~ 2 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| contrast | number | `1` | 0 ~ 5 | 0.01 |

## melt

Melt. 조회: `node scripts/generate-cover.mjs --describe melt`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `2` | 0 ~ 10 | 0.1 |
| zoom | number | `5` | 0.1 ~ 20 | 0.1 |
| detail | number | `0.2` | 0 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| contrast | number | `1.5` | 0 ~ 5 | 0.01 |

## truchet

Truchet Tiles. 조회: `node scripts/generate-cover.mjs --describe truchet`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `0.25` | 0 ~ 25 | 0.1 |
| zoom | number | `10` | 1 ~ 100 | 0.1 |
| borderThickness | number | `0.22` | - | - |
| sectors | number | `6` | 3 ~ 32 | 1 |
| hue | number | `114` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## neonPolygon

Neon Polygon. 조회: `node scripts/generate-cover.mjs --describe neonPolygon`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1.8` | 0 ~ 5 | 0.1 |
| sides | number | `6` | 3 ~ 20 | 1 |
| glow | number | `0.014` | 0 ~ 2 | 0.01 |
| color1_r | number | `1.47` | - | - |
| color1_g | number | `0.8` | - | - |
| color1_b | number | `2` | - | - |
| color2_r | number | `1.47` | - | - |
| color2_g | number | `0.8` | - | - |
| color2_b | number | `2` | - | - |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## exposedFilm

Exposed Film. 조회: `node scripts/generate-cover.mjs --describe exposedFilm`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| sectors | number | `6` | 2 ~ 32 | 1 |
| rotationSpeed | number | `0.1` | 0 ~ 10 | 0.01 |
| hue | number | `0` | - | - |
| saturation | number | `1` | - | - |

## psychedelicGlass

Psychedelic Glass. 조회: `node scripts/generate-cover.mjs --describe psychedelicGlass`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `0.8` | 0 ~ 3 | 0.01 |
| sides | number | `6` | 3 ~ 64 | 1 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| contrast | number | `1` | 0 ~ 3 | 0.01 |
| density | number | `15` | 0 ~ 100 | 0.1 |
| glow | number | `1.2` | 0 ~ 3 | 0.1 |

## solarWhirls

Solar Whirls. 조회: `node scripts/generate-cover.mjs --describe solarWhirls`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 5 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| color1_r | number | `0` | 0 ~ 1 | 0.01 |
| color1_g | number | `0.76` | 0 ~ 1 | 0.01 |
| color1_b | number | `0.4` | 0 ~ 1 | 0.01 |
| color2_r | number | `1` | 0 ~ 1 | 0.01 |
| color2_g | number | `1` | 0 ~ 1 | 0.01 |
| color2_b | number | `0.2` | 0 ~ 1 | 0.01 |
| color3_r | number | `0.1` | 0 ~ 1 | 0.01 |
| color3_g | number | `0.2` | 0 ~ 1 | 0.01 |
| color3_b | number | `0.5` | 0 ~ 1 | 0.01 |

## chargedCells

Charged Cells. 조회: `node scripts/generate-cover.mjs --describe chargedCells`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 1 ~ 15 | 0.01 |
| scale | number | `5` | 0.1 ~ 10 | 0.1 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| color1_r | number | `0.18` | 0 ~ 1 | 0.01 |
| color1_g | number | `0.7` | 0 ~ 1 | 0.01 |
| color1_b | number | `0.4` | 0 ~ 1 | 0.01 |
| color2_r | number | `0.58` | 0 ~ 1 | 0.01 |
| color2_g | number | `1` | 0 ~ 1 | 0.01 |
| color2_b | number | `0.15` | 0 ~ 1 | 0.01 |
| color3_r | number | `0` | 0 ~ 1 | 0.01 |
| color3_g | number | `0.65` | 0 ~ 1 | 0.01 |
| color3_b | number | `0.31` | 0 ~ 1 | 0.01 |

## refractedWave

Refracted Wave. 조회: `node scripts/generate-cover.mjs --describe refractedWave`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 5 | 0.1 |
| softness | number | `0.5` | 0 ~ 1 | 0.05 |
| intensity | number | `0.5` | 0 ~ 1 | 0.05 |
| noise | number | `0.2` | 0 ~ 1 | 0.05 |
| shape | number | `3` | 1 ~ 3 | 1 |
| colors | colors | `["#5100ff","#00ff80","#ffcc00","#ea00ff","#000000","#000000","#000000"]` | 1-7개 | - |
| colorCount | number | `4` | 1 ~ 7 | 1 |

## swirl

Swirl. 조회: `node scripts/generate-cover.mjs --describe swirl`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| speed | number | `1` | 0 ~ 3 | 0.01 |
| colorBack | color | `"#000000"` | - | - |
| colors | colors | `["#5100ff","#00ff80","#ffcc00","#ea00ff","#000000","#000000","#000000","#000000","#000000","#000000"]` | 1-10개 | - |
| colorCount | number | `4` | 1 ~ 10 | 1 |
| bandCount | number | `4` | 0 ~ 15 | 1 |
| twist | number | `0.5` | 0 ~ 1 | 0.01 |
| center | number | `0` | 0 ~ 1 | 0.01 |
| proportion | number | `0.5` | 0 ~ 1 | 0.01 |
| softness | number | `0.5` | 0 ~ 1 | 0.01 |
| noise | number | `0.2` | 0 ~ 1 | 0.01 |
| noiseFrequency | number | `0.4` | 0 ~ 1 | 0.01 |

## spiral

Spiral. 조회: `node scripts/generate-cover.mjs --describe spiral`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| scale | number | `1` | - | - |
| colorBack | color | `"#0A98F0"` | - | - |
| colorFront | color | `"#EEF9FF"` | - | - |
| density | number | `3.5` | 0 ~ 64 | 0.01 |
| distortion | number | `0` | 0 ~ 25 | 0.01 |
| strokeWidth | number | `0.9` | 0 ~ 1 | 0.01 |
| strokeTaper | number | `0` | 0 ~ 1 | 0.01 |
| noise | number | `0.5` | 0 ~ 2 | 0.01 |
| noiseFrequency | number | `1.5` | 0 ~ 5 | 0.01 |
| softness | number | `0` | 0 ~ 1 | 0.01 |
| speed | number | `0.25` | 0 ~ 3 | 0.01 |

## neuralNoise

Neural Noise. 조회: `node scripts/generate-cover.mjs --describe neuralNoise`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 5 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| iterations | number | `15` | 1 ~ 32 | 1 |
| complexity | number | `2.4` | 0 ~ 10 | 0.05 |
| distance | number | `1.2` | 1 ~ 1.5 | 0.01 |
| brightness | number | `1.2` | 0.1 ~ 5 | 0.05 |
| contrast | number | `0.5` | 0 ~ 2 | 0.01 |
| color | color | `"#00E5FF"` | - | - |
| colorShiftSpeed | number | `1` | 0 ~ 5 | 0.05 |
| vignette | number | `1` | 0 ~ 2 | 0.05 |

## interstellar

Interstellar. 조회: `node scripts/generate-cover.mjs --describe interstellar`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| passes | number | `1` | 1 ~ 4 | 1 |
| speed | number | `1` | 0 ~ 5 | 0.1 |
| grain | number | `0.04` | 0 ~ 0.2 | 0.01 |
| luminance | number | `5.1` | 0.1 ~ 15 | 0.1 |
| precision | number | `0.5` | 0.1 ~ 1 | 0.01 |
| iterations | number | `28.6` | 10 ~ 80 | 1 |
| solidity | number | `1.1` | 0.5 ~ 3 | 0.1 |
| camX | number | `2.8` | -5 ~ 10 | 0.1 |
| camY | number | `-1` | -5 ~ 5 | 0.1 |
| camPitch | number | `-0.38` | -1.5 ~ 1.5 | 0.01 |
| camFov | number | `2.5` | 0.5 ~ 5 | 0.1 |
| camShiftX | number | `1` | -2 ~ 5 | 0.1 |
| camShiftY | number | `1` | -2 ~ 5 | 0.1 |

## corrodedSpiral

Corroded Spiral. 조회: `node scripts/generate-cover.mjs --describe corrodedSpiral`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| hue | number | `180` | 0 ~ 360 | 1 |
| saturation | number | `0.8` | 0 ~ 2 | 0.01 |
| speed | number | `0.5` | 0 ~ 5 | 0.01 |
| corrosionZoom | number | `3` | 0.5 ~ 10 | 0.1 |
| octaves | number | `6` | 1 ~ 8 | 1 |
| persistence | number | `0.5` | 0.1 ~ 1 | 0.01 |
| lacunarity | number | `2` | 1 ~ 5 | 0.1 |
| spiralDensity | number | `6` | 1 ~ 40 | 1 |
| intensity | number | `1.5` | 0.1 ~ 5 | 0.1 |

## spiralTunnel

Spiral Tunnel. 조회: `node scripts/generate-cover.mjs --describe spiralTunnel`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| flightSpeed | number | `3` | 0 ~ 60 | 0.1 |
| fieldOfView | number | `100` | 6 ~ 179 | 1 |
| luminosity | number | `10` | 5 ~ 18 | 0.1 |
| openingSize | number | `42` | 0 ~ 500 | 1 |
| ribbonCount | number | `140` | 10 ~ 500 | 1 |
| ribbonWidth | number | `0.09` | 0 ~ 0.5 | 0.01 |
| spiralDensity | number | `19` | 1 ~ 100 | 0.1 |
| spiralCount | number | `4` | 1 ~ 12 | 1 |
| lightIntensity | number | `1.7` | 0.2 ~ 5 | 0.01 |
| distortion | number | `63` | 0 ~ 100 | 0.01 |
| lineColor1 | color | `"#00a2fa"` | - | - |
| lineColor2 | color | `"#a020f0"` | - | - |
| lineColor3 | color | `"#f97316"` | - | - |
| lineColor4 | color | `"#22c55e"` | - | - |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.05 |

## fractalVortex

Fractal Vortex. 조회: `node scripts/generate-cover.mjs --describe fractalVortex`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| renderScale | number | `0.2` | 0.1 ~ 1 | 0.01 |
| traceSteps | number | `380` | - | - |
| cameraSpeed | number | `2.6` | 0 ~ 50 | 0.01 |
| fractalSpeed | number | `1` | 0 ~ 50 | 0.01 |
| fov | number | `1.5` | 0.1 ~ 9 | 0.01 |
| fractalScale | number | `1` | 0.1 ~ 8 | 0.01 |
| turbulence | number | `1` | 0 ~ 60 | 0.01 |
| boxSize | number | `3.2` | 0.1 ~ 3 | 0.01 |
| glowStrength | number | `0.06` | 0 ~ 1 | 0.01 |
| glowWidth | number | `0.05` | 0.001 ~ 1 | 0.001 |
| mirrorTileSize | number | `4` | 0.1 ~ 10 | 0.01 |
| wallNormalScale | number | `4` | 0 ~ 5 | 0.01 |
| exposure | number | `2` | 0.1 ~ 10 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## infiniteCorridor

Infinite Corridor. 조회: `node scripts/generate-cover.mjs --describe infiniteCorridor`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| floorY | number | `-1.22` | -2 ~ 0 | 0.01 |
| apexY | number | `1.65` | 0 ~ 3 | 0.01 |
| halfWidth | number | `1.19` | 0.1 ~ 3 | 0.01 |
| focalLength | number | `1.1` | 0.1 ~ 24 | 0.01 |
| fogDensity | number | `0.089` | 0 ~ 0.5 | 0.001 |
| fractalTimeScale | number | `1` | 0 ~ 3 | 0.01 |
| trailTimeScale | number | `0.92` | 0 ~ 3 | 0.01 |
| fractalScaleX | number | `0.54` | 0.05 ~ 2 | 0.01 |
| fractalScaleY | number | `0.3` | 0.05 ~ 2 | 0.01 |
| fractalScroll | number | `0.26` | -2 ~ 2 | 0.01 |
| fractalLevels | number | `6` | 1 ~ 6 | 1 |
| lineWidthNear | number | `-0.009` | -0.05 ~ 0.05 | 0.001 |
| lineWidthFar | number | `0.038` | 0 ~ 0.1 | 0.001 |
| lineSoftness | number | `0.01` | 0 ~ 0.05 | 0.001 |
| cameraSpeed | number | `1.1` | 0 ~ 5 | 0.01 |
| cameraX | number | `0` | -2 ~ 2 | 0.01 |
| cameraY | number | `-0.97` | -2 ~ 2 | 0.01 |
| cameraZ | number | `0` | -10 ~ 10 | 0.1 |
| cameraSwayX | number | `0.045` | 0 ~ 1 | 0.001 |
| cameraSwayY | number | `0` | 0 ~ 1 | 0.001 |
| seamStrength | number | `0` | 0 ~ 10 | 0.01 |
| lightColor | color | `"#47b8ff"` | - | - |
| glowColor | color | `"#1fe0ff"` | - | - |
| substrateColor | color | `"#000000"` | - | - |
| backgroundColor | color | `"#1fe0ff"` | - | - |
| trailBrightness | number | `0.19` | 0 ~ 2 | 0.01 |
| fateSpeed | number | `0.8` | 0 ~ 5 | 0.01 |
| kaleidoscopeSpeed | number | `0.5` | 0 ~ 5 | 0.01 |
| mirrors | number | `0` | 0 ~ 2.5 | 0.5 |
| noiseStrength | number | `0.25` | 0 ~ 2 | 0.01 |
| distortionStrength | number | `0.35` | 0 ~ 2 | 0.01 |
| useFilter | boolean | `true` | - | - |
| filterColor | color | `"#ffffff"` | - | - |

## spaceFlower

Space Flower. 조회: `node scripts/generate-cover.mjs --describe spaceFlower`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 50 | 0.01 |
| colorBack | color | `"#000000"` | - | - |
| colors | colors | `["#5100ff","#00ff80","#ffcc00","#ea00ff","#000000","#000000","#000000","#000000","#000000","#000000"]` | 1-10개 | - |
| colorCount | number | `4` | 1 ~ 10 | 1 |
| bandCount | number | `5` | 1 ~ 64 | 1 |
| twist | number | `0.67` | 0 ~ 1 | 0.01 |
| center | number | `0.15` | 0 ~ 3 | 0.01 |
| proportion | number | `0.67` | 0 ~ 1 | 0.01 |
| softness | number | `0.5` | 0 ~ 1 | 0.01 |
| noise | number | `0` | 0 ~ 1 | 0.01 |
| noiseFrequency | number | `0` | 0 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| symmetry | number | `1` | - | - |

## electricSpiral

Electric Spiral. 조회: `node scripts/generate-cover.mjs --describe electricSpiral`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 5 | 0.01 |
| gridScale | number | `4` | 1 ~ 20 | 0.1 |
| gridSoftness | number | `5` | 0 ~ 20 | 0.1 |
| spiralFrequency | number | `10` | 1 ~ 30 | 0.1 |
| spiralTightness | number | `9` | 1 ~ 25 | 0.1 |
| glowIntensity | number | `1` | 0 ~ 3 | 0.05 |
| coreBrightness | number | `-2.5` | -10 ~ -0.5 | 0.05 |
| colorGrid | color | `"#ff801a"` | - | - |
| colorGlow | color | `"#ff801a"` | - | - |
| colorSpiral | color | `"#80ffff"` | - | - |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## twistedKaleidoscope

Twisted Kaleidoscope. 조회: `node scripts/generate-cover.mjs --describe twistedKaleidoscope`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| speed | number | `0.9` | 0 ~ 3 | 0.01 |
| colorBack | color | `"#07070f"` | - | - |
| colors | colors | `["#7a00ff","#00f5ff","#ff4fd8","#ffd84d","#2a1a5e","#0c1026","#000000","#000000","#000000","#000000"]` | 1-10개 | - |
| colorCount | number | `8` | 1 ~ 10 | 1 |
| bandCount | number | `7` | 2 ~ 24 | 1 |
| twist | number | `0.65` | 0 ~ 1 | 0.01 |
| center | number | `0.25` | 0 ~ 1 | 0.01 |
| proportion | number | `0.55` | 0 ~ 1 | 0.01 |
| softness | number | `0.45` | 0 ~ 1 | 0.01 |
| noise | number | `0.22` | 0 ~ 1 | 0.01 |
| noiseFrequency | number | `0.45` | 0 ~ 1 | 0.01 |
| symmetry | number | `1` | - | - |

## trickyShapes

Tricky Shapes. 조회: `node scripts/generate-cover.mjs --describe trickyShapes`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| renderScale | number | `0.4` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
| speed | number | `0.9` | 0 ~ 10 | 0.01 |
| colorBack | color | `"#07070f"` | - | - |
| colors | colors | `["#1486ef","#14efea","#7d14ef","#efea14","#2a1a5e","#0c1026","#000000","#000000","#000000","#000000"]` | 1-10개 | - |
| colorCount | number | `8` | 1 ~ 10 | 1 |
| bandCount | number | `7` | 1 ~ 36 | 1 |
| twist | number | `0.65` | 0 ~ 1 | 0.01 |
| proportion | number | `0.55` | 0 ~ 1 | 0.01 |
| softness | number | `0.45` | 0 ~ 1 | 0.01 |
| noise | number | `0` | 0 ~ 1 | 0.01 |
| distortion | number | `0` | 0 ~ 1 | 0.01 |
| symmetry | number | `1` | - | - |
| kaleidoscopeEnabled | number | `1` | - | - |
| shapeMode | number | `0` | 0 ~ 5 | 1 |
| darken | number | `0` | 0 ~ 2 | 0.01 |
| rayMix | number | `0.25` | - | - |
| rayShape | number | `0.65` | 0 ~ 2 | 1 |
| raySpeed | number | `1` | 0 ~ 3 | 0.01 |

## gridAttractor

Grid Attractor. 조회: `node scripts/generate-cover.mjs --describe gridAttractor`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.05 |
| cellSize | number | `0.04` | 0.03 ~ 0.3 | 0.005 |
| sphereSize | number | `0.075` | 0.01 ~ 0.5 | 0.005 |
| boxHeight | number | `0.1` | 0.02 ~ 0.3 | 0.005 |
| pulseHeight | number | `0.05` | 0 ~ 0.2 | 0.005 |
| colorSphere | color | `"#0a98f0"` | - | - |
| colorTop | color | `"#e0f2fe"` | - | - |
| colorSide | color | `"#0a98f0"` | - | - |
| colorFront | color | `"#0369a1"` | - | - |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## tunnelCylinders

Tunnel Cylinders. 조회: `node scripts/generate-cover.mjs --describe tunnelCylinders`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| renderScale | number | `0.25` | 0.1 ~ 1 | 0.01 |
| speed | number | `0.125` | 0 ~ 0.5 | 0.005 |
| travelSpeed | number | `2` | 0 ~ 5 | 0.05 |
| tunnelRadius | number | `1` | 0.3 ~ 2 | 0.01 |
| segments | number | `50` | 5 ~ 150 | 1 |
| ringFrequency | number | `3` | 0.5 ~ 8 | 0.1 |
| cylinderThickness | number | `0.0251` | 0.005 ~ 0.1 | 0.001 |
| thicknessVariation | number | `0.25` | 0 ~ 0.5 | 0.01 |
| glowIntensity | number | `1` | 0 ~ 3 | 0.05 |
| colors | colors | `["#3A0CA3","#7209B7","#4361EE","#B5179E","#000000","#000000","#000000","#000000","#000000","#000000"]` | 1-10개 | - |
| colorCount | number | `4` | 1 ~ 10 | 1 |
| tunnelMix | number | `0.5` | 0 ~ 1 | 0.01 |
| swirlMix | number | `0.3` | 0 ~ 1 | 0.01 |
| spiralMix | number | `0.2` | 0 ~ 1 | 0.01 |
| swirlBandCount | number | `6` | 1 ~ 20 | 1 |
| swirlTwist | number | `0.5` | 0 ~ 1 | 0.01 |
| spiralRibbonCount | number | `60` | 10 ~ 100 | 10 |
| spiralDensity | number | `3` | 0 ~ 10 | 0.1 |
| spiralDistortion | number | `1` | 0 ~ 5 | 0.05 |
| noiseIntensity | number | `0` | 0 ~ 1.5 | 0.01 |
| noiseScale | number | `1` | 0.1 ~ 5 | 0.1 |
| noiseSpeed | number | `1` | 0 ~ 5 | 0.05 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## psychedelicFlowerTunnel

Psychedelic Flower Tunnel. 조회: `node scripts/generate-cover.mjs --describe psychedelicFlowerTunnel`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| renderScale | number | `0.25` | 0.1 ~ 1 | 0.01 |
| speed | number | `1` | 0 ~ 3 | 0.05 |
| travelSpeed | number | `1` | 0 ~ 5 | 0.05 |
| repeatSpacing | number | `12` | 2 ~ 40 | 0.5 |
| boxSize | number | `0.22` | 0.05 ~ 0.6 | 0.005 |
| edgeThickness | number | `0.07` | 0.005 ~ 0.2 | 0.005 |
| scaleFactor | number | `0.8` | 0.3 ~ 0.98 | 0.01 |
| iterations | number | `7` | 1 ~ 12 | 1 |
| petalCount | number | `12` | 2 ~ 30 | 1 |
| rotationSpeed | number | `0.4` | 0 ~ 2 | 0.01 |
| fov | number | `0.7` | 0.2 ~ 2 | 0.01 |
| fogDensity | number | `0.045` | 0 ~ 0.3 | 0.001 |
| colorShiftSpeed | number | `0.15` | 0 ~ 1 | 0.01 |
| colors | colors | `["#FF3B30","#FF9500","#FFCC00","#34C759","#00C7BE","#30B0C7","#5E5CE6","#AF52DE","#000000","#000000"]` | 1-10개 | - |
| colorCount | number | `8` | 1 ~ 10 | 1 |
| colorBack | color | `"#0D0D26"` | - | - |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## celestialJourney

Celestial Journey. 조회: `node scripts/generate-cover.mjs --describe celestialJourney`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| renderScale | number | `0.25` | 0.1 ~ 1 | 0.01 |
| cameraSpeed | number | `1.35` | 0 ~ 4 | 0.01 |
| focalLength | number | `1.35` | 0.6 ~ 2.5 | 0.01 |
| maxDistance | number | `20.17` | 8 ~ 35 | 0.01 |
| tunnelRadius | number | `1.28` | 0.3 ~ 3 | 0.01 |
| tunnelRoughness | number | `2.1` | 0 ~ 4 | 0.01 |
| volumeDensity | number | `2.07` | 0.1 ~ 5 | 0.01 |
| glowStrength | number | `1.13` | 0 ~ 3 | 0.01 |
| exposure | number | `3.6` | 0.1 ~ 8 | 0.01 |
| color1 | color | `"#000209"` | - | - |
| color2 | color | `"#03133D"` | - | - |
| color3 | color | `"#020B2B"` | - | - |
| color4 | color | `"#063DC7"` | - | - |
| color5 | color | `"#1EC2FF"` | - | - |
| color6 | color | `"#A6FFFF"` | - | - |
| color7 | color | `"#FF6B42"` | - | - |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## discoHive

Disco Hive. 조회: `node scripts/generate-cover.mjs --describe discoHive`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.05 |
| colorFlowSpeed | number | `0.2` | 0 ~ 2 | 0.01 |
| camSpeed | number | `4` | 0 ~ 12 | 0.1 |
| fov | number | `1.2` | 0.4 ~ 2.5 | 0.01 |
| rollAmount | number | `0.2` | 0 ~ 1 | 0.01 |
| rollSpeed | number | `0.6` | 0 ~ 3 | 0.01 |
| pathAmpX | number | `2.5` | 0 ~ 6 | 0.05 |
| pathFreqX | number | `0.15` | 0 ~ 1 | 0.005 |
| pathAmpY | number | `2` | 0 ~ 6 | 0.05 |
| pathFreqY | number | `0.1` | 0 ~ 1 | 0.005 |
| tunnelRadius | number | `2.5` | 0.5 ~ 6 | 0.05 |
| hexesAround | number | `16` | 4 ~ 40 | 2 |
| hexBorder | number | `0.46` | 0.1 ~ 0.7 | 0.005 |
| hexDotSize | number | `0.22` | 0 ~ 0.5 | 0.005 |
| fogDensity | number | `0.006` | 0 ~ 0.05 | 0.0005 |
| vignetteStrength | number | `1` | 0 ~ 2 | 0.01 |
| colors | colors | `["#FF6619","#FF3380","#FFCC66","#331A66"]` | 1-4개 | - |
| renderScale | number | `0.6` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## discoHexnel

Disco Hexnel. 조회: `node scripts/generate-cover.mjs --describe discoHexnel`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.05 |
| cameraSpeed | number | `4` | 0 ~ 12 | 0.1 |
| fov | number | `1.3` | 0.4 ~ 2.5 | 0.01 |
| maxDistance | number | `80` | 20 ~ 150 | 1 |
| maxSteps | number | `150` | 40 ~ 220 | 1 |
| tunnelRadius | number | `8` | 2 ~ 20 | 0.1 |
| tunnelPulseAmount | number | `3.5` | 0 ~ 10 | 0.1 |
| tunnelPulseSpeed | number | `1.5` | 0 ~ 5 | 0.05 |
| hexWrapCount | number | `26` | 6 ~ 60 | 1 |
| hexBevelAmount | number | `0.3` | 0 ~ 1 | 0.01 |
| rayCount | number | `14` | 2 ~ 40 | 1 |
| raySpinSpeed | number | `2` | 0 ~ 10 | 0.05 |
| strobeSpeed | number | `12` | 0 ~ 30 | 0.1 |
| centerGlowSize | number | `0.48` | 0.05 ~ 1 | 0.01 |
| fogDensity | number | `0.00015` | 0 ~ 0.001 | 0.00001 |
| whirlpoolScale | number | `10` | 2 ~ 30 | 0.1 |
| whirlpoolArms | number | `14` | 1 ~ 30 | 0.5 |
| whirlpoolRings | number | `-6` | -20 ~ 20 | 0.5 |
| whirlpoolTwistX | number | `-5` | -15 ~ 15 | 0.1 |
| whirlpoolTwistY | number | `12` | -15 ~ 15 | 0.1 |
| whirlpoolFlowSpeedX | number | `0.4` | -2 ~ 2 | 0.01 |
| whirlpoolFlowSpeedY | number | `0.6` | -2 ~ 2 | 0.01 |
| liquidSwirlSpeed | number | `2` | 0 ~ 8 | 0.05 |
| liquidRotSpeed | number | `0.5` | 0 ~ 4 | 0.02 |
| liquidDetail | number | `10` | 2 ~ 16 | 1 |
| liquidGlowRadius | number | `18` | 2 ~ 40 | 0.5 |
| liquidGlowPulseAmount | number | `8` | 0 ~ 20 | 0.1 |
| pulseAFrequency | number | `3.14` | 0 ~ 10 | 0.05 |
| pulseBFrequency | number | `2` | 0 ~ 10 | 0.05 |
| colors | colors | `["#00a2fa","#a020f0","#f97316","#22c55e","#9900CC","#FF6619","#FF3380","#FFCC66","#331A66","#000000"]` | 1-10개 | - |
| colorCount | number | `10` | 1 ~ 10 | 1 |
| renderScale | number | `0.5` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## kaleidoscopeWheels

Kaleidoscope Wheels. 조회: `node scripts/generate-cover.mjs --describe kaleidoscopeWheels`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `0.25` | 0 ~ 2 | 0.01 |
| pathAmplitude | number | `0.075` | 0 ~ 0.5 | 0.005 |
| pathTwistFrequency | number | `0.8` | 0 ~ 3 | 0.01 |
| pathSecondaryFrequency | number | `1.414` | 0 ~ 3 | 0.01 |
| pathTertiaryFrequency | number | `0.75` | 0 ~ 3 | 0.01 |
| pathQuaternaryFrequency | number | `0.707` | 0 ~ 3 | 0.01 |
| pathDriftSpeed | number | `0.2` | 0 ~ 2 | 0.01 |
| segmentsMin | number | `3` | 2 ~ 20 | 1 |
| segmentsMax | number | `12` | 2 ~ 30 | 1 |
| segmentsSpeed | number | `0.2` | 0 ~ 2 | 0.01 |
| kaleidoscopeSoftness | number | `1` | 0.1 ~ 4 | 0.05 |
| planeRotationSpeed | number | `0.3` | 0 ~ 2 | 0.01 |
| planeRotationAmplitude | number | `0.5` | 0 ~ 2 | 0.01 |
| internalSpinSpeed | number | `0.5` | 0 ~ 2 | 0.01 |
| zoomMin | number | `0.2` | 0.05 ~ 1 | 0.01 |
| zoomMax | number | `0.4` | 0.05 ~ 1.5 | 0.01 |
| truchetRadiusMin | number | `0.3` | 0.05 ~ 0.5 | 0.005 |
| truchetRadiusMax | number | `0.45` | 0.05 ~ 0.5 | 0.005 |
| truchetRadiusFrequency | number | `0.1` | 0 ~ 1 | 0.01 |
| lineWidth | number | `0.025` | 0.005 ~ 0.1 | 0.001 |
| planeSpacing | number | `0.75` | 0.2 ~ 2 | 0.01 |
| planeCount | number | `6` | 2 ~ 14 | 1 |
| colorDistanceScale | number | `0.2` | 0 ~ 1 | 0.01 |
| colorTimeSpeed | number | `0.4` | 0 ~ 2 | 0.01 |
| colorPlaneScale | number | `0.1` | 0 ~ 1 | 0.01 |
| waveSpeed | number | `5` | 0 ~ 20 | 0.1 |
| waveFrequency | number | `100` | 10 ~ 300 | 1 |
| fovBase | number | `2` | 0.5 ~ 4 | 0.05 |
| fovVariation | number | `1` | 0 ~ 3 | 0.05 |
| pulseColorSpeed | number | `0.1` | 0 ~ 1 | 0.01 |
| pulseColorPower | number | `10` | 1 ~ 30 | 0.5 |
| contrastAmount | number | `0.4` | 0 ~ 1 | 0.01 |
| vignetteStrength | number | `1` | 0 ~ 2 | 0.01 |
| colors | colors | `["#00a2fa","#a020f0","#f97316","#22c55e","#FF6619","#FF3380","#FFCC66","#331A66","#FFCC00","#34C759","#00C7BE"]` | 1-11개 | - |
| colorCount | number | `3` | 1 ~ 10 | 1 |
| renderScale | number | `0.6` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## discoFever

Disco Fever. 조회: `node scripts/generate-cover.mjs --describe discoFever`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.05 |
| cameraSpeed | number | `4` | 0 ~ 12 | 0.1 |
| fov | number | `1.2` | 0.1 ~ 5 | 0.01 |
| rollAmount | number | `0.2` | 0 ~ 1 | 0.01 |
| rollSpeed | number | `0.6` | 0 ~ 3 | 0.01 |
| pathAmpX | number | `2.5` | 0 ~ 6 | 0.05 |
| pathFreqX | number | `0.15` | 0 ~ 1 | 0.005 |
| pathAmpY | number | `2` | 0 ~ 6 | 0.05 |
| pathFreqY | number | `0.1` | 0 ~ 1 | 0.005 |
| tunnelRadius | number | `2.5` | 0.5 ~ 6 | 0.05 |
| tilesAround | number | `16` | 1 ~ 96 | 1 |
| tileBorder | number | `0.46` | 0.1 ~ 0.7 | 0.005 |
| tileGlowStrength | number | `1.2` | 0.2 ~ 3 | 0.01 |
| tileGlowMin | number | `0.4` | 0 ~ 1 | 0.01 |
| tileTwist | number | `0.15` | -1 ~ 1 | 0.01 |
| fbmSpeed | number | `5` | 0 ~ 15 | 0.1 |
| fbmPower | number | `3` | 0.5 ~ 8 | 0.1 |
| fbmMin | number | `0.75` | 0 ~ 1 | 0.01 |
| fogDensity | number | `0.005` | 0 ~ 0.05 | 0.0005 |
| vignetteStrength | number | `1` | 0 ~ 2 | 0.01 |
| colors | colors | `["#00a2fa","#a020f0","#f97316","#22c55e","#1270E7","#FF3380","#331A66","#34C759","#00C7BE"]` | 1-9개 | - |
| colorCount | number | `4` | 1 ~ 9 | 1 |
| renderScale | number | `0.6` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## cosmicCity

Cosmic City. 조회: `node scripts/generate-cover.mjs --describe cosmicCity`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| fov | number | `72` | 5 ~ 140 | 1 |
| cameraSway | number | `1.2` | 0 ~ 180 | 0.01 |
| cameraVertical | number | `1.16` | -50 ~ 50 | 0.01 |
| cameraRoll | number | `0` | 0 ~ 0.18 | 0.001 |
| speed | number | `4.9` | 0 ~ 30 | 0.1 |
| pulse | number | `0.3` | 0 ~ 1 | 0.01 |
| buildingDensity | number | `0.76` | 0.2 ~ 1.3 | 0.01 |
| corridorWidth | number | `19.5` | 2 ~ 88 | 0.1 |
| curveAmount | number | `5.45` | 0 ~ 36 | 0.01 |
| cityHeight | number | `1.8` | 0.4 ~ 17 | 0.01 |
| pointSize | number | `0.86` | 0.1 ~ 4 | 0.01 |
| pointOpacity | number | `1` | 0.1 ~ 1 | 0.01 |
| edgeOpacity | number | `0.22` | 0 ~ 0.8 | 0.01 |
| color1 | color | `"#766DFF"` | - | - |
| color2 | color | `"#38C9FF"` | - | - |
| color3 | color | `"#FF48D7"` | - | - |
| color4 | color | `"#FF4B5E"` | - | - |
| bloomStrength | number | `0.31` | 0 ~ 3 | 0.01 |
| bloomRadius | number | `0.82` | 0 ~ 1 | 0.01 |
| bloomThreshold | number | `0.045` | 0 ~ 1 | 0.001 |
| trailPersistence | number | `0.565` | 0 ~ 0.97 | 0.001 |
| chromaticShift | number | `0.0036` | 0 ~ 0.012 | 0.0001 |
| grain | number | `0.035` | 0 ~ 0.2 | 0.001 |
| vignette | number | `0.58` | 0 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## quantumShapes

Quantum Shapes. 조회: `node scripts/generate-cover.mjs --describe quantumShapes`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `0.5` | 0 ~ 3 | 0.01 |
| cameraOrbitRadius | number | `1.5` | 0 ~ 5 | 0.05 |
| cameraOrbitSpeed | number | `0.4` | 0 ~ 2 | 0.01 |
| cameraForwardSpeed | number | `5` | 0 ~ 20 | 0.1 |
| fov | number | `1.2` | 0.4 ~ 2.5 | 0.01 |
| gridSize | number | `6` | 1 ~ 16 | 0.1 |
| foldIterations | number | `8` | 1 ~ 12 | 1 |
| foldWarpAmount | number | `0.015` | 0 ~ 0.1 | 0.001 |
| foldWarpFrequency | number | `15` | 0 ~ 40 | 0.5 |
| morphSpeed | number | `0.1` | 0 ~ 1 | 0.01 |
| pyramidRadius | number | `0.6` | 0.1 ~ 2 | 0.01 |
| pyramidTwist | number | `0.15` | -1 ~ 1 | 0.01 |
| sphereRadius | number | `1.2` | 0.1 ~ 3 | 0.01 |
| sphereOffsetBase | number | `1.2` | 0 ~ 3 | 0.01 |
| sphereOffsetAmp | number | `0.3` | 0 ~ 1 | 0.01 |
| cubeRadius | number | `1` | 0.1 ~ 3 | 0.01 |
| cubeOffsetBase | number | `1.2` | 0 ~ 3 | 0.01 |
| cubeOffsetAmp | number | `0.3` | 0 ~ 1 | 0.01 |
| marchSteps | number | `90` | 22 ~ 200 | 1 |
| stepScale | number | `0.5` | 0.1 ~ 1 | 0.01 |
| colorPhaseScale | number | `0.25` | 0 ~ 1 | 0.01 |
| colorTimeSpeed | number | `0.8` | 0 ~ 3 | 0.01 |
| fogDensity | number | `0.03` | 0 ~ 0.2 | 0.001 |
| exposure | number | `0.4` | 0.01 ~ 2 | 0.01 |
| colors | colors | `["#FF6B4A","#4A84FF","#4AFFC5","#6B4AFF","#4AFF6B","#DEFF4A","#C54AFF","#FF4A84","#FFC64A","#84FF4A"]` | 1-10개 | - |
| colorCount | number | `6` | 1 ~ 10 | 1 |
| renderScale | number | `0.32` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## glassOrigin

Glass Origin. 조회: `node scripts/generate-cover.mjs --describe glassOrigin`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.01 |
| pathRadius | number | `20` | 0 ~ 40 | 0.5 |
| pathFreqX | number | `0.02` | 0 ~ 0.2 | 0.001 |
| pathYAmp | number | `3` | 0 ~ 10 | 0.1 |
| pathFreqY | number | `0.05` | 0 ~ 0.3 | 0.001 |
| rotTwistScale | number | `0.05` | 0 ~ 0.3 | 0.005 |
| noiseScale2 | number | `0.125` | 0.02 ~ 0.5 | 0.005 |
| noiseAmp2 | number | `4` | 0 ~ 10 | 0.1 |
| waveAmp | number | `0.1` | 0 ~ 0.5 | 0.005 |
| waveOffset | number | `-0.2` | -1 ~ 1 | 0.01 |
| yInfluence | number | `0.2` | 0 ~ 1 | 0.01 |
| distanceThreshold | number | `1.5` | 0 ~ 4 | 0.02 |
| thresholdFreqZ | number | `0.2` | 0 ~ 1 | 0.01 |
| thresholdFreqY | number | `0.4` | 0 ~ 1 | 0.01 |
| marchSteps | number | `150` | 40 ~ 260 | 1 |
| stepMinBase | number | `0.001` | 0.0001 ~ 0.02 | 0.0001 |
| stepMult | number | `0.1` | 0 ~ 0.5 | 0.005 |
| colorPhaseScale | number | `0.1` | 0 ~ 1 | 0.01 |
| colorIterScale | number | `2` | 0 ~ 6 | 0.05 |
| fov | number | `2` | 0.5 ~ 5 | 0.05 |
| exposure | number | `1.5` | 0 ~ 4 | 0.01 |
| colors | colors | `["#744C33","#B39970","#8C6E4D","#70ACB3","#7770B3","#70B378","#8C4D8B","#6D3374","#74333A","#74335B"]` | 1-10개 | - |
| colorCount | number | `3` | 1 ~ 10 | 1 |
| renderScale | number | `0.46` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## mandalaDice

Mandala Dice. 조회: `node scripts/generate-cover.mjs --describe mandalaDice`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.05 |
| rotSpeedYZ | number | `0.25` | -1 ~ 1 | 0.01 |
| rotSpeedXZ | number | `0.15` | -1 ~ 1 | 0.01 |
| buckyRadius | number | `1.5` | 0.5 ~ 4 | 0.05 |
| buckyBevel | number | `0.08` | 0 ~ 0.3 | 0.005 |
| buckyPentagonScale | number | `0.934` | 0.5 ~ 1.2 | 0.005 |
| cameraDistance | number | `5` | 2 ~ 12 | 0.1 |
| cameraFov | number | `2.5` | 0.5 ~ 5 | 0.05 |
| mandalaScale | number | `0.7` | 0.1 ~ 2 | 0.01 |
| logoRadius | number | `0.25` | 0.05 ~ 1 | 0.01 |
| logoOffset | number | `0.25` | 0 ~ 1 | 0.01 |
| logoWidth | number | `0.1` | 0.01 ~ 0.5 | 0.005 |
| kaleidoscopeRepMin | number | `8` | 2 ~ 20 | 1 |
| kaleidoscopeRepMax | number | `30` | 10 ~ 60 | 1 |
| kaleidoscopeSoftnessMin | number | `0.025` | - | - |
| kaleidoscopeSoftnessMax | number | `0.25` | - | - |
| faceRotationSpeed | number | `0.2` | - | - |
| colorCycleSpeed | number | `0.5` | - | - |
| faceGlowSpeed | number | `0.05` | - | - |
| glowIntensity | number | `2` | 0 ~ 5 | 0.05 |
| specularPower | number | `30` | - | - |
| fresnelStrength | number | `0.6` | - | - |
| contrastAmount | number | `1` | - | - |
| vignetteStrength | number | `1` | - | - |
| colorBack | color | `"#03050A"` | - | - |
| colors | colors | `["#FF3B30","#FF9500","#FFCC00","#34C759","#00C7BE","#5E5CE6","#AF52DE","#000000","#000000","#000000"]` | 1-10개 | - |
| colorCount | number | `7` | 1 ~ 10 | 1 |
| renderScale | number | `1` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## chromaticUniverse

Chromatic Universe. 조회: `node scripts/generate-cover.mjs --describe chromaticUniverse`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.05 |
| pathRadius | number | `12` | 1 ~ 30 | 0.5 |
| pathFreqX | number | `0.1` | 0 ~ 0.5 | 0.005 |
| pathFreqY | number | `0.12` | 0 ~ 0.5 | 0.005 |
| lookAheadDistance | number | `4` | - | - |
| marchSteps | number | `28` | - | - |
| maxDistance | number | `30` | - | - |
| orbSize | number | `0.01` | 0.001 ~ 0.1 | 0.001 |
| orbSwayAmp | number | `2` | - | - |
| baseRadiusAmp | number | `2` | - | - |
| baseRadiusFreq | number | `0.6` | - | - |
| tunnelOffsetX | number | `6` | - | - |
| scoopFrequency | number | `0.4` | - | - |
| scoopScale | number | `0.25` | - | - |
| detailFrequency | number | `16` | - | - |
| detailScale | number | `0.22` | - | - |
| fluidIterations | number | `7` | - | - |
| fluidTunnelScale | number | `0.4` | - | - |
| wallBrightness | number | `2.5` | 0.1 ~ 10 | 0.1 |
| orbBrightness | number | `10` | 0.1 ~ 30 | 0.5 |
| orbMinDist | number | `0.6` | - | - |
| toneMapDivisor | number | `1500` | - | - |
| paletteBrightness | number | `2` | - | - |
| colorIterScale | number | `0.4` | - | - |
| colors | colors | `["#FF3355","#33CCFF","#66FF88","#FF33BB","#33FFCC","#66FF33","#6633FF","#CC33FF","#FF6633","#FFCC33"]` | 1-10개 | - |
| colorCount | number | `9` | 1 ~ 10 | 1 |
| renderScale | number | `0.5` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## cubicSpin

Cubic Spin. 조회: `node scripts/generate-cover.mjs --describe cubicSpin`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `2.5` | 0 ~ 5 | 0.05 |
| twistTimeScale | number | `0.15` | - | - |
| twistAmount | number | `0.15` | 0 ~ 1 | 0.01 |
| cubeSize | number | `0.45` | 0.1 ~ 1.5 | 0.01 |
| cubeRotSpeedA | number | `0.25` | - | - |
| cubeRotSpeedB | number | `0.2` | - | - |
| tunnelRadius | number | `2.8` | 1 ~ 8 | 0.1 |
| cameraSwaySpeed | number | `0.2` | - | - |
| cameraSwayAmount | number | `0.15` | - | - |
| marchSteps | number | `110` | - | - |
| maxDistance | number | `60` | - | - |
| stepMultiplier | number | `0.7` | - | - |
| colorTimeSpeed | number | `1.5` | - | - |
| colorZFreq | number | `0.4` | - | - |
| colorXYFreq | number | `0.5` | - | - |
| coreLightZOffset | number | `25` | - | - |
| coreLightAttenuation | number | `0.15` | - | - |
| coreLightIntensity | number | `3.5` | - | - |
| camLightIntensity | number | `0.5` | - | - |
| ambientStrength | number | `0.25` | - | - |
| pulseSpeed | number | `4` | 0 ~ 10 | 0.1 |
| pulseZFreq | number | `1.5` | - | - |
| pulsePower | number | `6` | - | - |
| pulseIntensity | number | `2` | - | - |
| fogDistanceScale | number | `0.003` | - | - |
| colorA | color | `"#190000"` | - | - |
| colorB | color | `"#FF1A99"` | - | - |
| colorC | color | `"#0099FF"` | - | - |
| coreLightColor | color | `"#FF00B3"` | - | - |
| camLightColor | color | `"#1A4DCC"` | - | - |
| pulseColor | color | `"#33B3FF"` | - | - |
| colorBack | color | `"#03000D"` | - | - |
| renderScale | number | `0.6` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## membranes

Membranes. 조회: `node scripts/generate-cover.mjs --describe membranes`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.05 |
| cameraOrbitAmp | number | `0.8` | - | - |
| cameraOrbitFreqX | number | `0.2` | - | - |
| cameraOrbitFreqY | number | `0.15` | - | - |
| lookAheadAmp | number | `0.4` | - | - |
| lookAheadFreq | number | `0.1` | - | - |
| lookAheadDistance | number | `4` | - | - |
| fov | number | `1.2` | 0.4 ~ 2.5 | 0.01 |
| spiralAmount | number | `0.15` | - | - |
| warpAmpX | number | `0.5` | - | - |
| warpFreqX | number | `0.8` | - | - |
| warpTimeX | number | `0.3` | - | - |
| warpAmpY | number | `0.5` | - | - |
| warpFreqY | number | `0.9` | - | - |
| warpTimeY | number | `0.2` | - | - |
| gyroidScale | number | `1.3` | 0.2 ~ 5 | 0.05 |
| ridgeFrequency | number | `5` | - | - |
| ridgeZFrequency | number | `6` | - | - |
| baseRadius | number | `0.18` | - | - |
| ridgeAmplitude | number | `0.06` | - | - |
| distanceScale | number | `0.35` | - | - |
| marchSteps | number | `90` | - | - |
| maxDepth | number | `25` | - | - |
| stepMinMultiplier | number | `0.8` | - | - |
| stepMinFloor | number | `0.015` | - | - |
| coreThreshold | number | `0.25` | - | - |
| mistIntensity | number | `0.15` | - | - |
| coreIntensity | number | `3.5` | - | - |
| pulseSpeed | number | `6` | 0 ~ 15 | 0.1 |
| pulseZFreq | number | `2.5` | - | - |
| pulseAngleFreq | number | `2` | - | - |
| mix1ZFreq | number | `0.4` | - | - |
| mix2Freq | number | `0.5` | - | - |
| densityFade | number | `0.12` | - | - |
| colorBack | color | `"#000000"` | - | - |
| colors | colors | `["#000067","#00CCFF","#009900","#7F00FF"]` | 1-4개 | - |
| renderScale | number | `0.46` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## quantumCore

Quantum Core. 조회: `node scripts/generate-cover.mjs --describe quantumCore`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.01 |
| travelRate | number | `0.26` | -2 ~ 2 | 0.001 |
| mirrorSpeed | number | `0.07` | 0 ~ 1 | 0.001 |
| cameraFadeNear | number | `0.4` | 0 ~ 2 | 0.01 |
| cameraFadeFar | number | `2` | 0.44 ~ 10 | 0.01 |
| startDepth | number | `2.1` | 0.01 ~ 10 | 0.01 |
| traceFactor | number | `0.2` | 0.001 ~ 1 | 0.001 |
| primaryPeriod | number | `15.2` | 0.1 ~ 40 | 0.01 |
| primaryOffset | number | `9.9` | -20 ~ 20 | 0.01 |
| secondaryPeriod | number | `6.7` | 0.1 ~ 30 | 0.01 |
| secondaryOffset | number | `5.1` | -15 ~ 15 | 0.01 |
| detailScale | number | `22` | 0.1 ~ 60 | 0.1 |
| detailAmount | number | `1.5` | 0.05 ~ 6 | 0.01 |
| verticalOffset | number | `12.9` | -30 ~ 30 | 0.01 |
| angularPeriod | number | `0.628` | 0.05 ~ 2 | 0.001 |
| angularHalfPeriod | number | `0.314` | 0 ~ 1 | 0.001 |
| mirrorPhaseX | number | `0.063` | -3.2 ~ 3.2 | 0.001 |
| mirrorPhaseY | number | `0.212` | -3.2 ~ 3.2 | 0.001 |
| mirrorPhaseZ | number | `1.046` | -3.2 ~ 3.2 | 0.001 |
| spectralPhaseR | number | `0.9` | -6.283 ~ 6.283 | 0.001 |
| spectralPhaseG | number | `2.8` | -6.283 ~ 6.283 | 0.001 |
| spectralPhaseB | number | `5.2` | -6.283 ~ 6.283 | 0.001 |
| lightIntensity | number | `3` | 0 ~ 10 | 0.01 |
| outputScale | number | `1000` | 50 ~ 3000 | 1 |
| traceSteps | number | `54` | 1 ~ 128 | 1 |
| foldSteps | number | `3` | 0 ~ 8 | 1 |
| colorLight | color | `"#8CA6FF"` | - | - |
| renderScale | number | `0.6` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## neonKaleidoscope

Neon Kaleidoscope. 조회: `node scripts/generate-cover.mjs --describe neonKaleidoscope`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.01 |
| iterationCount | number | `10` | 1 ~ 12 | 1 |
| cellScale | number | `1.16` | 0.5 ~ 3 | 0.01 |
| formRadius | number | `0.69` | 0.1 ~ 2 | 0.01 |
| formAngularity | number | `1` | 0 ~ 1 | 0.01 |
| cornerWeight | number | `0.45` | 0.1 ~ 1 | 0.01 |
| facetCount | number | `6` | 3 ~ 56 | 1 |
| facetSmoothness | number | `1` | 0 ~ 1 | 0.01 |
| facetSpin | number | `0` | -1 ~ 1 | 0.01 |
| colorRate | number | `0.5` | - | - |
| phaseRate | number | `1` | 0 ~ 3 | 0.01 |
| layerShift | number | `0.5` | 0 ~ 2 | 0.01 |
| bandFrequency | number | `36.1` | 1 ~ 60 | 0.1 |
| bandDivisor | number | `3.41` | 0.5 ~ 15 | 0.01 |
| lightWidth | number | `0.02` | 0.001 ~ 0.1 | 0.001 |
| lightPower | number | `1.5` | 0.1 ~ 4 | 0.01 |
| baseColor | color | `"#3D5DFF"` | - | - |
| renderScale | number | `1` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## sparkTunnel

Spark Tunnel. 조회: `node scripts/generate-cover.mjs --describe sparkTunnel`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.01 |
| facetCount | number | `6` | 3 ~ 24 | 1 |
| tunnelRadius | number | `1` | 0.3 ~ 4 | 0.05 |
| bounces | number | `3` | 1 ~ 8 | 1 |
| alphaFalloff | number | `0.7` | 0.1 ~ 0.95 | 0.01 |
| gridScale | number | `7` | 1 ~ 20 | 0.1 |
| densityThreshold | number | `0.43` | 0 ~ 1 | 0.01 |
| sphereMinRadius | number | `0.1` | 0.01 ~ 0.5 | 0.01 |
| sphereMaxRadius | number | `0.3` | 0.05 ~ 0.6 | 0.01 |
| glowIntensity | number | `0.93` | 0 ~ 3 | 0.01 |
| glowFalloff | number | `10` | 1 ~ 40 | 0.5 |
| brightnessMultiplier | number | `5` | 0.5 ~ 12 | 0.1 |
| fogStrength | number | `2.35` | 0 ~ 6 | 0.05 |
| fogFalloff | number | `3.105` | 0.1 ~ 10 | 0.05 |
| colorPaletteScale | number | `0.5` | 0 ~ 2 | 0.01 |
| colorPaletteOffset | number | `0.3` | 0 ~ 1 | 0.01 |
| colors | colors | `["#FF3355","#33CCFF","#66FF88","#FF33BB","#33FFCC","#66FF33","#6633FF","#CC33FF","#FF6633"]` | 1-9개 | - |
| colorCount | number | `4` | 1 ~ 9 | 1 |
| renderScale | number | `1` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## whirlpool

Whirlpool. 조회: `node scripts/generate-cover.mjs --describe whirlpool`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.01 |
| spiralSpeed | number | `0.5` | 0 ~ 3 | 0.01 |
| marchSteps | number | `110` | 20 ~ 220 | 1 |
| seriesStart | number | `4` | 1 ~ 20 | 0.5 |
| seriesMax | number | `200` | 20 ~ 400 | 1 |
| stepScale | number | `0.09` | 0.01 ~ 0.5 | 0.005 |
| densityExponent | number | `400` | 50 ~ 800 | 5 |
| densityScale | number | `0.025` | 0.005 ~ 0.1 | 0.001 |
| colorIntensity | number | `0.036` | 0.001 ~ 0.1 | 0.001 |
| cameraOffsetX | number | `0.25` | -1 ~ 1 | 0.01 |
| cameraOffsetY | number | `1.5` | -3 ~ 3 | 0.01 |
| colorTint | color | `"#00a2fa"` | - | - |
| renderScale | number | `0.44` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## containerFlow

Container Flow. 조회: `node scripts/generate-cover.mjs --describe containerFlow`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.01 |
| cameraForwardSpeed | number | `0.3` | 0 ~ 2 | 0.01 |
| pathSwayAmpX | number | `0.2` | 0 ~ 2 | 0.01 |
| pathSwayAmpY | number | `0.5` | 0 ~ 2 | 0.01 |
| pathSwayFreq | number | `1` | 0 ~ 3 | 0.01 |
| rotationSpeed | number | `1.5` | 0 ~ 3 | 0.01 |
| latticeThickness | number | `0.05` | 0.01 ~ 0.3 | 0.005 |
| voxelResolution | number | `35` | 5 ~ 80 | 1 |
| marchSteps | number | `70` | 20 ~ 150 | 1 |
| stepScale | number | `0.15` | 0.01 ~ 0.5 | 0.005 |
| colorZFreq | number | `3.1` | 0 ~ 8 | 0.05 |
| colorTimeSpeed | number | `1` | 0 ~ 5 | 0.05 |
| densityScale | number | `5.8` | 0.5 ~ 20 | 0.1 |
| densityBoost | number | `0.5` | 0.05 ~ 3 | 0.01 |
| toneMapDivisor | number | `3500` | 500 ~ 30000 | 100 |
| colors | colors | `["#00A2FA","#D500FA","#FA5800","#25FA00","#FA0058","#00FAD5","#7A00FA","#FA0025","#00FA88","#FAAF00"]` | 1-10개 | - |
| colorCount | number | `6` | 1 ~ 10 | 1 |
| renderScale | number | `0.56` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## mandelbrot

Mandelbrot. 조회: `node scripts/generate-cover.mjs --describe mandelbrot`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `1` | 0 ~ 3 | 0.01 |
| zoomSpeed | number | `0.005` | 0 ~ 0.05 | 0.0005 |
| zoomBase | number | `0.0001` | 0.00001 ~ 0.05 | 0.00001 |
| zoomAmplitude | number | `0.0099` | 0 ~ 0.05 | 0.0005 |
| zoomCenterX | number | `-0.742` | -2 ~ 1 | 0.001 |
| zoomCenterY | number | `0.186` | -1.5 ~ 1.5 | 0.001 |
| rotationSpeed | number | `0.05` | 0 ~ 0.3 | 0.001 |
| maxIterations | number | `512` | 16 ~ 1024 | 1 |
| escapeRadius | number | `256` | 2 ~ 1000 | 1 |
| waveFreqA | number | `3.2` | 0 ~ 20 | 0.1 |
| waveFreqB | number | `7.2` | 0 ~ 20 | 0.1 |
| waveTimeSpeedA | number | `0.08` | 0 ~ 1 | 0.005 |
| waveTimeSpeedB | number | `0.03` | 0 ~ 1 | 0.005 |
| waveSharpness | number | `200` | 1 ~ 800 | 1 |
| firstColor | color | `"#000000"` | - | - |
| secondColor | color | `"#29D8D5"` | - | - |
| renderScale | number | `0.6` | 0.1 ~ 1 | 0.05 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## neuralGlass

Neural Glass. 조회: `node scripts/generate-cover.mjs --describe neuralGlass`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| cameraSpeed | number | `0.1` | 0 ~ 1 | 0.01 |
| pathAmpY | number | `0.57` | 0 ~ 2 | 0.01 |
| pathFreqX | number | `1` | 0 ~ 3 | 0.01 |
| pathFreqZ | number | `1` | 0 ~ 3 | 0.01 |
| pathTimeFreq | number | `0.1` | 0 ~ 1 | 0.01 |
| rot3Base | number | `0.85` | -3.14 ~ 3.14 | 0.01 |
| rot3Offset | number | `0` | -3.14 ~ 3.14 | 0.01 |
| rot4Base | number | `1.25` | -3.14 ~ 3.14 | 0.01 |
| rot4Offset | number | `0` | -3.14 ~ 3.14 | 0.01 |
| offset2X | number | `1` | -4 ~ 4 | 0.05 |
| offset2Y | number | `2` | -4 ~ 4 | 0.05 |
| offset2Z | number | `1.5` | -4 ~ 4 | 0.05 |
| cellSizeX | number | `4` | 1 ~ 10 | 0.1 |
| cellSizeY | number | `2` | 1 ~ 10 | 0.1 |
| cellSizeZ | number | `2` | 1 ~ 10 | 0.1 |
| cell2X | number | `4` | 1 ~ 10 | 0.1 |
| cell2Y | number | `4` | 1 ~ 10 | 0.1 |
| cell2Z | number | `2` | 1 ~ 10 | 0.1 |
| thickness1 | number | `0.1` | 0.01 ~ 0.5 | 0.005 |
| thickness2 | number | `0.15` | 0.01 ~ 0.5 | 0.005 |
| thickness3 | number | `0.2` | 0.01 ~ 0.5 | 0.005 |
| blendSmooth1 | number | `0.13` | 0.01 ~ 0.5 | 0.005 |
| blendSmooth2 | number | `0.13` | 0.01 ~ 0.5 | 0.005 |
| lightSpeed | number | `1` | 0 ~ 3 | 0.01 |
| specPower | number | `40` | 1 ~ 200 | 1 |
| glassFade | number | `0.06` | 0.01 ~ 1 | 0.005 |
| ior | number | `0.88` | 0.3 ~ 2 | 0.01 |
| volPower | number | `0.5` | 0.1 ~ 2 | 0.01 |
| volScale | number | `0.0007` | 0.0001 ~ 0.01 | 0.0001 |
| fogDensity | number | `0.00954` | 0 ~ 0.05 | 0.0005 |
| maxDist | number | `50` | - | - |
| marchSteps | number | `35` | 10 ~ 80 | 1 |
| fov | number | `1.5` | 0.5 ~ 4 | 0.05 |
| cameraPosX | number | `2.8` | -10 ~ 10 | 0.1 |
| cameraPosY | number | `0.2` | -10 ~ 10 | 0.1 |
| cameraPosZ | number | `2` | -10 ~ 10 | 0.1 |
| colorLightcol1 | color | `"#FFF2D9"` | - | - |
| colorLightcol2 | color | `"#D9F2FF"` | - | - |
| colors | colors | `["#11B3E1","#1D4AE0","#3A9AEB","#3B82F6"]` | 1-4개 | - |
| colorCount | number | `3` | 1 ~ 4 | 1 |
| renderScale | number | `0.36` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## blobbyWorld

Blobby World. 조회: `node scripts/generate-cover.mjs --describe blobbyWorld`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `2` | 0 ~ 5 | 0.05 |
| cellSize | number | `8` | 2 ~ 20 | 0.5 |
| rotSpeedA | number | `0.15` | 0 ~ 1 | 0.01 |
| rotZInfluence | number | `0.1` | 0 ~ 1 | 0.01 |
| rotSpeedB | number | `0.1` | 0 ~ 1 | 0.01 |
| blobRadius | number | `1.2` | 0.2 ~ 4 | 0.05 |
| fluidFreq | number | `1.5` | 0 ~ 5 | 0.05 |
| fluidTimeX | number | `1` | 0 ~ 3 | 0.05 |
| fluidTimeY | number | `0.8` | 0 ~ 3 | 0.05 |
| fluidTimeZ | number | `1.2` | 0 ~ 3 | 0.05 |
| fluidAmount | number | `0.6` | 0 ~ 2 | 0.01 |
| fieldScale | number | `0.6` | 0.1 ~ 2 | 0.01 |
| cameraDistX | number | `4` | 0 ~ 15 | 0.1 |
| cameraDistY | number | `4` | 0 ~ 15 | 0.1 |
| cameraSwayAmpX | number | `1.5` | 0 ~ 5 | 0.05 |
| cameraSwayAmpY | number | `1.5` | 0 ~ 5 | 0.05 |
| cameraSwayFreqX | number | `0.4` | 0 ~ 2 | 0.01 |
| cameraSwayFreqY | number | `0.3` | 0 ~ 2 | 0.01 |
| rayRotAmpA | number | `0.4` | 0 ~ 1 | 0.01 |
| rayRotFreqA | number | `0.2` | 0 ~ 2 | 0.01 |
| rayRotAmpB | number | `0.3` | 0 ~ 1 | 0.01 |
| rayRotFreqB | number | `0.15` | 0 ~ 2 | 0.01 |
| glowNumerator | number | `0.01` | 0.001 ~ 0.05 | 0.001 |
| glowEpsilon | number | `0.02` | 0.001 ~ 0.2 | 0.001 |
| maxSteps | number | `100` | 20 ~ 200 | 1 |
| maxDist | number | `50` | 10 ~ 150 | 1 |
| surfDist | number | `0.01` | 0.001 ~ 0.05 | 0.001 |
| colorIntensity | number | `0.11` | 0.01 ~ 0.5 | 0.005 |
| oscTimeFreq1 | number | `1.2` | -3 ~ 3 | 0.05 |
| oscDistFreq1 | number | `0.5` | -2 ~ 2 | 0.05 |
| oscPhase1 | number | `0` | -6.28 ~ 6.28 | 0.05 |
| oscTimeFreq2 | number | `1.5` | -3 ~ 3 | 0.05 |
| oscDistFreq2 | number | `-0.4` | -2 ~ 2 | 0.05 |
| oscPhase2 | number | `2` | -6.28 ~ 6.28 | 0.05 |
| oscTimeFreq3 | number | `0.8` | -3 ~ 3 | 0.05 |
| oscDistFreq3 | number | `0.6` | -2 ~ 2 | 0.05 |
| oscPhase3 | number | `4` | -6.28 ~ 6.28 | 0.05 |
| fogDensity | number | `0.03` | 0 ~ 0.2 | 0.001 |
| exposure | number | `1.4` | 0.1 ~ 4 | 0.01 |
| saturationBoost | number | `1.5` | 0 ~ 3 | 0.05 |
| firstColor | color | `"#00E6FF"` | - | - |
| secondColor | color | `"#FF1AE6"` | - | - |
| thirdColor | color | `"#1AFF66"` | - | - |
| renderScale | number | `0.6` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |

## spaceThreads

Space Threads. 조회: `node scripts/generate-cover.mjs --describe spaceThreads`.

| 파라미터 | 타입 | 기본값 | 범위 | step |
| --- | --- | --- | --- | --- |
| enabled | boolean | `true` | - | - |
| opacity | number | `1` | 0 ~ 1 | 0.01 |
| transform.translateX | number | `0` | -200 ~ 200 | 0.1 |
| transform.translateY | number | `0` | -200 ~ 200 | 0.1 |
| transform.rotation | number | `0` | -360 ~ 360 | 0.1 |
| transform.scale | number | `1` | 0.1 ~ 10 | 0.1 |
| speed | number | `0.5` | 0 ~ 2 | 0.01 |
| pathFreqY | number | `3` | 0 ~ 8 | 0.05 |
| pathTimeY | number | `2` | 0 ~ 5 | 0.05 |
| pathAmpY | number | `0.05` | 0 ~ 0.5 | 0.005 |
| pathFreqX | number | `1` | 0 ~ 8 | 0.05 |
| pathTimeX | number | `1` | 0 ~ 5 | 0.05 |
| pathAmpX | number | `0.05` | 0 ~ 0.5 | 0.005 |
| cellSize | number | `2` | 0.5 ~ 6 | 0.05 |
| threadThickness | number | `0.1` | 0.01 ~ 0.5 | 0.005 |
| voxelResolution | number | `25` | 5 ~ 80 | 1 |
| marchSteps | number | `60` | 10 ~ 120 | 1 |
| stepScale | number | `0.45` | 0.05 ~ 1 | 0.01 |
| reflectCellSize | number | `2` | 0.5 ~ 6 | 0.05 |
| cylinderRadius | number | `0.2` | 0.01 ~ 1 | 0.01 |
| cylinderEpsilon | number | `0.021` | 0.001 ~ 0.2 | 0.001 |
| colorFreqScale | number | `3.6` | 0 ~ 10 | 0.1 |
| colorTimeSpeed | number | `0.35` | 0 ~ 2 | 0.01 |
| colorFloor | number | `0.05` | 0.005 ~ 0.5 | 0.005 |
| phaseG | number | `4.42` | -6.28 ~ 6.28 | 0.05 |
| phaseB | number | `1.4` | -6.28 ~ 6.28 | 0.05 |
| toneMapDivisor | number | `2000` | 200 ~ 20000 | 50 |
| fov | number | `1.5` | 0.5 ~ 4 | 0.05 |
| colorTint | color | `"#FFFFFF"` | - | - |
| renderScale | number | `0.6` | 0.1 ~ 1 | 0.01 |
| hue | number | `0` | 0 ~ 360 | 1 |
| saturation | number | `1` | 0 ~ 2 | 0.01 |
