import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { actions, urls } from '../../../utils/constants';
import { Get, Put } from '../../../utils/functionsAPI';
import Notification from '../../../components/Notification';

function* addContact({ payload }) {
    try {
        yield put({ type: actions.SET_LOADING_ADD_CONTACT, payload: true })
        const myUser = yield select(({ dashboard }) => dashboard.userLogged)
        if (myUser.contacts.findIndex(a => a.email === payload) >= 0) {
            return yield Notification('warning', 'Atenção', 'Esse usuário já é seu contato')
        }
        const { data } = yield call(Get, `${urls.GET_USER_BY_EMAIL}/${payload}`);
        const newContact = {
            name: data.name,
            email: data.email,
            _id: data._id
        }
        const newUser = { ...myUser }
        newUser.contacts.push(newContact)
        const { status } = yield call(Put, `${urls.GET_USER}/${myUser._id}`, newUser)
        if (status === 200) {
            yield put({ type: actions.CHANGE_USER_LOGGED, payload: newUser })
            yield put({ type: actions.CHANGE_CONTACT_EMAIL, payload: '' })
            yield Notification('success', 'Sucesso', 'Contato adicionado')
        }
    } catch (error) {
        if (error.status === 404) {
            yield Notification('error', 'Ops!', 'Usuário não encontrado')
        } else {
            yield Notification('error', 'Ops!', error.message)
        }
    } finally {
        yield put({ type: actions.SET_LOADING_ADD_CONTACT, payload: false })
    }
}

function* removeContact({ payload }) {
    try {
        yield put({ type: actions.SET_LOADING_REMOVE_CONTACT, payload: payload })
        const myUser = yield select(({ dashboard }) => dashboard.userLogged)
        const index = myUser.contacts.findIndex(a => a.email === payload)
        const newUser = JSON.parse(JSON.stringify(myUser))
        // const newUser = { ...myUser }
        newUser.contacts.splice(index, 1)
        const { status } = yield call(Put, `${urls.GET_USER}/${myUser._id}`, newUser)
        if (status === 200) {
            yield put({ type: actions.CHANGE_USER_LOGGED, payload: newUser })
            yield Notification('success', 'Sucesso', 'Contato removido')
        }
    } catch (error) {
        yield Notification('error', 'Ops!', error.message)
    } finally {
        yield put({ type: actions.SET_LOADING_REMOVE_CONTACT, payload: false })
    }

}


export default function* MySaga() {
    yield all([
        takeEvery(actions.ASYNC_ADD_CONTACT, addContact),
        takeEvery(actions.ASYNC_REMOVE_CONTACT, removeContact),

    ]);
}