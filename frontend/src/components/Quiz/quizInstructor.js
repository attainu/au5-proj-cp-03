import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { Typography } from '@material-ui/core';
import NewQuestion from './NewQuestion';

class QuizInstructor extends Component {

  state = {
    warning: "",
  }
  async componentDidMount() {
    try {
      const res = await Axios.get(`http://localhost:4000/api/quiz?_id=${this.props.match.params.id1}`,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          }
        });
      this.props.dispatch({
        type: "SET_QUESTIONS",
        payload: res.data.data.question
      });
      this.props.dispatch({
        type: "VIEW_QUESTION",
        payload: 0,
      });
      this.props.dispatch({
        type: "NEW_QUESTION_INDEX",
        payload: res.data.data.question.length
      });
      this.props.dispatch({
        type: "SET_TITLE",
        payload: res.data.data.title
      });
    } catch (error) {
      this.setState({
        warning: "Invalid quiz ID"
      })
    }
  }
  render() {
    return (
      <div>
        {this.state.warning && <Typography variant="h3" align="center">Invalid Quiz ID</Typography>}
        {!this.state.warning && <Typography variant="h4" align="center">Quiz: {this.props.quiz.title}</Typography>}
        {this.props.quiz.newQuestionIndex === this.props.quiz.viewQuestion && <NewQuestion />}
        {/* {this.props.quiz.newQuestionIndex !== this.props.quiz.viewQuestio && } */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    quiz: state.quizInstructor
  }
}

export default withRouter(connect(mapStateToProps)(QuizInstructor));
