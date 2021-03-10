import { ACCOUNT_INFO_FETCH_BEGIN, ACCOUNT_INFO_FETCH_FAILURE, ACCOUNT_INFO_FETCH_SUCCESS } from '../types/accountInfo';

const initialState = {
    info: {},
    message: ''
}

const accountInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_INFO_FETCH_BEGIN:
            return { ...state }
        case ACCOUNT_INFO_FETCH_FAILURE:
            return { ...state, message: action.payload }
        case ACCOUNT_INFO_FETCH_SUCCESS:
            return { ...state, info: action.payload }
        default:
            return state;
    }
}

export default accountInfoReducer;