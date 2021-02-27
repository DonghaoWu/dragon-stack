import { ACCOUNT_FETCH_BEGIN, ACCOUNT_FETCH_SUCCESS, ACCOUNT_FETCH_FAILURE } from '../types/accountType';

export const signup = ({ username, password }) => dispatch => {
    dispatch({ type: ACCOUNT_FETCH_BEGIN });

    fetch('/account/signup', {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { 'Content-type': 'application/json' },
        credential: 'include'
    })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: ACCOUNT_FETCH_FAILURE,
                    payload: data.message
                })
            }
            else {
                dispatch({
                    type: ACCOUNT_FETCH_SUCCESS,
                    payload: data
                })
            }
        }))
        .catch(error => {
            dispatch({
                type: ACCOUNT_FETCH_FAILURE,
                payload: error.message
            })
        })
}

export const logout = dispatch => {
    
}   
