import React, { Component } from 'react'
import PostsInstructor from './PostsInstructor';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from 'axios';
import ViewPosts from './viewPosts';

class Posts extends Component {

  async componentDidMount() {
    try {
      const res = await Axios.get(
        `http://localhost:4000/api/course?id=${this.props.match.params.id}&type=posts&page=${this.props.posts.page}`,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log(res.data);
      this.props.dispatch({
        type: "SET_POSTS",
        payload: res.data.data
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
        this.props.dispatch({
          type: "SET_GLOBAL_WARNING",
          payload: error.response.data.message
        });
      } else {
        this.props.dispatch({
          type: "SET_GLOBAL_WARNING",
          payload: "Something went wrong! Please try again after sometime",
        });
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.user.role === 'instructor' && <PostsInstructor />}
        {this.props.posts.posts.length > 0 && <ViewPosts />}
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    posts: state.posts
  }
}

export default withRouter(connect(mapStateToProps)(Posts));
