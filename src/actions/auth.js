import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

//Action creators if are asynchronous then we need to use redux thunk meaning we have a function that return a async function with a dispatch syntax is given below
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // Log in the user
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data: data });

    navigate.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // signUP  the user
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data: data });

    navigate.push("/");
  } catch (error) {
    console.log(error);
  }
};
