'use strict';

module.exports = matchSegment;

// subtract segment [c, d] from [a, b] within threshold r

function matchSegment(seg1, seg2, r, result) {
    var a = seg1[0],
        b = seg1[1],
        c = seg2[0],
        d = seg2[1],
        len = result.length;

    var ap = closePoint(a, c, d, r),
        bp = closePoint(b, c, d, r);

    //     a----b
    // c---ap---bp---d
    if (ap !== null && bp !== null) return true; // fully covered

    var cp = closePoint(c, a, b, r),
        dp = closePoint(d, a, b, r);

    if (cp !== null && cp === dp) return false; // degenerate case, no overlap

    if (cp !== null && dp !== null) {
        var cpp = segPoint(a, b, cp);
        var dpp = segPoint(a, b, dp);

        if (equals(cpp, dpp)) return false; // degenerate case

        // a---cp---dp---b
        //     c----d
        if (cp < dp) {
            if (!equals(a, cpp)) result.push([a, cpp]);
            if (!equals(dpp, b)) result.push([dpp, b]);

        // a---dp---cp---b
        //     d----c
        } else {
            if (!equals(a, dpp)) result.push([a, dpp]);
            if (!equals(cpp, b)) result.push([cpp, b]);
        }

    // a---cp---b
    //     c----bp---d
    } else if (bp !== null && cp !== null) {
        var cpp = segPoint(a, b, cp);
        if (!equals(cpp, b)) result.push([a, cpp]);

    // a---dp---b
    //     d----bp---c
    } else if (bp !== null && dp !== null) {
        var dpp = segPoint(a, b, dp);
        if (!equals(dpp, b)) result.push([a, dpp]);

    //     a----dp---b
    // c---ap---d
    } else if (ap !== null && dp !== null) {
        var dpp = segPoint(a, b, dp);
        if (!equals(a, dpp)) result.push([dpp, b]);

    //     a----cp---b
    // d---ap---c
    } else if (ap !== null && cp !== null) {
        var cpp = segPoint(a, b, cp);
        if (!equals(a, cpp)) result.push([cpp, b]);
    }

    return result.length !== len; // segment processed
}

// find a closest point from a given point p to a segment [a, b]
// if it's within given square distance r

function segPoint(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t,
            a[1] + (b[1] - a[1]) * t];
}

function closePoint(p, a, b, r) {

    var x = a[0],
        y = a[1],
        dx = b[0] - x,
        dy = b[1] - y;

    if (dx !== 0 || dy !== 0) {

        var t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);

        if (t >= 1) {
            x = b[0];
            y = b[1];
            t = 1;

        } else if (t > 0) {
            x += dx * t;
            y += dy * t;

        } else {
            t = 0;
        }
    }

    dx = p[0] - x;
    dy = p[1] - y;

    return dx * dx + dy * dy < r * r ? t : null;
}

function equals(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}
