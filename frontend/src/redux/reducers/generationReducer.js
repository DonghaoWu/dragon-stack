import { GENERATION_FETCH_BEGIN, GENERATION_FETCH_SUCCESS, GENERATION_FETCH_FAILURE } from '../types/generationTypes';
import { ACCOUNT_LOGOUT_SUCCESS } from '../types/accountTypes';

const initialState = {
    content: {},
    errorMessage: '',
    fetchGenerationSuccess: false
}

const generationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GENERATION_FETCH_SUCCESS:
            return { ...state, content: action.payload, errorMessage: '', fetchGenerationSuccess: true };
        case GENERATION_FETCH_FAILURE:
            return { ...initialState, errorMessage: action.payload };
        case ACCOUNT_LOGOUT_SUCCESS:
            return initialState;
        case GENERATION_FETCH_BEGIN:
        default:
            return state;
    }
}

export default generationReducer;