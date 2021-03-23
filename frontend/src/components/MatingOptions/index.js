import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { mateDragon } from '../../redux/actions/mateDragonActions';
import { selectMatronDragon } from '../../redux/actions/mateDragonActions'

class MatingOptions extends Component {

    handleChange = (e) => {
        if (e.target.value === 'Select') {
            this.props.selectMatronDragon({ dragon: {} });
            return;
        }
        this.props.selectMatronDragon({ dragon: this.props.accountDragons.content[e.target.value] });
    }

    render() {
        const { accountDragons, selectMatronDragon } = this.props;
        return (
            <div>
                <span>Pick one of your dragons to mate with.</span>
                <br />
                <select name='matron-dragons' className="matron-dragons-select" onChange={this.handleChange}>
                    <option>Select</option>
                    {
                        this.props.accountDragons.content.map((dragon, index) => {
                            const { dragonId, generationId, nickname, sireValue } = dragon;
                            return (
                                <option key={dragonId} value={index}> GID: {generationId}, ID:{dragonId}, Nickname:{nickname}</option>
                            )
                        })
                    }
                </select>
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