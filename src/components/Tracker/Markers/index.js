const L = require('leaflet');
module.exports = {
    POINT_ICON: L.icon({ //add this new icon
        iconUrl: 'pint.png',
        shadowUrl: '',

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    }),
    BLUE_MARKER_ICON: L.icon({ //add this new icon
        iconUrl: require('./blue.png'),
        iconSize:     [25, 41],
    }),
    GREEN_MARKER_ICON: L.icon({ //add this new icon
        iconUrl: require('./green.png'),
        iconSize:     [25, 41],
    }),
    RED_MARKER_ICON: L.icon({ //add this new icon
        iconUrl: require('./red.png'),
        iconSize:     [25, 41],
    })
};
