import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonAvatar from './DragonAvatar';
import { fetchAccountDragons } from '../redux/actions/accountDragonActions';
import { updateDragon } from '../redux/actions/updateDragonActions';

class AccountDragonRow extends Component {
    state = {
        previousNickname: this.props.dragon.nickname,
        previousSaleValue: this.props.dragon.saleValue,
        previousIsPublic: this.props.dragon.isPublic,
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
                alert(
                    `Your dragon is successfull changed.

Nickname: from [${this.state.previousNickname}] to [${this.state.nickname}]
Sale value: from [${this.state.previousSaleValue}] to [${this.state.saleValue}]
Public: from [${this.state.previousIsPublic}] to [${this.state.isPublic}]
                `);
            })
    }

    render() {
        return (
            <div className='dragon-card'>
                <div className='edit-fields'>
                    <span>Nickname:{' '}
                        <input
                            type='text'
                            name='nickname'
                            value={this.state.nickname}
                            onChange={this.handleInputChange}
                            disabled={!this.state.edit}
                        />
                    </span>
                    <span>Sale Value:{' '}
                        <input
                            type='number'
                            name='saleValue'
                            value={this.state.saleValue}
                            onChange={this.handleInputChange}
                            disabled={!this.state.edit}
                        />
                    </span>
                    <span>Sire Value:{' '}
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
        fetchAccountDragons: () => dispatch(fetchAccountDragons),
        updateDragon: ({ dragonId, nickname, isPublic, saleValue, sireValue }) => dispatch(updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDragonRow);