import { takeEvery, all, call, put } from 'redux-saga/effects';
import { actions, urls } from '../../utils/constants';
import { Get } from '../../utils/functionsAPI';
import { history } from '../../config/redux-store';
import { routes } from '../../App'

function* getUser({ payload }) {
  try {
    const { data } = yield call(Get, `${urls.GET_USER}/${payload}`)
    yield put({ type: actions.CHANGE_USER_LOGGED, payload: data })
  } catch (error) {
    console.error(error)
  }
}

function* logout() {
  yield sessionStorage.clear()
  yield history.push(routes.LOGIN)
}

function* checkTransfer({ payload }) {
  try {
    const { status } = yield call(Get, `${urls.GET_USER_BY_EMAIL}/${payload.email}`)
    if (status === 200) {

    }
    // yield put({ type: actions.CHANGE_USER_LOGGED, payload: data })
  } catch (error) {
    console.error(error)
  }
}

export default function* MySaga() {
  yield all([
    yield takeEvery(actions.ASYNC_GET_USER, getUser),
    yield takeEvery(actions.ASYNC_LOGOUT, logout),
    yield takeEvery(actions.ASYNC_CHECK_TRANSFER_IS_VALID, checkTransfer)
  ]);
}