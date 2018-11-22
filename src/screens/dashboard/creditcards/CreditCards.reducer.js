import { actions } from "../../../utils/constants";

const INITIAL_STATE = {
    loading_new_credit_card: false,
    loading_get_credit_cards: false,
}

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.LOADING_NEW_CREDIT_CARD:
            return { ...state, loading_new_credit_card: payload }

        case actions.LOADING_GET_CREDIT_CARDS:
            return { ...state, loading_get_credit_cards: payload }

        default:
            return state
    }
};
