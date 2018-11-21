import { actions } from '../../utils/constants';

export const getUser = (id, action) => ({
  type: actions.ASYNC_GET_USER,
  payload: id,
  action
})

export const logout = () => ({
  type: actions.ASYNC_LOGOUT,
})

export const getContacts = () => ({
  type: actions.ASYNC_GET_CONTACTS,
})




