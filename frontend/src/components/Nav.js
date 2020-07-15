import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },

}));

export default function Header(props) {
    const classes = useStyles();


    return (

        <Toolbar className={classes.toolbar}>

            <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="flex-start"
                noWrap
                className={classes.toolbarTitle}
            >
                {props.title}
            </Typography>
            <Link to='/login'>
                <Button variant="outlined" size="small" style={{ marginLeft: '10px' }} className="mx-2">
                    Sign In
        </Button>
            </Link>
            <Link to='/register'>
                <Button variant="outlined" size="small" style={{ maringLeft: '10px' }}>
                    Sign Up
        </Button>
            </Link>
        </Toolbar>

    );
}

Header.propTypes = {

    title: PropTypes.string,
};