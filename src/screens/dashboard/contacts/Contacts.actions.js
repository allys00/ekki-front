import { actions } from "../../../utils/constants";

export const addContact = email => ({
    type: actions.ASYNC_ADD_CONTACT,
    payload: email
})
export const removeContact = email => ({
    type: actions.ASYNC_REMOVE_CONTACT,
    payload: email
})
export const changeContactEmail = email => ({
    type: actions.CHANGE_CONTACT_EMAIL,
    payload: email
})