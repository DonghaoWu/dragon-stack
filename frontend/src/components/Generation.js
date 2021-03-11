import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { generationActionCreator, fetchGeneration } from '../redux/actions/generationActions'

const Generation = ({ currentGeneration, fetchGeneration }) => {
    useEffect(() => {
        fetchNextGeneration();
        return () => clearTimeout(timer);
    }, [currentGeneration.generation.generationId])

    const [timer, setTimer] = useState(null);

    const fetchNextGeneration = () => {
        fetchGeneration();

        setTimer(setTimeout(() => {
            fetchNextGeneration();
        }, 3000))
    }

    return (
        <div>
            {
                (currentGeneration.generation.errorMessage) ?
                    <div>{currentGeneration.generation.errorMessage}</div>
                    :
                    <div>
                        <h3>Generation Id: {currentGeneration.generation.generationId}</h3>
                        <h4>Expires on: {new Date(currentGeneration.generation.expiration).toString()}</h4>
                        <h4>Time now: {new Date().toString()}</h4>
                    </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentGeneration: state.generation
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchGeneration: () => dispatch(fetchGeneration)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Generation);