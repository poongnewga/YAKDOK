import { combineReducers } from 'redux';
import auth from './auth_reducer';
import todo from './todo_reducer';
import yakdok from './todo_reducer';

export default combineReducers({ auth, todo, yakdok });
