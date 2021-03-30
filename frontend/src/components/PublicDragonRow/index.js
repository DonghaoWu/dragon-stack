import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/index';
import BuyModal from '../BuyModal/index';
import MateModal from '../MateModal/index';
import DragonAvatar from '../DragonAvatar/index';

import { clearBuyState } from '../../redux/actions/buyDragonActions';
import { clearMateState } from '../../redux/actions/mateDragonActions';

import './styles.css';

class PublicDragonsRow extends Component {
    state = {
        buyModal: false,
        mateModal: false
    };

    handleBuyModal = () => {
        this.setState({ buyModal: !this.state.buyModal });
        this.props.clearBuyState();
    }

    handleMateModal = () => {
        this.setState({ mateModal: !this.state.mateModal });
        this.props.clearMateState();
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
                        <div className='dragon-card dragon-card-otherOwner'>
                            <DragonAvatar dragon={this.props.dragon} />
                            <div className='public-dragon-card-buttons'>
                                <div className='public-dragon-card-button'>
                                    <div>Sale value:{this.props.dragon.saleValue}</div>
                                    <button onClick={this.handleBuyModal}>Buy</button>
                                </div>
                                <div className='public-dragon-card-button'>
                                    <div>Sire value:{this.props.dragon.sireValue}</div>
                                    <button onClick={this.handleMateModal}>Sire</button>
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
        clearBuyState: () => dispatch(clearBuyState()),
        clearMateState: () => dispatch(clearMateState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicDragonsRow);