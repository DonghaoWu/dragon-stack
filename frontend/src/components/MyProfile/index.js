import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';

import Generation from '../Generation/index';
import AccountInfo from '../AccountInfo/index';

import './styles.css'

class MyProfile extends Component {
    render() {
        return (
            <Fragment>
                <div className='sub-nav-container'>
                    <Link to="/" className='seletedTag'>Create A Dragon</Link>
                    <Link to="/account-dragons" className='unSelectedTag'>My Dragons</Link>
                    <Link to="/public-dragons" className='unSelectedTag'>Public Dragons</Link>
                </div>
                <div className='profile-container'>
                    <AccountInfo />
                    <Generation />
                </div>
            </Fragment>
        )
    }
}

export default MyProfile;