import HttpService from '../http/http-service';
import { setLocalItem, getLocalItem, removeLocalItem } from '../../utils/LocalStorageUtil';

/**
 * @property {AxiosInstance} httpService
 */
class DataServiceClass {

  constructor(httpService) {
    Object.assign(this, { httpService });
  }

  signIn(email = '', password = '') {
    const params = {
      password,
      email
    };

    return this.httpService
      .post('/sign-in', params)
      .then(({ data }) => {
        this.httpService.defaults.headers.common['Content-Type'] = 'application/json';
        setLocalItem('authToken', data.token);
      });
  }

  getUsersList() {
    const token =  getLocalItem('authToken');
    return this.httpService
      .get('/users', {'headers': {'Authorization' : `Bearer ${token}`}})
      .then(({ data }) => data);
  };

  addUser(formData) {
    const token =  getLocalItem('authToken');
    return this.httpService
      .post('/users', formData, {'headers': {'Authorization' : `Bearer ${token}`}});
  };

  deleteUser(id) {
    const token =  getLocalItem('authToken');
    return this.httpService
      .delete(`/users/${id}`, {'headers': {'Authorization' : `Bearer ${token}`}});
  };

  resetSession() {
    removeLocalItem('authToken');
  }
}

export const DataService = new DataServiceClass(HttpService);
