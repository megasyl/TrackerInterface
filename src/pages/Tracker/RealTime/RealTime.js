import React from 'react';
import Leaflet from 'leaflet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, Card, Form, InputGroup, Button, Table} from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import { loadLastRecords, updateRecord } from "../../../store/actions/records";
import 'leaflet/dist/leaflet.css';
import Aux from "../../../hoc/_Aux";
import JourneyTableElement from "../../../components/Tracker/RealTime/TableElement";
import { GREEN_MARKER_ICON, YELLOW_MARKER_ICON, RED_MARKER_ICON } from '../../../components/Tracker/Markers';
import moment from "moment";

Leaflet.Icon.Default.imagePath =
    '../node_modules/leaflet';

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});




class RealTime extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.actions.loadLastRecords();
    }
    ws = new WebSocket('ws://server.lasjunies.fr:5050');

    componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected')
        }

        this.ws.onmessage = evt => {
            const record = JSON.parse(evt.data);
            this.props.actions.updateRecord(record)
            console.log("update record", record)
        }

        this.ws.onclose = () => {
            console.log('disconnected')
        }
    }

    componentDidUpdate(prevProps) {
        console.log('didupdate', this.props, prevProps)
    }

    render() {
        console.log('update2', this.props)
        const { records, selected } = this.props;
        const elements = records ? records.map((record, i) => {
            const isSelected = selected && selected.key === i;
            console.log('isSelected ? ', selected ? selected.key: "null", i, isSelected)
            return (<JourneyTableElement key={i} isSelected={isSelected} record={{...record, key:i}}/>);
        }) : [];
        const getIcon = (record) => record.ignition ? GREEN_MARKER_ICON : moment().diff(moment(record.timestamp)) > 1800000 ? RED_MARKER_ICON: YELLOW_MARKER_ICON;
        const markers = records ? records.map((record) => (<Marker key={record.imei} icon={getIcon(record)} position={[record.latitude, record.longitude]}>
            <Popup/>
        </Marker>)) : null;

        return (
            <Aux>
                <Map style={{height: "400px"}} center={[48.86, 2.34]} zoom={10}>
                    <TileLayer
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    {markers}
                </Map>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Véhicules</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>IMEI</th>
                                <th>Date</th>
                                <th>Heure</th>
                                <th>Adresse</th>
                                <th>Vitesse</th>
                                <th>Statut</th>
                            </tr>
                            </thead>
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

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ loadLastRecords, updateRecord }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(RealTime);

