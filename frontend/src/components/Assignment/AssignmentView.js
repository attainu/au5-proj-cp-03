import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import { connect } from "react-redux";
import Axios from "axios";
import { Paper, Typography, Divider, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class AssignmentView extends Component {

  state = {
    submissions: "",
    open: false
  }

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

  handleSubmissions = async (id) => {
    try {
      const res = await Axios.get(`http://localhost:4000/api/assignment/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.setState({
        submissions: res.data.data,
        open: true
      });
    } catch (error) {

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
              {el.filename && (
                <div className="p-2">
                  Assignment file:
                  <a href={el.file} target="_blank" rel="noopener noreferrer">{el.filename}</a>
                </div>
              )}
              {this.props.user.role === "instructor" && (
                <div>
                  <Button variant="contained" className="ml-2" color="primary" onClick={() => this.handleSubmissions(el._id)}>View all Submissions</Button>
                </div>
              )}
            </Paper>
          )
        })}
        {this.state.open && (
          <Dialog open={this.state.open} onClose={() => this.setState({ open: false })} aria-labelledby="assignment-submissions">
            <DialogTitle id="assignment-submissions">Submissions of Assignment</DialogTitle>
            <DialogContent>
              <TableContainer component={Paper} style={{ width: "35vw" }} className="m-2">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sl.No</TableCell>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Submitted File</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.submissions.map((el, index) => {
                      return (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell align="left">{el.userID.name}</TableCell>
                          <TableCell align="right"><a href={el.file} target="_blank">Submitted File</a></TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setState({ open: false })} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
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