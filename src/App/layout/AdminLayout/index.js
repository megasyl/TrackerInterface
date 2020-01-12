import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Fullscreen from "react-full-screen";
import windowSize from 'react-window-size';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions/actions";
import {loadAuthCookie} from "../../../store/actions/auth";
import { bindActionCreators } from "redux";

import './app.scss';


class AdminLayout extends Component {

    fullScreenExitHandler = () => {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.props.onFullScreenExit();
        }
    };

    componentDidMount() {
        if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
            this.props.oncomponentDidMount();
        }
    }

    componentWillMount() {
        console.log(this.props)
        if (!this.props.user) {
            this.props.actions.loadAuthCookie()
        }
    }

    componentWillUnmount() {
        document.removeEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.removeEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.removeEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.removeEventListener('MSFullscreenChange', this.fullScreenExitHandler);
    }

    mobileOutClickHandler() {
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            this.props.oncomponentDidMount();
        }
    }

    render() {
        console.log(this.props)
        if (!this.props.loadedCookie && !this.props.user) {
            return null;
        }
        /* full screen exit call */
        document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);

        const menu = routes.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => {
                        if (route.userRole){
                            let { user } = this.props;
                            if (!user || !user.role || !route.userRole.includes(user.role.name)) {
                                return (<Redirect key={index} to={'/login'} />);
                            }
                        }
                        return (<route.component {...props} />);
                    }} />
            ) : null;
        });

        const navComponents = this.props.user ? [(<Navigation />)]//, (<NavBar user={this.props.user} />)]
            : (<Redirect to={'/login'} />);


        return (
            <Aux>
                <Fullscreen enabled={this.props.isFullScreen}>
                    {navComponents}
                    <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
                        <div className="pcoded-wrapper">
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">
                                    <Breadcrumb />
                                    <div className="main-body">
                                        <div className="page-wrapper">
                                            <Suspense fallback={<Loader/>}>
                                                <Switch>
                                                    {menu}
                                                    <Redirect from="/" to={this.props.defaultPath} />
                                                </Switch>
                                            </Suspense>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fullscreen>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        defaultPath: state.defaultPath,
        isFullScreen: state.isFullScreen,
        collapseMenu: state.collapseMenu,
        configBlock: state.configBlock,
        layout: state.layout,
        user: state.user,
        loadedCookie: state.loadedCookie,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreenExit: () => dispatch({type: actionTypes.FULL_SCREEN_EXIT}),
        oncomponentDidMount: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
        actions: bindActionCreators({ loadAuthCookie }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (windowSize(AdminLayout));
