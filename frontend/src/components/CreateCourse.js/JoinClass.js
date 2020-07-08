import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import Axios from "axios";

function JoinClass(props) {
  const handleClose = () => {
    props.dispatch({
      type: "REMOVE_JOIN_MODAL",
    });
  };

  const handleEnrollString = (event) => {
    props.dispatch({
      type: "SET_ENROLL",
      payload: event.target.value,
    });
  };

  const handleJoinClass = async (event) => {
    props.dispatch({
      type: "SET_BACKDROP",
    });
    props.dispatch({
      type: "REMOVE_JOIN_MODAL",
    });
    try {
      await Axios.post(
        "http://localhost:4000/api/users/course",
        {
          enrollID: props.joinClass.enrollString,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let course = await Axios.get(
        "http://localhost:4000/api/users?type=courses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      props.dispatch({
        type: "COURSE_CARD",
        payload: course.data.data.studentCourses,
      });
    } catch (error) {
      if (error.response.data.message) {
        props.dispatch({
          type: "SET_JOIN_WARNING_MESSAGE",
          payload: error.response.data.message,
        });
      }
      props.dispatch({
        type: "SET_JOIN_WARNING",
      });
    }
    props.dispatch({
      type: "REMOVE_BACKDROP",
    });
  };

  return (
    <div>
      <Dialog
        open={props.joinClass.open}
        onClose={handleClose}
        aria-labelledby="join-class"
      >
        <DialogTitle id="join-class">Join Class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the 20 characters enroll ID to join a class.
          </DialogContentText>
          <TextField
            error={
              props.joinClass.enrollString &&
              props.joinClass.enrollString.length !== 20
            }
            helperText="Enroll String length is 20 characters"
            autoFocus
            margin="dense"
            id="id"
            label="Enter Enroll ID"
            type="string"
            fullWidth
            onChange={handleEnrollString}
            value={props.joinClass.enrollString}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            onClick={handleJoinClass}
            disabled={props.joinClass.enrollString.length !== 20}
          >
            Join Class
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    joinClass: state.joinClass,
  };
};

export default connect(mapStateToProps)(JoinClass);
