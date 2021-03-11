import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { connect } from 'react-redux';
import { createDragon } from '../redux/actions/dragonActions'

const Dragon = ({ dragon, createDragon }) => {
    return (
        <div>
            <Button onClick={createDragon}>Create a new dragon in current generation</Button>
            <br />
            <br />
            <div>
                {
                    dragon.createSuccess ?
                        <div className='dragon-card'><DragonAvatar dragon={dragon} /></div>
                        : <div>{dragon.message}</div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        dragon: state.dragon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createDragon: () => dispatch(createDragon)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dragon);