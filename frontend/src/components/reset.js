import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [email, newEmail] = useState("");
  const [password, newPassword] = useState("");
  const [cpassword, cnewPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [alertText, updatedAlertText] = useState("");
  const [severity, newSeverity] = useState("");
  const [question, selectedQuestion] = useState("")
  const [answer, selectedAnswer] = useState("")

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  let emailValidation =
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    ) || email.length < 6;
  let passwordValidation = !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(
    password
  );
  let securityQuestionValudation = question.length > 0;
  let answerValidation = answer.trim().length < 3
  let cpasswordValidation = password === cpassword;
  let disable =
    !emailValidation &&
    !passwordValidation &&
    cpasswordValidation &&
    !answerValidation &&
    securityQuestionValudation
    ;
  const emailSubmitHandler = async () => {
    try {
      let find = await axios.post("http://localhost:4000/api/users/reset", { email })
      console.log(find.data.data)
      if (find.data.data === true) {
        updatedAlertText("Reset link has been sent to your mail");
        newSeverity("success");
        return handleClick();
      }
    } catch (error) {
      updatedAlertText("No account found for this email address.");
      newSeverity("error");
      return handleClick();
    }
  }
  const submitHandler = async () => {

    let securityAnswer = answer.trim().toLocaleLowerCase()
    let securityQuestion = question
    let isExists = await axios.post("/users/reset", {
      email,
      securityQuestion,
      securityAnswer,
      password
    });
    updatedAlertText(
      !isExists.data
        ? "Answer Doesn't Match"
        : "Password reset Successfull..! You will be redirected to the login page."
    );
    newSeverity(!isExists.data ? "error" : "success");
    if (!isExists.data) {
      return handleClick();
    }
    handleClick();
    setTimeout(() => (window.location.href = "/login"), 7000);
  };
  if (localStorage.getItem('token')) {
    return <Redirect to='/home' />
  }
  return (
    <Container component="main" maxWidth="xs" className="mt-3 pb-3 signup">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {alertText}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => newEmail(e.target.value)}
                error={emailValidation && email.length !== 0}
                helperText={
                  emailValidation && email.length !== 0
                    ? "*Invalid Email"
                    : null
                }
              />
            </Grid>
          </Grid>
          <div>
            <Button
              type="button"
              // fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={emailSubmitHandler}
              disabled={emailValidation}
            >
              Reset via mail
          </Button>
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}