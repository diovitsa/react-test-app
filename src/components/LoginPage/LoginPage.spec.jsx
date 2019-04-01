import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from './LogInPage';
import { DataService } from '../../services/data/DataService';

describe('LogInForm', () => {
  let component;

  const history = {
    push: jest.fn()
  };

  function getComponent() {
    const testingComponent = shallow(<LoginPage history={history}/>).dive();
    return testingComponent.instance();
  }

  beforeEach(() => {
    component = getComponent();
  });

  it('should render properly', () => {
    expect(getComponent()).toMatchSnapshot();
  });


  describe('signIn', () => {

    beforeEach(() => {
      jest.spyOn(DataService, 'signIn').mockImplementation(() => Promise.resolve());
    });

    it('should call DataService.signIn', () => {
      component.signIn('email@gmail.com', 'password');
      expect(DataService.signIn).toHaveBeenCalledWith('email@gmail.com', 'password');
    });

    describe('on success', () => {
      it('should redirect user to UserList view', done => {
        component.signIn().then(() => {
          expect(component.props.history.push).toHaveBeenCalledWith('/list');
          done();
        });
      });
    });

  });
});
