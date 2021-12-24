import { loginFailure, loginStart, loginSuccess, LOGOUT, updateStart, updateSuccess, updateFailure } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(LOGOUT());
}

export const update = async (dispatch, user, id) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.put("/users/"+id, user);
    dispatch(updateSuccess(res.data));
  } catch (err) {
    dispatch(updateFailure());
  }
}
