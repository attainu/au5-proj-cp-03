const INITIAL_STATE = {
  show: false,
}

const backdropReducer = (state = INITIAL_STATE, action) => {
  let statecopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;
  switch (type) {
    case "SET_BACKDROP":
      statecopy.show = true;
      return statecopy;

    case "REMOVE_BACKDROP":
      statecopy.show = false;
      return statecopy;

    default:
      return statecopy;
  }
}