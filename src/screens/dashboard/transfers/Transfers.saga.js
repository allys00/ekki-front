import { takeEvery, all, call, put, select } from 'redux-saga/effects';
import Notification from '../../../components/Notification'
import { actions, urls } from '../../../utils/constants';
import { Get } from '../../../utils/functionsAPI';
import { realToCents } from '../../../utils/functions';
import { status_transfer } from './Transfers.reducer';

function* checkTransfer({ payload }) {
  try {
    const { status, data } = yield call(Get, `${urls.GET_USER_BY_EMAIL}/${payload.email}`);
    const myUser = yield select(({ dashboard }) => dashboard.userLogged);
    if (status === 200) {
      let transfer = {
        recipient: { _id: data._id, name: data.name },
        sender: { _id: myUser._id, name: myUser.name },
        value: realToCents(payload.value),
        status: 0
      }
      if (transfer.value > myUser.balance) {
        transfer.status = status_transfer.PICK_CREDIT_CARD
      } else if (transfer.value > 100000) {
        transfer.status = status_transfer.TAKE_PASSWORD_AGAIN
      } else {
        transfer.status = status_transfer.CONFIMR_TRANSFER
      }
      yield put({
        type: actions.CHANGE_NEW_TRANSFER_ITEM,
        payload: transfer
      })
      console.log("trasnferencia => ", transfer)
    }
  } catch (error) {
    console.error(error)
    if (error.response) {
      if (error.response.status === 404) {
        yield Notification('error', 'Ops', 'Usuário não encontrado')
      } else {
        yield Notification('error', 'Ops', error)
      }
    }
  }
}

export default function* MySaga() {
  yield all([
    yield takeEvery(actions.ASYNC_CHECK_TRANSFER_IS_VALID, checkTransfer)
  ]);
}