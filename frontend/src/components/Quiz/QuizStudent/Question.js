import React from 'react';
import { connect } from "react-redux"
import { Paper, Typography, Button } from '@material-ui/core';

function Question(props) {
  const handleCorrectOption = (index) => {
    props.dispatch({
      type: "STUD_OPTION",
      payload: index
    });
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
      className="mt-3"
    >
      <div style={{
        width: "60vw",
      }}>
        <Paper style={{
          background: "grey"
        }} className="p-2">
          <Typography
            variant="h5"
            children={`${props.quiz.viewQuestion + 1}.${props.question.question}`}
            className="p-2"
            style={{
              color: "white"
            }}
          />
          {props.question.options.map((el, index) => {
            let styles = {
              color: "black",
              background: "white"
            }
            if (props.question.answer === index) {
              styles.background = "green";
              styles.color = "white"
            }
            return (
              <Paper style={{
                color: styles.color,
                background: styles.background
              }}
                className="p-2 m-2"
                onClick={() => handleCorrectOption(index)}
              >
                <Typography variant="h6" >{el}</Typography>
              </Paper>
            )
          })}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            {props.quiz.viewQuestion !== 0 && <Button variant="contained" className="my-2" color="primary" onClick={() => props.dispatch({ type: "VIEW_STUD_QUESTION", payload: props.quiz.viewQuestion - 1 })}>
              Previous Question
            </Button>}
            {props.quiz.viewQuestion < props.quiz.questions.length - 1 ? (<Button variant="contained" className="my-2" color="primary" onClick={() => props.dispatch({ type: "VIEW_STUD_QUESTION", payload: props.quiz.viewQuestion + 1 })}>
              Next Question
            </Button>)
              : (
                <Button variant="contained" className="my-2" color="primary">
                  Submit
                </Button>
              )}
          </div>
        </Paper>
      </div>
    </div >
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quizStudent
  }
}

export default connect(mapStateToProps)(Question);