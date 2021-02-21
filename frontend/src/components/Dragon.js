import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { connect } from 'react-redux';
import { fetchDragon } from '../actions/dragonActions'

const Dragon = ({ dragon, dispatchDragon }) => {
    return (
        <div>
            <Button onClick={dispatchDragon}>Create a new dragon in current generation</Button>
            <DragonAvatar dragon={dragon} />
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
        dispatchDragon: () => dispatch(fetchDragon)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dragon);