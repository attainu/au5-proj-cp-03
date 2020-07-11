const INITIAL_STATE = {
  page: 1,
  posts: [],
};

const postsReducer = (state = INITIAL_STATE, action) => {
  let stateCopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;

  switch (type) {
    case "INC_PAGE":
      stateCopy.page += 1;
      return stateCopy;

    case "DEC_PAGE":
      stateCopy.page -= 1;
      return stateCopy;

    case "SET_POSTS":
      stateCopy.posts = payload;
      return stateCopy;

    default:
      return stateCopy;
  }
}

export default postsReducer;
