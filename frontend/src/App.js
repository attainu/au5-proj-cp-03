import React from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ForgetPassword from './components/ForgetPassword';
import TeacherDashboard from './components/teacher'
import Signup from './components/Signup';
import StudentDashboard from './components/student/Dashboard'

import courses from "./components/courses/index";
import quiz from './components/Quiz/quiz';
import Courses from './components/student/Courses';
import CoursesDashboard from './components/courseDashboard';
import Profile from './components/profie/Profile';
function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/register' component={Signup} />
          <Route exact path="/login"   >
            {localStorage.getItem('token') ? <Redirect to='/courses' /> : <Login />}
          </Route>
          <Route exact path='/reset' component={ForgetPassword} />
          <Route exact path='/courses' component={courses} />

          <Route exact path='/t/dashboard' component={TeacherDashboard} />
          <Route exact path='/s/dashboard' component={StudentDashboard} />
          <Route exact path='/courses/:id/quiz/:id1' component={quiz} />
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/courses/:id' component={CoursesDashboard} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
