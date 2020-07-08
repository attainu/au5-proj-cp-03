const INITIAL_STATE = {
  quizID: "",
  questions: [],
  duration: "",
}

const quizStudentReducer = (state = INITIAL_STATE, action) => {
  let stateCopy = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;
  switch (type) {
    case "SET_QUESTIONS":
      stateCopy.questions = payload;
      return stateCopy;

    case "SET_ANSWER":
      stateCopy.questions[payload.index].answer = payload.value;
      return stateCopy;

    case "SET_QUIZID":
      stateCopy.quizID = payload;
      return stateCopy;

    default:
      return stateCopy;
  }
}