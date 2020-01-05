import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Card, Table} from 'react-bootstrap';
import { loadLastRecords, updateRecord } from "../../../store/actions/records";
import 'leaflet/dist/leaflet.css';
import Aux from "../../../hoc/_Aux";
import JourneyTableElement from "../../../components/Tracker/RealTime/TableElement";
import { createMarker, GREEN  } from '../../../components/Tracker/Markers';
import {Map, Marker, GoogleApiWrapper, Polyline}  from 'google-maps-react';
import moment from "moment";




class RealTime extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.actions.loadLastRecords();
        this.ws = new WebSocket('ws://server.lasjunies.fr:5050');
    }

    componentDidMount() {
        this.ws.onmessage = evt => {
            const record = JSON.parse(evt.data);
            this.props.actions.updateRecord(record);
        };
    }

    componentWillUnmount() {
        this.ws.close();
    }


    render() {
        const { records, selectedRecord } = this.props;
        const elements = records ? records.map((record, i) => {
            const isSelected = selectedRecord && selectedRecord.key === i;
            return (<JourneyTableElement key={i} isSelected={isSelected} record={{...record, key:i}}/>);
        }) : [];
        const getIcon = (record) => record.ignition && moment().diff(moment(record.timestamp)) < 1800000 ? createMarker(GREEN) : null;
        const markers = records ? records.map((record) => (<Marker key={record.imei} icon={getIcon(record)} position={{ lat:record.latitude, lng: record.longitude}}>
        </Marker>)) : null;

        return (
            <Aux>
                <div style={{height: '400px', width: '100%'}}>
                    <Map
                        centerAroundCurrentLocation
                        className="map"
                        google={this.props.google}
                        initialCenter={{
                            lat: 48.866667,
                            lng: 2.333333
                        }}
                        center={this.props.center}
                        zoom={12}>
                        {markers}
                    </Map></div>
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

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ loadLastRecords, updateRecord }, dispatch) });

const googleApiWrapper = GoogleApiWrapper({
    apiKey: 'AIzaSyBJcBASC5XBVbIaQ4B1RGmp1iGNcHCvO-o'
})(RealTime);

export default connect(mapStateToProps, mapDispatchToProps)(googleApiWrapper);

