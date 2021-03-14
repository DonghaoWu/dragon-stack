import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mateDragon } from '../redux/actions/mateDragonActions';
import { withRouter } from "react-router-dom";

import store from '../redux/store';

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

    handleSelectDragon = (index) => {
        store.dispatch({
            type: "SELECT_MATRON_DRAGON",
            payload: this.props.accountDragons.content[index]
        })
    }

    render() {
        return (
            <div>
                <h4>Pick one of your dragons to mate with.</h4>
                {
                    this.props.accountDragons.content.map((dragon, index) => {
                        const { dragonId, generationId, nickname } = dragon;
                        return (
                            <span key={dragonId}>
                                <button onClick={() => this.handleSelectDragon(index)}>G:{generationId}.I:{dragonId}.N:{nickname}</button>
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