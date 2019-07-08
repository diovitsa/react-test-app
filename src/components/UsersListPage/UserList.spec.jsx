import React from 'react';
import { shallow } from 'enzyme';
import UserList from './UsersList';
import { DataService } from '../../services/data/DataService';

describe('LogInForm', () => {

  const history = {
    push: jest.fn()
  };

  const users = [{ id: '1', name: 'name', password: 'pass', email: 'email' }];
  let component;

  function getComponent() {
    const testingComponent = shallow(<UserList history={history}/>).dive();
    return testingComponent.instance();
  }

  beforeEach(() => {
    component = getComponent();
  });

  it('should render properly', () => {
    expect(getComponent()).toMatchSnapshot();
  });

  describe('loadData', () => {

    beforeEach(() => {
      jest.spyOn(component, 'setState');
      jest.spyOn(DataService, 'getUsersList');
      component.loadData();
    });

    it('should load column data', () => {
      expect(DataService.getUsersList).toHaveBeenCalled();
    });

    describe('on success', () => {

      beforeEach(() => {
        jest.spyOn(DataService, 'getUsersList').mockImplementation(() => Promise.resolve(users));
        component.loadData();
      });

      it('should set users state', () => {
        component.loadData().then(() => {
          expect(component.setState).toHaveBeenCalled();
        });
      });
    });
  });

  describe('componentWillMount', () => {

    beforeEach(() => {
      jest.spyOn(component, 'loadData');
      component.componentWillMount();
    });

    it('should trigger data loading', () => {
      expect(component.loadData).toHaveBeenCalled();
    });

  });

  describe('triggerAction', () => {
    const action = { execute: jest.fn() };
    const item = { item: 'testItem' };

    beforeEach(() => {
      component.triggerAction(action, item);
    });

    it('should trigger action with item', () => {
      expect(action.execute).toHaveBeenCalledWith(item);
    });

  });

  describe('addUser', () => {
    const formData = { userEmail: 'testEmail', password: 'testPassword', userName: 'testName' };

    beforeEach(() => {
      jest.spyOn(DataService, 'addUser').mockImplementation(() => Promise.resolve());
      component.addUser(formData);
    });

    it('should call DataService.addUser', () => {
      expect(DataService.addUser).toHaveBeenCalledWith(formData);
    });

    it('should trigger data update', done => {
      component.addUser(formData).then(() => {
        done();
        expect(component.loadData).toHaveBeenCalled();
      });
    });
  });

  describe('deleteUser', () => {
    const testUser = { _id: 'testId', name: 'testName', email: 'testEmail' };

    beforeEach(() => {
      jest.spyOn(DataService, 'deleteUser').mockImplementation(() => Promise.resolve(testUser));
      component.deleteUser(testUser);
    });

    it('should call DataService.deleteUser', () => {
      expect(DataService.deleteUser).toHaveBeenCalledWith('testId');
    });

    it('should trigger data update', done => {
      component.deleteUser(testUser).then(() => {
        done();
        expect(component.loadData).toHaveBeenCalled();
      });
    });
  });

  describe('logOut', () => {

    beforeEach(() => {
      component.logOut();
      jest.spyOn(DataService, 'resetSession');
    });

    it('should redirect user to ligIn page', () => {
      expect(component.props.history.push).toHaveBeenCalledWith('/');
    });

    it('should reset session', () => {
      expect(DataService.resetSession).toHaveBeenCalled();
    });
  });

});
