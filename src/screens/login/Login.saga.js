import { takeEvery, all, call, put } from 'redux-saga/effects';
import { actions, urls } from '../../utils/constants';
import { Post, Get } from '../../utils/functionsAPI';
import { history } from '../../config/redux-store';
import { routes } from '../../App'

function* doLogin({ payload }) {
  try {
    const { data } = yield call(Post, urls.DO_LOGIN, payload)
    yield put({ type: actions.CHANGE_USER_LOGGED, payload: data })
    sessionStorage.setItem('id', data._id)
    yield history.push(routes.DASHBOARD)
  } catch (error) {
    console.error(error)
  }
}
function* doRegister({ payload }) {
  try {
    const { data } = yield call(Post, urls.DO_REGISTER, payload)
    yield put({ type: actions.CHANGE_USER_LOGGED, payload: data })
    sessionStorage.setItem('id', data._id)
    yield history.push(routes.DASHBOARD)
  } catch (error) {
    console.error(error)
  }
}
export default function* StatisticsSaga() {
  yield all([
    yield takeEvery(actions.ASYNC_LOGIN, doLogin),
    yield takeEvery(actions.ASYNC_REGISTER, doRegister),
  ]);
}