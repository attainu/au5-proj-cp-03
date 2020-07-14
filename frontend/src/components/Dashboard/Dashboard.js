import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import { Menu, Button, Backdrop, CircularProgress } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CreateCourse from "../CreateCourse.js/CreateCourse";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import JoinClass from "../CreateCourse.js/JoinClass";
import Axios from "axios";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  home: {
    color: "white",
    textDecoration: "none",

    "&:hover": {
      color: "white",
      textDecoration: "none",
    },
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let course = await Axios.get(
          "http://localhost:4000/api/users?type=courses",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (course.data.data.role === "student") {
          props.dispatch({
            type: "COURSE_CARD",
            payload: course.data.data.studentCourses,
          });
        } else if (course.data.data.role === "instructor") {
          props.dispatch({
            type: "COURSE_CARD",
            payload: course.data.data.instructorCourses,
          });
        }
      } catch (error) {
        // console.log(error);
      }
    }
    fetchData();
  }, []);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCourseModal = () => {
    props.dispatch({
      type: "VIEW_MODAL",
    });
  };

  const haandleJoinClassModal = () => {
    props.dispatch({
      type: "SET_JOIN_MODAL",
    });
  };
  const handleCourseSucess = () => {
    props.dispatch({
      type: "REMOVE_COURSE_SUCCESS",
    });
  };

  const handleCourseCreateClose = () => {
    props.dispatch({
      type: "REMOVE_COURSE_WARNING",
    });
  };

  const handleJoinClassClose = () => {
    props.dispatch({
      type: "REMOVE_JOIN_WARNING",
    });
  };

  const handleJoinClassSuccess = () => {
    props.dispatch({
      type: "REMOVE_JOIN_SUCCESS",
    });
  };

  const hideErrorClose = () => {
    props.dispatch({
      type: "REMOVE_GLOBAL_WARNING",
    });
  };

  const hideErrorSuccess = () => {
    props.dispatch({
      type: "REMOVE_GLOBAL_SUCCESS",
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('data');
    window.location.href = '/'
  }

  const renderProfile = (
    <Menu
      id="profile"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profile">
        <MenuItem>Profile</MenuItem>
      </Link>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );
  return (
    <>
      <div className={classes.root} style={{
        height: "60px",
      }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}

        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.home} to="/courses">
                Classroom
              </Link>
            </Typography>
            <div className="">
              {props.user.role === "instructor" && (
                <Button variant="contained" onClick={handleCourseModal}>
                  Create a Class
                </Button>
              )}
              {props.user.role === "student" && (
                <Button variant="contained" onClick={haandleJoinClassModal}>
                  Join a Class
                </Button>
              )}
              <IconButton
                color="inherit"
                aria-controls="profile"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderProfile}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                  <ChevronRightIcon />
                )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <ListItemText>
                <HomeIcon />{" "}
                <Link
                  to="/courses"
                  style={{
                    color: "black",
                  }}
                  className="px-2"
                >
                  Home
                </Link>
              </ListItemText>
            </ListItem>
          </List>
          <Divider />
          <h6 className="pt-3 px-3 mb-0">
            <b>Courses Enrolled</b>
          </h6>
          <List>
            {props.courses.courses.length > 0 &&
              props.user.role === "instructor" &&
              props.courses.courses.map((el) => {

                return (
                  <ListItem button to={`/courses/${el._id}`} key={`${el._id}`}>
                    <Link
                      to={`/courses/${el._id}`}
                      style={{
                        color: "black",
                      }}
                    >
                      <ListItemText primary={el.name} className="pl-2" />
                    </Link>
                  </ListItem>
                );
              })}
            {props.user.role === "student" &&
              props.courses.courses.map((el) => {
                return (
                  <ListItem key={`${el.courseID[0]._id}`}>
                    <Link
                      style={{
                        color: "black",
                      }}
                      to={`/courses/${el.courseID[0]._id}`}
                    >
                      <ListItemText primary={el.courseID[0].name} />
                    </Link>
                  </ListItem>
                );
              })}
          </List>
          <Divider />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
      <CreateCourse />
      <JoinClass />
      <Snackbar
        open={props.newCourse.showWarning}
        autoHideDuration={3000}
        onClose={handleCourseCreateClose}
      >
        <Alert onClose={handleCourseCreateClose} severity="warning">
          {props.newCourse.warning}
        </Alert>
      </Snackbar>
      <Snackbar
        open={props.newCourse.showSucess}
        autoHideDuration={3000}
        onClose={handleCourseSucess}
      >
        <Alert onClose={handleCourseSucess} severity="success">
          {props.newCourse.success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={props.joinClass.showWarning}
        autoHideDuration={3000}
        onClose={handleJoinClassClose}
      >
        <Alert onClose={handleJoinClassClose} severity="warning">
          {props.joinClass.warning}
        </Alert>
      </Snackbar>
      <Snackbar
        open={props.joinClass.showSuccess}
        autoHideDuration={3000}
        onClose={handleJoinClassSuccess}
      >
        <Alert onClose={handleJoinClassSuccess} severity="success">
          {props.joinClass.sucess}
        </Alert>
      </Snackbar>
      <Snackbar
        open={props.error.showWarning}
        autoHideDuration={4000}
        onClose={hideErrorClose}
      >
        <Alert onClose={hideErrorClose} severity="warning">
          {props.error.warning}
        </Alert>
      </Snackbar>
      <Snackbar
        open={props.error.showSuccess}
        autoHideDuration={4000}
        onClose={hideErrorSuccess}
      >
        <Alert onClose={hideErrorSuccess} severity="success">
          {props.error.success}
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={props.backdrop.show}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    newCourse: state.newCourse,
    courses: state.courseCard,
    user: state.user.user,
    joinClass: state.joinClass,
    error: state.error,
    backdrop: state.backdrop
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
