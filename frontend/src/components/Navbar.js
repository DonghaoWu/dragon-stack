import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/accountActions';

const Navbar = ({ logout, accountInfo }) => {
    return (
        <div className='my-nav-bar'>
            <h2 className='my-nav-bar-title'>Dragon-stack</h2>
            <div className='logout-button'>
                <span className='username'>Hello, {accountInfo.content.username}</span>
                <span className='username'>Balance: {accountInfo.content.balance}</span>
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

export default (connect(mapStateToProps, mapDispatchToProps)(Navbar));
