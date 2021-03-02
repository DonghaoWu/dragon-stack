import React, { Component } from 'react';
import Generation from './Generation';
import Dragon from './Dragon';
import { Button } from 'react-bootstrap';
import { logout } from '../actions/accountActions';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div>
                <div className='logout-button'>
                    <span className='username'>Hello, {this.props.account.username}</span>
                    <Button onClick={this.props.logout}>Log out</Button>
                </div>
                <h2> Dragon Stack</h2>
                <Generation />
                <Dragon />
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
        logout: () => dispatch(logout)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);