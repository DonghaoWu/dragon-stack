import { BUY_DRAGON_BEGIN, BUY_DRAGON_FAILURE, BUY_DRAGON_SUCCESS } from '../types/buyDragonActions';

const initialState = {
    content: {},
    errorMessage: '',
    buyDragonSuccess: false
}

const buyDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_DRAGON_FAILURE:
            return { ...initialState, errorMessage: action.payload }
        case BUY_DRAGON_SUCCESS:
            return { ...state, content: action.payload, errorMessage: '', buyDragonSuccess: true }
        case BUY_DRAGON_BEGIN:
        default:
            return state;
    }
}

export default buyDragonReducer;