import { ACCOUNT_INFO_FETCH_BEGIN, ACCOUNT_INFO_FETCH_FAILURE, ACCOUNT_INFO_FETCH_SUCCESS } from '../types/accountInfo';

const initialState = {
    content: {},
    errorMessage: ''
}

const accountInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_INFO_FETCH_FAILURE:
            return { ...initialState, errorMessage: action.payload }
        case ACCOUNT_INFO_FETCH_SUCCESS:
            return { ...state, content: action.payload, errorMessage: "" }
        case ACCOUNT_INFO_FETCH_BEGIN:
        default:
            return state;
    }
}

export default accountInfoReducer;