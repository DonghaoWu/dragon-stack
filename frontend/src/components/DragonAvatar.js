import React from 'react';
import Moment from 'react-moment';
import { skinny, sporty, spotted, slender, patchy, plain, stocky, striped } from '../assets/index.js';

const propertyMap = {
    backgroundColor: {
        black: '#263238',
        white: '#cfd8dc',
        green: '#a5d6a7',
        blue: '#0277bd'
    },
    build: { slender, stocky, sporty, skinny },
    pattern: { plain, striped, spotted, patchy },
    size: { small: '30%', medium: '50%', large: '70%', enormous: '90%' }
}

const DragonAvatar = (props) => {

    const { dragonId, generationId, nickname, birthdate, traits } = props.dragon;

    const dragonPropertyMap = {};

    const imageWrapper = props.imageWrapper || 'dragon-avatar-image-wrapper-main'

    traits.forEach(trait => {
        const { traitType, traitValue } = trait;
        dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
    });

    const sizing = { width: dragonPropertyMap.size, height: dragonPropertyMap.size }

    const dragonImage = () => {
        return (
            <div className={`${imageWrapper}`}>
                <div style={{ backgroundColor: dragonPropertyMap.backgroundColor, ...sizing }} className={`dragon-avatar-image-background`}></div>
                <img src={dragonPropertyMap.pattern} style={{ ...sizing }} className={`dragon-avatar-image-pattern`} />
                <img src={dragonPropertyMap.build} style={{ ...sizing }} className={`dragon-avatar-image`} />
            </div>
        )
    }

    let image = dragonImage();

    if (!dragonId) return <div></div>

    return (
        <div className='dragon-avatar-container'>
            {image}
            <div className='dragon-description'><span className='description-title'>Dragon ID:</span><span className='description-value'> {dragonId}</span></div>
            <div className='dragon-description'><span className='description-title'>Generation ID:</span><span className='description-value'> {generationId}</span></div>
            <div className='dragon-description'><span className='description-title'>Nickname:</span><span className='description-value'> {nickname}</span></div>
            <div className='dragon-description'><span className='description-title'>Birthdate: </span><span className='description-value'><Moment format="YYYY/MM/DD">{birthdate}</Moment></span></div>

            {
                traits.map((trait, index) => {
                    return (
                        <div key={index}>
                            <div className='dragon-description'><span className='description-title'>{`${trait.traitType}:`} </span><span className='description-value'>{`${trait.traitValue}`}</span></div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DragonAvatar;