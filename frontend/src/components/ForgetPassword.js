import React from 'react'
import { Container, TextField } from '@material-ui/core';
import './resetform.css'
export default function ForgetPassword() {
    return (
        <div>
            <Container fixed>
                <form className='resetform' autoComplete="off">
                    <TextField id="email" label="Enter your email" type='search' />
                </form>
            </Container>
        </div>
    )
}
