import { DRAGON_CREATE_BEGIN, DRAGON_CREATE_SUCCESS, DRAGON_CREATE_FAILURE } from '../types/dragonTypes';
import { ACCOUNT_LOGOUT_SUCCESS } from '../types/accountTypes';

const initialState = {
    dragonId: '',
    generationId: '',
    nickname: '',
    birthdate: '',
    traits: [],
    createSuccess: false,
    message: ''
}

const dragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case DRAGON_CREATE_BEGIN:
        case ACCOUNT_LOGOUT_SUCCESS:
            return { ...state, ...initialState };
        case DRAGON_CREATE_SUCCESS:
            return { ...state, createSuccess: true, ...action.payload, message: '' };
        case DRAGON_CREATE_FAILURE:
            return { ...state, ...initialState, message: action.payload };
        default:
            return state;
    }
}

export default dragonReducer;