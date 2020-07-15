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
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path="/login"   >
            {localStorage.getItem('token') ? <Redirect to='/courses' /> : <SignIn />}
          </Route>
          <Route exact path='/reset' component={Reset} />
          <Route exact path='/resetpassword/:id' component={ChangePassword} />
          <ProtectedRoute exact path='/courses' component={courses} />

          <ProtectedRoute exact path='/t/dashboard' component={TeacherDashboard} />
          <ProtectedRoute exact path='/s/dashboard' component={StudentDashboard} />
          <ProtectedRoute exact path='/courses/:id/quiz/:id1' component={quiz} />
          <Route exact path='/' component={LandingPage} />
          <ProtectedRoute exact path='/courses/:id' component={CoursesDashboard} />
          <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
