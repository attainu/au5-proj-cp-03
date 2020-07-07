import React, { useState } from 'react'
import Axios from 'axios'
import { Grid, TextField, Button } from '@material-ui/core'
export default function Ebook() {
    const [description, setDescription] = useState()

    const [file, setFile] = useState()
    const [name, setName] = useState()
    const [link, setLink] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append('description', description)
        data.append('name', name)
        data.append('file', file)
        data.append('link', link)
        const url = 'http://localhost:4000/api/saveebook'
        Axios.post(url, data).then(result => {
            console.log(result)
        })
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField


                                        variant="outlined"
                                        required
                                        fullWidth

                                        label="Name of the Ebook"
                                        autoFocus
                                        onChange={e => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField


                                        variant="outlined"
                                        required
                                        fullWidth

                                        label="Enter description of the Ebook"
                                        autoFocus
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField


                                        variant="outlined"

                                        fullWidth

                                        label="Please paste the pdf link"
                                        autoFocus
                                        onChange={e => {
                                            setFile('')
                                            setLink(e.target.value)
                                        }}
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
                                {/* <div className="form-group">

                        <input type='file' name='file' id='file' placeholder='Select pdf to upload' onChange={e => setFile(e.target.files[0])} />
                    </div> */}
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
            </div>
        </div>
    )
}
