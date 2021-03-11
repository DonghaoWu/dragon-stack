import { ACCOUNT_DRAGON_FETCH_BEGIN, ACCOUNT_DRAGON_FETCH_FAILURE, ACCOUNT_DRAGON_FETCH_SUCCESS } from '../types/accountDragonTypes';

const initialState = {
    accountDragons: [],
    fetchAccountDragonsSuccess: false,
    errorMessage: ''
}

const accountDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_DRAGON_FETCH_BEGIN:
            return { ...state }
        case ACCOUNT_DRAGON_FETCH_FAILURE:
            return { ...initialState, errorMessage: action.payload }
        case ACCOUNT_DRAGON_FETCH_SUCCESS:
            return { ...state, accountDragons: action.payload, errorMessage: '', fetchAccountDragonsSuccess: true }
        default:
            return state;
    }
}

export default accountDragonReducer;