import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 0
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    }
  }
});

function CourseCard(props) {
  const classes = useStyles();
  console.log(props, "YOLO");
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        width: "18.75rem",
        height: "18.75rem",
        marginBottom: "1.75rem",
        marginRight: "1.75rem"
      }}
      key={props.course._id ? props.course._id : `${props.course[0]._id}`}
    >
      <CardContent className={classes.cardcontent}>
        <div>
          <div
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "0.7rem"
            }}
          >
            <Typography variant="h5" component="h2" color="inherit" noWrap className="mb-3">
              <Link
                color="inherit"
                to={props.course._id ? `/course/${props.course._id}` : `/course/${props.course[0]._id}`}
                style={{
                  color: "white",
                  textDecoration: "none"
                }}
              >{props.course.courseID ? props.course.courseID : props.course[0].courseID}-{props.course.name ? props.course.name : props.course[0].name}</Link>
            </Typography>
            {props.user.role === "instructor" ?
              <Typography className="mb-0">{props.course.studentsEnrolled.length} students</Typography>
              : <Typography className="mb-0">{props.course[0].instructor.name}</Typography>}
          </div>
          <div style={{
            height: "10rem"
          }}>
            <Typography className="ml-2 mt-1">
              Course Description:
                  {props.course.description ? props.course.description : props.course[0].description}
            </Typography>
          </div>
        </div>
      </CardContent>
      <CardActions className="border-top">
        <Link to={props.course.instructor ? `/courses/${props.course._id}` : `/courses/${props.course[0]._id}`}><Button size="small">Course page</Button></Link>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(CourseCard);
