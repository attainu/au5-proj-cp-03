import React, { useState } from 'react'
import axios from 'axios'
import { Divider, Grid, TextField, Button, Typography } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
export default function Video() {
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [chapter, setChapter] = useState('')
    const [file, setFile] = useState('')
    const [courseid, setcourseid] = useState()
    const [link, setLink] = useState()
    const [snackbarstate, setSnackbarstate] = useState()
    const [snackbarmsg, setSnackbarmsg] = useState()
    const handleClose = (e, reason) => {
        if (e === 'clickaway') {
            return
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append('courseId', courseid)
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
                    <div className="col-md-2"></div>
                    <div className="col-md-8">

                        <form onSubmit={onSubmit} >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField


                                        variant="outlined"
                                        required
                                        fullWidth

                                        label="CourseId"
                                        autoFocus
                                        onChange={e => setcourseid(e.target.value)}
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
                                <Grid item xs={12} sm={6}>
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
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type='file'

                                        variant="outlined"

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
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"

                                >
                                    Submit
          </Button>
                            </Grid>
                        </form>

                    </div>
                    <div className="col-md-2"></div>
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
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                        <Typography variant='h6'>
                            Saved Video
                        </Typography>
                    </div>
                </div>
            </div>

        </div>
    )
}
