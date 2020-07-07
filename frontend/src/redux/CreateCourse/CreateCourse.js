const INITIAL_STATE = {
  open: false,
  courseID: "",
  name: "",
  description: "",
  warning: "Error while creating class, Please try again after sometime",
  showWarning: false,
  success: "Class has been created sucessfully",
  showSucess: false,
}

const createCourseReducer = (state = INITIAL_STATE, action) => {
  let stateCopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;
  switch (type) {
    case "VIEW_MODAL":
      stateCopy.open = true;
      return stateCopy;

    case "REMOVE_MODAL":
      stateCopy.open = false;
      return stateCopy;

    case "SET_COURSEID":
      stateCopy.courseID = payload;
      return stateCopy;

    case "SET_COURSE_NAME":
      stateCopy.name = payload;
      return stateCopy;

    case "SET_DESCRIPTION":
      stateCopy.description = payload;
      return stateCopy;

    case "SET_WARNING":
      stateCopy.showWarning = true;
      return stateCopy;

    case "REMOVE_COURSE_WARNING":
      stateCopy.showWarning = false;
      return stateCopy;

    case "SET_SUCCESS":
      stateCopy.showSucess = true;
      return stateCopy;

    case "REMOVE_COURSE_SUCCESS":
      stateCopy.showSucess = false;
      return stateCopy;

    default:
      return stateCopy;
  }
}

export default createCourseReducer;