import React, { Component } from 'react';
import Generation from './Generation';
import { Button } from 'react-bootstrap';
import { logout } from '../redux/actions/accountActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AccountInfo from './AccountInfo';

class MyProfile extends Component {
    render() {
        return (
            <div className='profile-container'>
                <AccountInfo />
                <Generation />
                <br />
                <br />
                <br />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        accountInfo: state.accountInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);