import { GENERATION_FETCH_BEGIN, GENERATION_FETCH_SUCCESS, GENERATION_FETCH_FAILURE } from '../types/generationTypes';

const initialState = {
    generation: {},
    errorMessage: ''
}

const generationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GENERATION_FETCH_BEGIN:
            return { ...state, errorMessage: '' };
        case GENERATION_FETCH_SUCCESS:
            return { ...state, generation: action.payload, errorMessage: '' };
        case GENERATION_FETCH_FAILURE:
            return { ...state, generation: {}, errorMessage: action.payload };
        default:
            return state;
    }
}

export default generationReducer;