import { REMOVE_ALERT, SET_ALERT } from "../action/type";

const initialState = [];

export default function alertReducer (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload]; // add new alert to the array
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload); // remove alert by id
    default:
      return state; // return unchanged state
  }
}
