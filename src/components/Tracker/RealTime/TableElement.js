import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import { selectRecord } from "../../../store/actions/records";

export class TableElement extends Component {
    constructor(props) {
        super(props);
        this.selectRecord = this.selectRecord.bind(this);
    }

    selectRecord() {
        this.props.actions.selectRecord(this.props.record);
    }

    render() {
        const { record } = this.props;
        const date = moment(record.timestamp);
        let className = "fa fa-circle";
        let label;
        if (moment().diff(date) > 1800000) {
            className += "-o status-down"
            label = "Perte de connection avec le boîtier";
        } else {
            className += record.ignition ? " status-up" : " status-stop";
            label = record.ignition ? " Moteur allumé" : "Moteur éteint";;
        }

        return (
            <tr onClick={this.selectRecord} className={this.props.isSelected ? "journey-selected" : "journey-hover"}>
                <td scope="row">{record.imei}</td>
                <td>{date.format(('DD/MM/YY'))}</td>
                <td>{date.format('HH:mm:ss')}</td>
                <td>{record.address}</td>
                <td>{record.speed} km/h</td>
                <td title={label}>
                    <i className={className}/>
                </td>
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
        selectRecord,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableElement);
