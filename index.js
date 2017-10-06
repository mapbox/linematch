'use strict';

var rbush = require('rbush');
var matchSegment = require('./segment');

module.exports = linematch;
module.exports.default = linematch;

function linematch(lines1, lines2, threshold) {
    var segments = linesToSegments(lines1),
        tree = indexLines(lines2),
        diff = [],
        last;

    while (segments.length) {
        var seg = segments.pop(),
            other = tree.search(segmentBBox(seg, threshold)),
            overlap = false;

        // loop through segments close to the current one, looking for matches;
        // if a match found, unmatched parts of the segment will be added to the queue
        for (var j = 0; j < other.length; j++) {
            if (matchSegment(seg, other[j][4], threshold, segments)) {
                overlap = true;
                break;
            }
        }

        // if segment didn't match any other segments, add it to the diff
        if (!overlap) {
            // join segment with previous one if possible
            if (last && last[last.length - 1] === seg[0]) {
                last.push(seg[1]);

            } else {
                last = seg;
                diff.push(seg);
            }
        }
    }

    return diff;
}

function indexLines(lines) {
    var segments = linesToSegments(lines),
        bboxes = [];

    for (var i = 0; i < segments.length; i++) {
        bboxes.push(segmentBBox(segments[i], 0));
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
        for (var j = lines[i].length - 1; j > 0; j--) {
            var a = lines[i][j - 1],
                b = lines[i][j];
            if (a[0] !== b[0] || a[1] !== b[1]) segments.push([a, b]);
        }
    }

    return segments;
}
