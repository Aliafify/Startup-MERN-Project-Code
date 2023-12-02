import { AUTH_LOGIN,UPDATE_USER } from "../actions/signin-up";

export const loggedUser = (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return state={...action.user};
    case UPDATE_USER:
      return state={...state,...action.data}
    default:
      return state;
  }
};
