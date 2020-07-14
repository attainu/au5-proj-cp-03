import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from 'axios'
import { Snackbar } from '@material-ui/core';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="elearnschool.herokuapp.com">
                E Learn School
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const genderoption = [
    {
        value: 'male',
        label: 'Male',
    },
    {
        value: 'female',
        label: 'Female',
    },

];
const roleoption = [
    {
        value: 'instructor',
        label: 'Instructor',
    },
    {
        value: 'student',
        label: 'Student',
    },

];


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [gender, setgender] = React.useState('male');
    const [name, setname] = React.useState();
    const [email, setemail] = React.useState();
    const [password, setpassword] = React.useState();
    const [passwordConfirm, setpasswordConfirm] = React.useState();
    const [location, setlocation] = React.useState();
    const [validname, setValidname] = useState(false)
    const [validemail, setValidemail] = useState(false)
    const [validpassword, setValidPassword] = useState(false)
    const [validpasswordConfirm, setValidPasswordConfirm] = useState(false)
    const [validrole, setValidrole] = useState(false)
    const [validlocation, setValidlocation] = useState(false)
    const [validgender, setValidgender] = useState(false)
    const handleGenderChange = (event) => {
        setgender(event.target.value);
    };
    const [role, setrole] = React.useState('student');

    const handleRoleChange = (event) => {

        setrole(event.target.value);
    };
    const handleNameChange = (event) => {
        let value = event.target.value
        let valid = value.length >= 3 ? true : false
        setname(value)
        valid ? setValidname(false) : setValidname(true)
    };
    const handleEmailChange = (event) => {
        let value = event.target.value
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validemail = re.test(value);
        setemail(value)
        validemail ? setValidemail(false) : setValidemail(true)
    };
    const handlePasswordChange = (event) => {
        let value = event.target.value
        let isvalid = value.length >= 8 ? true : false
        setpassword(value)
        isvalid ? setValidPassword(false) : setValidPassword(true)
    };
    const handleConfirmPasswordChange = (event) => {
        let value = event.target.value
        let isvalid = value === password ? true : false
        setpasswordConfirm(value)
        isvalid ? setValidPasswordConfirm(false) : setValidPasswordConfirm(true)
    };
    const handleLocationChange = (event) => {
        let value = event.target.value
        let isvalid = value.length >= 2 ? true : false
        setlocation(value)
        isvalid ? setValidlocation(false) : setValidlocation(true)
    };
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        if (name === 'undefined') {
            console.log(validname)
            setValidname(false)
        }
        const payload = {
            "name": name,
            "email": email,
            "role": role,
            "password": password,
            "passwordConfirm": passwordConfirm,
            "gender": gender,
            "location": location

        }
        try {
            const url = await 'http://localhost:4000/api/users/signup'
            Axios.post(url, payload).then(result => {
                console.log(result)
                if (result.status === 200) {

                    window.location = '/login'
                }
            })
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} onSubmit={handleSubmitForm} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={validname}
                                autoComplete="fname"
                                name="Name"
                                variant="outlined"
                                required="true"
                                fullWidth
                                id="Name"
                                label="Name"
                                helperText="Name should be atleast 3 characters"
                                onChange={handleNameChange}
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={validemail}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleEmailChange}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={validpassword}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handlePasswordChange}
                                helperText="Password should be atleast 8 characters long"
                                autoComplete="current-password"
                            />
                            <TextField
                                error={validpasswordConfirm}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmpassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmpassword"
                                onChange={handleConfirmPasswordChange}
                                autoComplete="confirm-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={validrole}
                                id="role"
                                select
                                label="Select"
                                value={role}
                                onChange={handleRoleChange}
                                helperText="Please select your role"
                                variant="outlined"
                            >
                                {roleoption.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={validgender}
                                id="gender"
                                select
                                label="Select"
                                value={gender}
                                onChange={handleGenderChange}
                                helperText="Please select your gender"
                                variant="outlined"
                            >
                                {genderoption.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={validlocation}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Location"
                                name="email"
                                onChange={handleLocationChange}
                                autoComplete="email"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}

                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}