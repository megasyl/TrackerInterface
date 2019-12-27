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
        const points = this.props.geoPoints || [];
        const journeys = this.props.journeys || [];
        const { selected } = this.props;
        console.log(selected)
        const line = selected ? (<Polyline positions={selected.records.map((record) => [record.latitude, record.longitude])}/>) : null;
        const elements = journeys.map(journey => (<JourneyTableElement journey={journey}/>))

        return (
            <Aux>
                <Row>
                <Col md={12} xl={4}>
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
                </Col>
                <Col md={12} xl={8}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Map</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div >
                                <Map style={{height: "800px"}} center={[48.86, 2.34]} zoom={10}>
                                    <TileLayer
                                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                    />
                                    {line}
                                </Map>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                </Row>
            </Aux>
        );
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ loadRecords, loadJourneys }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Journey);

