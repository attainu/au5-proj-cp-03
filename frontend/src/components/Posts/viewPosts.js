import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import { Paper, Avatar, Typography, Divider, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import moment from "moment";
import Axios from "axios";
import PostEdit from './PostEdit';

function ViewPosts(props) {

  const handleEdit = (message, file, filename, id) => {
    props.dispatch({
      type: "OPEN_MODAL_POST",
    });
    props.dispatch({
      type: "SET_MESSAGE_POST",
      payload: message
    });
    props.dispatch({
      type: "SET_FILE",
      payload: file
    });
    props.dispatch({
      type: "SET_FILENAME",
      payload: filename
    });
    props.dispatch({
      type: "SET_POSTID",
      payload: id
    })
  }

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
      if (res.data.data.length === 0) {
        props.dispatch({
          type: "DEC_PAGE",
        });
        props.dispatch({
          type: "SET_GLOBAL_SUCCESS",
          payload: "No more posts"
        })
      } else {
        props.dispatch({
          type: "SET_POSTS",
          payload: res.data.data
        });
      }
    } catch (error) {
      // console.log(error);
    }
  }

  const handleDeletePost = async (id) => {
    await Axios.delete("http://localhost:4000/api/post/", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      data: {
        courseID: props.match.params.id,
        postID: id,
      },
    });
    props.dispatch({
      type: "SET_GLOBAL_SUCCESS",
      payload: "Post has been deleted sucessfully"
    });
    if (props.posts.posts.length === 1) {
      props.dispatch({
        type: "DEC_PAGE"
      });
      getPosts(props.posts.page - 1);
    } else {
      getPosts(props.posts.page);
    }
  }

  const handleNext = () => {
    props.dispatch({
      type: "INC_PAGE"
    });
    getPosts(props.posts.page + 1);
  }

  const handlePrevious = () => {
    props.dispatch({
      type: "DEC_PAGE"
    });
    getPosts(props.posts.page - 1);
  }

  return (
    <div className="mt-3 mb-3">
      {props.posts.posts.length > 0 && props.posts.posts.map(el => (
        <>
          <Paper
            elevation={3}
            style={{
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="p-2 mt-3"
            >
              <div
                style={{
                  display: "flex",
                  flexGrow: "1"
                }}
              >
                <Avatar style={{ background: "purple" }} className="">{props.user.name[0]}</Avatar>
                <div>
                  <Typography variant="body1" children={props.user.name} className="ml-2"></Typography>
                  <Typography variant="body1" children={moment.utc(el.createdAt).local().format("DD MMMM YYYY HH:mm")} className="ml-2"></Typography>
                </div>
              </div>
              {props.user.role === "instructor" && < div >
                <EditIcon onClick={() => handleEdit(el.message, el.file, el.filename, el._id)} className="mx-2" />
                <DeleteIcon onClick={() => handleDeletePost(el._id)} className="mx-2" />
              </div>}
            </div>
            <Divider />
            <Typography variant="subtitle1" children={el.message} className="p-3" />
            {el.file.length > 0 && <Typography variant="body1" className="pl-3 pb-3">
              Attached file: <a href={el.file} target="_blank" rel="noopener noreferrer">{el.filename}</a>
            </Typography>}
          </Paper>
        </>
      ))
      }
      <div className="my-3" style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        {props.posts.page > 1 && <Button variant="contained" onClick={handlePrevious}><ArrowBackIosIcon /> Previous</Button>}
        {props.posts.posts.length === 5 && <Button variant="contained" onClick={handleNext}>Next <ArrowForwardIosIcon fontSize="small" /></Button>}
      </div>
      <PostEdit />
    </div >
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    posts: state.posts
  }
}

export default withRouter(connect(mapStateToProps)(ViewPosts));
