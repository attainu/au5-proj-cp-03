const INITIAL_STATE = {
  quiz: [],
  page: 1,
}

const quizReducer = (state = INITIAL_STATE, action) => {
  let stateCopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;
  switch (type) {
    case 'SET_QUIZ':
      stateCopy.quiz = payload;
      return stateCopy;

    case "INC_PAGE_QUIZ":
      stateCopy.page += 1;
      return stateCopy;

    case "DEC_PAGE_QUIZ":
      stateCopy.page -= 1;
      return stateCopy;

    case "RESET_QUIZ":
      stateCopy.page = 1;
      return stateCopy;

    default:
      return stateCopy;
  }
}

export default quizReducer;