import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>
      <nav class="navbar navbar-light bg-light" style={{ boxShadow: "0 4px 6px -7px black" }}>
        <a class="navbar-brand mr-auto" href="/">Classroom</a>
        <div className="mx-5">
          <Link to="/login">
            <button className="btn btn-primary mx-4">Login</button>
          </Link>
          <button className="btn btn-primary">Signup</button>
        </div>
      </nav>
      <section className="mx-auto mt-5 mb-5" style={{ width: "60vw", textAlign: "center" }}>
        <h1 className="mb-4">Manage teaching and learning with Classroom</h1>
        <p style={{ fontSize: "18px" }}>Classroom helps students and teachers organize assignments, boost collaboration, and foster better communication.</p>
        <button className="btn btn-primary">Go to Sign Up</button>
      </section>
      <section className="aabout-classroom my-5 py-3" style={{ background: "#e2e1e1 " }}>
        <div className="row">
          <div className="d-flex justify-content-center col-6">
            <img src="https://lh3.googleusercontent.com/ed0IQXEBQNUegxC9qviCOWn77Gt8gT0Q3qqZVq64VKv-AW3RVe1ZxSENk9d6-Th3JMUCY3U5OEbwswxQ0Hdvd54WsAU_8TntMRVOdQ=w2880-v1" alt="Laptop" style={{ height: "300px", maxHeight: "100%", maxWidth: "100%" }} />
          </div>
          <div className="d-flex align-items-center justify-content-center col-6">
            <div>
              <h4>Make teaching more productive, collaborative, and meaningful</h4>
              <ul>
                <li>Tackle administrative tasks more efficiently</li>
                <li>The best in learning management at no cost</li>
                <li>Work anywhere, anytime, from your laptop</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <img src="https://lh3.googleusercontent.com/LwSiJKj-RgSyzcJen8ixlLdlH_-Ys8DTsDdruc6uDGSr_Pp7jkpF3mK8GvQy0gtl-ueZ2Zptw8iD-hTxTKOpFHNOD0Mb8rOX7Em_=w2880-v1" alt="Students" style={{ maxWidth: "90%", display: "block", margin: "0 auto", borderRadius: "4px" }}></img>
    </div >
  )
}
