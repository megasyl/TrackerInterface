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
        console.log('IAM SELECTED', this.props.isSelected)
        return (
            <tr onClick={this.selectJourney} className={this.props.isSelected ? "journey-selected" : "journey-hover"}>
                <th scope="row">{journey.imei}</th>
                <td>{beginDate.format(('DD/MM/YY'))}</td>
                <td>{beginDate.format('hh:mm:ss')} -> {endDate.format('hh:mm:ss')}</td>
                <td>{readableDuration}</td>
                <td>x kms</td>
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
