import { all } from 'redux-saga/effects';

import LoginSaga from '../screens/login/Login.saga';
import DashboardSaga from '../screens/dashboard/Dashboard.saga';
import Transfers from '../screens/dashboard/transfers/Transfers.saga'

export default function* RootSaga() {
  yield all([
    LoginSaga(),
    DashboardSaga(),
    Transfers()
  ]);
}

