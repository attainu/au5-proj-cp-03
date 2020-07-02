import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row mh-100vh">
                    <div
                        className="col-10 col-sm-8 col-md-6 col-lg-6 offset-1 offset-sm-2 offset-md-3 offset-lg-0 align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch bg-white p-5 rounded rounded-lg-0 my-5 my-lg-0"
                        id="login-block"
                    >
                        <div className="m-auto w-lg-75 w-xl-50">
                            <h2 className="text-info font-weight-light mb-5">
                                <i className="fa fa-diamond" />
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
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="text-secondary">Password</label>
                                    <input className="form-control" type="password" required />
                                </div>
                                <button className="btn btn-info mt-2" type="submit">
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
                            backgroundPosition: "center center"
                        }}
                    >
                        <p className="ml-auto small text-dark mb-2">

                            <a
                                className="text-dark"
                                href="https://images.pexels.com/photos/2675050/pexels-photo-2675050.jpeg"
                                target="/"
                            >

                            </a>
                            <br />
                        </p>
                    </div>
                </div>
            </div>

        )
    }
}
