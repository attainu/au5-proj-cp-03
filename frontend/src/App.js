import React from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ForgetPassword from './components/ForgetPassword';
import TeacherDashboard from './components/teacher'
import Signup from './components/admin/Signup';
import StudentDashboard from './components/student/Dashboard'
import AdminDashboard from './components/admin/Dashboard';
import courses from "./components/courses/index";
import quiz from './components/Quiz/quiz';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/register' component={Signup} />
          <Route exact path="/login"   >
            {localStorage.getItem('token') ? <Redirect to='/courses' /> : <Login />}
          </Route>
          <Route path='/reset' component={ForgetPassword} />
          <Route exact path='/courses' component={courses} />
          <Route path='/t/dashboard' component={TeacherDashboard} />
          <Route path='/s/dashboard' component={StudentDashboard} />
          <Route path='/a/dashboard' component={AdminDashboard} />
          <Route exact path='/courses/:id/quiz/:id1' component={quiz} />
          <Route exact path='/' component={LandingPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
