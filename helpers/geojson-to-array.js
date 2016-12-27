'use strict';

module.exports = geojsonToArray;

function geojsonToArray(jsonData) {
    var arrays = [];
    jsonData.features.forEach(function (feature) {
        arrays.push(feature.geometry.coordinates);
    });
    return arrays;
}
