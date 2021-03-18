import { ACCOUNT_INFO_FETCH_BEGIN, ACCOUNT_INFO_FETCH_FAILURE, ACCOUNT_INFO_FETCH_SUCCESS } from '../types/accountInfoTypes';

export const fetchAccountInfo = dispatch => {
    dispatch({ type: ACCOUNT_INFO_FETCH_BEGIN });

    return fetch('/account/user-info', {
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
                    payload: data.userInfo
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