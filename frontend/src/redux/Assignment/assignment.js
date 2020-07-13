const INITIAL_STATE = {
  assignments: [],
}

const assignmentReducer = (state = INITIAL_STATE, action) => {
  let statecopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;
  switch (type) {
    case "SET_ASSIGNMENTS":
      statecopy.assignments = payload;
      return statecopy;

    default:
      return statecopy;
  }
}

export default assignmentReducer;