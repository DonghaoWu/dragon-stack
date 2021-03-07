import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { signup, login } from '../actions/accountActions';
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
            <div>
                <h2>Dragon Stack</h2>
                <Form.Group>
                    <Form.Control
                        type='text'
                        value={this.state.username}
                        placeholder='username'
                        onChange={this.updateUsername}
                    />
                    <Form.Control
                        type='password'
                        value={this.state.password}
                        placeholder='password'
                        onChange={this.updatePassword}
                    />
                    <div>
                        <Button onClick={this.login}>Log In</Button>
                        <span> / </span>
                        <Button onClick={this.signup}>Sign up</Button>
                    </div>
                </Form.Group>
                {
                    this.props.account.message ?
                        <div>{this.props.account.message}</div>
                        :
                        null
                }
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