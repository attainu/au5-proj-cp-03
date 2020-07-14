import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from "react-router-dom";
import { Paper, Typography, Divider, Button, CircularProgress } from '@material-ui/core';
import FileUploader from "react-firebase-file-uploader";
import { storage, firebase } from "../../config/firebaseconfig";
import CancelIcon from '@material-ui/icons/Cancel';

class StudAssignView extends Component {

  state = {
    students: [],
    index: "",
    url: "",
    file: "",
    filename: "",
    progress: 0
  }

  getStudAssign = async () => {
    try {
      const res = await Axios.get(`http://localhost:4000/api/assignsubn/${this.props.match.params.id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(res.data.data);
      this.setState({
        students: res.data.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleUpload = async (filename) => {
    const pdflink = await storage.ref("pdfs").child(filename).getDownloadURL();
    this.setState({
      url: pdflink,
      filename,
      progress: 0,
    });
    // this.props.dispatch({
    //   type: "SET_GLOBAL_SUCCESS",
    //   payload: "File has been uploaded sucessfully",
    // })
  };

  handleView = (index) => {
    this.setState({
      index,
      url: "",
      file: "",
      filename: "",
      progress: 0
    });
  }

  handleProgress = (progress, id) => {
    if (progress === 0) {
      this.setState({
        url: "",
      });
    }
    this.setState({
      progress
    });
  };

  handleSubmission = async () => {
    try {
      await Axios.post("http://localhost:4000/api/assignsubn", {
        assignmentID: `${this.state.students[this.state.index]._id}`,
        file: this.state.url,
        filename: this.state.filename
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.getStudAssign()
    } catch (error) {

    }
  }

  async componentDidMount() {
    try {
      this.getStudAssign();
    } catch (error) {

    }
  }
  render() {
    return (
      <div>
        {this.state.students.length > 0 && this.state.students.map((el, index) => {
          return (
            <Paper
              elevaation={3}
              style={{
                borderRadius: "10px",
              }}
              className="my-3"
            >
              <Typography variant="h5" component="h1" children={`Title: ${el.title.split("{")[0]}`} className="p-2 mx-2"></Typography>
              <Typography variant="body1" children={el.message} className="pl-2 mx-2" />
              {el.filename && (
                <div className="p-2">
                  Assignment file:
                  <a href={el.file} target="_blank" rel="no referrer">{el.filename}</a>
                </div>
              )}
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                className="m-2"
              >
                {`${el.title.split("{")[1]}` === "Submitted" ? (
                  <>
                    <Typography variant="body1">
                      Submitted file: <a href={el.title.split("{")[2]} target="_blank">{el.filename ? el.filename : "submission.pdf"}</a>
                    </Typography>
                    <Button variant="contained" disabled className="mb-2">
                      Submitted
                    </Button>
                  </>
                ) : (
                    <>
                      <div>
                        <Button variant="contained" color="primary" className="mb-2" component="label" onClick={() => this.handleView(index)}>
                          Add Submission
                        <FileUploader
                            filename={file => file.name.split('.')[0]}
                            storageRef={firebase.storage().ref("pdfs")}
                            onUploadSuccess={this.handleUpload}
                            onProgress={() => this.handleProgress(index)}
                            style={{ display: "none" }}
                            accept=".pdf,.jpeg,.jpg,.png"
                          />
                        </Button>
                        {(this.state.progress > 0 && this.state.index === index) && <CircularProgress variant="static" value={this.state.progress} className="mx-2" />}
                        {(this.state.url.length > 0 && this.state.index === index) && (
                          <>
                            <a href={this.state.url} target="_blank" className="mx-2" rel="noopener noreferrer">Uploaded File</a>
                            <CancelIcon onClick={() => this.setState({ url: "" })} />
                          </>
                        )}
                      </div>
                      <Button variant="contained" color="primary"
                        disabled={!(this.state.filename.length > 0 && this.state.index == index)}
                        onClick={this.handleSubmission}
                      >
                        Upload Assignment
                      </Button>
                    </>
                  )}
              </div>
            </Paper>
          )
        })}
      </div>
    )
  }
}

export default withRouter(StudAssignView);
