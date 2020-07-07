const INITIAL_STATE = {
  quizID: "",
  title: "",
  questions: [],
  newQuestion: "",
  newOptions: [],
  newAnswer: "",
  viewQuestion: 0,
  newQuestionIndex: 0,
}

const quizInstructorReduer = (state = INITIAL_STATE, action) => {
  let stateCopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;

  switch (type) {
    case "SET_QUESTIONS":
      stateCopy.questions = payload;
      return stateCopy;

    case "SET_TITLE":
      stateCopy.title = payload;
      return stateCopy;

    case "SET_NEW_QUESTION":
      stateCopy.newQuestion = payload;
      return stateCopy;

    case "SET_NEW_OPTION":
      stateCopy.newOptions = [...stateCopy.newOptions, payload];
      return stateCopy;

    case "EDIT_NEW_OPTION":
      stateCopy.newOptions[payload.options] = payload.option;
      return stateCopy;

    case "VIEW_QUESTION":
      stateCopy.viewQuestion = payload;
      return stateCopy;

    case "NEW_QUESTION":
      stateCopy.newQuestion = "";
      stateCopy.newOptions = "";
      stateCopy.newAnswer = "";
      stateCopy.viewQuestion = payload;
      return stateCopy;

    case "NEW_QUESTION_INDEX":
      stateCopy.newQuestionIndex = payload;
      return stateCopy;

    default:
      return stateCopy;
  }
}

export default quizInstructorReduer;