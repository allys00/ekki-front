import { actions } from '../../utils/constants';

const INITIAL_STATE = {
  requesting: false,
  disable: true,
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {

    default:
      return state
  }
};