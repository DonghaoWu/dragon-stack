import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { selectMatronDragon } from '../../redux/actions/mateDragonActions'

class MatingOptions extends Component {

    handleChange = (e) => {
        const { accountDragons, selectMatronDragon } = this.props;
        if (e.target.value === 'Select') {
            selectMatronDragon({ dragon: {} });
            return;
        }
        selectMatronDragon({ dragon: accountDragons.content[e.target.value] });
    }

    render() {
        const { accountDragons } = this.props;
        return (
            <div>
                <span>Pick one of your dragons to mate with.</span>
                <br />
                <select name='matron-dragons' className="matron-dragons-select" onChange={this.handleChange}>
                    <option>Select</option>
                    {
                        accountDragons.content.map((dragon, index) => {
                            const { dragonId, generationId, nickname } = dragon;
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