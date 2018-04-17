import {combineReducers} from 'redux';
import authReducer from './authReducer';
import personalAreaReduser from './personalAreaReducer';

export default combineReducers({
    auth: authReducer,
    objects: personalAreaReduser
});