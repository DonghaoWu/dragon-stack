import React, { Component } from 'react';
import { connect } from 'react-redux';

class MatingOptions extends Component {
    mate = ({ matronDragonId, patronDragonId }) => () => {
        fetch('/dragon/mate', {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(
                {
                    matronDragonId,
                    patronDragonId
                }
            )
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                alert(json.message);

                // if(json.type !== 'error'){
                //     history.push('/account-dragons');
                // }
            })
            .catch(error => alert(error.message));
    }

    render() {
        return (
            <div>
                <h4>Pick one of your dragons to mate with.</h4>
                {
                    this.props.accountDragons.content.map(dragon => {
                        const { dragonId, generationId, nickname } = dragon;
                        return (
                            <span key={dragonId}>
                                <button onClick={this.mate({
                                    matronDragonId: dragonId,
                                    patronDragonId: this.props.patronDragonId
                                })}>G:{generationId}.I:{dragonId}.N:{nickname}</button>
                            </span>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        accountDragons: state.accountDragons
    }
}

export default connect(mapStateToProps, null)(MatingOptions);