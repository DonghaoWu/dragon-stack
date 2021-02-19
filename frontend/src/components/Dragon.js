import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';

const Dragon = () => {

    const [dragon, setDragon] = useState({
        dragonId: '',
        generationId: '',
        nickname: '',
        birthdate: '',
        traits: []
    });

    const { dragonId, generationId, nickname, birthdate, traits } = dragon;

    const fetchDragon = async () => {
        try {
            const res = await fetch('/dragon/new');
            const data = await res.json();
            setDragon(data.dragon);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Button onClick={fetchDragon}>Create a new dragon in current generation</Button>
            <DragonAvatar dragon={dragon} />
        </div>
    )
}

export default Dragon;