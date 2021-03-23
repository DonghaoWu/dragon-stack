import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAccountDragons } from '../../redux/actions/accountDragonActions';
import AccountDragonRow from '../AccountDragonRow/index';

import './styles.css';

class AccountDragons extends Component {
    componentDidMount() {
        this.props.fetchAccountDragons();
    }

    render() {
        return (
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
        fetchAccountDragons: () => dispatch(fetchAccountDragons)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDragons);