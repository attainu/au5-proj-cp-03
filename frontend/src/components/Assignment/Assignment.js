import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from 'axios';
import AssignmentInstructor from './AssignmentInstructor';
import AssignmentView from './AssignmentView';


class Assignment extends Component {

  render() {
    return (
      <div>
        {this.props.user.role === "instructor" && <AssignmentInstructor />}
        <AssignmentView />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    assignment: state.assignment
  }
}

export default withRouter(connect(mapStateToProps)(Assignment));
