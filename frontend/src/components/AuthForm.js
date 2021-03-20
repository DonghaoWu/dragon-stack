import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { signup, login } from '../redux/actions/accountActions';
import { connect } from 'react-redux';

class AuthForm extends Component {
    state = { username: '', password: '' };

    updateUsername = e => {
        this.setState({ username: e.target.value })
    };

    updatePassword = e => {
        this.setState({ password: e.target.value })
    };

    signup = () => {
        const { username, password } = this.state;
        this.props.signup({ username, password });
    }

    login = () => {
        const { username, password } = this.state;
        this.props.login({ username, password });
    }

    render() {
        return (
            <div className='authForm-container'>
                <div className='auth-form-content'>
                    <h2>Dragon Stack</h2>
                    <Form.Group className='auth-form-inputField'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type='text'
                            value={this.state.username}
                            placeholder='username'
                            onChange={this.updateUsername}
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            value={this.state.password}
                            placeholder='password'
                            onChange={this.updatePassword}
                        />
                        <div className='auth-form-buttons'>
                            <Button className='auth-form-button' onClick={this.login}>Log In</Button>
                            <Button className='auth-form-button' onClick={this.signup}>Sign up</Button>
                        </div>
                    </Form.Group>
                    <div>
                        {
                            this.props.account.errorMessage ?
                                <div>
                                    {
                                        this.props.account.errorMessage === 'Invalid session.' ?
                                            <div></div>
                                            :
                                            <div> {this.props.account.errorMessage}</div>
                                    }
                                </div>
                                :
                                null

                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        account: state.account
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: ({ username, password }) => dispatch(signup({ username, password })),
        login: ({ username, password }) => dispatch(login({ username, password }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);