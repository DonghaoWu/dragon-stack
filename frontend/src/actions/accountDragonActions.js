import { ACCOUNT_DRAGON_FETCH_BEGIN, ACCOUNT_DRAGON_FETCH_FAILURE, ACCOUNT_DRAGON_FETCH_SUCCESS } from '../types/accountDragonTypes';

export const fetchAccountDragons = dispatch => {
    dispatch({ type: ACCOUNT_DRAGON_FETCH_BEGIN });

    return fetch('/dragon/dragons', { credentials: 'include' })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: ACCOUNT_DRAGON_FETCH_FAILURE,
                    payload: data.message
                })
            }
            else {
                // console.log(data)
                return dispatch({
                    type: ACCOUNT_DRAGON_FETCH_SUCCESS,
                    payload: data.dragons
                })
            }
        }))
        .catch(error => {
            dispatch({
                type: ACCOUNT_DRAGON_FETCH_FAILURE,
                payload: error.message
            })
        })
}