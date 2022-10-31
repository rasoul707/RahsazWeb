import { LOGIN, LOGOUT,REGISTER } from "../types/user.types";

const login = payload => ({
  type: LOGIN,
  payload,
});

const register = payload => ({
  type: REGISTER,
  payload,
});

const logout = payload => ({
  type: LOGOUT,
  payload,
});

export const loginAction = payload => dispatch => dispatch(login(payload));

export const logoutAction = payload => dispatch => dispatch(logout(payload));
export const registerAction = payload => dispatch => dispatch(register(payload));

