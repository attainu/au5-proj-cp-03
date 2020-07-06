import React, { Component } from 'react'
import { connect } from "react-redux";
import Axios from 'axios';

class quiz extends Component {
  async componentDidMount() {
    // let res = await Axios.get()
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(quiz)
