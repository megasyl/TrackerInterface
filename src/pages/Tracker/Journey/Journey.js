import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, Card, Form, Table} from 'react-bootstrap';
import { loadJourneys, selectJourneyMarker } from "../../../store/actions/journey";
import 'leaflet/dist/leaflet.css';
import Aux from "../../../hoc/_Aux";
import JourneyTableElement from '../../../components/Tracker/Journey/TableElement';
import { START, STOP, createPoint, createMarker } from '../../../components/Tracker/Markers';
import {Map, Marker, GoogleApiWrapper, Polyline, InfoWindow}  from 'google-maps-react';



class Journey extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.actions.loadJourneys();
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    search(event) {
        if(event.target.value.length >= 3) {
            this.props.actions.loadJourneys({search: event.target.value});
        }
        else if (event.target.value.length === 2) {
            this.props.actions.loadJourneys();
        }
    }

    onMarkerClick = (props, marker, e) => {
        this.props.actions.selectJourneyMarker(marker);
    }

    render() {
        console.log("selected marker", this.props.selectedJourneyMarker)
        const journeys = this.props.journeys || [];
        const { selectedJourney } = this.props;
        let markers = [];
        const marker = this.props.selectedJourneyMarker;
        const position = marker ? { lat:marker.info.latitude, lng: marker.info.longitude } : '';
        console.log(position)
        const tooltip = (<InfoWindow
            visible={true}
            marker={marker}>
            <div>
                <div>Vitesse: { marker ? marker.info.speed : 'unknown'}</div>
                <div>Date: {marker ? marker.info.timestamp : 'unkonwn'}</div>
            </div>
        </InfoWindow>);
        const elements = journeys.map((journey, i) => {
            const isSelected = selectedJourney && selectedJourney.key === i;
            return (<JourneyTableElement key={i} isSelected={isSelected} journey={{...journey, key:i}}/>);
        });
        let line = null;
        if (selectedJourney) {
            const route = selectedJourney.interpolatedPoints;
            const recordsInfo = selectedJourney.records;

            const snappedPoints = selectedJourney.snappedPoints;
            line = (<Polyline
                strokeColor="#3689FA"
                strokeOpacity={0.8}
                strokeWeight={4}
                path={route}/>);

             markers = snappedPoints.map((point, i) => {
                 let icon = createPoint();
                 if (i === 0) icon = createMarker(START);
                 if (i === snappedPoints.length - 1) icon = createMarker(STOP);
                 return (<Marker
                     key={i}
                     onClick={this.onMarkerClick}
                     icon={icon}
                     info={recordsInfo[point.originalIndex]}
                     position={{lat: point.location.latitude, lng: point.location.longitude}} />)
             });
        }

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
                    {line}
                    {markers}
                    {tooltip}

                </Map></div>

                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Trajets</Card.Title>
                    </Card.Header>
                    <Card.Body style={{fontSize: 12}}>
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Group className="mb-2 mr-5">
                                        <Form.Label srOnly>Recherche </Form.Label>
                                        <Form.Control onChange={this.search.bind(this)} size="sm" type="text" placeholder="IMEI, Adresse" />
                                    </Form.Group>

                                </Form>
                            </Col>
                        </Row>
                        <hr/>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>IMEI</th>
                                <th>Date</th>
                                <th>Heure départ</th>
                                <th>Adresse départ</th>
                                <th>Heure arrivée</th>
                                <th>Adresse arrivée</th>
                                <th>Vitesse max</th>
                                <th>Vitesse moyenne</th>
                                <th>Temps</th>
                                <th>Distance</th>
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

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ loadJourneys, selectJourneyMarker }, dispatch) });

const googleApiWrapper = GoogleApiWrapper({
    apiKey: 'AIzaSyBJcBASC5XBVbIaQ4B1RGmp1iGNcHCvO-o'
})(Journey);

export default connect(mapStateToProps, mapDispatchToProps)(googleApiWrapper);

