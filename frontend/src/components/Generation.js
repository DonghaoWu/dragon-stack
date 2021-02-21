import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { generationActionCreator, fetchGeneration } from '../actions/generationActions'

const Generation = ({ generation, dispatchGeneration }) => {
    useEffect(() => {
        fetchNextGeneration();
        return clearTimeout(timer);
    }, [generation.generationId])

    const [timer, setTimer] = useState(null);

    const fetchNextGeneration = () => {
        dispatchGeneration();

        setTimer(setTimeout(() => {
            fetchNextGeneration();
        }, 3000))
    }

    return (
        <div>
            <h3>Generation Id: {generation.generationId}</h3>
            <h4>Expires on: {new Date(generation.expiration).toString()}</h4>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        generation: state.generation
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchGeneration: () => dispatch(fetchGeneration)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Generation);