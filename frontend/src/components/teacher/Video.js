import React, { useState } from 'react'
import axios from 'axios'
export default function Video() {
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [chapter, setChapter] = useState('')
    const [file, setFile] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append('name', name)
        data.append('subject', subject)
        data.append('chapter', chapter)
        data.append('file', file)

        // const payload = {
        //     name,
        //     subject,
        //     chapter,
        //     file: formData
        // }
        const config = {
            method: 'post',
            url: 'localhost:4000/api/createvideo',
            headers: {

            },
            data: data
        }

        const url = 'http://localhost:4000/api/createvideo'
        axios.post(config).then(response => console.log(response.data))
    }
    return (
        <div>
            <form onSubmit={onSubmit} >

                <input type='text' placeholder='Enter name' onChange={e => setName(e.target.value)} />
                <input type='text' placeholder='Enter subject' onChange={e => setSubject(e.target.value)} />
                <input type='text' placeholder='Enter chapter' onChange={e => setChapter(e.target.value)} />
                <input type='file' name='file' id='file' placeholder='Select file to upload' onChange={e => setFile(e.target.value)} />
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
}
