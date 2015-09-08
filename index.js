'use strict';

var rbush = require('rbush');
var matchSegment = require('./segment');

module.exports = linematch;

function linematch(lines1, lines2, threshold) {
    var segments = linesToSegments(lines1);
    // var tree = rbush().load(linesToSegments(lines2).map(segmentBBox))
    var other = linesToSegments(lines2);
    var rest = [];

    while (segments.length) {
        var seg = segments.pop();

        // console.log(seg, segments.length);
        // var other = tree.search(segmentBBox(seg));

        var modified = false;

        for (var j = 0; j < other.length; j++) {
            var result = matchSegment(seg, other[j], threshold, segments);
            if (result) {
                modified = true;
                break;
            }
        }

        if (!modified) rest.push(seg);
    }

    return rest;
}

function segmentBBox(seg) {
    var a = seg[0],
        b = seg[1];
    return [
        Math.min(a[0], b[0]), // minX
        Math.min(a[1], b[1]), // minY
        Math.max(a[0], b[0]), // maxX
        Math.max(a[1], b[1]), // maxY
        seg
    ];
}

function linesToSegments(lines) {
    var segments = [];

    for (var i = 0; i < lines.length; i++) {
        for (var j = 0; j < lines[i].length - 1; j++) {
            var a = lines[i][j],
                b = lines[i][j + 1];
            if (a[0] !== b[0] || a[1] !== b[1]) segments.push([a, b]);
        }
    }

    return segments;
}
