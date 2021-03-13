import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mateDragon } from '../redux/actions/mateDragonActions';
import { withRouter } from "react-router-dom";

class MatingOptions extends Component {
    mate = ({ matronDragonId, patronDragonId }) => () => {
        this.props.mateDragon({ matronDragonId, patronDragonId })
            .then(() => {
                if (this.props.mateDragonState.errorMessage) {
                    alert(this.props.mateDragonState.errorMessage);
                }
                else {
                    this.props.history.push('/account-dragons');
                    alert(this.props.mateDragonState.content.message);
                }
            })
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
        accountDragons: state.accountDragons,
        mateDragonState: state.mateDragon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        mateDragon: ({ matronDragonId, patronDragonId }) => dispatch(mateDragon({ matronDragonId, patronDragonId }))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MatingOptions));