import React, { Component } from 'react'
import { Paper, Avatar, Typography, TextField, Button } from '@material-ui/core';
import FileUploader from "react-firebase-file-uploader";
import { storage, firebase } from "../../config/firebaseconfig";
import { connect } from "react-redux";


class PostsInstructor extends Component {

  state = {
    postView: true,
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
    console.log(filename);
    const pdflink = await storage.ref("pdfs").child(filename).getDownloadURL();
    console.log(pdflink);
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
              variant="p"
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
                    flexGrow: "1"
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    component="label"
                    onChange={(e) => this.handleFile(e)}
                  >
                    Upload File
                    {/* <input
                      type="file"
                      style={{ display: "none" }}
                      accept=".pdf,.jpeg,.jpg,.png"
                    /> */}
                    <FileUploader
                      filename={file => file.name.split('.')[0]}
                      storageRef={firebase.storage().ref("pdfs")}
                      onUploadSuccess={this.handleUpload}
                      style={{ display: "none" }}
                      accept=".pdf,.jpeg,.jpg,.png"
                    />
                  </Button>
                </div>
                <Button
                  className="mx-2"
                  onClick={this.handleView}
                >Cancel</Button>
                <Button variant="contained" color="primary">
                  Post
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

export default connect(mapStateToPorps)(PostsInstructor);
