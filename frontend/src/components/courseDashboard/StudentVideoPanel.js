import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'

import axios from 'axios'
import { Paper, Typography, Grid } from '@material-ui/core'
import { connect } from 'react-redux'
function Video(props) {
    const [link, setlink] = useState([]) /// will change to array when there will be list of videos
    //localhost:4000/api/getvideos/5ef13751a2f3aa55cce14e24
    const [videoname, setVideoname] = useState([])
    useEffect(() => {
        const url = 'http://localhost:4000/api/getvideos/'
        const id = props.courseID
        const finalurl = url + id
        axios.get(finalurl).then(response => response.data).then(data => {
            if (data.videodata[0].lectureVideos.length > 0) {
                data.videodata[0].lectureVideos.forEach(d => {
                    setlink(link => [...link, d.file])
                    setVideoname(videoname => [...videoname, d.name])
                })
            }
        })
        return () => {

        }
    }, [])

    return (

        <div style={{
            display: 'flex', alignContent: 'flex-start', flexWrap: 'wrap', height: '100px', flexGrow: '1'
        }}>
            {/* Get List of lecture videos on the basis of courseID */}

            {
                link.map((link, index) => {
                    return <Grid key={index} style={{ paddingLeft: '20px' }}>

                        <ReactPlayer url={link} width='200px' height='200px' controls='true' volume='0' />
                        <Typography variant='h6' >
                            {videoname[index]}
                        </Typography>

                    </Grid>
                })
            }



        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        courseID: state.courseDashboard.courseID,

    };
};

export default connect(mapStateToProps)(Video)