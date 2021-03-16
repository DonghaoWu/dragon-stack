import React, { Component, Fragment } from 'react';
import DragonAvatar from './DragonAvatar';
import MatingOptions from './MatingOptions';
import { connect } from 'react-redux';

import Modal from './Modal';
import BuyModal from './BuyModal';
import MateModal from './MateModal';

import { buyDragonBegin } from '../redux/actions/buyDragonActions';
import { mateDragonBegin } from '../redux/actions/mateDragonActions';

class PublicDragonsRow extends Component {
    state = {
        buyModal: false,
        mateModal: false
    };

    handleBuyModal = () => {
        this.setState({ buyModal: !this.state.buyModal })
    }

    handleMateModal = () => {
        this.setState({ mateModal: !this.state.mateModal })
    }

    openBuyModal = () => {
        this.handleBuyModal();
        this.props.buyDragonBegin();
    }

    openMateModal = () => {
        this.handleMateModal();
        this.props.mateDragonBegin();
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.buyModal &&
                    <Modal>
                        <BuyModal handleBuyModal={this.handleBuyModal} dragon={this.props.dragon} />
                    </Modal>
                }
                {
                    this.state.mateModal &&
                    <Modal>
                        <MateModal handleMateModal={this.handleMateModal} dragon={this.props.dragon} />
                    </Modal>
                }
                <div className='dragon-card'>
                    <DragonAvatar dragon={this.props.dragon} />
                    <div className='dragon-card-buttons'>
                        <div className='dragon-description-button'>
                            <div>Sale value:{this.props.dragon.saleValue}</div>
                            <button onClick={this.openBuyModal}>Buy</button>
                        </div>
                        <div className='dragon-description-button'>
                            <div>Sire value:{this.props.dragon.sireValue}</div>
                            <button onClick={this.openMateModal}>Sire</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        buyDragonBegin: () => dispatch(buyDragonBegin()),
        mateDragonBegin: () => dispatch(mateDragonBegin())
    }
}

export default connect(null, mapDispatchToProps)(PublicDragonsRow);