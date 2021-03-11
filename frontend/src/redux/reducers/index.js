import newDragonReducer from './newDragonReducer';
import generationReducer from './generationReducer';
import accountReducer from './accountReducer';
import accountDragonReducer from './accountDragonReducer';
import accountInfoReducer from './accountInfoReducer';
import publicDragonReducer from './publicDragonReducer';
import updateDragonReducer from './updateDragonReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    account: accountReducer,
    generation: generationReducer,
    newDragon: newDragonReducer,
    accountDragons: accountDragonReducer,
    accountInfo: accountInfoReducer,
    publicDragons: publicDragonReducer,
    updateDragon: updateDragonReducer
});

export default rootReducer;