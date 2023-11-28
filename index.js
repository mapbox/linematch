'use strict';

const Flatbush = require('flatbush');

module.exports = linematch;
module.exports.default = linematch;

function linematch(lines1, lines2, threshold) {
    const segments = linesToSegments(lines1);
    const segments2 = linesToSegments(lines2);

    const index = new Flatbush(segments2.length / 4);

    for (let i = 0; i < segments2.length; i += 4) {
        index.add(
            Math.min(segments2[i + 0], segments2[i + 2]),
            Math.min(segments2[i + 1], segments2[i + 3]),
            Math.max(segments2[i + 0], segments2[i + 2]),
            Math.max(segments2[i + 1], segments2[i + 3])
        );
    }
    index.finish();

    const diff = [];
    let last;

    while (segments.length) {
        const by = segments.pop();
        const bx = segments.pop();
        const ay = segments.pop();
        const ax = segments.pop();

        const other = index.search(
            Math.min(ax, bx) - threshold, // minX
            Math.min(ay, by) - threshold, // minY
            Math.max(ax, bx) + threshold, // maxX
            Math.max(ay, by) + threshold  // maxY
        );
        let overlap = false;

        // loop through segments close to the current one, looking for matches;
        // if a match found, unmatched parts of the segment will be added to the queue
        for (let j = 0; j < other.length; j++) {
            const k = other[j] * 4;
            const matched = matchSegment(
                ax, ay, bx, by,
                segments2[k + 0], segments2[k + 1],
                segments2[k + 2], segments2[k + 3],
                threshold, segments
            );
            if (matched) {
                overlap = true;
                break;
            }
        }

        // if segment didn't match any other segments, add it to the diff
        if (!overlap) {
            // join segment with previous one if possible
            const p = last && last[last.length - 1];

            if (p && p[0] === ax && p[1] === ay) {
                last.push([bx, by]);

            } else {
                last = [[ax, ay], [bx, by]];
                diff.push(last);
            }
        }
    }

    return diff;
}

function linesToSegments(lines) {
    const segments = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        for (let j = line.length - 1; j > 0; j--) {
            const a = line[j - 1];
            const b = line[j];
            if (a[0] !== b[0] || a[1] !== b[1]) {
                addSegment(segments, a[0], a[1], b[0], b[1]);
            }
        }
    }

    return segments;
}

// subtract segment [c, d] from [a, b] within threshold r

function matchSegment(ax, ay, bx, by, cx, cy, dx, dy, r, result) {
    const len = result.length;

    const ap = closePoint(ax, ay, cx, cy, dx, dy, r);
    const bp = closePoint(bx, by, cx, cy, dx, dy, r);

    //     a----b
    // c---ap---bp---d
    if (ap !== null && bp !== null) return true; // fully covered

    const cp = closePoint(cx, cy, ax, ay, bx, by, r);
    const dp = closePoint(dx, dy, ax, ay, bx, by, r);

    if (cp !== null && cp === dp) return false; // degenerate case, no overlap

    let cpx, cpy, dpx, dpy;
    if (cp !== null) {
        cpx = interp(ax, bx, cp);
        cpy = interp(ay, by, cp);
    }
    if (dp !== null) {
        dpx = interp(ax, bx, dp);
        dpy = interp(ay, by, dp);
    }

    if (cp !== null && dp !== null) {

        if (cpx === dpx && cpy === dpy) return false; // degenerate case

        // a---cp---dp---b
        //     c----d
        if (cp < dp) {
            if (!equals(ax, ay, cpx, cpy)) addSegment(result, ax, ay, cpx, cpy);
            if (!equals(dpx, dpy, bx, by)) addSegment(result, dpx, dpy, bx, by);

        // a---dp---cp---b
        //     d----c
        } else {
            if (!equals(ax, ay, dpx, dpy)) addSegment(result, ax, ay, dpx, dpy);
            if (!equals(cpx, cpy, bx, by)) addSegment(result, cpx, cpy, bx, by);
        }

    } else if (cp !== null) {
        //     a----cp---b
        // d---ap---c
        if (ap !== null && !equals(ax, ay, cpx, cpy)) addSegment(result, cpx, cpy, bx, by);

        // a---cp---b
        //     c----bp---d
        else if (bp !== null && !equals(cpx, cpy, bx, by)) addSegment(result, ax, ay, cpx, cpy);

    } else if (dp !== null) {
        // a---dp---b
        //     d----bp---c
        if (bp !== null && !equals(dpx, dpy, bx, by)) addSegment(result, ax, ay, dpx, dpy);

        //     a----dp---b
        // c---ap---d
        else if (ap !== null && !equals(ax, ay, dpx, dpy)) addSegment(result, dpx, dpy, bx, by);
    }

    return result.length !== len; // segment processed
}

function addSegment(arr, ax, ay, bx, by) {
    arr.push(ax);
    arr.push(ay);
    arr.push(bx);
    arr.push(by);
}

function interp(a, b, t) {
    return a + (b - a) * t;
}

// find a closest point from a given point p to a segment [a, b]
// if it's within given square distance r

function closePoint(px, py, ax, ay, bx, by, r) {

    let x = ax,
        y = ay,
        dx = bx - x,
        dy = by - y,
        t = 0;

    if (dx !== 0 || dy !== 0) {

        t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);

        if (t >= 1) {
            x = bx;
            y = by;
            t = 1;

        } else if (t > 0) {
            x += dx * t;
            y += dy * t;

        } else {
            t = 0;
        }
    }

    dx = px - x;
    dy = py - y;

    return dx * dx + dy * dy < r * r ? t : null;
}

function equals(ax, ay, bx, by) {
    const dx = Math.abs(ax - bx);
    const dy = Math.abs(ay - by);
    return dx < 1e-12 && dy < 1e-12;
}
