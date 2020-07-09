import React, { useState, useEffect } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import axios from 'axios'
function Ebook(props) {
    // eslint-disable-next-line
    const [description, setDescription] = useState([])
    const [link, setlink] = useState([])

    useEffect(() => {
        const url = 'http://localhost:4000/api/getebook/'
        const id = props.courseID
        const finalurl = url + id
        axios.get(finalurl).then(response => response.data).then(data => {
            //console.log(data.ebookdata[0].ebooks.length);

            if (data.ebookdata[0].ebooks.length > 0) {
                data.ebookdata[0].ebooks.forEach(d => {
                    setlink(link => [...link, d.filepath])
                    setDescription(description => [...description, d.description])
                })
            }

        })

    }, [])
    return (
        <div>
            <div className="container" style={{ marginTop: '-18px' }}>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        {
                            link.map((link, index) => {
                                return < Paper
                                    elevation={3} key={index}
                                >

                                    <Typography variant='h7' style={{ marginLeft: '20px' }}>
                                        Description:{description[index]}<br />
                                    Link:<a href={link[index]}>Download Link</a>
                                    </Typography>
                                </Paper>
                            })
                        }

                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        </div >
    )

}
const mapStateToProps = (state) => {
    return {
        courseID: state.courseDashboard.courseID,

    };
};
export default connect(mapStateToProps)(Ebook)