import React, { useState } from 'react'
import { Paper, Typography } from '@material-ui/core'

export default function Ebook() {
    const [description, setDescription] = useState()

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <Paper>

                            <Typography variant='h6'>
                                Description:{description}
                            </Typography>
                        </Paper>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        </div>
    )

}
