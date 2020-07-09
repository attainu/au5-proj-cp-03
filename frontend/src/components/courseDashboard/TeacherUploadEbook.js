import React, { useState } from "react";
import Axios from "axios";
import { Grid, TextField, Button, Snackbar } from "@material-ui/core";
import { storage, firebase } from "../../config/firebaseconfig";
import FileUploader from "react-firebase-file-uploader";
import { connect } from 'react-redux'
function Ebook(props) {
    const [description, setDescription] = useState();

    const [file, setFile] = useState();
    const [filename, setFilename] = useState();

    const [name, setName] = useState();
    const [link, setLink] = useState();
    const [courseid, setCourseid] = useState();
    const [snackbarstate, setSnackbarstate] = useState();
    const [snackbarmsg, setSnackbarmsg] = useState();

    const handleUpload = async (filename) => {
        setFilename(filename);
        const pdflink = await storage.ref("pdfs").child(filename).getDownloadURL();
        await setLink(pdflink);
    };
    const handleClose = (e, reason) => {
        if (e === "clickaway") {
            return;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (link !== "undefined") {
            let data = new FormData();
            data.append("description", description);
            data.append("name", name);
            data.append("file", file);
            data.append("link", link);
            data.append("courseId", courseid);
            const url = "http://localhost:4000/api/saveebook";
            await Axios.post(url, data).then((result) => {
                setSnackbarstate(true);
                setSnackbarmsg(result.data.msg);
                setInterval(() => {
                    window.location.reload();
                }, 3000);
            });
        } else {
            console.log("error");
        }
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
                                        onChange={(e) => setCourseid(e.target.value)}
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
                                <Grid item xs={12} sm={6}>
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

                                <Grid item xs={12} sm={6}>
                                    <FileUploader
                                        name={name}
                                        storageRef={firebase.storage().ref("pdfs")}
                                        onUploadSuccess={handleUpload}
                                    />
                                </Grid>

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