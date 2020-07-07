import React, { Component } from 'react'
import { connect } from "react-redux";
import Dashboard from '../Dashboard/Dashboard';
import QuizInstructor from './quizInstructor';

class quiz extends Component {
  async componentDidMount() {
    // let res = await Axios.get()
  }

  render() {
    return (
      <div>
        <Dashboard />
        {this.props.user.role === "instructor" && <QuizInstructor />}
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

export default connect(mapStateToProps)(quiz)
