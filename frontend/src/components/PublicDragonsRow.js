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
        console.log(this.props.accountInfo.content.accountId)
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
                {
                    this.props.accountInfo.content.accountId === this.props.dragon.accountId ?
                        <div className='dragon-card'>
                            <DragonAvatar dragon={this.props.dragon} />
                            <div className='public-dragon-card-buttons'>
                                <div className='public-dragon-card-button'>
                                    <div>Sale value:{this.props.dragon.saleValue}</div>
                                    <button disabled>Buy</button>
                                </div>
                                <div className='public-dragon-card-button'>
                                    <div>Sire value:{this.props.dragon.sireValue}</div>
                                    <button disabled>Sire</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='dragon-card dragon-card-other'>
                            <DragonAvatar dragon={this.props.dragon} />
                            <div className='public-dragon-card-buttons'>
                                <div className='public-dragon-card-button'>
                                    <div>Sale value:{this.props.dragon.saleValue}</div>
                                    <button onClick={this.openBuyModal}>Buy</button>
                                </div>
                                <div className='public-dragon-card-button'>
                                    <div>Sire value:{this.props.dragon.sireValue}</div>
                                    <button onClick={this.openMateModal}>Sire</button>
                                </div>
                            </div>
                        </div>
                }
            </Fragment>
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
        buyDragonBegin: () => dispatch(buyDragonBegin()),
        mateDragonBegin: () => dispatch(mateDragonBegin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicDragonsRow);