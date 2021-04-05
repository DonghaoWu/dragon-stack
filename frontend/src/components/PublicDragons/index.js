import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PublicDragonsRow from '../PublicDragonRow/index';

import { fetchPublicDragons } from '../../redux/actions/publicDragonActions';
import { fetchAccountInfo } from '../../redux/actions/accountInfoActions';

import './styles.css';

class PublicDragons extends Component {

    componentDidMount() {
        this.props.fetchPublicDragons();
        this.props.fetchAccountInfo();
    }

    render() {
        return (
            <Fragment>
                <div className='sub-nav-container'>
                    <Link to="/" className='unSelectedTag'>Create A Dragon</Link>
                    <Link to="/account-dragons" className='unSelectedTag'>My Dragons</Link>
                    <Link to="/public-dragons" className='seletedTag'>Public Dragons</Link>
                </div>
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
            </Fragment>
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
        fetchAccountInfo: () => dispatch(fetchAccountInfo)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicDragons);