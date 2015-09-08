## linematch

A super-fast algorithm for matching two sets of polylines and showing the difference.
Primarily used for comparing road networks from different datasets. Still a work in progress.

```js
// given two arrays of linestrings and a threshold value,
// outputs a difference as an array of linestrings
var result = linematch(lines1, lines2, 0.0001);
```
