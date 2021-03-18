import { PUBLIC_DRAGON_FETCH_BEGIN, PUBLIC_DRAGON_FETCH_FAILURE, PUBLIC_DRAGON_FETCH_SUCCESS } from '../types/publicDragonsTypes';
import { ACCOUNT_LOGOUT_SUCCESS } from '../types/accountTypes';

const initialState = {
    content: [],
    errorMessage: '',
    fetchPublicDragonSuccess: false
}

const publicDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case PUBLIC_DRAGON_FETCH_FAILURE:
            return { ...initialState, errorMessage: action.payload }
        case PUBLIC_DRAGON_FETCH_SUCCESS:
            return { ...state, content: action.payload, errorMessage: '', fetchPublicDragonSuccess: true }
        case ACCOUNT_LOGOUT_SUCCESS:
            return initialState;
        case PUBLIC_DRAGON_FETCH_BEGIN:
        default:
            return state;
    }
}

export default publicDragonReducer;