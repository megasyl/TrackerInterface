import React from 'react';
import Leaflet from 'leaflet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, Card, Form, InputGroup, Button} from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import { loadRecords } from "../../../store/actions/records";
import 'leaflet/dist/leaflet.css';
import Aux from "../../../hoc/_Aux";

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
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        console.log('didupdate', this.props, prevProps)
    }

    render() {
        const points = this.props.geoPoints || [];
        const line = (<Polyline positions={points.map(({coordinates}) => coordinates)}/>);

        return (
            <Aux>
                <Col xl={12}>
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
            </Aux>
        );
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ loadRecords }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Journey);

