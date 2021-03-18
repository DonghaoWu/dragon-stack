import { UPDATE_DRAGON_BEGIN, UPDATE_DRAGON_FAILURE, UPDATE_DRAGON_SUCCESS } from '../types/updateDragonTypes';
import { ACCOUNT_LOGOUT_SUCCESS } from '../types/accountTypes';

const initialState = {
    content: {},
    errorMessage: '',
    updateDragonSuccess: false
}

const updateDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DRAGON_FAILURE:
            return { ...initialState, errorMessage: action.payload }
        case UPDATE_DRAGON_SUCCESS:
            return { ...state, content: action.payload, errorMessage: '', updateDragonSuccess: true }
        case ACCOUNT_LOGOUT_SUCCESS:
            return initialState;
        case UPDATE_DRAGON_BEGIN:
        default:
            return state;
    }
}

export default updateDragonReducer;