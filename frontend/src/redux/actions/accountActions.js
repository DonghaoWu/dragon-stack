import {
    ACCOUNT_SIGNUP_BEGIN,
    ACCOUNT_SIGNUP_SUCCESS,
    ACCOUNT_SIGNUP_FAILURE,
    ACCOUNT_SIGNIN_BEGIN,
    ACCOUNT_SIGNIN_SUCCESS,
    ACCOUNT_SIGNIN_FAILURE,
    ACCOUNT_LOGOUT_BEGIN,
    ACCOUNT_LOGOUT_SUCCESS,
    ACCOUNT_LOGOUT_FAILURE,
    ACCOUNT_AUTHENTICATED_BEGIN,
    ACCOUNT_AUTHENTICATED_SUCCESS,
    ACCOUNT_AUTHENTICATED_FAILURE
} from '../types/accountTypes';

import { fetchAccountInfo } from './accountInfoActions'

export const signup = ({ username, password }) => dispatch => {
    dispatch({ type: ACCOUNT_SIGNUP_BEGIN });

    return fetch('/account/signup', {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: ACCOUNT_SIGNUP_FAILURE,
                    payload: data.message
                })
            }
            else {
                dispatch({
                    type: ACCOUNT_SIGNUP_SUCCESS,
                    payload: data.authInfo
                })
                dispatch(fetchAccountInfo);
            }
        }))
        .catch(error => {
            dispatch({
                type: ACCOUNT_SIGNUP_FAILURE,
                payload: error.message
            })
        })
}

export const login = ({ username, password }) => dispatch => {
    dispatch({ type: ACCOUNT_SIGNIN_BEGIN });

    return fetch('/account/login', {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: ACCOUNT_SIGNIN_FAILURE,
                    payload: data.message
                })
            }
            else {
                dispatch({
                    type: ACCOUNT_SIGNIN_SUCCESS,
                    payload: data.authInfo
                })
                dispatch(fetchAccountInfo);
            }
        }))
        .catch(error => {
            dispatch({
                type: ACCOUNT_SIGNIN_FAILURE,
                payload: error.message
            })
        })
}

export const fetchAuthenticated = dispatch => {
    dispatch({ type: ACCOUNT_AUTHENTICATED_BEGIN });

    return fetch('/account/authenticated', {
        credentials: 'include'
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
                    payload: data.authInfo
                })
                dispatch(fetchAccountInfo);
            }
        }))
        .catch(error => {
            return dispatch({
                type: ACCOUNT_AUTHENTICATED_FAILURE,
                payload: error.message
            })
        })
}

export const logout = dispatch => {
    dispatch({ type: ACCOUNT_LOGOUT_BEGIN });
    return fetch(`/account/logout`, {
        credentials: 'include'
    })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                dispatch({
                    type: ACCOUNT_LOGOUT_FAILURE,
                    payload: data.message
                })
            }
            else {
                dispatch({
                    type: ACCOUNT_LOGOUT_SUCCESS,
                    payload: data.authInfo
                })
            }
        }))
        .catch(error => {
            dispatch({
                type: ACCOUNT_LOGOUT_FAILURE,
                payload: error.message
            })
        })
}
