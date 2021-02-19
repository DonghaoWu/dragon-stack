import React, { useState, useEffect } from 'react';

const Generation = () => {
    useEffect(() => {
        fetchNextGeneration();

        return clearTimeout(timer)
    }, [])

    const [generation, setGeneration] = useState({
        generationId: '',
        expiration: ''
    });

    const [timer, setTimer] = useState(null)

    const fetchGeneration = async () => {
        try {
            const res = await fetch('generation');
            const data = await res.json();
            setGeneration(data.generation);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchNextGeneration = () => {
        fetchGeneration();

        let delay = new Date(generation.expiration).getTime() - new Date().getTime();

        delay = Math.max(delay, 3000)

        setTimer(setTimeout(() => {
            fetchNextGeneration();
        }, delay))
    }

    return (
        <div>
            <h3>Generation Id: {generation.generationId}</h3>
            <h4>Expires on: {new Date(generation.expiration).toString()}</h4>
        </div>
    )
}

export default Generation;