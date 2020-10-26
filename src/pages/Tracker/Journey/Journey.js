import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, Card, Form, Table} from 'react-bootstrap';
import { loadJourneys, selectJourneyMarker } from "../../../store/actions/journey";
import 'leaflet/dist/leaflet.css';
import Aux from "../../../hoc/_Aux";
import JourneyTableElement from '../../../components/Tracker/Journey/TableElement';
import Map from '../../../components/Tracker/Journey/Map';
import {GoogleApiWrapper}  from 'google-maps-react';


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

    render() {
        const { selectedJourney } = this.props;
        const journeys = this.props.journeys || [];
        const elements = journeys.map((journey, i) => {
            const isSelected = selectedJourney && selectedJourney.key === i;
            return (<JourneyTableElement key={i} isSelected={isSelected} journey={{...journey, key:i}}/>);
        });

        return (
            <Aux>
                <Row>
                    <Map
                        google={this.props.google}
                        selectedJourney={this.props.selectedJourney}
                    />
                </Row>
                <Row>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Trajets ({journeys.length})</Card.Title>
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
                </Row>
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

