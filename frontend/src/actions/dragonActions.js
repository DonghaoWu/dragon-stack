import { DRAGON_FETCH_BEGIN, DRAGON_FETCH_SUCCESS, DRAGON_FETCH_FAILURE } from '../types/dragonTypes';

export const fetchDragon = dispatch => {
    dispatch({ type: DRAGON_FETCH_BEGIN });

    fetch('/dragon/new')
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: DRAGON_FETCH_FAILURE,
                    payload: data.message
                })
            }
            else {
                return dispatch({
                    type: DRAGON_FETCH_SUCCESS,
                    payload: data.dragon
                })
            }
        }))
        .catch(error => {
            dispatch({
                type: DRAGON_FETCH_FAILURE,
                payload: error.message
            })
        })
}
