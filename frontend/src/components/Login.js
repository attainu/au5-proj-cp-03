import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Login extends Component {

  state = {
    email: "",
    password: "",
    validEmail: false,
    validPassword: false,
    alert: false,
  }

  handleEmail = value => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validEmail = re.test(value);
    this.setState({
      email: value,
      validEmail
    })
  }

  handlePassword = password => {
    let validPassword = password.length >= 8 ? true : false;
    this.setState({
      password,
      validPassword
    })
  }

  handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:4000/api/users/login", {
        email: this.state.email,
        password: this.state.password
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("data", JSON.stringify(res.data.data));
      this.props.dispatch({
        type: "SET_CURRENT_USER",
        payload: res.data.data
      })
      return window.location.href = "/courses";
    } catch (error) {
      this.setState({
        alert: true
      });
    }
  }

  handleAlert = () => {
    this.setState({
      alert: false
    })
  }

  render() {
    return (
      <div className="container-fluid">
        {this.state.alert && <div className="alert alert-warning alert-dismissible fade show my-3" role="alert">
          <strong>Wrong Credentials!</strong> Invalid Email or password
          <button type="button" className="close" onClick={() => this.handleAlert()}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>}
        <div className="row mh-100vh">
          <div
            className="col-10 col-sm-8 col-md-6 col-lg-6 offset-1 offset-sm-2 offset-md-3 offset-lg-0 align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch bg-white p-5 rounded rounded-lg-0 my-5 my-lg-0"
            id="login-block"
          >
            <div className="m-auto w-lg-75 w-xl-50">
              <h2 className="text-info font-weight-light mb-5">
                {/* <i className="fa fa-diamond" /> */}
                &nbsp;E Learn School
              </h2>
              <form>
                <div className="form-group">
                  <label className="text-secondary">Email</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$"
                    inputMode="email"
                    onChange={(event) => this.handleEmail(event.target.value.trim())}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                  <label className="text-secondary">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    required
                    onChange={(event) => this.handlePassword(event.target.value)}
                    value={this.state.password}
                  />
                </div>
                <button
                  className="btn btn-info mt-2"
                  type="submit"
                  disabled={!this.state.validEmail || !this.state.validPassword}
                  onClick={(event) => this.handleLogin(event)}
                >
                  Log In
                </button>
              </form>
              <p className="mt-3 mb-0">
                <a className="text-info small" href="/reset">
                  Forgot your email or password?
                </a>
              </p>
            </div>
          </div>
          <div
            className="col-lg-6 d-flex align-items-end"
            id="bg-block"
            style={{
              backgroundImage: 'url("assets/img/classroom.webp")',
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <p className="ml-auto small text-dark mb-2">
              <img src="https://images.pexels.com/photos/2675050/pexels-photo-2675050.jpeg"
                alt="Class with benches"
                style={{
                  maxWidth: "100%"
                }}
              ></img>
              <br />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
