import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountInfo } from '../redux/actions/accountInfoActions';
import { Link } from 'react-router-dom';

class AccountInfo extends Component {

    componentDidMount() {
        this.props.fetchAccountInfo();
    }

    render() {
        return (
            <div>
                <h4>Account Info</h4>
                <div>Username: {this.props.accountInfo.content.username}</div>
                <div>Balance: {this.props.accountInfo.content.balance}</div>
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