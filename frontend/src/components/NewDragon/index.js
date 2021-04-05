import React from 'react';
import { connect } from 'react-redux';

import DragonAvatar from '../DragonAvatar/index';

import './styles.css';

const NewDragon = ({ newDragon }) => {
    return (
        <div>
            {
                newDragon.createSuccess ?
                    <div className='dragon-card'><DragonAvatar dragon={newDragon.content} /></div>
                    : <div className='new-dragon-warning'>{newDragon.errorMessage}</div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        newDragon: state.newDragon
    }
}

export default connect(mapStateToProps, null)(NewDragon);