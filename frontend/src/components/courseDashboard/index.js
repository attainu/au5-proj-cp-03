import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import TeacherVideoUpload from "./TeacherVideoUpload";
import TeacherEbookUpload from "./TeacherUploadEbook";
import StudentVideoPanel from "./StudentVideoPanel";
import StudentEbookPanel from "./StudentEbookPanel";
import Dashboard from "../Dashboard/Dashboard"
import { connect } from "react-redux";
import Axios from "axios";
import Posts from "../Posts/Posts";
import QuizView from "../Quiz/QuizDashboard/QuizView";
import Assignment from "../Assignment/Assignment";

class index extends Component {
  state = {
    view: "Assignment",
  };

  async componentDidMount() {
    this.props.dispatch({
      type: "SET_BACKDROP",
    });
    const url = "http://localhost:4000/api/course/";
    const temp = window.location.href;
    const id = temp.split("/");
    const finalurl = url + id[4];
    await Axios.get(finalurl).then((data) => {
      this.props.dispatch({
        type: "COURSE_DASHBOARD",
        payload: data.data,
      });
    });
    this.props.dispatch({
      type: "REMOVE_BACKDROP"
    });
  }
  render() {
    console.log(this.state.view);
    let isInstructor = false;
    let role = this.props.role;

    if (role === "instructor") {
      isInstructor = true;
    }
    const handleView = (value) => {
      this.setState({ view: value });
      this.setState({ showVideo: true });
    };

    let styles = {
      background: "#E3FCED"
    }

    return (
      <>
        <Dashboard />
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-10">
                <Paper
                  style={{
                    height: "200px",
                    backgroundImage: `url('https://gstatic.com/classroom/themes/img_bookclub.jpg')`,
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    textAlign="left"
                    style={{
                      marginLeft: "20px",
                      marginTop: "20px",
                      paddingTop: "20px",
                    }}
                  >
                    <Typography variant="h4" style={{ color: "white" }}>
                      {this.props.courseID} - {this.props.courseName}
                    </Typography>
                    {this.props.role === "instructor" && <Typography variant="h6" style={{ color: "white" }}>
                      Enroll string for course - {this.props.enroll}
                    </Typography>}
                    {/* {this.props.role === "student" && <Typography variant="h6" style={{ color: "white" }}>
                      Instructor: {this.props.name}
                    </Typography>} */}
                  </Box>
                </Paper>
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>
          <br />
          <br />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-3">
                <Grid justify="center" container={true}>
                  <div>
                    <Paper elevation={3} style={{
                      width: "16rem"
                    }}>
                      <List className="p-0">
                        <ListItem button
                          style={this.state.view === "Posts" ? styles : {}}
                          onClick={() => handleView("Posts")}
                        >
                          <ListItemText style={{ textAlign: "center" }}>
                            Post
                      </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button
                          style={this.state.view === "Assignment" ? styles : {}}
                          onClick={() => handleView("Assignment")}>
                          <ListItemText style={{ textAlign: "center" }}>
                            Assignment
                      </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button
                          style={this.state.view === "Quiz" ? styles : {}}
                          onClick={() => handleView("Quiz")}>
                          <ListItemText style={{ textAlign: "center" }}>
                            Quiz
                      </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button
                          style={this.state.view === "Videos" ? styles : {}}
                          onClick={() => handleView("Videos")}>
                          <ListItemText style={{ textAlign: "center" }}>
                            Videos
                      </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button
                          style={this.state.view === "Ebooks" ? styles : {}}
                          onClick={() => handleView("Ebooks")}>
                          <ListItemText style={{ textAlign: "center" }}>
                            Ebook
                      </ListItemText>
                        </ListItem>
                      </List>
                    </Paper>
                  </div>
                </Grid>
              </div>
              <div className="col-md-7">
                {this.state.view === "Ebooks" ? (
                  <Grid
                    elevation={3}
                    style={{ paddingTop: "15px", paddingBottom: "15px" }}
                  >
                    {isInstructor ? (
                      <TeacherVideoUpload />
                    ) : (
                        <StudentVideoPanel />
                      )}
                  </Grid>
                ) : null}
                {this.state.view === "Videos" ? (
                  <Grid
                    elevation={3}
                    style={{ paddingTop: "15px", paddingBottom: "15px" }}
                  >
                    {isInstructor ? (
                      <TeacherEbookUpload />
                    ) : (
                        <StudentEbookPanel />
                      )}
                  </Grid>
                ) : null}
                {this.state.view === "Posts" && <Posts />}
                {this.state.view === "Quiz" && <QuizView />}
                {this.state.view === "Assignment" && <Assignment />}
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>
        </div >
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    courseID: state.courseDashboard.courseID,
    courseName: state.courseDashboard.courseName,
    enroll: state.courseDashboard.enrollString,
    name: state.courseDashboard.name,
    role: state.user.user.role,
  };
};
export default connect(mapStateToProps)(index);
