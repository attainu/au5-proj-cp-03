import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from 'axios';
import QuizTable from './QuizTable';
import { Button } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

class Quizzes extends Component {

  getQuiz = async (page) => {
    console.log(page);
    try {
      const res = await Axios.get(`http://localhost:4000/api/course?id=${this.props.match.params.id}&type=quizzes&page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(res.data.data);
      if (res.data.data.length === 0) {
        this.props.dispatch({
          type: "SET_GLOBAL_SUCCESS",
          payload: `No quizzes`
        });
        this.props.dispatch({
          type: "INC_PAGE_QUIZ",
          payload: page - 1
        })
      } else {
        this.props.dispatch({
          type: "SET_QUIZ",
          payload: res.data.data
        });
      }

    } catch (error) {
      console.log(error);
    }
  }

  handlePrevious = () => {
    this.props.dispatch({
      type: "DEC_PAGE_QUIZ",
    });
    this.getQuiz(this.props.quiz.page - 1);
  }

  handleNext = () => {
    this.props.dispatch({
      type: "INC_PAGE_QUIZ",
    });
    this.getQuiz(this.props.quiz.page + 1);
  }

  componentDidMount() {
    this.getQuiz(1);
  }

  render() {
    return (
      <div>
        {this.props.quiz.quiz.length > 0 && <QuizTable />}
        <div className="my-3" style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          {this.props.quiz.page > 1 && <Button variant="contained" onClick={this.handlePrevious}><ArrowBackIosIcon /> Previous</Button>}
          {this.props.quiz.quiz.length === 5 && <Button variant="contained" onClick={this.handleNext}>Next <ArrowForwardIosIcon fontSize="small" /></Button>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz
  }
}

export default withRouter(connect(mapStateToProps)(Quizzes));