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

const initialState = {
    loggedIn: false,
    content: {},
    errorMessage: ''
}

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_SIGNUP_BEGIN:
        case ACCOUNT_SIGNIN_BEGIN:
        case ACCOUNT_AUTHENTICATED_BEGIN:
            return state;
        case ACCOUNT_SIGNUP_SUCCESS:
        case ACCOUNT_SIGNIN_SUCCESS:
        case ACCOUNT_AUTHENTICATED_SUCCESS:
            return { ...state, loggedIn: true, errorMessage: '', content: action.payload };
        case ACCOUNT_LOGOUT_SUCCESS:
            return { ...state, loggedIn: false, errorMessage: '', content: action.payload };
        case ACCOUNT_SIGNUP_FAILURE:
        case ACCOUNT_SIGNIN_FAILURE:
        case ACCOUNT_AUTHENTICATED_FAILURE:
            return { ...initialState, errorMessage: action.payload };
        case ACCOUNT_LOGOUT_FAILURE:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}

export default accountReducer;