import { takeEvery, all, call, put } from 'redux-saga/effects';
import { actions, urls } from '../../utils/constants';
import { Get } from '../../utils/functionsAPI';
import { history } from '../../config/redux-store';
import { routes } from '../../App'
import Notification from '../../components/Notification'

function* getUser({ payload }) {
  try {
    yield put({ type: actions.SET_LOADING_GET_USER, payload: true })
    const { data } = yield call(Get, `${urls.GET_USER}/${payload}`)
    yield put({ type: actions.CHANGE_USER_LOGGED, payload: data })
  } catch (error) {
    yield Notification('error', 'Ops', 'Erro ao consultar usuário')
  } finally {
    yield put({ type: actions.SET_LOADING_GET_USER, payload: false })

  }
}

function* logout() {
  yield sessionStorage.clear()
  yield history.push(routes.LOGIN)
}

export default function* MySaga() {
  yield all([
    yield takeEvery(actions.ASYNC_GET_USER, getUser),
    yield takeEvery(actions.ASYNC_LOGOUT, logout),
  ]);
}