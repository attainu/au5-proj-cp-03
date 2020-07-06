import { combineReducers } from "redux";

import userReducer from './User/User';
import courseCardReducer from './courseCard/courseCard'

export default combineReducers({
  user: userReducer,
  courseCard: courseCardReducer,
});
