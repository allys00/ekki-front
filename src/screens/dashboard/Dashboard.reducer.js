import { actions } from '../../utils/constants';

const INITIAL_STATE = {
  userLogged: {},
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.CHANGE_USER_LOGGED:
      return { ...state, userLogged: payload }

    default:
      return state
  }
};