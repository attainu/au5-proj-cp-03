import React, { useState } from 'react'
import axios from 'axios'
export default function Video() {
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [chapter, setChapter] = useState('')
    const [file, setFile] = useState('')
    const [courseid, setcourseid] = useState()
    const onSubmit = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append('courseId', courseid)
        data.append('name', name)
        data.append('subject', subject)
        data.append('chapter', chapter)
        data.append('file', file)


        const url = 'http://localhost:4000/api/createvideo'
        axios.post(url, data).then(response => console.log(response.data))
    }
    return (
        <div>
            <form onSubmit={onSubmit} >
                <div className="form-group">


                    <input type='text' placeholder='Enter CourseId' onChange={e => setcourseid(e.target.value)} />
                </div>
                <div className="form-group">


                    <input type='text' placeholder='Enter name' onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">


                    <input type='text' placeholder='Enter subject' onChange={e => setSubject(e.target.value)} />
                </div>
                <div className="form-group">


                    <input type='text' placeholder='Enter chapter' onChange={e => setChapter(e.target.value)} />
                </div>
                <div className="form-group">


                    <input type='file' name='file' id='file' placeholder='Select file to upload' onChange={e => setFile(e.target.files[0])} />
                </div>
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
}
