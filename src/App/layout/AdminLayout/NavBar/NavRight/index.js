import React, { Component } from 'react';
import {Dropdown} from 'react-bootstrap';

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import {bindActionCreators} from "redux";
import {removeAuthCookie} from "../../../../../store/actions/auth";
import {connect} from "react-redux";

class NavRight extends Component {
    state = {
        listOpen: false
    };

    render() {
        console.log("PROPSSSS", this.props)
        return (
            <Aux>
                <ul className="navbar-nav ml-auto">
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-settings"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                    <span>{this.props.user.firstName} {this.props.user.lastName}</span>
                                    <a href={DEMO.BLANK_LINK} className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"/>
                                    </a>
                                </div>
                                <ul className="pro-body">
                                    <li><a href='#' onClick={this.props.actions.removeAuthCookie} className="dropdown-item"><i className="feather icon-log-out"/> Déconnexion</a></li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </Aux>
        );
    }
}


const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ removeAuthCookie }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (NavRight);

