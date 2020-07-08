import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Dashboard from "../Dashboard/Dashboard";
import { withRouter } from "react-router";
import { Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    width: "60vw",
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Profile(props) {
  const classes = useStyles();
  return (
    <div>
      <Dashboard />
      <Typography
        variant="h4"
        children="Personal Information"
        align="center"
        className="mb-3"
      />
      <div>
        <div
          style={{
            width: "60vw",
            margin: "0 auto",
          }}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="pi">
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Name
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {props.user.name}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Email
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {props.user.email}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Role
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {props.user.role}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Courses Enrolled
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {props.user.role === "instructor"
                      ? props.user.instructorCourses.length
                      : props.user.studentCourses.length}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Gender
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {props.user.gender}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default withRouter(connect(mapStateToProps)(Profile));
