import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonAvatar from './DragonAvatar';
import MatingOptions from './MatingOptions';
import { withRouter } from "react-router-dom";

import { buyDragon } from '../redux/actions/buyDragonActions';

class PublicDragonsRow extends Component {
    state = {
        displayOptions: false
    };

    toggleDisplayMatingOptions = () => {
        this.setState({ displayOptions: !this.state.displayOptions })
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
                    this.props.history.push('/account-dragons');
                    alert(this.props.buyDragonState.content.message);
                }
            })
    }

    render() {
        return (
            <div>
                <div className='dragon-card'>
                    <div>Sale value:{this.props.dragon.saleValue}</div>
                    <div>Sire value:{this.props.dragon.sireValue}</div>
                    <br />
                    <DragonAvatar dragon={this.props.dragon} />
                    <br />
                    <button onClick={this.buy}>Buy</button>
                    <button onClick={this.toggleDisplayMatingOptions}>Sire</button>
                </div>
                {
                    this.state.displayOptions
                        ?
                        <MatingOptions patronDragonId={this.props.dragon.dragonId} />
                        :
                        <div></div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        buyDragonState: state.buyDragon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buyDragon: ({ dragonId, saleValue }) => dispatch(buyDragon({ dragonId, saleValue }))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicDragonsRow));