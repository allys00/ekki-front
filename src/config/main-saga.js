import { all } from 'redux-saga/effects';

import LoginSaga from '../screens/login/Login.saga';
import DashboardSaga from '../screens/dashboard/Dashboard.saga';
import Transfers from '../screens/dashboard/transfers/Transfers.saga';
import Contacts from '../screens/dashboard/contacts/Contacts.saga';
import CreditCards from '../screens/dashboard/creditcards/CreditCards.saga';


export default function* RootSaga() {
  yield all([
    LoginSaga(),
    DashboardSaga(),
    Transfers(),
    Contacts(),
    CreditCards(),
  ]);
}

