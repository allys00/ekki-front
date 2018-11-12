import { takeEvery, all, call, put } from 'redux-saga/effects';
import { actions, urls } from '../../utils/constants';
import { Post, Get } from '../../utils/functionsAPI';
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

export default function* StatisticsSaga() {
  yield all([
    yield takeEvery(actions.ASYNC_GET_USER, getUser)
  ]);
}