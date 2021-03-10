import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonAvatar from './DragonAvatar';
import MatingOptions from './MatingOptions';

class PublicDragonsRow extends Component {
    state = {
        displayOptions: false
    };

    toggleDisplayMatingOptions = () => {
        this.setState({ displayOptions: !this.state.displayOptions })
    }

    buy = () => {
        const { dragonId, saleValue } = this.props.dragon;
        fetch(`dragon/buy`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    dragonId,
                    saleValue
                }
            )
        })
            .then(response => response.json())
            .then(json => {
                alert(json.message);
                // if(json.type ==='error'){
                //     history.push('/account-dragons');
                // }
            })
            .catch(error => alert(error.message));
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

export default PublicDragonsRow;