import dragonReducer from './dragonReducer';
import generationReducer from './generationReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    generation: generationReducer,
    dragon: dragonReducer
});

export default rootReducer;