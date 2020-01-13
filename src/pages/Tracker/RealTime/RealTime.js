import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Card, Col, Row, Tab, Table, Tabs} from 'react-bootstrap';
import { loadLastRecords, updateRecord } from "../../../store/actions/records";
import 'leaflet/dist/leaflet.css';
import Aux from "../../../hoc/_Aux";
import JourneyTableElement from "../../../components/Tracker/RealTime/TableElement";
import Metrics from "../../../components/Tracker/RealTime/Metrics";
import { createMarker, GREEN  } from '../../../components/Tracker/Markers';
import {Map, Marker, GoogleApiWrapper, Polyline}  from 'google-maps-react';
import moment from "moment";
import avatar1 from "../../../assets/images/user/avatar-1.jpg";
import DEMO from "../../../store/constant";
import avatar2 from "../../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../../assets/images/user/avatar-3.jpg";




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
                <Row>
                    <Card style={{height: '100vh', width: '30%'}}>
                        <Card.Header>
                            <Card.Title as="h5">Véhicules</Card.Title>
                        </Card.Header>
                        <Card.Body style={{padding: 0, marginLeft: 15, marginRight: -15}}>
                            {elements}
                        </Card.Body>
                    </Card>
                    <div style={{height: '100vh', width: '70%'}}>
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
                </Row>
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

