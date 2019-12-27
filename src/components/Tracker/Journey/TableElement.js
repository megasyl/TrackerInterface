import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DEMO from "../../../store/constant";
import moment from 'moment';
import { selectJourney } from "../../../store/actions/journey";

export class TableElement extends Component {
    constructor(props) {
        super(props);
        this.selectJourney = this.selectJourney.bind(this);
    }

    selectJourney() {
        console.log('calling action !', this.props.journey)
        this.props.actions.selectJourney(this.props.journey);
    }

    render() {
        const { journey } = this.props;
        var msDuration = moment(journey.endTimestamp).diff(moment(journey.beginTimestamp));
        var duration = moment.duration(msDuration);
        const readableDuration = Math.floor(duration.asHours()) + moment.utc(msDuration).format(":mm:ss");

        return (
            <tr>
                <th scope="row">{journey.imei}</th>
                <td>{journey.beginTimestamp} -> {journey.endTimestamp}</td>
                <td>{readableDuration}</td>
                <td>x kms</td>
                <td><button onClick={this.selectJourney} className="label text-white f-12">Voir</button></td>
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
