import { UPDATE_DRAGON_BEGIN, UPDATE_DRAGON_FAILURE, UPDATE_DRAGON_SUCCESS } from '../types/updateDragonTypes';

const initialState = {
    info: {},
    errorMessage: ''
}

const updateDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DRAGON_BEGIN:
            return { ...state }
        case UPDATE_DRAGON_FAILURE:
            return { ...initialState, errorMessage: action.payload }
        case UPDATE_DRAGON_SUCCESS:
            return { ...state, info: action.payload, errorMessage: '' }
        default:
            return state;
    }
}

export default updateDragonReducer;