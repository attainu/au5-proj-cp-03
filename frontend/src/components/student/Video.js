import React, { useState } from 'react'
import ReactPlayer from 'react-player'

import axios from 'axios'
import { Paper, Typography } from '@material-ui/core'
export default function Video() {
    const [link, setlink] = useState([]) /// will change to array when there will be list of videos
    const url = 'http://localhost:4000/api/getallvideos'
    axios.get(url).then(response => response.data).then(data => setlink(data[0].file))


    return (

        <div style={{
            display: 'flex', alignContent: 'flex-start', flexWrap: 'wrap', height: '100px', flexGrow: '1'
        }}>
            {/* Get List of lecture videos on the basis of courseID */}
            <Paper >
                <ReactPlayer url={link} width='200px' height='200px' style={{ padding: '10px' }} controls='true' volume='0' />
                <Typography variant='h6'>
                    Video Title
            </Typography>
            </Paper>
            <ReactPlayer url={link} width='200px' height='200px' style={{ padding: '10px' }} />
            <ReactPlayer url={link} width='200px' height='200px' style={{ padding: '10px' }} />
            <ReactPlayer url={link} width='200px' height='200px' style={{ padding: '10px' }} />
            <ReactPlayer url={link} width='200px' height='200px' style={{ padding: '10px' }} />
            <ReactPlayer url={link} width='200px' height='200px' style={{ padding: '10px' }} />
            <ReactPlayer url={link} width='200px' height='200px' style={{ padding: '10px' }} />
            <ReactPlayer url={link} width='200px' height='200px' style={{ padding: '10px' }} />
            <ReactPlayer url={link} width='200px' height='200px' style={{ padding: '10px' }} />
            <ReactPlayer url={link} width='200px' height='200px' style={{ padding: '10px' }} />
            <ReactPlayer url={link} width='200px' height='200px' style={{ padding: '10px' }} />
            <ReactPlayer url={link} width='200px' height='200px' style={{ padding: '10px' }} />
            <ReactPlayer url={link} width='200px' height='200px' style={{ padding: '10px' }} />
        </div>
    )
}


