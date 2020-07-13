import React from "react";
import { connect } from "react-redux";
import {
  TextField,
  makeStyles,
  Paper,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "60vw",
  },
}));

function EditQuestion(props) {
  const classes = useStyles();

  const handleQuestion = (event) => {
    props.dispatch({
      type: "SET_EDIT_QUESTION",
      payload: event.target.value,
    });
  };

  const handleOption = (event, index) => {
    props.dispatch({
      type: "SET_EDIT_OPTION",
      payload: {
        index: index,
        value: event.target.value,
      },
    });
  };

  const handleAnswer = (event) => {
    props.dispatch({
      type: "EDIT_NEW_ANSWER",
      payload: event.target.value,
    });
  };

  const handleAddOption = () => {
    props.dispatch({
      type: "ADD_NEW_OPTION",
    });
  };

  const handleRemoveOption = (index) => {
    props.dispatch({
      type: "REMOVE_NEW_OPTION",
      payload: index,
    });
  };

  const handleViewQuestion = () => {
    props.dispatch({
      type: "VIEW_QUESTION",
      payload: props.quiz.viewQuestion - 1,
    });
  };

  const handleAddViewQuestion = async () => {
    try {
      const res = await Axios.get(
        `http://localhost:4000/api/quiz?_id=${props.quiz.quizID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      res.data.data.question.push({
        options: ["", ""],
        question: "",
        answer: "",
      });
      this.props.dispatch({
        type: "SET_QUESTIONS",
        payload: res.data.data.question,
      });
    } catch (error) { }
    props.dispatch({
      type: "VIEW_QUESTION",
      payload: props.quiz.viewQuestion + 1,
    });
  };

  const handleAddQuestion = async () => {
    props.dispatch({
      type: "SET_BACKDROP",
    });
    try {
      let res = await Axios.put(
        "http://localhost:4000/api/quiz/question",
        {
          id: props.quiz.quizID,
          questionID: props.quiz.viewQuestion + 1,
          updatedQuestion: props.question.question,
          updatedOptions: props.question.options,
          updatedAnswer: props.question.answer,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      props.dispatch({
        type: "VIEW_QUESTION",
        payload: props.quiz.viewQuestion,
      });
      props.dispatch({
        type: "SET_GLOBAL_SUCCESS",
        payload: `Question has been updated sucessfully`
      })
      res.data.data.question.push({
        options: ["", ""],
        question: "",
        answer: "",
      });
      props.dispatch({
        type: "SET_QUESTIONS",
        payload: res.data.data.question,
      });
      props.dispatch({
        type: "EDIT_QUESTION_INDEX",
        payload: "",
      });
    } catch (error) {
      // console.log(error);
      if (error.response) {
        props.dispatch({
          type: "SET_GLOBAL_WARNING",
          payload: error.response.data.message,
        });
      } else {
        props.dispatch({
          type: "SET_GLOBAL_WARNING",
          payload: "Something went wrong! Please try again later.",
        });
      }
    }
    props.dispatch({
      type: "REMOVE_BACKDROP",
    });
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" color="primary">
          Update Question
        </Typography>
        <Divider />
        <TextField
          autoFocus
          margin="dense"
          id="id"
          label="Enter Question"
          type="string"
          fullWidth
          onChange={handleQuestion}
          value={props.question.question}
        />
        {props.question.options.length > 0 &&
          props.question.options.map((el, index) => {
            return (
              <div
                style={{
                  display: "flex",
                }}
              >
                <div
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <TextField
                    margin="dense"
                    id={index}
                    label={`Enter Option ${index + 1}`}
                    type="string"
                    value={el}
                    fullWidth
                    className={classes.root}
                    onChange={(event) => handleOption(event, index)}
                  />
                </div>
                {props.question.options.length > 2 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <RemoveCircleIcon
                      color="secondary"
                      onClick={() => handleRemoveOption(index)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        <TextField
          error={props.question.answer.length > 1}
          helperText="Answer contains only one letter"
          margin="dense"
          id="id"
          label="Enter answer for question"
          type="string"
          fullWidth
          onChange={handleAnswer}
          value={props.question.answer}
        />
        <div className="mt-4">
          {props.quiz.viewQuestion !== 0 && (
            <Button
              variant="contained"
              className="mx-3"
              color="primary"
              onClick={handleViewQuestion}
            >
              Previous Question
            </Button>
          )}
          <Button
            variant="contained"
            className="mx-2"
            color="primary"
            onClick={handleAddOption}
            disabled={props.question.options.length > 3}
          >
            Add a option
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={
              props.question.length === 0 ||
              props.question.options.some((el) => el === "") ||
              props.question.answer.length !== 1
            }
            onClick={handleAddQuestion}
          >
            Update
          </Button>
          {props.quiz.newQuestionIndex > props.quiz.viewQuestion && (
            <Button
              variant="contained"
              className="mx-2"
              color="primary"
              onClick={handleAddViewQuestion}
            >
              NextQuestion
            </Button>
          )}
        </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quizInstructor,
    error: state.error,
  };
};

export default connect(mapStateToProps)(EditQuestion);
