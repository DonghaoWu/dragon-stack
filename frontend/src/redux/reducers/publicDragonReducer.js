import { PUBLIC_DRAGON_FETCH_BEGIN, PUBLIC_DRAGON_FETCH_FAILURE, PUBLIC_DRAGON_FETCH_SUCCESS } from '../types/publicDragonsTypes';

const initialState = {
    content: [],
    errorMessage: ''
}

const publicDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case PUBLIC_DRAGON_FETCH_FAILURE:
            return { ...initialState, errorMessage: action.payload }
        case PUBLIC_DRAGON_FETCH_SUCCESS:
            return { ...state, content: action.payload, errorMessage: '' }
        case PUBLIC_DRAGON_FETCH_BEGIN:
        default:
            return state;
    }
}

export default publicDragonReducer;