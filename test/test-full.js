
import test from 'node:test';
import assert from 'node:assert/strict';

import linematch from '../index.js';

import lines1 from './fixtures/tiger1.json' with {type: 'json'};
import lines2 from './fixtures/osm1.json' with {type: 'json'};
import diff from './fixtures/diff1.json' with {type: 'json'};

test('sample linematch', () => {
    const result = linematch(lines1, lines2, 0.0001);
    assert.deepEqual(result, diff);
    assert.deepEqual(linematch(lines1, lines1, 0.0001), []);
});
