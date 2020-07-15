import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Axios from 'axios';
// import Dashboard from '../../Dashboard/Dashboard';
import QuestionNumber from './QuestionNumber';
import Question from './Question';
import { Typography } from '@material-ui/core';

class QuizStudent extends Component {

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
      res.data.data.question = res.data.data.question.map(el => {
        el.answer = "";
        return el;
      });
      this.props.dispatch({
        type: "SET_QUIZID",
        payload: this.props.match.params.id1
      });
      this.props.dispatch({
        type: "SET_STUD_QUESTIONS",
        payload: res.data.data.question
      });
      this.props.dispatch({
        type: "SET_STUD_NAME",
        payload: res.data.data.title
      });
      this.props.dispatch({
        type: "SET_STUD_DURA",
        payload: res.data.data.duration
      })
    } catch (error) {
      this.props.history.push(`/courses`)
      if (error.response) {
        this.props.dispatch({
          type: "SET_GLOBAL_WARNING",
          payload: error.response.data.message
        });
      }
    }
    this.props.dispatch({
      type: "REMOVE_BACKDROP",
    });
  }

  render() {
    return (
      <div>
        <QuestionNumber />
        <Typography variant="h3" children={`Quiz: ${this.props.quiz.name}`} align="left" />
        {this.props.quiz.questions.length > 0 && <Question question={this.props.quiz.questions[this.props.quiz.viewQuestion]} />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    quiz: state.quizStudent
  }
}

export default withRouter(connect(mapStateToProps)(QuizStudent));