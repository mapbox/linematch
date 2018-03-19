'use strict';

var linematch = require('../');

var lines1 = require('./fixtures/tiger1');
var lines2 = require('./fixtures/osm1');
var result = require('./fixtures/diff1.json');

console.time('match');
for (var i = 0; i < 1000; i++)
var result = linematch(lines1, lines2, 0.0001);
console.timeEnd('match');

// console.log(JSON.stringify(result));

var geojson = {
    type: 'FeatureCollection',
    features: [
        lineString(lines2, 'blue'),
        lineString(result, 'red')
    ]
};

// console.log(JSON.stringify(geojson));

function lineString(lines, color) {
    return {
        type: 'Feature',
        geometry: {
            type: 'MultiLineString',
            coordinates: lines
        },
        properties: {
            stroke: color
        }
    };
}
