import { GENERATION_FETCH_BEGIN, GENERATION_FETCH_SUCCESS, GENERATION_FETCH_FAILURE } from '../types/generationTypes';

const initialState = {
    content: {},
    errorMessage: ''
}

const generationReducer = (state = initialState, action) => {
    switch (action.type) {

        case GENERATION_FETCH_SUCCESS:
            return { ...state, content: action.payload, errorMessage: '' };
        case GENERATION_FETCH_FAILURE:
            return { ...initialState, errorMessage: action.payload };
        case GENERATION_FETCH_BEGIN:
        default:
            return state;
    }
}

export default generationReducer;