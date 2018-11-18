import { actions } from "../../../utils/constants";

export const checkTransfer = transfer => ({
  type: actions.ASYNC_CHECK_TRANSFER_IS_VALID,
  payload: transfer
})

export const changeTransferStatus = status => ({
  type: actions.CHANGE_TRANSFER_STATUS,
  payload: status
})

export const doTransfer = newTransfer => ({
  type: actions.ASYNC_NEW_TRANSFER,
  payload: newTransfer
})


export const changeTransferForm = newItem => ({
  type: actions.CHANGE_TRANSFER_FORM,
  payload: newItem
})

export const getTransfers = () => ({
  type: actions.ASYNC_GET_TRANSFERS,
})
