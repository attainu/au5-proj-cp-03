import React, { useState } from 'react'
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from 'axios';

function AddQuiz(props) {
  const [view, setView] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(moment().format("YYYY-MM-DDTHH:mm"));
  const [duration, setDuration] = useState(30);

  const getQuiz = async () => {
    try {
      const res = await Axios.get(`http://localhost:4000/api/course?id=${props.match.params.id}&type=quizzes&page=${props.quiz.page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      props.dispatch({
        type: "SET_QUIZ",
        payload: res.data.data
      });

    } catch (error) {
    }
  }

  const handleCreateQuiz = async () => {
    try {
      await Axios.post("http://localhost:4000/api/quiz", {
        courseID: props.match.params.id,
        title,
        startTime: date,
        duration
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      getQuiz();
      setView(false);
    } catch (error) {
      console.log(error);
      props.dispatch({
        type: "SET_GLOBAL_WARNING",
        payload: `Quiz title can't be duplicate`
      })
    }
  }
  return (
    <div>
      <Button variant="contained" onClick={() => setView(true)} className="my-2">New Quiz</Button>
      {view && (
        <Paper elevation={3} className="my-2 p-2">
          <Typography variant="h4">Enter following details to create a quiz</Typography>
          <TextField
            fullWidth
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="string"
            id="title"
            label="Enter title"
            className="mb-2"
          />
          <div>
            <TextField
              id="datetime-local"
              label="Quiz start date"
              type="datetime-local"
              value={date}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                if (moment(e.target.value).unix() < moment().unix()) {
                  setDate(moment().format("YYYY-MM-DDTHH:mm"));
                } else {
                  setDate(moment(e.target.value).format("YYYY-MM-DDTHH:mm"));
                }
              }}
            />
            <TextField
              id="duration"
              label="Duration in minutes"
              className="ml-5"
              value={duration}
              type="number"
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div style={{
            display: "flex",
            justifyContent: "flex-end"
          }}>
            <Button color="primary" variant="contained" onClick={() => setView(false)} className="mx-2 mt-2">Cancel</Button>
            <Button color="primary" variant="contained"
              className="mt-2"
              onClick={handleCreateQuiz}
              disabled={!(title.trim().length > 0 && date && duration > 0)}
            >Create Quiz</Button>
          </div>
        </Paper>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz
  }
}

export default withRouter(connect(mapStateToProps)(AddQuiz));