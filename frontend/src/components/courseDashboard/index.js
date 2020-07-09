import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { Paper, Box, Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core'
import TeacherVideo from '../teacher/Video'
import StudentVideo from '../student/Video'
import { connect } from 'react-redux'
import Axios from 'axios'
class index extends Component {


    async componentDidMount() {
        const url = 'http://localhost:4000/api/course/'
        const temp = window.location.href
        const id = temp.split('/')
        const finalurl = url + id[4]
        await Axios.get(finalurl).then(data => {
            //console.log(data.data.data.courseID)

            this.props.dispatch({
                type: "COURSE_DASHBOARD",
                payload: data.data,
            });
        })
    }
    render() {
        return (
            <div>
                <div className='container-fluid'>
                    <div className="row">

                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <Paper style={{
                                height: '200px',
                                backgroundImage: `url('https://gstatic.com/classroom/themes/img_bookclub.jpg')`,
                                borderRadius: '10px'
                            }}>
                                <Box textAlign='left' style={{ marginLeft: '20px', marginTop: '20px', paddingTop: '20px' }}>
                                    <Typography variant='h4' styles={{ color: 'white' }} >
                                        {this.props.courseID}:{this.props.courseName}
                                    </Typography>
                                </Box>
                            </Paper>

                        </div>
                        <div className="col-md-1"></div>
                    </div>

                </div>
                <br />
                <br />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-3">
                            <Grid
                                alignItems="center"
                                justify="center"
                            >
                                <Paper elevation={3}>
                                    <List >
                                        <ListItem button  >



                                            <ListItemText style={{ textAlign: 'center' }}>Post</ListItemText>

                                        </ListItem>
                                        <Divider />
                                        <ListItem button  >



                                            <ListItemText style={{ textAlign: 'center' }}>Assignment</ListItemText>

                                        </ListItem>
                                        <Divider />
                                        <ListItem button >


                                            <ListItemText style={{ textAlign: 'center' }}>Quiz</ListItemText>

                                        </ListItem>
                                        <Divider />
                                        <ListItem button >


                                            <ListItemText style={{ textAlign: 'center' }}>Videos</ListItemText>

                                        </ListItem>
                                        <Divider />
                                        <ListItem button >


                                            <ListItemText style={{ textAlign: 'center' }}>Ebook</ListItemText>

                                        </ListItem>

                                    </List>

                                </Paper>
                            </Grid>
                        </div>
                        <div className="col-md-7">
                            <Paper>
                                By default this area will show the Post the is there
                                we will map the data of the posts
                        </Paper>

                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        courseID: state.courseDashboard.courseID,
        courseName: state.courseDashboard.courseName
    };
};
export default connect(mapStateToProps)(index)