import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { generationActionCreator, fetchGeneration } from '../redux/actions/generationActions';
import Dragon from './Dragon';
import Moment from 'react-moment';

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
        <div className='generation-info-container'>
            {
                (generation.errorMessage) ?
                    <div>{generation.errorMessage}</div>
                    :
                    <div className='generation-dragon'>
                        <div className='generation-info'>
                            <h5>Current Generation: {generation.content.generationId}</h5>
                            <h5>Next Generation: <Moment format="YYYY/MM/DD hh:mm:ss">{new Date(generation.content.expiration).toString()}</Moment></h5>
                            <h5>Time now: <Moment format="YYYY/MM/DD hh:mm:ss">{new Date().toString()}</Moment></h5>
                        </div>
                        <Dragon />
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