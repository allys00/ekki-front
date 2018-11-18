import { actions } from "../../../utils/constants";

const INITIAL_STATE = {
    history_transfers: [],
    loading_new_transfer: false,
    loading_get_transfers: false,
    transfer_form: {},
    newTransfer: {
        sender: {},
        recipient: {},
        value: 0,
        created_at: '',
    },
    status: 0
}

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case actions.CHANGE_NEW_TRANSFER_ITEM:
            return { ...state, newTransfer: payload }
        case actions.CHANGE_TRANSFER_STATUS:
            return { ...state, status: payload }
        case actions.CHANGE_TRANSFERS:
            return { ...state, history_transfers: payload }
        case actions.FINISH_TRANSFER:
            return { ...INITIAL_STATE, ...{ history_transfers: payload } }
        case actions.SET_LOADING_GET_TRANSFER:
            return { ...state, loading_get_transfers: payload }
        case actions.SET_LOADING_NEW_TRANSFER:
            return { ...state, loading_new_transfer: payload }
        case actions.CHANGE_TRANSFER_FORM:
            return { ...state, transfer_form: { ...state.transfer_form, ...{ [payload.key]: payload.value } } }
        default:
            return state
    }
};


export const status_transfer = {
    START: 0,
    PICK_CREDIT_CARD: 1,
    CONFIMR_TRANSFER: 2
}