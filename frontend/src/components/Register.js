import React from 'react';
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
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
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
    const handleGenderChange = (event) => {
        setgender(event.target.value);
    };
    const [role, setrole] = React.useState('student');

    const handleRoleChange = (event) => {
        setrole(event.target.value);
    };
    const handleNameChange = (event) => {
        setname(event.target.value);
    };
    const handleEmailChange = (event) => {
        setemail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setpassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setpasswordConfirm(event.target.value);
    };
    const handleLocationChange = (event) => {
        setlocation(event.target.value);
    };
    const handleSubmitForm = (e) => {
        e.preventDefault()
        const payload = {
            "name": name,
            "email": email,
            "role": role,
            "password": password,
            "passwordConfirm": passwordConfirm,
            "gender": gender,
            "location": location

        }
        const url = 'http://localhost:4000/api/users/signup'
        Axios.post(url, payload).then(result => {
            console.log(result)
            if (result.status === 200) {

                window.location = '/login'
            }
        })
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
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="Name"
                                variant="outlined"
                                required
                                fullWidth
                                id="Name"
                                label="Full Name"
                                onChange={handleNameChange}
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
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
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handlePasswordChange}
                                autoComplete="current-password"
                            />
                            <TextField
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
                                id="gender"
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
                        onClick={handleSubmitForm}
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