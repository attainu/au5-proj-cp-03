import React from "react";
import { connect } from "react-redux";
import {
  makeStyles,
  Paper,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

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

function ViewQuestion(props) {
  const classes = useStyles();

  const handleNextQuestion = () => {
    props.dispatch({
      type: "VIEW_QUESTION",
      payload: props.quiz.viewQuestion + 1,
    });
  };

  const handlePrevQuestion = () => {
    props.dispatch({
      type: "VIEW_QUESTION",
      payload: props.quiz.viewQuestion - 1,
    });
  };

  const handleEditQuestion = () => {
    props.dispatch({
      type: "EDIT_QUESTION_INDEX",
      payload: props.quiz.viewQuestion,
    });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              flexGrow: "1",
            }}
          >
            <Typography
              variant="h4"
              children={`Question No ${props.quiz.viewQuestion + 1}:`}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <EditIcon onClick={handleEditQuestion} />
          </div>
        </div>
        <Divider />
        <Typography variant="h5" children={`${props.question.question}`} />
        {props.question.options.map((el, index) => (
          <Typography
            variant="body1"
            children={`${index + 1}. ${el}`}
            className="py-1"
          />
        ))}
        <Typography
          variant="body1"
          children={`Answer: ${props.question.answer}`}
          color="textPrimary"
        />
        <div>
          {props.quiz.viewQuestion !== 0 && (
            <Button
              variant="contained"
              color="primary"
              className="mx-2"
              onClick={handlePrevQuestion}
            >
              Previous Question
            </Button>
          )}
          {props.quiz.viewQuestion + 1 === props.quiz.newQuestionIndex && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
            >
              Create new Question
            </Button>
          )}
          {props.quiz.viewQuestion + 1 !== props.quiz.newQuestionIndex && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
            >
              Next Question
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
  };
};

export default connect(mapStateToProps)(ViewQuestion);
