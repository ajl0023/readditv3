import { combineReducers } from "redux";
import commentReducer from "./comment";
import modalReducer from "./modal";
import postReducer from "./post";
import userReducer from "./user";

export const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
  comments: commentReducer,
  modal: modalReducer,
});
