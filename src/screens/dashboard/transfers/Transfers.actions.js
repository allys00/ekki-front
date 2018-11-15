import { actions } from "../../../utils/constants";

export const checkTransfer = transfer => ({
  type: actions.ASYNC_CHECK_TRANSFER_IS_VALID,
  payload: transfer
})
