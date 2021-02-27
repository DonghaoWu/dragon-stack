import { ACCOUNT_FETCH_BEGIN, ACCOUNT_FETCH_SUCCESS, ACCOUNT_FETCH_FAILURE, ACCOUNT_LOGOUT_SUCCESS } from '../types/accountTypes';

const initialState = {
    loggedIn: false,
    message: ''
}

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_FETCH_BEGIN:
            return { ...state, loggedIn: false, message: '' };
        case ACCOUNT_FETCH_SUCCESS:
            return { ...state, loggedIn: true, message: '' };
        case ACCOUNT_FETCH_FAILURE:
            return { ...state, loggedIn: false, message: action.payload };
        case ACCOUNT_LOGOUT_SUCCESS:
            return { ...state, loggedIn: false, message: '' }
        default:
            return state;
    }
}

export default accountReducer;