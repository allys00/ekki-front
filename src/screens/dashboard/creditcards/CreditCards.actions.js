import { actions } from "../../../utils/constants";

export const newCreditCard = credtCard => ({
    type: actions.ASYNC_ADD_CREDIT_CARD,
    payload: credtCard
})

export const getCreditCards = () => ({
    type: actions.ASYNC_GET_CREDIT_CARDS
})

export const removeCreditCard = credit_card_id => ({
    type: actions.ASYNC_REMOVE_CREDIT_CARD,
    payload: credit_card_id
})