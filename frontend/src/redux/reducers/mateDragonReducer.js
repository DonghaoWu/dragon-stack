import { MATE_DRAGON_BEGIN, MATE_DRAGON_FAILURE, MATE_DRAGON_SUCCESS } from '../types/mateDragonTypes';

const initialState = {
    content: {},
    errorMessage: '',
    mateDragonSuccess: false,
    matronDragon: {}
}

const mateDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SELECT_MATRON_DRAGON":
            return { ...initialState, matronDragon: action.payload }
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