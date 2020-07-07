import React, { Component } from 'react'
import { connect } from "react-redux";

class NewQuestion extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    quiz: state.quizInstructor
  }
}

export default connect(mapStateToProps)(NewQuestion);