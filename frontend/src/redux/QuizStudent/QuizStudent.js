const INITIAL_STATE = {
  quizID: "",
  questions: [],
  duration: "",
  viewQuestion: 0,
  name: "",
}

const quizStudentReducer = (state = INITIAL_STATE, action) => {
  let stateCopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;
  switch (type) {
    case "SET_STUD_QUESTIONS":
      stateCopy.questions = payload;
      return stateCopy;

    case "SET_ANSWER":
      stateCopy.questions[payload.index].answer = payload.value;
      return stateCopy;

    case "SET_QUIZID":
      stateCopy.quizID = payload;
      return stateCopy;

    case "VIEW_STUD_QUESTION":
      stateCopy.viewQuestion = payload;
      return stateCopy;

    case "SET_STUD_NAME":
      stateCopy.name = payload;
      return stateCopy;

    case "SET_STUD_DURA":
      stateCopy.duration = payload;
      return stateCopy;

    case "STUD_OPTION":
      if (stateCopy.questions[stateCopy.viewQuestion].answer !== "" &&
        stateCopy.questions[stateCopy.viewQuestion].answer === payload)
        stateCopy.questions[stateCopy.viewQuestion].answer = "";
      else
        stateCopy.questions[stateCopy.viewQuestion].answer = payload;
      return stateCopy;

    default:
      return stateCopy;
  }
}

export default quizStudentReducer;