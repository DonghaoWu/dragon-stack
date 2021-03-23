import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PublicDragonsRow from '../PublicDragonRow/index';

import { fetchPublicDragons } from '../../redux/actions/publicDragonActions';
import { fetchAccountDragons } from '../../redux/actions/accountDragonActions';

import './styles.css';

class PublicDragons extends Component {

    componentDidMount() {
        this.props.fetchPublicDragons();
        this.props.fetchAccountDragons();
    }

    render() {
        return (
            <div className='account-public-container'>
                <h2 className='account-public-title'>Public Dragons List</h2>
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