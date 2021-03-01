import {
    ACCOUNT_FETCH_BEGIN,
    ACCOUNT_FETCH_SUCCESS,
    ACCOUNT_FETCH_FAILURE,
    ACCOUNT_LOGOUT_SUCCESS,
    ACCOUNT_LOGOUT_BEGIN,
    ACCOUNT_FETCH_FAILURE,
    ACCOUNT_LOGOUT_FAILURE,
    ACCOUNT_AUTHENTICATED_FAILURE,
    ACCOUNT_AUTHENTICATED_SUCCESS
} from '../types/accountType';

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
    dispatch({ type: ACCOUNT_LOGOUT_BEGIN });
    return fetch(`/account/logout`, {
        credentials: 'include'
    }).then(response => {
        if (json.type === 'error') {
            dispatch({
                type: ACCOUNT_LOGOUT_FAILURE,
                message: json.message
            })
        }
        else {
            dispatch({
                type: ACCOUNT_LOGOUT_SUCCESS,
                ...json
            })
        }
    })
        .catch(error => {
            dispatch({
                type: ACCOUNT_LOGOUT_FAILURE,
                payload: error.message
            })
        })
}

export const login = ({ username, password }) => dispatch => {
    dispatch({ type: ACCOUNT_FETCH_BEGIN });

    fetch('/account/login', {
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

export const fetchAuthenticated = dispatch => {

    fetch('/account/authenticated', {
        credential: 'include'
    })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: ACCOUNT_AUTHENTICATED_FAILURE,
                    payload: data.message
                })
            }
            else {
                dispatch({
                    type: ACCOUNT_AUTHENTICATED_SUCCESS,
                })
            }
        }))
        .catch(error => {
            dispatch({
                type: ACCOUNT_AUTHENTICATED_FAILURE,
                payload: error.message
            })
        })
}
