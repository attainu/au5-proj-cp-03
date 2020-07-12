import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from 'axios';
import AssignmentInstructor from './AssignmentInstructor';


class Assignment extends Component {

  async componentDidMount() {
    try {
      const res = await Axios.get(`http://localhost:4000/api/course/${this.props.match.params.id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(res.data.data, "SOOOOPER");
      this.props.dispatch({
        type: "SET_ASSIGNMENTS",
        payload: res.data.data.assignments
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {this.props.user.role === "instructor" && <AssignmentInstructor />}

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
