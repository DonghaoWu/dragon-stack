import { GENERATION_FETCH_BEGIN, GENERATION_FETCH_SUCCESS, GENERATION_FETCH_FAILURE } from '../types/generationTypes';

export const fetchGeneration = dispatch => {
    dispatch({ type: GENERATION_FETCH_BEGIN });

    fetch('/generation')
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: GENERATION_FETCH_FAILURE,
                    payload: data.message
                })
            }
            else {
                dispatch({
                    type: GENERATION_FETCH_SUCCESS,
                    payload: data.generation
                })
            }
        }))
        .catch(error => {
            dispatch({
                type: GENERATION_FETCH_FAILURE,
                payload: error.message
            })
        })
}
