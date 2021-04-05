import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateDragon } from '../../redux/actions/updateDragonActions';

import DragonAvatar from '../DragonAvatar/index';
import './styles.css';

class AccountDragonRow extends Component {
    state = {
        nickname: this.props.dragon.nickname,
        isPublic: this.props.dragon.isPublic,
        saleValue: this.props.dragon.saleValue,
        sireValue: this.props.dragon.sireValue,
        edit: false
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCheckBoxChange = e => {
        this.setState({ isPublic: e.target.checked })
    }

    openEditMode = () => {
        this.setState({ edit: true });
    }

    saveChange = () => {
        this.props.updateDragon({
            dragonId: this.props.dragon.dragonId,
            nickname: this.state.nickname,
            isPublic: this.state.isPublic,
            saleValue: this.state.saleValue,
            sireValue: this.state.sireValue
        })
            .then(() => {
                if (this.props.updateDragonState.errorMessage) {
                    alert(this.props.updateDragonState.errorMessage);
                    return;
                }
                this.setState({ edit: false });
            })
    }

    render() {
        return (
            <div className='dragon-card'>
                <div className='edit-fields'>
                    <span className='edit-row'>
                        <label>Nickname:</label>
                        <input
                            type='text'
                            name='nickname'
                            value={this.state.nickname}
                            onChange={this.handleInputChange}
                            disabled={!this.state.edit}
                        />
                    </span>
                    <span className='edit-row'>
                        <label>Sale Value:</label>
                        <input
                            label='Sale Value'
                            type='number'
                            name='saleValue'
                            value={this.state.saleValue}
                            onChange={this.handleInputChange}
                            disabled={!this.state.edit}
                        />
                    </span>
                    <span className='edit-row'>
                        <label>Sale Value:</label>
                        <input
                            type='number'
                            name='sireValue'
                            value={this.state.sireValue}
                            onChange={this.handleInputChange}
                            disabled={!this.state.edit}
                        />
                    </span>
                    <span>Public:{' '}
                        <input
                            type='checkbox'
                            name='isPublic'
                            checked={this.state.isPublic}
                            onChange={this.handleCheckBoxChange}
                            disabled={!this.state.edit}
                        />
                    </span>
                    {
                        this.state.edit ?
                            <button onClick={this.saveChange}>Save</button>
                            :
                            <button onClick={this.openEditMode}>Edit</button>
                    }
                </div>
                <br />
                <DragonAvatar dragon={this.props.dragon} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        updateDragonState: state.updateDragon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateDragon: ({ dragonId, nickname, isPublic, saleValue, sireValue }) => dispatch(updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDragonRow);