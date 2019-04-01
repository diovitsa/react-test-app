import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LogInForm';

describe('LogInForm', () => {
  let component;
  let onSignIn;

  function getComponent() {
    const testingComponent = shallow(<LoginForm onSignIn={onSignIn}/>).dive();
    return testingComponent.instance();
  }

  beforeEach(() => {
    onSignIn = jest.fn();
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
      jest.spyOn(component, 'signIn');
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
        expect(component.signIn).toHaveBeenCalled();
      });
    });

    describe('when focus is not on form inputs', () => {
      beforeEach(() => {
        const event = {
          key: 'Enter',
        };

        component.passwordInput = 'passwordInput';
        component.keydown(event);
      });

      it('should call signIn method', () => {
        expect(component.signIn).not.toHaveBeenCalled();
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

      it('should call signIn method', () => {
        expect(component.signIn).not.toHaveBeenCalled();
      });
    });
  });

  describe('signIn', () => {

    beforeEach(() => {
      jest.spyOn(component, 'clearInputValues');
      component.state = { email: 'testEmail', password: 'testPassword' };
      component.signIn();
    });

    it('should clear all input values', () => {
      expect(component.clearInputValues).toHaveBeenCalled();
    });

    it('should call component.props.onSignIn', () => {
      expect(component.props.onSignIn).toHaveBeenCalledWith('testEmail', 'testPassword');
    });
  });

  describe('clearInputValues', () => {

    beforeEach(() => {
      component.emailInput = { value: 'email@gmail.com' };
      component.passwordInput = { value: 'password' };

      component.clearInputValues();
    });

    it('should clear all input values', () => {
      expect(component.emailInput.value).toEqual('');
      expect(component.passwordInput.value).toEqual('');
    });

  });

});
