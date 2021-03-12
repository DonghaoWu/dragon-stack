import { UPDATE_DRAGON_BEGIN, UPDATE_DRAGON_FAILURE, UPDATE_DRAGON_SUCCESS } from '../types/updateDragonTypes';

const initialState = {
    info: {},
    errorMessage: '',
    updateDragonSuccess: false
}

const updateDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DRAGON_BEGIN:
            return { ...state }
        case UPDATE_DRAGON_FAILURE:
            return { ...initialState, errorMessage: action.payload, updateDragonSuccess: false }
        case UPDATE_DRAGON_SUCCESS:
            return { ...state, info: action.payload, errorMessage: '', updateDragonSuccess: true }
        default:
            return state;
    }
}

export default updateDragonReducer;