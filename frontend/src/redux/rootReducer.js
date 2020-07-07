import { combineReducers } from "redux";

import userReducer from './User/User';
import courseCardReducer from './courseCard/courseCard'
import quizInstructorReduer from "./QuizInstructor/quizInstructor";
import createCourseReducer from "./CreateCourse/CreateCourse";
import joinClassReducer from "./JoinClass/joinClass";

export default combineReducers({
  user: userReducer,
  courseCard: courseCardReducer,
  quizInstructor: quizInstructorReduer,
  newCourse: createCourseReducer,
  joinClass: joinClassReducer,
});
