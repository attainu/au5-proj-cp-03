import React from 'react'
import { connect } from "react-redux";

function QuestionNumber(props) {
  return (
    <div className="my-2 mt-4">
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
        cursor: "pointer"
      }}>
        {props.quiz.questions.length > 0 && props.quiz.questions.map((data, index) => {
          return (
            <div style={data.answer === "" ?
              {
                border: "1px solid ",
                padding: "0 5px",
                margin: "0 2px"
              }
              :
              {
                backgroundColor: "green",
                border: "1px solid ",
                padding: "0 5px",
                margin: "0 2px",
                color: "white"
              }}
              onClick={() => {
                props.dispatch({
                  type: "VIEW_STUD_QUESTION",
                  payload: index
                });
              }}
            >
              {index + 1}
            </div>)
        })}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quizStudent,
  }
}

export default connect(mapStateToProps)(QuestionNumber);