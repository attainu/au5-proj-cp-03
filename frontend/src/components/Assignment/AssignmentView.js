import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import { connect } from "react-redux";
import Axios from "axios";
import { Paper, Typography, Divider, Button } from '@material-ui/core';

class AssignmentView extends Component {

  async componentDidMount() {
    try {
      const res = await Axios.get(`http://localhost:4000/api/course/${this.props.match.params.id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.props.dispatch({
        type: "SET_ASSIGNMENTS",
        payload: res.data.data.assignments
      });
    } catch (error) {
      // console.log(error);
    }
  }

  render() {
    return (
      <div className="my-3">
        {this.props.assignment.assignments.length > 0 && this.props.assignment.assignments.map((el) => {
          return (
            <Paper elevation={3}
              style={{
                borderRadius: 10
              }}
              key={el._id}
              className="p-2 my-3"
            >
              <Typography variant="h4" children={`Title: ${el.title}`} className="p-2"></Typography>
              <Divider />
              <Typography variant="body1" children={el.message} className="p-2" />
              {this.props.user.role === "instructor" && <Button variant="contained" color="primary">View all Submissions</Button>}
            </Paper>
          )
        })}
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

export default withRouter(connect(mapStateToProps)(AssignmentView));