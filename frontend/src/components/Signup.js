import React, { useState } from 'react'

import { Paper, Grid } from '@material-ui/core'
import Axios from 'axios'
export default function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [role, setRole] = useState()
    const [gender, setGender] = useState()
    const [location, setLocation] = useState()
    const handleRegister = (e) => {
        e.preventDefault()
        const payload = {
            name, email, password, passwordConfirm, role, gender, location
        }
        const url = 'http://localhost:4000/api/users/signup'
        Axios.post(url, payload).then(result => {
            if (result.status === 200) {

                window.location = '/login'
            }
        })
    }
    return (
        <div style={{ backgroundImage: `url("https://images.pexels.com/photos/2096622/pexels-photo-2096622.jpeg")` }}>
            <nav className="navbar navbar-light bg-light" style={{ boxShadow: "0 4px 6px -7px black" }}>
                <a className="navbar-brand mr-auto" href="/">Classroom</a>

            </nav>

            <div className="containter mt-2 " >
                <div className="row">

                    <div className="col-md-4"></div>
                    <div className="col-md-4">

                        <Paper elevation={3} style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '10px' }}>

                            <form>
                                <Grid container

                                    direction="column"
                                    justify="center"
                                    alignItems="stretch"
                                >
                                    <div className="form-group">
                                        <label className="text-secondary">Full Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            required

                                            inputMode="fullname"
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-secondary">Email</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            required

                                            inputMode="email"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-secondary">Password</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            required

                                            inputMode="password"
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-secondary">Confirm Password</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            required

                                            inputMode="confirmpassword"
                                            onChange={e => setPasswordConfirm(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Choose Role</label>
                                        <label class="radio-inline" style={{ paddingLeft: '20px' }}><input type="radio" value='instructor' name="optradio1" onChange={e => setRole(e.target.value)} />Instructor</label>
                                        <label class="radio-inline" style={{ paddingLeft: '20px' }}><input type="radio" value='student' name="optradio1" onChange={e => setRole(e.target.value)} />Student</label>

                                    </div>
                                    <div className="form-group">
                                        <label>Choose Gender</label>
                                        <label class="radio-inline" style={{ paddingLeft: '20px' }}><input type="radio" value='male' name="optradio2" onChange={e => setGender(e.target.value)} />Male</label>
                                        <label class="radio-inline" style={{ paddingLeft: '20px' }}><input type="radio" value='female' name="optradio2" onChange={e => setGender(e.target.value)} />Female</label>

                                    </div>
                                    <div className="form-group">
                                        <label className="text-secondary">Location</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            required

                                            inputMode="location"
                                            onChange={e => setLocation(e.target.value)}
                                        />
                                    </div>
                                    <button type="button" class="btn btn-primary" onClick={handleRegister}>Submit</button>

                                </Grid>
                            </form>
                        </Paper>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div >
        </div >
    )
}
