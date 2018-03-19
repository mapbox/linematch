## linematch

[![Build Status](https://travis-ci.org/mapbox/linematch.svg?branch=master)](https://travis-ci.org/mapbox/linematch)
[![Coverage Status](https://coveralls.io/repos/mapbox/linematch/badge.svg?branch=master&service=github)](https://coveralls.io/github/mapbox/linematch?branch=master)

A super-fast algorithm for matching two sets of polylines and showing the difference.
Primarily used for comparing road networks from different datasets.

Given arrays `a` and `b`, like `linematch(a, b, 0.001)`, linematch will return a new
array that contains all segments in `a` that are not matched with segments in `b`.
If the arrays match exactly, the returned value will be an empty array, `[]`.

```js
// given two arrays of linestrings and a threshold value,
// outputs a difference as an array of linestrings
var result = linematch(lines1, lines2, 0.0001);
```
