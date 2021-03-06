import dragonReducer from './dragonReducer';
import generationReducer from './generationReducer';
import accountReducer from './accountReducer';
import accountDragonReducer from './accountDragonReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    account: accountReducer,
    generation: generationReducer,
    dragon: dragonReducer,
    accountDragons: accountDragonReducer
});

export default rootReducer;