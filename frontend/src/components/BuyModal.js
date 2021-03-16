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
                <div ref={node => this.node = node} className='container'>
                    <div className='closeIcon' >
                        <div onClick={handleBuyModal}>&times;</div>
                    </div>
                    {
                        buyDragonState.buyDragonSuccess ?
                            <div>
                                <div className='contentContainer'>
                                    <div className='title'>Success!!!</div>

                                    <div className='dragon-card'>
                                        <DragonAvatar dragon={dragon} />
                                    </div>
                                    <p className='text'>
                                        Buy dragon <span className='modal-value'>[DragonId: {dragon.dragonId}]</span> success!
                                    </p>
                                    <div className='modal-buttons'>
                                        <button onClick={this.checkAccountDragons}>Check my account dragons</button>
                                        <button onClick={handleBuyModal}>Finish</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <div className='contentContainer'>
                                    <div className='title'>Confirm Page</div>

                                    <div className='dragon-card'>
                                        <DragonAvatar dragon={dragon} />
                                    </div>
                                    <p className='text'>
                                        You will spend <span className='modal-value'>{dragon.saleValue}</span> value to buy this dragon.
                                    </p>
                                    <div className='modal-buttons'>
                                        <button onClick={this.buy}>Buy</button>
                                        <button onClick={handleBuyModal}>Cancel</button>
                                    </div>
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
        fetchPublicDragons: () => dispatch(fetchPublicDragons)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuyModal));