import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import { selectJourney } from "../../../store/actions/journey";

export class TableElement extends Component {
    constructor(props) {
        super(props);
        this.selectJourney = this.selectJourney.bind(this);
    }

    selectJourney() {
        this.props.actions.selectJourney(this.props.journey);
    }

    render() {
        const { journey } = this.props;
        const beginDate = moment(journey.beginTimestamp);
        const endDate = moment(journey.endTimestamp);
        var msDuration = endDate.diff(beginDate);
        var duration = moment.duration(msDuration);
        const readableDuration = Math.floor(duration.asHours()) + moment.utc(msDuration).format(":mm:ss");
        return (
            <tr onClick={this.selectJourney} className={this.props.isSelected ? "journey-selected" : "journey-hover"}>
                <td scope="row">{journey.imei}</td>
                <td>{beginDate.format(('DD/MM/YY'))}</td>
                <td>{beginDate.format('HH:mm:ss')}</td>
                <td>{journey.beginAddress}</td>
                <td>{endDate.format('HH:mm:ss')}</td>
                <td>{journey.endAddress}</td>
                <td>{journey.maxSpeed} km/h</td>
                <td>{Math.round(journey.averageSpeed)} km/h</td>
                <td>{readableDuration}</td>
                <td>{journey.distance / 1000} km</td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
});

/**
 * Redux related method
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        selectJourney,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableElement);
