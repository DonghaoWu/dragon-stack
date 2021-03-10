import { ACCOUNT_DRAGON_FETCH_BEGIN, ACCOUNT_DRAGON_FETCH_FAILURE, ACCOUNT_DRAGON_FETCH_SUCCESS } from '../types/accountDragonTypes';

const initialState = {
    dragons: [],
    message: ''
}

const accountDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_DRAGON_FETCH_BEGIN:
            return { ...state }
        case ACCOUNT_DRAGON_FETCH_FAILURE:
            return { ...state, message: action.payload }
        case ACCOUNT_DRAGON_FETCH_SUCCESS:
            return { ...state, dragons: action.payload }
        default:
            return state;
    }
}

export default accountDragonReducer;