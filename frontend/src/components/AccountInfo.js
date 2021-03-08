import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountInfo } from '../actions/accountInfoActions';
import { Link } from 'react-router-dom';

class AccountInfo extends Component {

    componentDidMount() {
        this.props.fetchAccountInfo();
    }

    render() {
        return (
            <div>
                <h4>Account Info</h4>
                <div>Username: {this.props.accountInfo.info.username}</div>
                <div>Balance: {this.props.accountInfo.info.balance}</div>
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
        fetchAccountInfo: () => dispatch(fetchAccountInfo)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);