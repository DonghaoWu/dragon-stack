import dragonReducer from './dragonReducer';
import generationReducer from './generationReducer';
import accountReducer from './accountReducer';
import accountDragonReducer from './accountDragonReducer';
import accountInfoReducer from './accountInfoReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    account: accountReducer,
    generation: generationReducer,
    dragon: dragonReducer,
    accountDragons: accountDragonReducer,
    accountInfo:accountInfoReducer
});

export default rootReducer;