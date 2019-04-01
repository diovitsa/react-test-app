import { DataService } from './DataService';

describe('Data Service', () => {
  let dataService;

  const params = {
    password: 'testPass',
    email: 'testEmail'
  };

  const signInData = {
    data: { token: 'testToken' }
  };

  const data = {
    data: [{ id: 'testId', name: 'testName', password: 'testPassword', email: 'testEmail' }]
  };

  beforeEach(() => {
    dataService = DataService;
    jest.spyOn(dataService.httpService, 'post').mockImplementation(() => Promise.resolve(signInData));
    jest.spyOn(dataService.httpService, 'get').mockImplementation(() => Promise.resolve(data));
    jest.spyOn(dataService.httpService, 'delete');
  });

  describe('signIn', () => {

    beforeEach(() => {
      dataService.signIn('testEmail', 'testPass');
    });

    it('should call httpService with provided params', () => {
      expect(dataService.httpService.post).toHaveBeenCalledWith('/sign-in', params);
    });

    it('should set default params to http service', () => {
      expect(dataService.httpService.defaults.headers.common['Content-Type']).toEqual('application/json');
    });
  });

  describe('getUsersList', () => {

    beforeEach(() => {
      dataService.getUsersList();
    });

    it('should call httpService with provided params', () => {
      expect(dataService.httpService.get).toHaveBeenCalledWith('/users', {"headers": {"Authorization": "Bearer testToken"}});
    });

    it('should set default params to http service', done => {
      dataService.getUsersList().then((data) => {
        expect(data).toEqual(data);
        done();
      });
    });
  });

  describe('addUser', () => {
    let formData;

    beforeEach(() => {
      formData = { password: 'userPass', email: 'userEmail', name: 'userName' };
      dataService.addUser(formData);
    });

    it('should call httpService with provided params', () => {
      expect(dataService.httpService.post).toHaveBeenCalledWith('/users', formData, {"headers": {"Authorization": "Bearer testToken"}});
    });
  });

  describe('deleteUser', () => {

    beforeEach(() => {
      dataService.deleteUser('54dsf41fssa');
    });

    it('should call httpService with provided params', () => {
      expect(dataService.httpService.delete).toHaveBeenCalledWith('/users/54dsf41fssa', {"headers": {"Authorization": "Bearer testToken"}});
    });
  });

});
