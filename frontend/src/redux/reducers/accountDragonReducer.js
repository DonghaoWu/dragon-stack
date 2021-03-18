import { ACCOUNT_DRAGON_FETCH_BEGIN, ACCOUNT_DRAGON_FETCH_FAILURE, ACCOUNT_DRAGON_FETCH_SUCCESS } from '../types/accountDragonTypes';
import { ACCOUNT_LOGOUT_SUCCESS } from '../types/accountTypes';

const initialState = {
    content: [],
    errorMessage: '',
    fetchAccountDragonsSuccess: false,
}

const accountDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_DRAGON_FETCH_BEGIN:
            return { ...state }
        case ACCOUNT_DRAGON_FETCH_FAILURE:
            return { ...initialState, errorMessage: action.payload }
        case ACCOUNT_DRAGON_FETCH_SUCCESS:
            return { ...state, content: action.payload, errorMessage: '', fetchAccountDragonsSuccess: true }
        case ACCOUNT_LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default accountDragonReducer;