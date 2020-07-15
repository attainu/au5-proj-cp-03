import React, { useState } from 'react'
import axios from 'axios'
import { Divider, Grid, TextField, Button, Paper } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import { connect } from 'react-redux';
function Video(props) {
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [chapter, setChapter] = useState('')
    const [file, setFile] = useState('')

    const [link, setLink] = useState()
    const [snackbarstate, setSnackbarstate] = useState()
    const [snackbarmsg, setSnackbarmsg] = useState()
    const [buttontext, setButtontext] = useState('Submit')
    const handleClose = (e, reason) => {
        if (e === 'clickaway') {
            return
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        setButtontext('Please wait .....')
        let data = new FormData()
        data.append('courseId', props.courseID)
        data.append('name', name)
        data.append('subject', subject)
        data.append('chapter', chapter)
        data.append('file', file)
        data.append('link', link)


        const url = 'http://localhost:4000/api/createvideo'
        axios.post(url, data).then(response => {
            setSnackbarstate(true)
            setSnackbarmsg(response.data.msg)
            setInterval(() => {
                window.location.reload()
            }, 3000)
        })
    }

    return (
        <div>
            <div className="container">
                <div className="row">

                    <div className="col-md-12">
                        <Paper elevation={3}>
                            <form onSubmit={onSubmit} style={{ margin: '10px', paddingBottom: '10px' }}>
                                <Grid container spacing={5}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField


                                            variant="outlined"
                                            required
                                            fullWidth
                                            disabled='true'
                                            label={props.courseID}
                                            autoFocus

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField


                                            variant="outlined"
                                            required
                                            fullWidth

                                            label="Video Name"
                                            autoFocus
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField


                                            variant="outlined"
                                            required
                                            fullWidth

                                            label="Subject"
                                            autoFocus
                                            onChange={e => setSubject(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField


                                            variant="outlined"
                                            required
                                            fullWidth

                                            label="Chapter"
                                            autoFocus
                                            onChange={e => setChapter(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField


                                            variant="outlined"

                                            fullWidth

                                            label="Please paste the video link"
                                            autoFocus

                                            onChange={e => {
                                                setFile('')
                                                setLink(e.target.value)
                                            }
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <label>Or</label>


                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            type='file'

                                            variant="outlined"
                                            inputProps={{ accept: ".mp4" }}
                                            fullWidth

                                            label=""
                                            autoFocus
                                            onChange={e => {
                                                setLink('')
                                                setFile(e.target.files[0])
                                            }
                                            }
                                        />
                                    </Grid>

                                    {/* <input type='file' name='file' id='file' placeholder='Select file to upload' onChange={e => setFile(e.target.files[0])} /> */}
                                    <br />
                                    <Grid item xs={6}>
                                        <Button
                                            type="submit"

                                            variant="contained"
                                            color="primary"

                                        >
                                            {buttontext}
                                        </Button>
                                    </Grid>

                                </Grid>
                            </form>
                        </Paper>
                    </div>

                </div>
                <Snackbar
                    open={snackbarstate}
                    anchorOrigin={
                        {
                            vertical: 'top', horizontal: 'right'
                        }
                    }
                    message={snackbarmsg}
                    autoHideDuration={3000}
                    onClose={handleClose}
                />
            </div>
            <br />
            <Divider />
            <br />

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        courseID: state.courseDashboard.courseID,

    };
};

export default connect(mapStateToProps)(Video)