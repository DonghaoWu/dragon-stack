import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountDragons } from '../redux/actions/accountDragonActions';
import AccountDragonRow from './AccountDragonRow';
import { Link } from 'react-router-dom';

class AccountDragons extends Component {

    componentDidMount() {
        this.props.fetchAccountDragons();
    }

    render() {
        return (
            <div>
                <Link to='/'>Back Home</Link>
                <h3>My Dragons List</h3>
                <div className='dragons-container'>
                    {
                        this.props.accountDragons.dragons.map(dragon => {
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