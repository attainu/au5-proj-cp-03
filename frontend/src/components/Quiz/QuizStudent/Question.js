import React from 'react';
import { connect } from "react-redux"
import { Paper, Typography } from '@material-ui/core';

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