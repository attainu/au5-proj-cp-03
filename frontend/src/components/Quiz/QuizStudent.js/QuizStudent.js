import React from 'react';
import { connect } from 'react-redux';

function QuizStudent() {
  return (
    <div>
      Welcome to Quiz
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(QuizStudent);