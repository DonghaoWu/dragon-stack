import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { connect } from 'react-redux';

const Dragon = ({ newDragon, createDragon }) => {
    return (
        <div>
            <div>
                {
                    newDragon.createSuccess ?
                        <div className='dragon-card'><DragonAvatar dragon={newDragon.content} /></div>
                        : <div className='new-dragon-warning'>{newDragon.errorMessage}</div>
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

export default connect(mapStateToProps, null)(Dragon);