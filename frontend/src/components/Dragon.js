import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { connect } from 'react-redux';
import { createDragon } from '../redux/actions/dragonActions'

const Dragon = ({ newDragon, createDragon }) => {
    return (
        <div>
            <Button onClick={createDragon}>Create a new dragon in current generation</Button>
            <br />
            <br />
            <div>
                {
                    newDragon.createSuccess ?
                        <div className='dragon-card'><DragonAvatar dragon={newDragon.dragon} /></div>
                        : <div>{newDragon.errorMessage}</div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        newDragon: state.newDragon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createDragon: () => dispatch(createDragon)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dragon);