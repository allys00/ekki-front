import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import Login from './screens/login/Login'
import Dashboard from './screens/dashboard/Dashboard';
import ProtectRouter from './ProtectRouter'


import './App.css';
import { history } from './config/redux-store';

export const routes = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  TRANSFERS: '/dashboard/transfers',
  HOME: '/dashboard/home',
  CREDIT_CARDS: '/dashboard/credit_cards',
  CONTACTS: '/dashboard/contacts'
}

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path={routes.LOGIN} component={Login} />
          <ProtectRouter path={routes.DASHBOARD} component={Dashboard} />
          <Redirect from={routes.ROOT} to={routes.LOGIN} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  login: login
});

export default connect(mapStateToProps, {})(App);
