import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonAvatar from './DragonAvatar';

class PublicDragonsRow extends Component {

    render() {
        return (
            <div className='dragon-card'>
                <div>Sale value:{this.props.dragon.saleValue}</div>
                <br />
                <DragonAvatar dragon={this.props.dragon} />
            </div>
        )
    }
}

export default PublicDragonsRow;