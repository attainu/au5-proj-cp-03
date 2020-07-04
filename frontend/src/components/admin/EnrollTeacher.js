import React from 'react'
import { TextField, Box } from '@material-ui/core'

export default function EnrollTeacher() {
    return (
        <div>
            <Box border={1}>
                <form >
                    <TextField lable='Enter teacher name' />
                </form>
            </Box>
        </div>
    )
}
