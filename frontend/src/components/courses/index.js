import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "../Dashboard/Dashboard";
import Axios from "axios";
import CourseCard from "./courseCard";
import { Typography } from "@material-ui/core";

class index extends Component {
  state = {
    warning: "",
  };

  async componentDidMount() {
    try {
      let course = await Axios.get(
        "http://localhost:4000/api/users?type=courses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (course.data.data.role === "student") {
        this.setState({
          warning: "Enroll to a course",
        });
        this.props.dispatch({
          type: "COURSE_CARD",
          payload: course.data.data.studentCourses,
        });
      } else if (course.data.data.role === "instructor") {
        this.setState({
          warning: "Create a course",
        });
        this.props.dispatch({
          type: "COURSE_CARD",
          payload: course.data.data.instructorCourses,
        });
      }
    } catch (error) { }
  }

  render() {
    const { courses } = this.props;
    return (
      <div>
        <Dashboard />
        {
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
            className="mt-4"
          >
            {courses.length ? (
              this.props.user.user.role === "instructor" ? (
                courses.map((el) => <CourseCard course={el} />)
              ) : (
                  courses.map((el) => <CourseCard course={el.courseID} />)
                )
            ) : (
                <Typography variant="h4" component="h2">
                  {this.state.warning}
                </Typography>
              )}
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    courses: state.courseCard.courses,
  };
};

export default connect(mapStateToProps)(index);
