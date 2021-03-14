import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from "react-router-dom";
import { buyDragon } from '../redux/actions/buyDragonActions';
import { fetchPublicDragons } from '../redux/actions/publicDragonActions';

import DragonAvatar from './DragonAvatar';

class BuyModal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside = (event) => {
        const { handleBuyModal, fetchPublicDragons } = this.props;
        if (this.node.contains(event.target)) return;
        fetchPublicDragons();
        return handleBuyModal();
    }

    handleCloseModal = (event) => {
        const { handleBuyModal, fetchPublicDragons } = this.props;
        fetchPublicDragons();
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
                }
            })
    }

    checkAccountDragons = () => {
        this.props.history.push('/account-dragons');
    }

    render() {
        const { handleBuyModal } = this.props;
        return (
            <div className='infoModal'>
                {
                    this.props.buyDragonState.buyDragonSuccess ?
                        <div ref={node => this.node = node} className='container'>
                            <div className='closeIcon' >
                                <div onClick={this.handleCloseModal}>&times;</div>
                            </div>

                            <div className='contentContainer'>
                                <div className='title'>Success!!!</div>

                                <div className='dragon-card'>
                                    <DragonAvatar dragon={this.props.dragon} />
                                </div>
                                <p className='text'>
                                    Buy dragon <span className='modal-value'>[DragonId: {this.props.dragon.dragonId}]</span> success!
                                    </p>
                            </div>

                            <div className='modal-buttons'>
                                <button onClick={this.checkAccountDragons}>Check my account dragons</button>
                                <button onClick={this.handleCloseModal}>Finish</button>
                            </div>
                        </div>
                        :
                        <div ref={node => this.node = node} className='container'>
                            <div className='closeIcon' >
                                <div onClick={this.props.handleBuyModal}>&times;</div>
                            </div>

                            <div className='contentContainer'>
                                <div className='title'>Confirm Page</div>

                                <div className='dragon-card'>
                                    <DragonAvatar dragon={this.props.dragon} />
                                </div>
                                <p className='text'>
                                    You will spend <span className='modal-value'>{this.props.dragon.saleValue}</span> value to buy this dragon.
                        </p>
                            </div>
                            <div className='modal-buttons'>
                                <button onClick={this.buy}>Buy</button>
                                <button onClick={this.props.handleBuyModal}>Cancel</button>
                            </div>
                        </div>
                }
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
        fetchPublicDragons: () => dispatch(fetchPublicDragons)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuyModal));