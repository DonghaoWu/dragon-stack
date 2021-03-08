import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublicDragons } from '../actions/publicDragonActions';
import { Link } from 'react-router-dom';
import PublicDragonsRow from './PublicDragonsRow';

class PublicDragons extends Component {

    componentDidMount() {
        this.props.fetchPublicDragons();
    }

    render() {
        return (
            <div>
                <h3>Public Dragons</h3>
                <Link to='/'>Back home</Link>
                <div className='dragons-container'>
                    {
                        this.props.publicDragons.dragons.map(dragon => {
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
        fetchPublicDragons: () => dispatch(fetchPublicDragons)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicDragons);