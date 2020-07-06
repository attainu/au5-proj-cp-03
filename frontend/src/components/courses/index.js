import React, { Component } from 'react';
import { connect } from "react-redux";

class index extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        Hey
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(index);
