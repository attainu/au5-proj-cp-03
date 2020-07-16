import React from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import TeacherDashboard from './components/teacher'
import Register from './components/Register';
import StudentDashboard from './components/student/Dashboard'

import courses from "./components/courses/index";
import quiz from './components/Quiz/quiz';
import CoursesDashboard from './components/courseDashboard';
import Profile from './components/profie/Profile';
import ProtectedRoute from './components/ProtectedRoute'
import ChangePassword from './components/changePassword';
import Reset from './components/reset';
function App() {

  return (
    <div className="App">
      <Router>

        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/resetpassword/:id' component={ChangePassword} />
          <Route exact path="/login"   >
            {localStorage.getItem('token') ? <Redirect to='/courses' /> : <SignIn />}
          </Route>
          <Route exact path='/reset' component={Reset} />
          <Route exact path='/courses' component={courses} />
          <Route exact path='/t/dashboard' component={TeacherDashboard} />
          <Route exact path='/s/dashboard' component={StudentDashboard} />
          <Route exact path='/courses/:id/quiz/:id1' component={quiz} />
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/courses/:id' component={CoursesDashboard} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div >
  );
}

export default App;
