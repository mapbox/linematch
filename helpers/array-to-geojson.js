'use strict';

module.exports = arrayToGeojson;

function arrayToGeojson(arrays) {
    var features = [];
    arrays.forEach(function (array) {
        var feature = {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': array
            }
        };
        features.push(feature);
    });
    return {
        'type': 'FeatureCollection',
        'features': features
    };
}
