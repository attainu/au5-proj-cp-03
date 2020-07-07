const INITIAL_STATE = {
  warning: "Error! No class is present with this enroll ID",
  showWarning: false,
  sucess: "Joined class successfully",
  showSuccess: false,
  enrollString: "",
  open: false,
}

const joinClassReducer = (state = INITIAL_STATE, action) => {
  let statecopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;
  switch (type) {
    case "SET_ENROLL":
      statecopy.enrollString = payload;
      return statecopy;

    case "SET_JOIN_WARNING":
      statecopy.showWarning = true;
      return statecopy;

    case "REMOVE_JOIN_WARNING":
      statecopy.showWarning = false;
      return statecopy;

    case "SET_JOIN_SUCCESS":
      statecopy.showSuccess = true;
      return statecopy;

    case "REMOVE_JOIN_SUCCESS":
      statecopy.showSuccess = false;
      return statecopy;

    case "SET_JOIN_MODAL":
      statecopy.open = true;
      return statecopy;

    case "REMOVE_JOIN_MODAL":
      statecopy.open = false;
      return statecopy;

    case "SET_JOIN_WARNING_MESSAGE":
      statecopy.warning = payload;
      return statecopy;

    default:
      return statecopy;
  }
}

export default joinClassReducer;