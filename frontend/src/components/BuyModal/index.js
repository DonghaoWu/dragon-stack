import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from "react-router-dom";
import { buyDragon } from '../../redux/actions/buyDragonActions';
import { fetchPublicDragons } from '../../redux/actions/publicDragonActions';
import { fetchAccountInfo } from '../../redux/actions/accountInfoActions'

import DragonAvatar from '../DragonAvatar/index';
import './styles.css';

class BuyModal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        this.props.fetchPublicDragons();
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside = (event) => {
        const { handleBuyModal } = this.props;
        if (this.node.contains(event.target)) return;
        return handleBuyModal();
    }

    buy = () => {
        this.props.buyDragon({
            dragonId: this.props.dragon.dragonId,
            saleValue: this.props.dragon.saleValue
        })
            .then(() => {
                if (this.props.buyDragonState.errorMessage) {
                    alert(this.props.buyDragonState.errorMessage);
                }
                else {
                    alert(this.props.buyDragonState.content.message);
                    this.props.fetchAccountInfo();
                }
            })
    }

    checkAccountDragons = () => {
        this.props.history.push('/account-dragons');
    }

    render() {
        const { handleBuyModal, buyDragonState, dragon } = this.props;
        return (
            <div className='infoModal'>
                <div ref={node => this.node = node} className='buy-modal-container'>
                    <div className='closeIcon' >
                        <div onClick={handleBuyModal}>&times;</div>
                    </div>
                    {
                        buyDragonState.buyDragonSuccess ?
                            <div className='contentContainer'>
                                <div className='title'>Congratulation!!!</div>
                                <div className='dragon-card'>
                                    <DragonAvatar dragon={dragon} />
                                </div>
                                <p className='text'>
                                    <span>Buy dragon <span className='modal-value'>[DragonId: {dragon.dragonId}]</span> success!</span>
                                </p>
                                <div className='modal-buttons'>
                                    <button className='modal-button' onClick={this.checkAccountDragons}>Check my account dragons</button>
                                    <button className='modal-button' onClick={handleBuyModal}>Finish</button>
                                </div>
                            </div>
                            :
                            <div className='contentContainer'>
                                <div className='title'>Confirm Page</div>
                                <div className='dragon-card dragon-card-otherOwner'>
                                    <DragonAvatar dragon={dragon} />
                                </div>
                                <p className='text'>
                                    <span>You will spend <span className='modal-value'>{dragon.saleValue}</span> value to buy this dragon.</span>
                                </p>
                                <div className='modal-buttons'>
                                    <button className='modal-button' onClick={this.buy}>Buy</button>
                                    <button className='modal-button' onClick={handleBuyModal}>Cancel</button>
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        buyDragonState: state.buyDragon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buyDragon: ({ dragonId, saleValue }) => dispatch(buyDragon({ dragonId, saleValue })),
        fetchPublicDragons: () => dispatch(fetchPublicDragons),
        fetchAccountInfo: () => dispatch(fetchAccountInfo)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuyModal));