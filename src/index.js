import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store, { history } from './config/redux-store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
serviceWorker.unregister();
