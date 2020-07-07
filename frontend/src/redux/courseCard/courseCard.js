const INITIAL_STATE = {
  courses: []
}

const courseCardReducer = (state = INITIAL_STATE, action) => {
  let statecopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;
  switch (type) {
    case "COURSE_CARD":
      statecopy.courses = payload;
      return statecopy;
    default:
      return statecopy;
  }
}

export default courseCardReducer;