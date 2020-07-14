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

function CreateCourse(props) {
  const handleClose = () => {
    props.dispatch({
      type: "REMOVE_MODAL",
    });
  };

  const handleCourseID = (event) => {
    props.dispatch({
      type: "SET_COURSEID",
      payload: event.target.value,
    });
  };

  const handleCourseDescription = (event) => {
    props.dispatch({
      type: "SET_DESCRIPTION",
      payload: event.target.value,
    });
  };

  const handleCourseName = (event) => {
    props.dispatch({
      type: "SET_COURSE_NAME",
      payload: event.target.value,
    });
  };

  const handleCourseCreation = async () => {
    props.dispatch({
      type: "SET_BACKDROP",
    });
    props.dispatch({
      type: "REMOVE_MODAL",
    });
    console.log("Yooo");
    try {
      await Axios.post(
        "http://localhost:4000/api/course",
        {
          courseID: props.newCourse.courseID,
          name: props.newCourse.name,
          description: props.newCourse.description,
          instructor: props.user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      props.dispatch({
        type: "SET_SUCCESS",
      });
      let course = await Axios.get(
        "http://localhost:4000/api/users?type=courses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (course.data.data.role === "student") {
        props.dispatch({
          type: "COURSE_CARD",
          payload: course.data.data.studentCourses,
        });
      } else if (course.data.data.role === "instructor") {
        props.dispatch({
          type: "COURSE_CARD",
          payload: course.data.data.instructorCourses,
        });
      }
    } catch (error) {
      props.dispatch({
        type: "SET_WARNING",
      });
    }
    props.dispatch({
      type: "REMOVE_BACKDROP",
    });
  };

  return (
    <div>
      <Dialog
        open={props.newCourse.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide the following details and complete the process of creation
            of class. All Fields are required
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="id"
            label="Enter Course ID"
            type="string"
            fullWidth
            onChange={handleCourseID}
            value={props.newCourse.courseID}
          />
          <TextField
            margin="dense"
            id="name"
            label="Enter Course name"
            type="string"
            fullWidth
            onChange={handleCourseName}
            value={props.newCourse.name}
          />
          <TextField
            margin="dense"
            id="desc"
            label="Enter description of class"
            type="string"
            fullWidth
            onChange={handleCourseDescription}
            value={props.newCourse.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            onClick={handleCourseCreation}
            color="primary"
            disabled={
              !(
                props.newCourse.courseID &&
                props.newCourse.description.length > 100 &&
                props.newCourse.name
              )
            }
          >
            Create Class
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    newCourse: state.newCourse,
  };
};

export default connect(mapStateToProps)(CreateCourse);
