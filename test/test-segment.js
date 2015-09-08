'use strict';

var test = require('tap').test;

var matchSegment = require('../segment');

test('fully covered', function (t) {
    var rest = [];

    var result = matchSegment(
        [[0, 0], [10, 0]],
        [[-10, 0.2], [20, 0.7]],
        1, rest);

    t.equal(result, true);
    t.same(rest, []);

    t.end();
});

test('full match', function (t) {
    var rest = [];

    var result = matchSegment(
        [[0, 0], [10, 0]],
        [[0, 0.5], [10, 0.3]],
        1, rest);

    t.equal(result, true);
    t.same(rest, []);

    t.end();
});

test('full match backwards', function (t) {
    var rest = [];

    var result = matchSegment(
        [[0, 0], [10, 0]],
        [[10, 0.5], [0, 0.1]],
        1, rest);

    t.equal(result, true);
    t.same(rest, []);

    t.end();
});
