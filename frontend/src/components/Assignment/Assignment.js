import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AssignmentInstructor from './AssignmentInstructor';
import AssignmentView from './AssignmentView';
import StudAssignView from './StudAssignView';


class Assignment extends Component {

  render() {
    return (
      <div>
        {this.props.user.role === "instructor" && <AssignmentInstructor />}
        {this.props.user.role === "instructor" && <AssignmentView />}
        {this.props.user.role === "student" && <StudAssignView />}
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
