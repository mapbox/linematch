'use strict';

const test = require('tape').test;

const linematch = require('../');

const lines1 = require('./fixtures/tiger1');
const lines2 = require('./fixtures/osm1');
const diff = require('./fixtures/diff1');

test('sample linematch', (t) => {
    const result = linematch(lines1, lines2, 0.0001);
    t.same(result, diff);
    t.deepEqual(linematch(lines1, lines1, 0.0001), []);
    t.end();
});
