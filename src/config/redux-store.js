import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga'
import login from '../screens/login/Login.reducer';
import dashboard from '../screens/dashboard/Dashboard.reducer';
import transfers from '../screens/dashboard/transfers/Transfers.reducer';
import contacts from '../screens/dashboard/contacts/Contacts.reducer';

import mySaga from './main-saga'

const sagaMiddleware = createSagaMiddleware()

const RootReducer = combineReducers({
  login,
  dashboard,
  transfers,
  contacts,
  router: routerReducer,
});


const history = createHistory();

const historyMiddleware = routerMiddleware(history);


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const Store = applyMiddleware(promiseMiddleware(), sagaMiddleware, historyMiddleware)(createStore)(RootReducer, devTools);

sagaMiddleware.run(mySaga)
export default Store;

export { history };
