import React from 'react';
import { shallow } from 'enzyme';
import AddForm from './AddForm';

describe('LogInForm', () => {
  let component;
  let onUserAdd;

  function getComponent() {
    const testingComponent = shallow(<AddForm onUserAdd={onUserAdd}/>).dive();
    return testingComponent.instance();
  }

  beforeEach(() => {
    onUserAdd = jest.fn();
    component = getComponent();
  });

  it('should render properly', () => {
    expect(getComponent()).toMatchSnapshot();
  });

  describe('componentDidMount', () => {

    beforeEach(() => {
      jest.spyOn(document, 'addEventListener');
      component.componentDidMount();
    });

    it('should init keydown listener', () => {
      expect(document.addEventListener).toHaveBeenCalledWith('keydown', component.keydown, false);
    });

  });

  describe('componentWillUnmount', () => {

    beforeEach(() => {
      jest.spyOn(document, 'removeEventListener');
      component.componentWillUnmount();
    });

    it('should remove keydown listener', () => {
      expect(document.removeEventListener).toHaveBeenCalledWith('keydown', component.keydown, false);
    });

  });

  describe('keydown', () => {

    beforeEach(() => {
      jest.spyOn(component, 'addUser');
    });

    describe('when email or password input is on focus', () => {

      beforeEach(() => {
        const event = {
          key: 'Enter',
          target: 'passwordInput'
        };
        component.passwordInput = 'passwordInput';
        component.keydown(event);
      });

      it('should call signIn method', () => {
        expect(component.addUser).toHaveBeenCalled();
      });
    });

    describe('when key it\'s not Enter', () => {

      beforeEach(() => {
        const event = {
          key: 'Space',
          target: 'passwordInput'
        };

        component.passwordInput = 'passwordInput';
        component.keydown(event);
      });

      it('should call addUser method', () => {
        expect(component.addUser).not.toHaveBeenCalled();
      });
    });
  });

  describe('addUser', () => {

    beforeEach(() => {
      jest.spyOn(component, 'clearInputValues');
      component.state = { userEmail: 'testEmail', password: 'testPassword', userName: 'testName' };
      component.addUser();
    });

    it('should clear all input values', () => {
      expect(component.clearInputValues).toHaveBeenCalled();
    });

    it('should call component.props.onSignIn', () => {
      expect(component.props.onUserAdd).toHaveBeenCalledWith({
        'email': 'testEmail',
        'name': 'testName',
        'password': 'testPassword'
      });
    });
  });

  describe('clearInputValues', () => {

    beforeEach(() => {
      component.emailInput = { value: 'email@gmail.com' };
      component.nameInput = { value: 'testName' };
      component.passwordInput = { value: 'testPassword' };

      component.clearInputValues();
    });

    it('should clear all input values', () => {
      expect(component.emailInput.value).toEqual('');
      expect(component.nameInput.value).toEqual('');
      expect(component.passwordInput.value).toEqual('');
    });

  });

});
