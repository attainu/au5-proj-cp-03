import React from 'react'
import { Paper, Box, Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

export default function Courses() {
    return (
        <div>
            <div className='container'>
                <div className="row">

                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <Paper style={{
                            height: '200px',
                            backgroundImage: `url('https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg')`,
                            borderRadius: '10px'
                        }}>
                            <Box textAlign='center'>
                                <Typography variant='h4' color='secondary' >
                                    Course Details
                              </Typography>
                            </Box>
                        </Paper>

                    </div>
                    <div className="col-md-1"></div>
                </div>

            </div>
            <br />
            <br />

            <div className="container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-2">
                        <Paper>
                            <List>

                                <ListItem button component={Link} to='/s/dashboard/assignment'>



                                    <ListItemText >Assignment</ListItemText>

                                </ListItem>
                                <Divider />
                                <ListItem button component={Link} to='/s/dashboard/quiz' >


                                    <ListItemText>Quiz</ListItemText>

                                </ListItem>
                                <Divider />
                                <ListItem button component={Link} to='/s/dashboard/videos'>


                                    <ListItemText>Videos</ListItemText>

                                </ListItem>
                                <Divider />
                                <ListItem button component={Link} to='/s/dashboard/ebook'>


                                    <ListItemText>Ebook</ListItemText>

                                </ListItem>

                            </List>

                        </Paper>
                    </div>
                    <div className="col-md-8">
                        <Paper>
                            By default this area will show the Post the is there
                            we will map the data of the posts
                        </Paper>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        </div >
    )
}
