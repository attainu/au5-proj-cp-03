import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import Video from './Video'
export default function Dashboard() {
    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <Typography>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Video />
        </div>
    )
}
