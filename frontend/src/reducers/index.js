import dragonReducer from './dragonReducer';
import generationReducer from './generationReducer';
import accountReducer from './accountReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    account: accountReducer,
    generation: generationReducer,
    dragon: dragonReducer
});

export default rootReducer;