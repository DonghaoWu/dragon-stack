import { MATE_DRAGON_BEGIN, MATE_DRAGON_FAILURE, MATE_DRAGON_SUCCESS, SELECT_MATRON_DRAGON } from '../types/mateDragonTypes';

const initialState = {
    content: {},
    errorMessage: '',
    mateDragonSuccess: false,
    selectedMatronDragon: {}
}

const mateDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_MATRON_DRAGON:
            return { ...state, selectedMatronDragon: action.payload }
        case MATE_DRAGON_BEGIN:
            return initialState;
        case MATE_DRAGON_FAILURE:
            return { ...initialState, errorMessage: action.payload }
        case MATE_DRAGON_SUCCESS:
            return { ...state, content: action.payload, errorMessage: '', mateDragonSuccess: true }
        default:
            return state;
    }
}

export default mateDragonReducer;