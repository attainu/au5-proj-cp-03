import React, { Component } from 'react';
import { Paper, Avatar, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import FileUploader from "react-firebase-file-uploader";
import { storage, firebase } from "../../config/firebaseconfig";
import { withRouter } from "react-router-dom"
import CancelIcon from '@material-ui/icons/Cancel';
import { connect } from "react-redux";
import Axios from "axios";
import moment from "moment";

class AssignmentInstructor extends Component {

  state = {
    view: true,
    url: "",
    message: "",
    progress: 0,
    filename: "",
    title: "",
    date: moment().format("YYYY-MM-DDTHH:mm"),
  }

  handleTitle = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  handleUpload = async (filename) => {
    const pdflink = await storage.ref("pdfs").child(filename).getDownloadURL();
    this.setState({
      url: pdflink,
      filename,
      progress: 0
    });
    this.props.dispatch({
      type: "SET_GLOBAL_SUCCESS",
      payload: "File has been uploaded sucessfully",
    })
  };

  handleView = () => {
    this.setState({
      view: !this.state.view
    })
  }

  handleProgress = (progress) => {
    if (progress === 0) {
      this.setState({
        url: "",
      });
    }
    this.setState({
      progress
    });
  };

  handleMessage = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  handleAssingment = async () => {
    try {
      await Axios.post("http://localhost:4000/api/assignment", {
        courseID: this.props.match.params.id,
        message: this.state.message,
        endDate: this.state.date,
        file: this.state.url,
        filename: this.state.filename,
        title: this.state.title
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      const res = await Axios.get(`http://localhost:4000/api/course/${this.props.match.params.id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.props.dispatch({
        type: "SET_ASSIGNMENTS",
        payload: res.data.data.assignments
      });
      this.setState({
        view: true,
        url: "",
        message: "",
        progress: 0,
        filename: "",
        title: "",
        date: moment().format("YYYY-MM-DDTHH:mm"),
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {this.state.view ? (
          <Paper
            style={{
              minHeight: "4.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px"
            }}
            elevation={3}
            onClick={this.handleView}
          >
            <Avatar style={{ background: "purple" }} className="mx-2">{this.props.user.name[0]}</Avatar>
            <Typography
              variant="body1"
              className="pl-3"
              style={{
                display: "flex",
                flexGrow: "1",
              }}
            >Add assignment to your class</Typography>
          </Paper>
        ) : (
            <Paper
              elevation={3}
              className="p-4"
              style={{
                borderRadius: "10px"
              }}
            >
              <TextField
                id="title"
                type="string"
                rows={1}
                fullWidth
                placeholder="Assignment Title"
                onChange={this.handleTitle}
                value={this.state.title}
                className="my-2"
              />
              <TextField
                id="time"
                type="string"
                rows={4}
                fullWidth
                multiline
                variant="filled"
                placeholder="Add description to the assingment"
                style={{
                  borderRadius: "10px"
                }}
                onChange={this.handleMessage}
                value={this.state.message}
                className="my-2"
              />
              <TextField
                id="datetime-local"
                label="Deadline"
                type="datetime-local"
                value={this.state.date}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  if (moment(e.target.value).unix() < moment().unix()) {
                    this.setState({
                      date: moment().format("YYYY-MM-DDTHH:mm")
                    });
                  } else {
                    this.setState({
                      date: moment(e.target.value).format("YYYY-MM-DDTHH:mm")
                    })
                  }
                }}
                className="my-2"
              />
              <div
                className="mt-3"
                style={{
                  display: "flex"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexGrow: "1",
                    alignItems: "center"
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    component="label"
                  >
                    Upload File
                    <FileUploader
                      filename={file => file.name.split('.')[0]}
                      storageRef={firebase.storage().ref("pdfs")}
                      onUploadSuccess={this.handleUpload}
                      onProgress={this.handleProgress}
                      style={{ display: "none" }}
                      accept=".pdf,.jpeg,.jpg,.png"
                    />
                  </Button>
                  {(this.state.progress > 0) && <CircularProgress variant="static" value={this.state.progress} className="mx-2" />}
                  {this.state.url.length > 0 && (
                    <>
                      <a href={this.state.url} target="_blank" className="mx-2" rel="noopener noreferrer">Uploaded File</a>
                      <CancelIcon onClick={() => this.setState({ url: "" })} />
                    </>
                  )}
                </div>
                <Button
                  className="mx-2"
                  onClick={this.handleView}
                >Cancel</Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!(this.state.message.length > 0 && this.state.title.length > 0)}
                  onClick={this.handleAssingment}
                >
                  Add Assingment
              </Button>
              </div>
            </Paper>
          )}
      </div>
    )
  }
}

const mapStateToPorps = state => {
  return {
    user: state.user.user,
  }
}

export default withRouter(connect(mapStateToPorps)(AssignmentInstructor));
