import { actions } from '../../utils/constants';

const INITIAL_STATE = {
  loading_login: false,
  disable: true,
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.SET_LOADING_LOGIN:
    return {...state, loading_login: payload}
    default:
      return state
  }
};