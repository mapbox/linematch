'use strict';

var test = require('tap').test;

var linematch = require('../');

var lines1 = require('./fixtures/tiger1');
var lines2 = require('./fixtures/osm1');
var diff = require('./fixtures/diff1');

test('sample linematch', function (t) {
    var result = linematch(lines1, lines2, 0.0001);
    t.same(result, diff);
    t.deepEqual(linematch(lines1, lines1, 0.0001), []);
    t.end();
});
