import { combineReducers } from "redux";

import userReducer from './User/User';
import courseCardReducer from './courseCard/courseCard'
import courseDashboard from './CourseDashboard/courseDashboard'
import quizInstructorReduer from "./QuizInstructor/quizInstructor";
import createCourseReducer from "./CreateCourse/CreateCourse";
import joinClassReducer from "./JoinClass/joinClass";
import errorReducer from "./Error/errorReducer";
import backdropReducer from "./Backdrop/backdrop";
import quizStudentReducer from "./QuizStudent/QuizStudent";
import postsReducer from "./Posts/postsReducer";
import postEditReducer from "./PostsEdit/postsEdit";
import quizReducer from "./QuizView/quizView";
import assignmentReducer from "./Assignment/assignment";

export default combineReducers({
  user: userReducer,
  courseCard: courseCardReducer,
  courseDashboard: courseDashboard,
  quizInstructor: quizInstructorReduer,
  newCourse: createCourseReducer,
  joinClass: joinClassReducer,
  error: errorReducer,
  backdrop: backdropReducer,
  quizStudent: quizStudentReducer,
  posts: postsReducer,
  editPost: postEditReducer,
  quiz: quizReducer,
  assignment: assignmentReducer
});
