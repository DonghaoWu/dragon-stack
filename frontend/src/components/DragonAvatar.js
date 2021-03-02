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
    size: { small: 100, medium: 200, large: 300, enormous: 400 }
}

const DragonAvatar = ({ dragon }) => {

    const { dragonId, generationId, nickname, birthdate, traits } = dragon;

    const dragonPropertyMap = {};

    traits.forEach(trait => {
        const { traitType, traitValue } = trait;
        dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
    });

    const sizing = { width: dragonPropertyMap.size, height: dragonPropertyMap.size }

    const dragonImage = () => {
        return (
            <div className='dragon-avatar-image-wrapper'>
                <div className='dragon-avatar-image-background' style={{ backgroundColor: dragonPropertyMap.backgroundColor, ...sizing }}></div>
                <img src={dragonPropertyMap.pattern} className='dragon-avatar-image-pattern' style={{ ...sizing }} />
                <img src={dragonPropertyMap.build} className='dragon-avatar-image' style={{ ...sizing }} />
            </div>
        )
    }

    let image = dragonImage();

    if (!dragon.dragonId) return <div></div>

    return (
        <div>
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
            {image}
        </div>
    )
}

export default DragonAvatar;