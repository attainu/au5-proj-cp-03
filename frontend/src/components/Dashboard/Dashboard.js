import React from 'react';
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

import ListItemText from '@material-ui/core/ListItemText';

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    home: {
        color: 'white',
        textDecoration: 'none',

        '&:hover': {
            color: 'white',
            textDecoration: 'none',
        }
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

function Dashboard() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Router>
            <div className={classes.root}>
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
                            <Link className={classes.home} to='/t/dashboard'> Teacher Dashboard</Link>
                        </Typography>

                        <Button color="inherit"  >
                            Logout
                        </Button>

                    </Toolbar>
                </AppBar>
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
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>

                        <ListItem button component={Link} to='/t/dashboard/assignment'>



                            <ListItemText >Assignment</ListItemText>

                        </ListItem>
                        <ListItem button component={Link} to='/t/dashboard/quiz' >


                            <ListItemText>Quiz</ListItemText>

                        </ListItem>
                        <ListItem button component={Link} to='/t/dashboard/videos'>


                            <ListItemText>Videos</ListItemText>

                        </ListItem>
                        <ListItem button component={Link} to='/t/dashboard/ebook'>


                            <ListItemText>Ebook</ListItemText>

                        </ListItem>
                    </List>
                    <Divider />
                    <List>

                        <ListItem button component={Link} to='/s/dashboard/'>


                            <ListItemText>Courses</ListItemText>

                        </ListItem>
                        <ListItem button component={Link} to='/t/dashboard/report'>


                            <ListItemText>Report</ListItemText>

                        </ListItem>
                        <ListItem button component={Link} to='/t/dashboard/profile'>


                            <ListItemText>Profile</ListItemText>

                        </ListItem>
                    </List>
                </Drawer >
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                </main>
            </div >
        </Router >
    );
}

const mapStateToProps = state => {
    console.log(state)
    return {};
}

export default connect(mapStateToProps)(Dashboard);
