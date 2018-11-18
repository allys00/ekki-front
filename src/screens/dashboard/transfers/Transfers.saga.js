import { takeEvery, all, call, put, select } from 'redux-saga/effects';
import Notification from '../../../components/Notification'
import { actions, urls } from '../../../utils/constants';
import { Get, Post } from '../../../utils/functionsAPI';
import { realToCents } from '../../../utils/functions';
import { status_transfer } from './Transfers.reducer';

function* checkTransfer({ payload }) {
  try {
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
  }
}

function* newTransfer({ payload }) {
  try {
    yield put({ type: actions.SET_LOADING_NEW_TRANSFER, payload: true })
    const { data } = yield call(Post, urls.TRANSFERS, payload);
    const { history_transfers } = yield select(({ transfers }) => transfers);
    history_transfers.unshift(data)
    yield put({ type: actions.FINISH_TRANSFER, payload: history_transfers })
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

export default function* MySaga() {
  yield all([
    yield takeEvery(actions.ASYNC_CHECK_TRANSFER_IS_VALID, checkTransfer),
    yield takeEvery(actions.ASYNC_NEW_TRANSFER, newTransfer),
    yield takeEvery(actions.ASYNC_GET_TRANSFERS, getTransfers),

  ]);
}