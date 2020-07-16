import React, { Component } from "react";

export default class index extends Component {
    render() {
        return (
            <div>
                <nav
                    className="navbar navbar-light navbar-expand-md sticky-top navigation-clean-button"
                    style={{ height: 80, backgroundColor: "#37434d", color: "#ffffff" }}
                >
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            Classroom
            </a>

                        <div className="collapse navbar-collapse" id="navcol-1">
                            <ul className="nav navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <a
                                        className="nav-link "
                                        style={{ color: "#ffffff" }}
                                        href="/"
                                    >
                                        <i className="fa fa-home" />
                    &nbsp;Home
                  </a>
                                </li>
                                <li className="nav-item active">
                                    <a
                                        className="nav-link "
                                        style={{ color: "#ffffff" }}
                                        href="/courses"
                                    >
                                        &nbsp;Courses
                  </a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" style={{ color: "#ffffff" }} href="/">
                                        &nbsp;Features
                  </a>
                                </li>
                                <li className="nav-item active">
                                    <a
                                        className="nav-link"
                                        style={{ color: "#ffffff" }}
                                        href="/about-us"
                                    >
                                        About Us
                  </a>
                                </li>
                                <li className="nav-item active">
                                    <a
                                        className="nav-link"
                                        style={{ color: "#ffffff" }}
                                        href="/login"
                                    >
                                        <i className="fa fa-sign-in" />
                    &nbsp;Sign In
                  </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
