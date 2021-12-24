import { loginFailure, loginStart, loginSuccess, LOGOUT } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import {
  getUserListStart,
  getUserListSuccess,
  getUserListFailure,
  deleteUserListStart,
  deleteUserListSuccess,
  deleteUserListFailure,
  updateUserListStart,
  updateUserListSuccess,
  updateUserListFailure,
} from "./userListRedux";

//USER ACTION
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

//PRODUCT LIST
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await userRequest.put(`/products/${id}`, product);
    const newProduct=res.data;
    dispatch(updateProductSuccess({id, newProduct}));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

//USER LIST
export const getUsers = async (dispatch) => {
  dispatch(getUserListStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserListSuccess(res.data));
  } catch (err) {
    dispatch(getUserListFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserListStart());
  try {
    await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserListSuccess(id));
  } catch (err) {
    dispatch(deleteUserListFailure());
  }
};

export const updateUser = async (id, User, dispatch) => {
  dispatch(updateUserListStart());
  try {
    // update
    const res = await userRequest.put(`/users/${id}`, User);
    const newUser = res.data;
    dispatch(updateUserListSuccess({id, newUser}));
  } catch (err) {
    dispatch(updateUserListFailure());
  }
};
