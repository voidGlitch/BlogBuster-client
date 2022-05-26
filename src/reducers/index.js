import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
export default combineReducers({
  //Takes function in which we put all the indiviual reducers that we have in our
  posts: posts,
  auth: auth,
});
