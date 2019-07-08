import React from "react";
import { HashRouter as Router } from "react-router-dom";
import UserList from './UsersListPage/UsersList';
import LoginPage from './LoginPage/LogInPage';
import { ProtectedListRoute } from '../ProtectedListRoute';
import { SignInRoute } from '../SignInRoute';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default class TestApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <SignInRoute exact path='/' component={LoginPage}/>
            <ProtectedListRoute exact path='/list' component={UserList}/>
          </div>
        </Router>
      </Provider>
    );
  }
}
