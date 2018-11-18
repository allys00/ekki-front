import { actions } from "../../../utils/constants";

const INITIAL_STATE = {
    email: '',
    loading_add_contact: false,
    contact_being_removed: false,
}

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case actions.CHANGE_CONTACT_EMAIL:
            return { ...state, email: payload }
        case actions.SET_LOADING_ADD_CONTACT:
            return { ...state, loading_add_contact: payload }
        case actions.SET_LOADING_REMOVE_CONTACT:
            return { ...state, contact_being_removed: payload }
        default:
            return state
    }
};
