import { BUY_DRAGON_BEGIN, BUY_DRAGON_FAILURE, BUY_DRAGON_SUCCESS } from '../types/buyDragonTypes';
import { ACCOUNT_LOGOUT_SUCCESS } from '../types/accountTypes';

const initialState = {
    content: {},
    errorMessage: '',
    buyDragonSuccess: false
}

const buyDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_DRAGON_BEGIN:
            return initialState;
        case BUY_DRAGON_FAILURE:
            return { ...initialState, errorMessage: action.payload }
        case BUY_DRAGON_SUCCESS:
            return { ...state, content: action.payload, errorMessage: '', buyDragonSuccess: true }
        case ACCOUNT_LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default buyDragonReducer;