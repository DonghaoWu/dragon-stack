import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PublicDragonsRow from './PublicDragonsRow';

import { fetchPublicDragons } from '../redux/actions/publicDragonActions';
import { fetchAccountDragons } from '../redux/actions/accountDragonActions';

class PublicDragons extends Component {

    componentDidMount() {
        this.props.fetchPublicDragons();
        this.props.fetchAccountDragons();
    }

    render() {
        return (
            <div>
                <h3>Public Dragons</h3>
                <div className='header-container'>
                    <div className='dragon-buttons-container'>
                        <Link to='/' className='dragon-list-button'>Home</Link>
                        <Link to='/account-dragons' className='dragon-list-button'>Account Dragons list</Link>
                    </div>
                </div>
                <div className='dragon-cards-container'>
                    {
                        this.props.publicDragons.content.map(dragon => {
                            return (
                                <div key={dragon.dragonId}>
                                    <PublicDragonsRow dragon={dragon} />
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
        publicDragons: state.publicDragons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPublicDragons: () => dispatch(fetchPublicDragons),
        fetchAccountDragons: () => dispatch(fetchAccountDragons)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicDragons);