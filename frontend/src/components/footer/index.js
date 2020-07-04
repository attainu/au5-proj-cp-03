import React, { Component } from 'react'

export default class Index extends Component {
    render() {
        return (
            <div className="footer-dark">
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 col-md-3 item">
                                <h3>Features</h3>
                                <ul>
                                    <li><a href="/">Courses</a></li>
                                    <li><a href="/">Something</a></li>
                                    <li><a href="/">Something</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-6 col-md-3 item">
                                <h3>About</h3>
                                <ul>
                                    <li><a href="/">Company</a></li>
                                    <li><a href="/">Team</a></li>
                                    <li><a href="/">Careers</a></li>
                                </ul>
                            </div>
                            <div className="col-md-6 item text">
                                <h3>Elearn School Management App</h3>
                                <p>Welcome to Elearn . Your one stop for online education during the COVID-19 pandamic situation.We provide a interactive way of learning and teaching for both teacher and students.</p>
                            </div>
                            <div className="col item social"><a href="/"><i className="icon ion-social-facebook"></i></a><a href="/"><i className="icon ion-social-twitter"></i></a><a href="/"><i className="icon ion-social-snapchat"></i></a><a href="/"><i className="icon ion-social-instagram"></i></a></div>
                        </div>
                        <p className="copyright">School Management App © 2020</p>
                    </div>
                </footer>
            </div>
        )
    }
}
