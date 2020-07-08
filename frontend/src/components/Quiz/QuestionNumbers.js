import React from "react";
import { connect } from "react-redux";

function QuestionNumbers = (props) => {
  return (
    <div>
      Hey
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quizInstructor
  }
}

export default connect(mapStateToProps)(QuestionNumbers);