import { actions } from '../../utils/constants';

export const getUser = id => ({
  type: actions.ASYNC_GET_USER,
  payload: id
})


