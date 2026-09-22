const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mix = (a, b, t) => a + (b - a) * t;
// Cosmic City geometry adapted from pinned Merucav; source credits in NOTICE.md.
const WORLD_LENGTH = 430, WORLD_HALF = 215, TAU = Math.PI * 2, SIDEWALK_CENTER_OFFSET = 1.7, SIDEWALK_WIDTH = 2.8, BUILDING_GAP = 2.1;
export function cityGeometry(params) {
    function getPathX(z, curveAmount) {
        const phase = (z / WORLD_LENGTH) * TAU;
        return (Math.sin(phase * 2.0) * 0.72 + Math.sin(phase * 5.0 + 1.8) * 0.22 + Math.sin(phase - 0.7) * 0.35) * curveAmount;
    }
    function getPathY(z) {
        const phase = (z / WORLD_LENGTH) * TAU;
        return Math.sin(phase * 2.0 + 0.8) * 0.48;
    }
    function mulberry32(seed) {
        return function () {
            let t = (seed += 0x6D2B79F5);
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }
    function addBoxEdges(target, centerX, baseY, centerZ, sizeX, sizeY, sizeZ, seed) {
        const x0 = centerX - sizeX * 0.5, x1 = centerX + sizeX * 0.5;
        const y0 = baseY, y1 = baseY + sizeY;
        const z0 = centerZ - sizeZ * 0.5, z1 = centerZ + sizeZ * 0.5;
        const corners = [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]];
        const indices = [4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7];
        for (let index = 0; index < indices.length; index += 2) {
            const pointA = corners[indices[index]];
            const pointB = corners[indices[index + 1]];
            const segmentCenterZ = (pointA[2] + pointB[2]) * 0.5;
            target.positions.push(pointA[0], pointA[1], pointA[2], pointB[0], pointB[1], pointB[2]);
            target.seeds.push(seed, seed);
            target.centers.push(segmentCenterZ, segmentCenterZ);
        }
    }
    function sampleBoxSurface(random, target, centerX, baseY, centerZ, sizeX, sizeY, sizeZ, count, paletteBias) {
        const topArea = sizeX * sizeZ;
        const sideXArea = sizeY * sizeZ * 2.0;
        const sideZArea = sizeX * sizeY * 2.0;
        const totalArea = topArea + sideXArea + sideZArea;
        for (let index = 0; index < count; index += 1) {
            const face = random() * totalArea;
            let pointX, pointY, pointZ;
            let brightness = 0.48 + random() * 0.48;
            if (face < topArea) {
                pointX = centerX + (random() - 0.5) * sizeX;
                pointY = baseY + sizeY;
                pointZ = centerZ + (random() - 0.5) * sizeZ;
                brightness *= 1.08;
            }
            else if (face < topArea + sideXArea) {
                pointX = centerX + (random() < 0.5 ? -0.5 : 0.5) * sizeX;
                pointY = baseY + random() * sizeY;
                pointZ = centerZ + (random() - 0.5) * sizeZ;
            }
            else {
                pointX = centerX + (random() - 0.5) * sizeX;
                pointY = baseY + random() * sizeY;
                pointZ = centerZ + (random() < 0.5 ? -0.5 : 0.5) * sizeZ;
                brightness *= 1.12;
            }
            target.positions.push(pointX, pointY, pointZ);
            target.seeds.push(random());
            target.sizes.push(0.72 + random() * 0.92);
            target.brightness.push(brightness);
            target.palette.push(clamp(paletteBias + (random() - 0.5) * 0.34, 0, 1));
        }
    }
    function sampleDeck(random, target, centerX, y, width, zStart, zEnd, count, paletteBias) {
        for (let index = 0; index < count; index += 1) {
            const pointZ = mix(zStart, zEnd, random());
            const pointX = centerX + (random() - 0.5) * width;
            const ripple = Math.sin(pointZ * 0.19 + pointX * 0.41) * 0.08;
            target.positions.push(pointX, y + ripple, pointZ);
            target.seeds.push(random());
            target.sizes.push(0.62 + random() * 0.82);
            target.brightness.push(0.42 + random() * 0.5);
            target.palette.push(clamp(paletteBias + (random() - 0.5) * 0.28, 0, 1));
        }
    }
    function createCityGeometry() {
        const random = mulberry32(4293815);
        const densityScale = Math.max(0.1, params.buildingDensity);
        const corridorHalf = params.corridorWidth * 0.5;
        const sidewalkOuterDistance = corridorHalf + SIDEWALK_CENTER_OFFSET + SIDEWALK_WIDTH * 0.5;
        const pointData = { positions: [], seeds: [], sizes: [], brightness: [], palette: [] };
        const lineData = { positions: [], seeds: [], centers: [] };
        const baseY = -4.1;
        const blockStep = 5.2;
        const blockCount = Math.floor(WORLD_LENGTH / blockStep);
        for (let blockIndex = 0; blockIndex < blockCount; blockIndex += 1) {
            const centerZ = -WORLD_HALF + blockIndex * blockStep + (random() - 0.5) * 2.2;
            for (const side of [-1, 1]) {
                const layers = random() < 0.56 ? 2 : 3;
                for (let layer = 0; layer < layers; layer += 1) {
                    const sizeX = 3.5 + random() * 6.0;
                    const sizeZ = 3.2 + random() * 6.5;
                    const heightBias = layer === 0 ? 0.68 : 1.0;
                    const sizeY = (4.2 + Math.pow(random(), 0.62) * 19.0) * heightBias;
                    const facadeDistance = sidewalkOuterDistance + BUILDING_GAP + random() * 1.8 + layer * 7.3;
                    const centerDistance = facadeDistance + sizeX * 0.5;
                    const centerX = side * centerDistance;
                    const paletteBias = side < 0 ? 0.28 + random() * 0.28 : 0.46 + random() * 0.34;
                    const surfaceArea = sizeX * sizeZ + 2.0 * sizeY * (sizeX + sizeZ);
                    const pointCount = Math.max(95, Math.floor(surfaceArea * 0.72 * densityScale));
                    sampleBoxSurface(random, pointData, centerX, baseY, centerZ, sizeX, sizeY, sizeZ, pointCount, paletteBias);
                    if (random() < 0.77 || layer === 0) {
                        addBoxEdges(lineData, centerX, baseY, centerZ, sizeX, sizeY, sizeZ, random());
                    }
                }
            }
        }
        const sidewalkCount = Math.floor(41000 * densityScale);
        sampleDeck(random, pointData, -(corridorHalf + SIDEWALK_CENTER_OFFSET), -2.7, SIDEWALK_WIDTH, -WORLD_HALF, WORLD_HALF, sidewalkCount, 0.27);
        sampleDeck(random, pointData, corridorHalf + SIDEWALK_CENTER_OFFSET, -2.7, SIDEWALK_WIDTH, -WORLD_HALF, WORLD_HALF, sidewalkCount, 0.63);
        const edgeParticleCount = Math.floor(18000 * densityScale);
        for (let pointIndex = 0; pointIndex < edgeParticleCount; pointIndex += 1) {
            const pointZ = -WORLD_HALF + random() * WORLD_LENGTH;
            const side = random() < 0.5 ? -1 : 1;
            const sidewalkInner = corridorHalf + 0.25;
            const sidewalkOuter = sidewalkOuterDistance - 0.15;
            const distance = mix(sidewalkInner, sidewalkOuter, random());
            const pointX = side * distance;
            const pointY = -3.55 + Math.sin(pointZ * 0.08 + pointX) * 0.12;
            pointData.positions.push(pointX, pointY, pointZ);
            pointData.seeds.push(random());
            pointData.sizes.push(0.7 + random() * 0.65);
            pointData.brightness.push(0.58 + random() * 0.42);
            pointData.palette.push(side < 0 ? 0.28 + random() * 0.28 : 0.54 + random() * 0.28);
        }
        const verticalMistCount = Math.floor(14500 * densityScale);
        for (let pointIndex = 0; pointIndex < verticalMistCount; pointIndex += 1) {
            const pointZ = -WORLD_HALF + random() * WORLD_LENGTH;
            const side = random() < 0.5 ? -1 : 1;
            const pointX = side * (sidewalkOuterDistance + BUILDING_GAP + 1.0 + Math.pow(random(), 1.8) * 18.0);
            const pointY = baseY + Math.pow(random(), 0.92) * 23.0;
            pointData.positions.push(pointX, pointY, pointZ);
            pointData.seeds.push(random());
            pointData.sizes.push(0.52 + random() * 0.72);
            pointData.brightness.push(0.18 + random() * 0.32);
            pointData.palette.push(0.22 + random() * 0.66);
        }
        return { points: pointData, lines: lineData };
    }
    return createCityGeometry();
}
