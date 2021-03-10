import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonAvatar from './DragonAvatar';
import { fetchAccountDragons } from '../actions/accountDragonActions';

class AccountDragonRow extends Component {
    state = {
        currentNickname: this.props.dragon.nickname,
        currentSaleValue: this.props.dragon.saleVale,
        currentIsPublic: this.props.dragon.isPublic,
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
        fetch(`/dragon/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    dragonId: this.props.dragon.dragonId,
                    nickname: this.state.nickname,
                    isPublic: this.state.isPublic,
                    saleValue: this.state.saleValue,
                    sireValue: this.state.sireValue
                }
            )
        })
            .then(response => response.json())
            .then(data => {
                if (data.type === 'error') {
                    throw new Error(data.message);
                }
                else {
                    return this.props.fetchAccountDragons();
                }
            })
            .then(() => {
                this.setState({ edit: false });
                alert(
                    `Your dragon is successfull changed.
                Nickname: from [${this.state.currentNickname}] to [${this.state.nickname}]
                Sale value: from [${this.state.currentSaleValue}] to [${this.state.saleValue}]
                Public: from [${this.state.currentIsPublic}] to [${this.state.isPublic}]
                `);
            })
            .catch(error => {
                alert(error.message)
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

const mapDispatchToProps = dispatch => {
    return {
        fetchAccountDragons: () => dispatch(fetchAccountDragons)
    }
}

export default connect(null, mapDispatchToProps)(AccountDragonRow);