import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { logout } from '../../redux/actions/accountActions';

import './styles.css';

const Navbar = ({ logout, accountInfo }) => {
    return (
        <div className='my-navbar'>
            <h2 className='my-navbar-title'>Dragon-stack</h2>
            <div className='my-navbar-user'>
                <span className='my-navbar-userInfo'>Hello, {accountInfo.content.username}</span>
                <span className='my-navbar-userInfo'>Balance: {accountInfo.content.balance}</span>
                <Button onClick={logout}>Log out</Button>
            </div>
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
