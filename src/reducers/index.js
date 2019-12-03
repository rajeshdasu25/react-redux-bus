import { combineReducers } from 'redux';
import buses from './buses';

const rootReducer = combineReducers({
    buses: buses
});

export default rootReducer;