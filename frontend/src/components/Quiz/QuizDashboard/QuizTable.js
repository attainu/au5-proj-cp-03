import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import moment from "moment";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function QuizTable(props) {
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Quiz Title</StyledTableCell>
              <StyledTableCell align="right">No.of Questions</StyledTableCell>
              <StyledTableCell align="right">Start Time</StyledTableCell>
              <StyledTableCell align="right">Duration</StyledTableCell>
              {props.user.role === "instructor" && <StyledTableCell align="right">Published to students</StyledTableCell>}
              {props.user.role === "instructor" && <StyledTableCell align="right">View Quiz</StyledTableCell>}
              {props.user.role === "student" && <StyledTableCell align="right">Start Quiz</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.quiz.quiz.map(el => {
              return (
                <StyledTableRow key={el._id}>
                  <StyledTableCell component="th" scope="row">
                    {el.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">{el.question.length}</StyledTableCell>
                  <StyledTableCell align="right">{moment(el.startTime).format("YYYY-MM-DD HH:mm")}</StyledTableCell>
                  <StyledTableCell align="right">{el.duration}</StyledTableCell>
                  {props.user.role === "instructor" && <StyledTableCell align="right">{el.publish ? "Yes" : "No"}</StyledTableCell>}
                  {props.user.role === "instructor" && <StyledTableCell align="right">
                    <Link to={`/courses/${props.match.params.id}/quiz/${el._id}`}>
                      <Button variant="contained" color="primary">
                        Start Quiz
                    </Button>
                    </Link>
                  </StyledTableCell>}
                  {props.user.role === "student" && <StyledTableCell align="right">
                    {moment(el.startTime).unix() <= moment().unix() ? <Link to={`/courses/${props.match.params.id}/quiz/${el._id}`}>
                      <Button variant="contained" color="primary" >
                        Start Quiz
                    </Button>
                    </Link>
                      :
                      <Button variant="contained" color="primary" disabled>
                        Start Quiz
                    </Button>
                    }
                  </StyledTableCell>}
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    quiz: state.quiz
  }
}

export default withRouter(connect(mapStateToProps)(QuizTable));