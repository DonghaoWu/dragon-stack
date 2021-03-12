import { DRAGON_CREATE_BEGIN, DRAGON_CREATE_SUCCESS, DRAGON_CREATE_FAILURE } from '../types/dragonTypes';
import { ACCOUNT_LOGOUT_SUCCESS } from '../types/accountTypes';

const initialState = {
    content: {},
    createSuccess: false,
    errorMessage: ''
}

const newDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case DRAGON_CREATE_BEGIN:
        case ACCOUNT_LOGOUT_SUCCESS:// clear all state when logout.
            return { ...initialState };
        case DRAGON_CREATE_SUCCESS:
            return { ...state, createSuccess: true, content: action.payload, errorMessage: '' };
        case DRAGON_CREATE_FAILURE:
            return { ...initialState, errorMessage: action.payload };
        default:
            return state;
    }
}

export default newDragonReducer;