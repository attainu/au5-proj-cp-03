import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { storage, firebase } from "../../config/firebaseconfig";
import CancelIcon from '@material-ui/icons/Cancel';
import FileUploader from "react-firebase-file-uploader";
import Axios from "axios";

function PostEdit(props) {

  const getPosts = async (page) => {
    try {
      const res = await Axios.get(
        `http://localhost:4000/api/course?id=${props.match.params.id}&type=posts&page=${page}`,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      props.dispatch({
        type: "SET_POSTS",
        payload: res.data.data
      });
      props.dispatch({
        type: "SET_GLOBAL_SUCCESS",
        payload: "Post has been updated successfully",
      })
      props.dispatch({
        type: "REMOVE_MODAL_POST"
      })
    } catch (error) {
      // console.log(error);
    }
  }

  const handleMessage = (e) => {
    props.dispatch({
      type: "SET_MESSAGE_POST",
      payload: e.target.value
    })
  }

  const handleProgress = (progress) => {
    props.dispatch({
      type: "SET_PROGRESS_POST",
      payload: progress
    })
  };

  const handleUpload = async (filename) => {
    const pdflink = await storage.ref("pdfs").child(filename).getDownloadURL();
    props.dispatch({
      type: "SET_FILENAME",
      payload: filename
    });
    props.dispatch({
      type: "SET_FILE",
      payload: pdflink
    });
    props.dispatch({
      type: "SET_PROGRESS_POST",
      payload: 0
    })
    props.dispatch({
      type: "SET_GLOBAL_SUCCESS",
      payload: "File has been uploaded sucessfully",
    })
  }

  const handlePost = async () => {
    props.dispatch({
      type: "SET_BACKDROP",
    });
    try {
      await Axios.put("http://localhost:4000/api/post", {
        postID: props.postEdit.postId,
        message: props.postEdit.message,
        file: props.postEdit.file,
        filename: props.postEdit.filename
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      getPosts(props.posts.page);
    } catch (error) {
      // console.log(error);
    }
    props.dispatch({
      type: "REMOVE_BACKDROP",
    })
  }

  const handleView = () => {
    props.dispatch({
      type: "REMOVE_MODAL_POST"
    })
  }

  return (
    <div>
      <Dialog open={props.postEdit.open} onClose={handleView} aria-labelledby="edit-post" fullWidth>
        <DialogTitle id="edit-post">Edit Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the details of the post
        </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Enter new message"
            type="string"
            fullWidth
            value={props.postEdit.message}
            onChange={handleMessage}
          />
        </DialogContent>
        <DialogActions>
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
                  onUploadSuccess={handleUpload}
                  onProgress={handleProgress}
                  style={{ display: "none" }}
                  accept=".pdf,.jpeg,.jpg,.png"
                />
              </Button>
              {(props.postEdit.progress > 0) && <CircularProgress variant="static" value={props.postEdit.progress} className="mx-2" />}
              {props.postEdit.file.length > 0 && (
                <>
                  <a href={props.postEdit.file} target="_blank" className="mx-2" rel="noopener noreferrer">{props.postEdit.filename.substring(0, 20)}</a>
                  <CancelIcon onClick={() => props.dispatch({ type: "SET_FILE", payload: "" })} />
                </>
              )}
            </div>
            <Button
              className="mx-2"
              onClick={handleView}
            >Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!(props.postEdit.message.length > 0)}
              onClick={handlePost}
            >
              Update Post
              </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    postEdit: state.editPost
  }
}

export default withRouter(connect(mapStateToProps)(PostEdit));
