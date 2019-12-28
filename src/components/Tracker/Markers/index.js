const L = require('leaflet');

const getMarkerIcon = (color) => L.icon({ //add this new icon
    iconUrl: require(`./${color}.png`),
    iconSize:     [25, 41],
    iconAnchor:   [13, 41],// the same for the shadow
    popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
})

module.exports = {
    POINT_ICON: L.icon({ //add this new icon
        iconUrl: require('./point.png'),
        iconSize:     [10, 10], // size of the icon
    }),
    BLUE_MARKER_ICON: getMarkerIcon('blue'),
    GREEN_MARKER_ICON: getMarkerIcon('green'),
    RED_MARKER_ICON: getMarkerIcon('red'),
    YELLOW_MARKER_ICON: getMarkerIcon('yellow')
};
