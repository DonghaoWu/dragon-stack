import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Generation from '../Generation/index';
import AccountInfo from '../AccountInfo/index';
import './styles.css'

class MyProfile extends Component {
    render() {
        return (
            <div className='profile-container'>
                <AccountInfo />
                <Generation />
            </div>
        )
    }
}

export default MyProfile;