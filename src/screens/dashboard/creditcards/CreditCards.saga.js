import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import { actions, urls } from '../../../utils/constants';
import { Post, Get, Delete, Put } from '../../../utils/functionsAPI';
import Notification from '../../../components/Notification'


function* addCreditCards({ payload }) {
  try {
    yield put({ type: actions.LOADING_NEW_CREDIT_CARD, payload: true })
    const myUser = yield select(({ dashboard }) => dashboard.userLogged);
    const credit_card = { ...payload, ...{ user_id: myUser._id } }
    const { data } = yield call(Post, urls.CREDIT_CARD, credit_card);
    myUser.credit_cards.push(data)
    yield Notification('success', 'Sucesso', 'Cartão criado')
    yield put({ type: actions.CHANGE_USER_LOGGED, payload: myUser })
  } catch (error) {
    yield Notification('error', 'Ops!', 'Erro ao gerar novo cartão')
    console.log(error)
  } finally {
    yield put({ type: actions.LOADING_NEW_CREDIT_CARD, payload: false })
  }
}

function* getCreditCards() {
  try {
    yield put({ type: actions.LOADING_GET_CREDIT_CARDS, payload: true })
    const myUser = yield select(({ dashboard }) => dashboard.userLogged);
    if (myUser.credit_cards.length <= 0) return
    const credit_cards = yield all(myUser.credit_cards.map(credit_card => call(Get, `${urls.CREDIT_CARD}/${credit_card._id}`)))
    myUser.credit_cards = credit_cards.map(a => a.data)
    yield put({ type: actions.CHANGE_USER_LOGGED, payload: myUser })
  } catch (error) {
    console.log(error)
    yield Notification('error', 'Ops', 'Erro ao consultar os cartões de crédito')
  } finally {
    yield put({ type: actions.LOADING_GET_CREDIT_CARDS, payload: false })
  }
}

function* removeCreditCard({ payload }) {
  try {
    yield put({ type: actions.LOADING_GET_CREDIT_CARDS, payload: true })
    const myUser = yield select(({ dashboard }) => dashboard.userLogged);
    yield call(Delete, `${urls.CREDIT_CARD}/${payload}`)
    myUser.credit_cards = myUser.credit_cards.filter(({ _id }) => _id !== payload)
    yield put({ type: actions.CHANGE_USER_LOGGED, payload: myUser })
    yield Notification('success', 'Sucesso', 'Cartão de crédito removido')

  } catch (error) {
    console.log(error)
    yield Notification('error', 'Ops', 'Erro ao remover seu cartão')
  } finally {
    yield put({ type: actions.LOADING_GET_CREDIT_CARDS, payload: false })
  }
}

function* editCreditCard({ payload }) {
  try {
    yield put({ type: actions.LOADING_EDIT_CREDIT_CARD, payload: true })
    yield call(Put, `${urls.CREDIT_CARD}/${payload.credit_card._id}`, { invoice: payload.invoice })
    const myUser = yield select(({ dashboard }) => dashboard.userLogged);
    myUser.credit_cards = myUser.credit_cards.map((credit_card) => {
      if (credit_card._id === payload.credit_card._id) {
        credit_card.invoice = payload.invoice
      }
      return credit_card
    });
    yield put({ type: actions.CHANGE_USER_LOGGED, payload: myUser })
    yield Notification('success', 'Sucesso', 'Cartão de crédito editado')
  } catch (error) {
    console.log(error)
    yield Notification('error', 'Ops', 'Erro ao remover seu cartão')
  } finally {
    yield put({ type: actions.LOADING_EDIT_CREDIT_CARD, payload: false })
  }
}

export default function* MySaga() {
  yield all([
    takeEvery(actions.ASYNC_ADD_CREDIT_CARD, addCreditCards),
    takeEvery(actions.ASYNC_GET_CREDIT_CARDS, getCreditCards),
    takeEvery(actions.ASYNC_REMOVE_CREDIT_CARD, removeCreditCard),
    takeEvery(actions.ASYNC_EDIT_CREDIT_CARD, editCreditCard),
  ]);
}