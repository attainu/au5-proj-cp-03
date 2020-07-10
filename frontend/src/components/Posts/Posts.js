import React, { Component } from 'react'
import PostsInstructor from './PostsInstructor';
import { connect } from "react-redux";

class Posts extends Component {

  render() {
    return (
      <div>
        {this.props.user.role === 'instructor' && <PostsInstructor />}
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  }
}

export default connect(mapStateToProps)(Posts);
