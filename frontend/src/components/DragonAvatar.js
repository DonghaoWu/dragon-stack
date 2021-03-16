import React from 'react';
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
    size: { small: 80, medium: 160, large: 240, enormous: '80%' }
}

const DragonAvatar = ({ dragon }) => {

    const { dragonId, generationId, nickname, birthdate, traits } = dragon;

    const dragonPropertyMap = {};

    let dragonSize = '';

    traits.forEach(trait => {
        const { traitType, traitValue } = trait;
        dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
        if (traitType === 'size') dragonSize = traitValue;
    });

    // const sizing = { width: dragonPropertyMap.size, height: dragonPropertyMap.size }

    const dragonImage = () => {
        return (
            <div className='dragon-avatar-image-wrapper'>
                <div style={{ backgroundColor: dragonPropertyMap.backgroundColor, width: '25%', height: '25%' }} className={`dragon-avatar-image-background`}></div>
                <img src={dragonPropertyMap.pattern} style={{ width: '25%', height: '25%' }} className={`dragon-avatar-image-pattern`} />
                <img src={dragonPropertyMap.build} style={{ width: '25%', height: '25%' }} className={`dragon-avatar-image`} />
            </div>
        )
    }

    let image = dragonImage();

    if (!dragon.dragonId) return <div></div>

    return (
        <div>
            <div className='dragon-image-container-main'>
                {image}
            </div>
            <span>Dragon ID: {dragonId}</span>
            <br />
            <span>Generation ID: {generationId}</span>
            <br />
            <span>Nickname: {nickname}</span>
            <br />
            <span>Birthdate: {birthdate}</span>
            <br />

            {
                traits.map((trait, index) => {
                    return (
                        <div key={index}>
                            <span>{`${trait.traitType}: ${trait.traitValue}`}</span>
                            <br />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DragonAvatar;