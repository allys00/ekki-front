import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from './App';

const ProtectRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        sessionStorage.getItem('id')
            ? <Component {...props} />
            : <Redirect to={routes.LOGIN} />
    )} />
)
export default ProtectRouter