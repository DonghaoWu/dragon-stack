import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AccountDragonRow from '../AccountDragonRow/index';

import { fetchPublicDragons } from '../../redux/actions/publicDragonActions';
import { fetchAccountDragons } from '../../redux/actions/accountDragonActions';
import { fetchAccountInfo } from '../../redux/actions/accountInfoActions';

import './styles.css';

class AccountDragons extends Component {
    componentDidMount() {
        this.props.fetchAccountDragons();
    }

    render() {
        return (
            <Fragment>
                <div className='sub-nav-container'>
                    <Link to="/" className='unSelectedTag'>Create A Dragon</Link>
                    <Link to="/account-dragons" className='seletedTag'>My Dragons</Link>
                    <Link to="/public-dragons" className='unSelectedTag'>Public Dragons</Link>
                </div>
                <div className='account-public-container'>
                    <h2 className='account-public-title'>My Dragons List</h2>
                    <div className='dragon-cards-container'>
                        {
                            this.props.accountDragons.content.map(dragon => {
                                return (
                                    <div key={dragon.dragonId}>
                                        <AccountDragonRow dragon={dragon} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        accountDragons: state.accountDragons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPublicDragons: () => dispatch(fetchPublicDragons),
        fetchAccountDragons: () => dispatch(fetchAccountDragons),
        fetchAccountInfo: () => dispatch(fetchAccountInfo)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDragons);