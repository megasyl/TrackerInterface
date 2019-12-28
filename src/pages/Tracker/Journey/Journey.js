import React from 'react';
import Leaflet from 'leaflet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, Card, Form, InputGroup, Button, Table} from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import { loadRecords } from "../../../store/actions/records";
import { loadJourneys } from "../../../store/actions/journey";
import 'leaflet/dist/leaflet.css';
import Aux from "../../../hoc/_Aux";
import JourneyTableElement from '../../../components/Tracker/Journey/TableElement';
import { GREEN_MARKER_ICON, RED_MARKER_ICON, POINT_ICON } from '../../../components/Tracker/Markers';

Leaflet.Icon.Default.imagePath =
    '../node_modules/leaflet';

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});




class Journey extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.actions.loadRecords();
        this.props.actions.loadJourneys();
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        console.log('didupdate', this.props, prevProps)
    }

    render() {
        const journeys = this.props.journeys || [];
        const { selected } = this.props;
        let markers = [];
        const elements = journeys.map((journey, i) => {
            const isSelected = selected && selected.key === i;
            console.log('isSelected ? ', selected ? selected.key: "null", i, isSelected)
            return (<JourneyTableElement key={i} isSelected={isSelected} journey={{...journey, key:i}}/>);
        });
        let line = null;
        if (selected) {
            line = (<Polyline key="journeyLine" positions={selected.interpolatedPoints.map(({location}) => [location.latitude, location.longitude])}/>);
            const departureRecord = selected.records[0];
            const arrivalRecord = selected.records[selected.records.length - 1];
            selected.snappedPoints.forEach(snappedPoint => {
                markers.push(<Marker icon={POINT_ICON} key={snappedPoint.originalIndex} position={[snappedPoint.location.latitude, snappedPoint.location.longitude]}>
                    <Popup>{selected.records[snappedPoint.originalIndex].timestamp}</Popup>
                </Marker>);
            });
            markers.push((<Marker icon={GREEN_MARKER_ICON} key="journeyDeparture" position={[departureRecord.latitude, departureRecord.longitude]}>
                <Popup>{selected.beginAddress}</Popup>
            </Marker>));
            markers.push((<Marker icon={RED_MARKER_ICON} key="journeyArrival" position={[arrivalRecord.latitude, arrivalRecord.longitude]}>
                <Popup>{selected.endAddress}</Popup>
            </Marker>));

        }

        return (
            <Aux>
                    <Map style={{height: "400px"}} center={[48.86, 2.34]} zoom={10}>
                        <TileLayer
                            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        />
                        {line}
                        {markers}
                    </Map>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Trajets</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table responsive>
                            <tbody>
                            {elements}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Aux>
        );
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ loadRecords, loadJourneys }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Journey);

