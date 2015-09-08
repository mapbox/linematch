'use strict';

var rbush = require('rbush');
var matchSegment = require('./segment');

module.exports = linematch;

function linematch(lines1, lines2, threshold) {
    var segments = linesToSegments(lines1);
    var tree = indexLines(lines2, threshold);
    // var other = linesToSegments(lines2);
    var rest = [];

    while (segments.length) {
        var seg = segments.pop(),
            other = tree.search(segmentBBox(seg, threshold)),
            modified = false;

        for (var j = 0; j < other.length; j++) {
            if (matchSegment(seg, other[j][4], threshold, segments)) {
                modified = true;
                break;
            }
        }

        if (!modified) rest.push(seg);
    }

    return rest;
}

function indexLines(lines, r) {
    var segments = linesToSegments(lines),
        bboxes = [];

    for (var i = 0; i < segments.length; i++) {
        bboxes.push(segmentBBox(segments[i], r));
    }
    return rbush().load(bboxes);
}

function segmentBBox(seg, r) {
    var a = seg[0],
        b = seg[1];
    return [
        Math.min(a[0], b[0]) - r, // minX
        Math.min(a[1], b[1]) - r, // minY
        Math.max(a[0], b[0]) + r, // maxX
        Math.max(a[1], b[1]) + r, // maxY
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
