// il root reducer combina insieme tutti gli state che utili alla app
import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';

export default combineReducers({
    user: userReducer
});