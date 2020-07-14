import React, { Component } from 'react';
import { connect } from "react-redux";
import AddQuiz from './AddQuiz';
import Quizzes from './Quizzes';

class QuizView extends Component {

  render() {
    return (
      <div>
        {this.props.user.role === "instructor" && <AddQuiz />}
        <Quizzes />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  };
};
export default connect(mapStateToProps)(QuizView);

