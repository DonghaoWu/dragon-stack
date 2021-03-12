import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { generationActionCreator, fetchGeneration } from '../redux/actions/generationActions'

const Generation = ({ generation, fetchGeneration }) => {
    useEffect(() => {
        fetchNextGeneration();
        return () => clearTimeout(timer);
    }, [generation.content.generationId])

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
                (generation.errorMessage) ?
                    <div>{generation.errorMessage}</div>
                    :
                    <div>
                        <h3>Generation Id: {generation.content.generationId}</h3>
                        <h4>Expires on: {new Date(generation.content.expiration).toString()}</h4>
                        <h4>Time now: {new Date().toString()}</h4>
                    </div>
            }
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
        fetchGeneration: () => dispatch(fetchGeneration)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Generation);