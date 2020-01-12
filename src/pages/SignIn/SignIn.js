import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';

import '../../assets/scss/style.scss';
import Aux from "../../hoc/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
import {bindActionCreators} from "redux";
import { login } from "../../store/actions/auth";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
    componentDidMount() {
        this.setState({
            login: '',
            password: ''
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.actions.login(this.state.login, this.state.password);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render () {
        if (this.props.user) {
            return (<Redirect to={this.props.defaultPath} />)
        }
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <form method="post" onSubmit={(e) => this.handleSubmit(e)}>
                                    <div className="input-group mb-3">
                                        <input name="login" type="text" onChange={e => this.handleChange(e)} className="form-control" placeholder="Login"/>
                                    </div>
                                    <div className="input-group mb-4">
                                        <input name="password" type="password" onChange={e => this.handleChange(e)} className="form-control" placeholder="password"/>
                                    </div>
                                    <button type="submit"  className="btn btn-primary shadow-2 mb-4">Login</button>
                                    <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ login }, dispatch) });


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
