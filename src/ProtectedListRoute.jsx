import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getLocalItem } from './utils/LocalStorageUtil';

export const ProtectedListRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    getLocalItem('authToken')
      ? <Component {...props} />
      : <Redirect to='/'/>
  )}/>
);