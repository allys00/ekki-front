import { actions } from '../../utils/constants';

const INITIAL_STATE = {
  loading_login: false,
  disable: true,
  loading_forgot_password: false
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_LOADING_LOGIN:
      return { ...state, loading_login: payload }
    case actions.LOADING_FORGOT_PASSWORD:
      return { ...state, loading_forgot_password: payload }
    default:
      return state
  }
};