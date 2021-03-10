import { ACCOUNT_INFO_FETCH_BEGIN, ACCOUNT_INFO_FETCH_FAILURE, ACCOUNT_INFO_FETCH_SUCCESS } from '../types/accountInfo';

export const fetchAccountInfo = dispatch => {
    dispatch({ type: ACCOUNT_INFO_FETCH_BEGIN });

    return fetch('/account/info', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: ACCOUNT_INFO_FETCH_FAILURE,
                    payload: data.message
                })
            }
            else {
                return dispatch({
                    type: ACCOUNT_INFO_FETCH_SUCCESS,
                    payload: data.info
                })
            }
        }))
        .catch(error => {
            return dispatch({
                type: ACCOUNT_INFO_FETCH_FAILURE,
                payload: error.message
            })
        })
}