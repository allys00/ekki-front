import { actions } from '../../utils/constants';

export const getUser = id => ({
  type: actions.ASYNC_GET_USER,
  payload: id
})

export const logout = () => ({
  type: actions.ASYNC_LOGOUT,
})

export const getContacts = () => ({
  type: actions.ASYNC_GET_CONTACTS,
})




