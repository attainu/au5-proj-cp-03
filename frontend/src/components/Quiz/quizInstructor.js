import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Axios from "axios";
import { Typography } from "@material-ui/core";
import NewQuestion from "./NewQuestion";
import ViewQuestion from "./ViewQuestion";
import EditQuestion from "./EditQuestion";

class QuizInstructor extends Component {
  state = {
    warning: "",
  };
  async componentDidMount() {
    try {
      const res = await Axios.get(
        `http://localhost:4000/api/quiz?_id=${this.props.match.params.id1}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      res.data.data.question.push({
        options: ["", ""],
        question: "",
        answer: "",
      });
      this.props.dispatch({
        type: "SET_QUESTIONS",
        payload: res.data.data.question,
      });
      this.props.dispatch({
        type: "VIEW_QUESTION",
        payload: 0,
      });
      this.props.dispatch({
        type: "NEW_QUESTION_INDEX",
        payload: res.data.data.question.length - 1,
      });
      this.props.dispatch({
        type: "SET_TITLE",
        payload: res.data.data.title,
      });
    } catch (error) {
      this.setState({
        warning: "Invalid quiz ID",
      });
    }
    this.props.dispatch({
      type: "REMOVE_BACKDROP",
    })
  }
  render() {
    console.log(this.props.quiz.questions, this.props.quiz.viewQuestion);
    return (
      <div>
        {this.state.warning && (
          <Typography variant="h3" align="center">
            Invalid Quiz.Go to <Link to="/courses">Courses</Link>
          </Typography>
        )}
        {this.state.warning.length === 0 && (
          <Typography className="mb-3" variant="h4" align="center">
            Quiz: {this.props.quiz.title}
          </Typography>
        )}
        {this.props.quiz.newQuestionIndex === this.props.quiz.viewQuestion &&
          this.props.quiz.questions.length > 0 && (
            <NewQuestion
              question={this.props.quiz.questions[this.props.quiz.viewQuestion]}
            />
          )}
        {this.props.quiz.newQuestionIndex !== this.props.quiz.viewQuestion &&
          this.props.quiz.viewQuestion !==
          this.props.quiz.editQuestionIndex && (
            <ViewQuestion
              question={this.props.quiz.questions[this.props.quiz.viewQuestion]}
            />
          )}
        {this.props.quiz.viewQuestion === this.props.quiz.editQuestionIndex && (
          <EditQuestion
            question={this.props.quiz.questions[this.props.quiz.viewQuestion]}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quizInstructor,
  };
};

export default withRouter(connect(mapStateToProps)(QuizInstructor));
