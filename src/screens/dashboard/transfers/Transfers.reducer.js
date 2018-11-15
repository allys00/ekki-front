import { actions } from "../../../utils/constants";

// import { actions } from '../../utils/constants';

const INITIAL_STATE = {
    history_transfers: [
        { title: 'André Alys', description: 'R$ 200,00' },
        { title: 'Julia Helen', description: 'R$ 1500,00' },
        { title: 'Pedro Matheus', description: 'R$ 300,00  ' },
        { title: 'Lucas', description: 'R$ 400,00 ' },
    ],
    newTransfer: {
        sender: {},
        recipient: {},
        value: 0,
        created_at: '',
        status: 0
    }
}
export const status_transfer = {
    START: 0,
    PICK_CREDIT_CARD: 1,
    TAKE_PASSWORD_AGAIN: 2,
    CONFIMR_TRANSFER: 3
}
//0 normal
//1 user don't have money (Show CreditCards)
//2 user have money but is more R$: 1000
//3 confirm transfer
//4 success

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case actions.CHANGE_NEW_TRANSFER_ITEM:
            return { ...state, newTransfer: payload }
        default:
            return state
    }
};