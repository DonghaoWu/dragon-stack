import React, { Component } from 'react';
import DragonAvatar from './DragonAvatar';

class AccountDragonRow extends Component {
    state = {
        currentNickname: this.props.dragon.nickname,
        nickname: this.props.dragon.nickname,
        edit: false
    }

    handleChange = e => {
        this.setState({ nickname: e.target.value });
    }

    openEditMode = () => {
        this.setState({ edit: true });
    }

    saveChange = () => {
        console.log(this.props.dragon.dragonId, this.state.nickname)
        fetch(`/dragon/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    dragonId: this.props.dragon.dragonId,
                    nickname: this.state.nickname
                }
            )
        })
            .then(response => response.json())
            .then(data => {
                if (data.type === 'error') {
                    alert(data.message);
                }
                else {
                    alert(`Your dragon nickname is successfull changed from [${this.state.currentNickname}] to [${this.state.nickname}]`);
                    this.setState({ edit: false });
                }
            })
            .catch(error => {
                alert(error.message)
            })
    }

    render() {
        return (
            <div className='dragon-card'>
                <div className='edit-nickname'>
                    <input
                        type='text'
                        value={this.state.nickname}
                        onChange={this.handleChange}
                        disabled={!this.state.edit}
                    />
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

export default AccountDragonRow;