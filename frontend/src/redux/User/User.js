const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('data')),
}

const userReducer = (state = INITIAL_STATE, action) => {
  let stateCopy = JSON.parse(JSON.stringify(state));
  let { type, payload } = action;
  switch (type) {
    case "SET_CURRENT_USER":
      stateCopy.user = payload;
      return stateCopy;
    default:
      return stateCopy;
  }
}

export default userReducer;