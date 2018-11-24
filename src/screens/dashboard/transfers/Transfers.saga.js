import { takeEvery, all, call, put, select } from 'redux-saga/effects';
import Notification from '../../../components/Notification'
import { actions, urls } from '../../../utils/constants';
import { Get, Post } from '../../../utils/functionsAPI';
import { realToCents } from '../../../utils/functions';
import { status_transfer } from './Transfers.reducer';

function* checkTransfer({ payload }) {
  try {
    yield put({ type: actions.SET_LOADING_NEW_TRANSFER, payload: true })
    if (realToCents(payload.value) < 100) {
      return yield Notification('warning', 'Atenção', 'Transferência minima de R$1,00')
    }
    const { status, data } = yield call(Get, `${urls.GET_USER_BY_EMAIL}/${payload.email}`);
    const myUser = yield select(({ dashboard }) => dashboard.userLogged);
    if (status === 200) {
      let transfer = {
        recipient: { _id: data._id, name: data.name },
        sender: {
          _id: myUser._id,
          name: myUser.name
        },
        value: realToCents(payload.value),
      }
      let newStatus = 0
      if (transfer.value > myUser.balance) {
        newStatus = status_transfer.PICK_CREDIT_CARD
      } else {
        newStatus = status_transfer.CONFIMR_TRANSFER
      }
      yield put({
        type: actions.CHANGE_NEW_TRANSFER_ITEM,
        payload: transfer
      })
      yield put({
        type: actions.CHANGE_TRANSFER_STATUS,
        payload: newStatus
      })
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        yield Notification('error', 'Ops', 'Usuário não encontrado')
      } else {
        yield Notification('error', 'Ops', error)
      }
    }
  } finally {
    yield put({ type: actions.SET_LOADING_NEW_TRANSFER, payload: false })
  }

}

function* newTransfer({ payload }) {
  try {
    console.log('oi2')
    yield put({ type: actions.SET_LOADING_NEW_TRANSFER, payload: true })
    yield call(Post, urls.TRANSFERS, payload);
    yield call(getTransfers, payload.sender._id)
    yield put({ type: actions.ASYNC_GET_USER, payload: payload.sender._id, action: actions.ASYNC_GET_CREDIT_CARDS })
    yield put({ type: actions.CHANGE_TRANSFER_STATUS, payload: 0 })
    yield Notification('success', 'Sucesso', 'Tranferência realizada')
  } catch (error) {
    yield Notification('error', 'Ops', 'Erro ao execultar transferência')
  } finally {
    yield put({ type: actions.SET_LOADING_NEW_TRANSFER, payload: false })
  }
}
function* getTransfers({ payload }) {
  try {
    yield put({ type: actions.SET_LOADING_GET_TRANSFER, payload: true })
    const myUser = yield select(({ dashboard }) => dashboard.userLogged);
    const { data } = yield call(Get, `${urls.TRANSFERS}/${myUser._id}`, payload);
    yield put({ type: actions.CHANGE_TRANSFERS, payload: data })
  } catch (error) {
    yield Notification('error', 'Ops', 'Erro ao consultar transferências')
  } finally {
    yield put({ type: actions.SET_LOADING_GET_TRANSFER, payload: false })
  }
}

function* useCreditCard({ payload }) {
  try {
    const { dashboard, transfers } = yield select((state) => state)
    const { newTransfer } = transfers
    const { balance } = dashboard.userLogged
    const valueToCredit = newTransfer.value - balance
    if (valueToCredit > payload.credit) {
      return Notification('error', 'Ops', 'Sem crédito suficiente');
    }
    newTransfer.credit = { value: valueToCredit, _id: payload._id, number: payload.number }
    yield put({ type: actions.CHANGE_NEW_TRANSFER_ITEM, payload: newTransfer })
    yield put({ type: actions.CHANGE_TRANSFER_STATUS, payload: 2 })
  } catch (error) {
    return Notification('error', 'Ops', 'erro ao utilizar o cartão');
  }
}

function* checkPassword({ payload }) {
  try {
    const state = yield select(state => state);
    const { dashboard, transfers } = state
    yield call(Post, urls.DO_LOGIN, { email: dashboard.userLogged.email, password: payload })
    yield call(newTransfer, { payload: transfers.newTransfer })
  } catch (error) {
    return Notification('error', 'Ops', 'erro na transferencia, verifique sua senha e tente novamente');
  }
}

export default function* MySaga() {
  yield all([
    yield takeEvery(actions.ASYNC_CHECK_TRANSFER_IS_VALID, checkTransfer),
    yield takeEvery(actions.ASYNC_NEW_TRANSFER, newTransfer),
    yield takeEvery(actions.ASYNC_GET_TRANSFERS, getTransfers),
    yield takeEvery(actions.ASYNC_USE_CREDIT_CARD, useCreditCard),
    yield takeEvery(actions.ASYNC_CHECK_PASSWORD, checkPassword),

  ]);
}