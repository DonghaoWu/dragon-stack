import { PUBLIC_DRAGONS_FETCH_BEGIN, PUBLIC_DRAGONS_FETCH_SUCCESS, PUBLIC_DRAGONS_FETCH_FAILURE } from '../types/publicDragonsTypes';

export const fetchPublicDragons = (dispatch) => {
    dispatch({ type: PUBLIC_DRAGONS_FETCH_BEGIN });

    return fetch('/dragon/public-dragons', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: PUBLIC_DRAGONS_FETCH_FAILURE,
                    payload: data.message
                })
            }
            else {
                return dispatch({
                    type: PUBLIC_DRAGONS_FETCH_SUCCESS,
                    payload: data.dragons
                })
            }
        }))
        .catch(error => {
            return dispatch({
                type: PUBLIC_DRAGONS_FETCH_FAILURE,
                payload: error.message
            })
        })
}