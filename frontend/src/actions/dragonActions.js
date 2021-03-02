import { DRAGON_CREATE_BEGIN, DRAGON_CREATE_SUCCESS, DRAGON_CREATE_FAILURE } from '../types/dragonTypes';

export const createDragon = dispatch => {
    dispatch({ type: DRAGON_CREATE_BEGIN });

    return fetch('/dragon/new')
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: DRAGON_CREATE_FAILURE,
                    payload: data.message
                })
            }
            else {
                return dispatch({
                    type: DRAGON_CREATE_SUCCESS,
                    payload: data.dragon
                })
            }
        }))
        .catch(error => {
            dispatch({
                type: DRAGON_CREATE_FAILURE,
                payload: error.message
            })
        })
}
