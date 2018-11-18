import { actions } from '../../utils/constants';

const INITIAL_STATE = {
  userLogged: {
    contacts: []
  },
  loading_get_user: false
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.CHANGE_USER_LOGGED:
      return { ...state, userLogged: payload }

    case actions.SET_LOADING_GET_USER:
      return { ...state, loading_get_user: payload }

    default:
      return state
  }
};