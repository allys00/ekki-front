export const actions = {
  ASYNC_LOGIN: "ASYNC_LOGIN",
  ASYNC_REGISTER: "ASYNC_REGISTER",
  ASYNC_GET_USER: "ASYNC_GET_USER",
  CHANGE_USER_LOGGED: "CHANGE_USER_LOGGED",
}

const BASEPATH = 'http://localhost:3030';

export const urls = {
  DO_LOGIN: `${BASEPATH}/account/login`,
  DO_REGISTER: `${BASEPATH}/account/register`,
  GET_USER: `${BASEPATH}/account`,
}