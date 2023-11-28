'use strict';

const linematch = require('../');

const lines1 = require('./fixtures/tiger1');
const lines2 = require('./fixtures/osm1');
// const result = require('./fixtures/diff1.json');

console.time('match');
for (let i = 0; i < 1000; i++) linematch(lines1, lines2, 0.0001);
console.timeEnd('match');

// console.log(JSON.stringify(result));

// const geojson = {
//     type: 'FeatureCollection',
//     features: [
//         lineString(lines2, 'blue'),
//         lineString(result, 'red')
//     ]
// };

// console.log(JSON.stringify(geojson));

// function lineString(lines, color) {
//     return {
//         type: 'Feature',
//         geometry: {
//             type: 'MultiLineString',
//             coordinates: lines
//         },
//         properties: {
//             stroke: color
//         }
//     };
// }
