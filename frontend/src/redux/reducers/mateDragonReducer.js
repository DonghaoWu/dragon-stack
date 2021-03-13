import { MATE_DRAGON_BEGIN, MATE_DRAGON_FAILURE, MATE_DRAGON_SUCCESS } from '../types/mateDragonTypes';

const initialState = {
    content: {},
    errorMessage: '',
    mateDragonSuccess: false
}

const mateDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case MATE_DRAGON_FAILURE:
            return { ...initialState, errorMessage: action.payload }
        case MATE_DRAGON_SUCCESS:
            return { ...state, content: action.payload, errorMessage: '', updateDragonSuccess: true }
        case MATE_DRAGON_BEGIN:
        default:
            return state;
    }
}

export default mateDragonReducer;