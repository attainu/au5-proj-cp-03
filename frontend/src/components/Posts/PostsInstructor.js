import React, { Component } from 'react'
import { Paper, Avatar, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import FileUploader from "react-firebase-file-uploader";
import { storage, firebase } from "../../config/firebaseconfig";
import { withRouter } from "react-router-dom"
import CancelIcon from '@material-ui/icons/Cancel';
import { connect } from "react-redux";
import Axios from "axios";


class PostsInstructor extends Component {

  state = {
    postView: true,
    url: "",
    message: "",
    progress: 0,
    filename: "",
  }

  handleView = () => {
    this.setState({
      postView: !this.state.postView
    })
  }

  handleFile = (event) => {
    console.log(event.target)
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
    })
  }

  handlePost = async () => {
    try {
      await Axios.post("http://localhost:4000/api/post", {
        courseID: this.props.match.params.id,
        file: this.state.url,
        filename: this.state.filename,
        message: this.state.message,
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      const res = await Axios.get(
        `http://localhost:4000/api/course?id=${this.props.match.params.id}&type=posts&page=${this.props.posts.page}`,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      this.props.dispatch({
        type: "SET_GLOBAL_SUCCESS",
        payload: "Post has been created sucessfully"
      })
      this.props.dispatch({
        type: "SET_POSTS",
        payload: res.data.data
      });
      this.setState({
        postView: true,
        url: "",
        message: "",
        progress: 0,
        filename: ""
      });
    } catch (error) {
      console.log(error);
    }

  }

  render() {
    return (
      <div>
        {this.state.postView ? (
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
            >Share something with your class</Typography>
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
                id="time"
                type="string"
                rows={4}
                fullWidth
                multiline
                variant="filled"
                placeholder="Share something to your class"
                style={{
                  borderRadius: "10px"
                }}
                onChange={this.handleMessage}
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
                    onChange={(e) => this.handleFile(e)}
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
                  disabled={!(this.state.message.length > 0)}
                  onClick={this.handlePost}
                >
                  Post
              </Button>
              </div>
            </Paper>
          )
        }
      </div>
    )
  }
}

const mapStateToPorps = state => {
  return {
    user: state.user.user,
    posts: state.posts
  }
}

export default withRouter(connect(mapStateToPorps)(PostsInstructor));
