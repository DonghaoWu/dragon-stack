import { DRAGON_FETCH_BEGIN, DRAGON_FETCH_SUCCESS, DRAGON_FETCH_FAILURE } from '../types/dragonTypes';

const initialState = {
    dragonId: '',
    generationId: '',
    nickname: '',
    birthdate: '',
    traits: [],
    fetchSuccess: false,
    message: ''
}

const dragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case DRAGON_FETCH_BEGIN:
            return { ...state, fetchSuccess: false, message: '' };
        case DRAGON_FETCH_SUCCESS:
            return { ...state, fetchSuccess: true, ...action.payload, message: '' };
        case DRAGON_FETCH_FAILURE:
            return { ...state, fetchSuccess: false, message: action.payload };
        default:
            return state;
    }
}

export default dragonReducer;