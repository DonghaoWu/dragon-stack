import { GENERATION_FETCH_BEGIN, GENERATION_FETCH_SUCCESS, GENERATION_FETCH_FAILURE } from '../types/generationTypes';

export const fetchGeneration = dispatch => {
    dispatch({ type: GENERATION_FETCH_BEGIN });

    return fetch('/generation')
        .then(response => response.json())
        .then((data => {
            // error from backend error handler
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
            // error not from backend
            dispatch({
                type: GENERATION_FETCH_FAILURE,
                payload: error.message
            })
        })
}
