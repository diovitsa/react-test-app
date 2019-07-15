import { DataService } from '../services/data/DataService';

export const getUsers = () => dispatch => {
  DataService.getUsersList().then(users => {
    dispatch({ type: 'FETCH_USERS_SUCCESS', payload: users })
  })
};

export const addUser = (newUser) => dispatch => {
  DataService.addUser(newUser).then(() => dispatch(getUsers()));
};

export const deleteUser = (id) => dispatch => {
  DataService.deleteUser(id).then(() => dispatch(getUsers()));
};



