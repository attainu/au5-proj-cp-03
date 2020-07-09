import React, { Component } from 'react'
import { connect } from "react-redux";
import Dashboard from '../Dashboard/Dashboard';
import QuizInstructor from './quizInstructor';
import { withRouter } from 'react-router';
import QuizStudent from './QuizStudent/QuizStudent';
// import Axios from 'axios';

class quiz extends Component {
  async componentDidMount() {
    this.props.dispatch({
      type: "SET_BACKDROP",
    });
    this.props.dispatch({
      type: "SET_QUIZ_ID",
      payload: this.props.match.params.id1
    })
  }

  render() {
    return (
      <div>
        <Dashboard />
        {this.props.user.role === "instructor" && <QuizInstructor />}
        {this.props.user.role === "student" && <QuizStudent />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    quizInstructor: state.quizInstructor
  }
}

export default withRouter(connect(mapStateToProps)(quiz));
