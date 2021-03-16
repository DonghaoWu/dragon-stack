import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mateDragon } from '../redux/actions/mateDragonActions';
import { withRouter } from "react-router-dom";

import { selectMatronDragon } from '../redux/actions/mateDragonActions'

class MatingOptions extends Component {
    render() {
        const { accountDragons, selectMatronDragon } = this.props;
        return (
            <div>
                <span>Pick one of your dragons to mate with.</span>
                <br />
                <br />
                {
                    this.props.accountDragons.content.map((dragon, index) => {
                        const { dragonId, generationId, nickname } = dragon;
                        return (
                            <span key={dragonId}>
                                <button onClick={() => selectMatronDragon({ dragon: accountDragons.content[index] })}>G:{generationId}.I:{dragonId}.N:{nickname}</button>
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
        selectMatronDragon: ({ dragon }) => dispatch(selectMatronDragon({ dragon }))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MatingOptions));