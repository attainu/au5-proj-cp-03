import React, { useState } from "react";
import Axios from "axios";
import { Grid, TextField, Snackbar, Button } from "@material-ui/core";
import { storage, firebase } from "../../config/firebaseconfig";
import FileUploader from "react-firebase-file-uploader";
import { connect } from 'react-redux'
function Ebook(props) {
    const [description, setDescription] = useState();

    const [file, setFile] = useState();

    const [name, setName] = useState();
    const [link, setLink] = useState();

    const [snackbarstate, setSnackbarstate] = useState();
    const [snackbarmsg, setSnackbarmsg] = useState();
    const [buttonstatus, setbuttonStatus] = useState("Submit")
    const handleStart = () => {

    }
    const handleProgress = () => {
        setbuttonStatus('Please Wait....')
    }
    const handleUpload = async (filename) => {

        const pdflink = await storage.ref("pdfs").child(filename).getDownloadURL();
        await setLink(pdflink);
        setbuttonStatus('Submit')
    };
    const handleClose = (e, reason) => {
        if (e === "clickaway") {
            return;
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("LInk", link)


        const payload = {
            "description": description,
            "name": name,
            "link": link,
            "courseId": props.courseID
        }
        const url = "http://localhost:4000/api/saveebook";
        Axios.post(url, payload).then((result) => {
            setSnackbarstate(true);
            setSnackbarmsg(result.data.msg);
            setInterval(() => {
                window.location.reload();
            }, 3000);
        });


    };
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
                                        label="Name of the Ebook"
                                        autoFocus
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Enter description of the Ebook"
                                        autoFocus
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Please paste the pdf link"
                                        autoFocus
                                        onChange={(e) => {
                                            setFile("");
                                            setLink(e.target.value);
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <label>Or</label>
                                </Grid>

                                <Grid item xs={12}>
                                    <FileUploader
                                        name={name}

                                        storageRef={firebase.storage().ref("pdfs")}
                                        onUploadStart={handleStart}
                                        onProgress={handleProgress}
                                        onUploadSuccess={handleUpload}
                                    />
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"

                                >
                                    {buttonstatus}
                                </Button>
                                <br />
                                {/* <button
                                    className="btn btn-primary ml-40"
                                    type="submit"
                                    disabled={!link}
                                >Submit</button> */}
                            </Grid>
                        </form>
                    </div>
                    <div className="col-md-2"></div>
                    <Snackbar
                        open={snackbarstate}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        message={snackbarmsg}
                        autoHideDuration={3000}
                        onClose={handleClose}
                    />
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        courseID: state.courseDashboard.courseID,

    };
};

export default connect(mapStateToProps)(Ebook)