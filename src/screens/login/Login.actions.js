import { actions } from '../../utils/constants';

export const doLogin = (form) => ({
  type: actions.ASYNC_LOGIN,
  payload: form
})

export const doRegister = (form) => ({
  type: actions.ASYNC_REGISTER,
  payload: form
})


export const forgotPassword = (email) => ({
  type: actions.ASYNC_FORGOT_PASSWORD,
  payload: email
})




