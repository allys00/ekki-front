import { takeEvery, all, call, put } from 'redux-saga/effects';
import Notification from '../../components/Notification'
import { actions, urls } from '../../utils/constants';
import { Post } from '../../utils/functionsAPI';
import { history } from '../../config/redux-store';
import { routes } from '../../App'

function* doLogin({ payload }) {
  try {
    yield put({ type: actions.SET_LOADING_LOGIN, payload: true })
    const { data } = yield call(Post, urls.DO_LOGIN, payload)
    yield put({ type: actions.CHANGE_USER_LOGGED, payload: data })
    sessionStorage.setItem('id', data._id)
    yield history.push(routes.DASHBOARD)
  } catch (error) {
    yield Notification('error', 'Erro ao entrar', 'Verifique seu email e senha e tente novamente')
  } finally {
    yield put({ type: actions.SET_LOADING_LOGIN, payload: false })
  }
}
function* forgotPassword({ payload }) {
  try {
    yield put({ type: actions.LOADING_FORGOT_PASSWORD, payload: true })
    yield call(Post, urls.FORGOT_PASSWORD, { email: payload })
    yield Notification('success', 'Email enviado com sucesso', 'Verifique sua caixa de entrada')
  } catch (err) {
    let msg = 'Erro ao enviar o email'
    if (err.status === 404) msg = 'Usuário não encontrado'
    yield Notification('erro', 'Erro ao enviar email', msg)
  } finally {
    yield put({ type: actions.LOADING_FORGOT_PASSWORD, payload: false })
  }

}
function* doRegister({ payload }) {
  try {
    yield put({ type: actions.SET_LOADING_LOGIN, payload: true })
    const { data } = yield call(Post, urls.DO_REGISTER, payload)
    yield put({ type: actions.CHANGE_USER_LOGGED, payload: data })
    sessionStorage.setItem('id', data._id)
    yield history.push(routes.DASHBOARD)
  } catch (error) {
    yield Notification('error', 'Erro ao criar conta', 'Verifique seus dados e tente novamente')
  } finally {
    yield put({ type: actions.SET_LOADING_LOGIN, payload: false })
  }
}
export default function* StatisticsSaga() {
  yield all([
    yield takeEvery(actions.ASYNC_LOGIN, doLogin),
    yield takeEvery(actions.ASYNC_REGISTER, doRegister),
    yield takeEvery(actions.ASYNC_FORGOT_PASSWORD, forgotPassword),

  ]);
}