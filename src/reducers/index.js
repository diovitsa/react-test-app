import { combineReducers } from 'redux';
import users from './users';
import addUserForm from './addUserForm';

export default combineReducers({
  users, addUserForm
})