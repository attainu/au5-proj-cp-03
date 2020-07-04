import React, { useState } from 'react'
import Axios from 'axios'

export default function Ebook() {
    const [description, setDescription] = useState()
    const [file, setFile] = useState()
    const [name, setName] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append('description', description)
        data.append('name', name)
        data.append('file', file)
        const url = 'http://localhost:4000/api/saveebook'
        Axios.post(url, data).then(result => { console.log(result) })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">


                    <input type='text' placeholder='Enter name' onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">

                    <input type='text' placeholder="Enter description of the Ebook" onChange={e => setDescription(e.target.value)} />
                </div>
                <div className="form-group">

                    <input type='file' name='file' id='file' placeholder='Select pdf to upload' onChange={e => setFile(e.target.files[0])} />
                </div>
                <button type='submit'>Upload</button>
            </form>
        </div>
    )
}
