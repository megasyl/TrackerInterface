const createMarker = (image) => window.google ? new window.google.maps.MarkerImage(image) : null;
const createPoint = () => new window.google.maps.MarkerImage(require(`./point.png`), new window.google.maps.Size(15, 15),
    null,
    new window.google.maps.Point(8, 8),);

module.exports = {
    START: require(`./start.png`),
    STOP: require(`./stop.png`),
    GREEN: require(`./green.png`),
    createPoint,
    createMarker
};
