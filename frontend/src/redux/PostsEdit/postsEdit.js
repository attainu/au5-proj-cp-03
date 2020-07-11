const INITIAL_STATE = {
  postId: "",
  open: false,
  filename: '',
  file: '',
  message: '',
  progress: 0,
}

const postEditReducer = (state = INITIAL_STATE, action) => {
  let stateCopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;
  switch (type) {
    case "SET_MESSAGE_POST":
      stateCopy.message = payload;
      return stateCopy;

    case "SET_POSTID":
      stateCopy.postId = payload;
      return stateCopy;

    case "SET_FILENAME":
      stateCopy.filename = payload;
      return stateCopy;

    case "SET_FILE":
      stateCopy.file = payload;
      return stateCopy;

    case "OPEN_MODAL_POST":
      stateCopy.open = true;
      return stateCopy;

    case "REMOVE_MODAL_POST":
      stateCopy.open = false;
      return stateCopy;

    case "SET_PROGRESS_POST":
      stateCopy.progress = payload;
      return stateCopy;

    default:
      return stateCopy;
  }
}

export default postEditReducer;
