import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getLocalItem } from './utils/LocalStorageUtil';

export const SignInRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    getLocalItem('authToken')
      ? <Redirect to='/list'/>
      : <Component {...props} />
  )}/>
);