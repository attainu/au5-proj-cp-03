const INITIAL_STATE = {
  quizID: "",
  title: "",
  published: "",
  questions: [],
  newQuestion: "",
  newOptions: [],
  newAnswer: "",
  viewQuestion: 0,
  newQuestionIndex: 0,
  editQuestionIndex: "",
}

const quizInstructorReduer = (state = INITIAL_STATE, action) => {
  let stateCopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;

  switch (type) {
    case "SET_QUIZ_ID":
      stateCopy.quizID = payload;
      return stateCopy;

    case "SET_QUESTIONS":
      stateCopy.questions = payload;
      return stateCopy;

    case "SET_TITLE":
      stateCopy.title = payload;
      return stateCopy;

    case "SET_NEW_QUESTION":
      stateCopy.questions[stateCopy.newQuestionIndex].question = payload;
      return stateCopy;

    case "SET_NEW_OPTION":
      stateCopy.newOptions = [...stateCopy.newOptions, payload];
      return stateCopy;

    case "EDIT_NEW_OPTION":
      stateCopy.questions[stateCopy.viewQuestion].options[payload.index] = payload.value;
      return stateCopy;

    case "EDIT_NEW_ANSWER":
      stateCopy.questions[stateCopy.viewQuestion].answer = payload;
      return stateCopy;

    case "ADD_NEW_OPTION":
      stateCopy.questions[stateCopy.viewQuestion].options.push("");
      return stateCopy;

    case "VIEW_QUESTION":
      stateCopy.viewQuestion = payload;
      return stateCopy;

    case "REMOVE_NEW_OPTION":
      console.log(payload)
      stateCopy.questions[stateCopy.viewQuestion].options.splice(payload, 1);
      return stateCopy;

    case "NEW_QUESTION":
      stateCopy.newQuestion = "";
      stateCopy.newOptions = "";
      stateCopy.newAnswer = "";
      stateCopy.viewQuestion = payload;
      return stateCopy;

    case "EDIT_QUESTION_INDEX":
      stateCopy.editQuestionIndex = payload;
      return stateCopy;

    case "NEW_QUESTION_INDEX":
      stateCopy.newQuestionIndex = payload;
      return stateCopy;

    case "SET_DURATION":
      stateCopy.duration = payload;
      return stateCopy;

    case "SET_EDIT_QUESTION":
      stateCopy.questions[stateCopy.newQuestionIndex].question = payload;
      return stateCopy;

    case "SET_EDIT_OPTION":
      stateCopy.questions[stateCopy.viewQuestion].options[payload.index] = payload.value;
      return stateCopy;


    default:
      return stateCopy;
  }
}

export default quizInstructorReduer;