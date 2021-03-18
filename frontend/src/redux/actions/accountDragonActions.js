import { ACCOUNT_DRAGON_FETCH_BEGIN, ACCOUNT_DRAGON_FETCH_FAILURE, ACCOUNT_DRAGON_FETCH_SUCCESS } from '../types/accountDragonTypes';
import {} from '../types/accountTypes'

export const fetchAccountDragons = dispatch => {
    dispatch({ type: ACCOUNT_DRAGON_FETCH_BEGIN });

    return fetch('/dragon/account-dragons', { credentials: 'include' })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: ACCOUNT_DRAGON_FETCH_FAILURE,
                    payload: data.message
                })
            }
            else {
                return dispatch({
                    type: ACCOUNT_DRAGON_FETCH_SUCCESS,
                    payload: data.accountDragons
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