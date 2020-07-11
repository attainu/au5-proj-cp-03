const INITIAL_STATE = {
  warning: "",
  showWarning: false,
  success: "",
  showSuccess: false,
};

const errorReducer = (state = INITIAL_STATE, action) => {
  let statecopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;
  switch (type) {
    case "SET_GLOBAL_WARNING":
      statecopy.warning = payload;
      statecopy.showWarning = true;
      return statecopy;

    case "SET_GLOBAL_SUCCESS":
      statecopy.success = payload;
      statecopy.showSuccess = true;
      return statecopy;

    case "REMOVE_GLOBAL_WARNING":
      statecopy.warning = "";
      statecopy.showWarning = false;
      return statecopy;

    case "REMOVE_GLOBAL_SUCCESS":
      statecopy.success = "";
      statecopy.showSuccess = false;
      return statecopy;

    default:
      return statecopy;
  }
}

export default errorReducer;