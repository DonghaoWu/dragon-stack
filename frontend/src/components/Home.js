import React, { Component } from 'react';
import Generation from './Generation';
import Dragon from './Dragon';
import { Button } from 'react-bootstrap';
import { logout } from '../redux/actions/accountActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AccountInfo from './AccountInfo';

class Home extends Component {
    render() {
        return (
            <div>
                <div className='logout-button'>
                    <span className='username'>Hello, {this.props.accountInfo.content.username}</span>
                    <span className='username'>Balance: {this.props.accountInfo.content.balance}</span>
                    <Button onClick={this.props.logout}>Log out</Button>
                </div>
                <div className='home-container'>
                    <h2> Dragon Stack</h2>
                    <Generation />
                    <AccountInfo />
                    <br />
                    <Link to='/account-dragons'>My Dragons List</Link>
                    <Link to='/public-dragons'>Public Dragons</Link>
                    <br />
                    <Dragon />
                    <br />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);