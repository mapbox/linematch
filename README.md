## linematch

[![Build Status](https://travis-ci.org/mapbox/linematch.svg?branch=master)](https://travis-ci.org/mapbox/linematch)
[![Coverage Status](https://coveralls.io/repos/mapbox/linematch/badge.svg?branch=master&service=github)](https://coveralls.io/github/mapbox/linematch?branch=master)

A super-fast algorithm for matching two sets of polylines and showing the difference.
Primarily used for comparing road networks from different datasets.

```js
// given two arrays of linestrings and a threshold value,
// outputs a difference as an array of linestrings
var result = linematch(lines1, lines2, 0.0001);
```

### Changelog

#### 1.0.2 (Sep 15, 2015)

- Rejoin adjacent segments in the output.

#### 1.0.1 (Sep 8, 2015)

- Minor performance improvement.

#### 1.0.0 (Sep 8, 2015)

- Initial release.
