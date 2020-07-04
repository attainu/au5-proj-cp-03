import React from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ForgetPassword from './components/ForgetPassword';
import TeacherDashboard from './components/teacher'
import Signup from './components/admin/Signup';
import StudentDashboard from './components/student/Dashboard'
import AdminDashboard from './components/admin/Dashboard'
function App() {
  return (
    <Router>

      <div className="App">

        <Switch>
          <Route path='/register' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/reset' component={ForgetPassword} />
          <Route path='/t/dashboard' component={TeacherDashboard} />
          <Route path='/s/dashboard' component={StudentDashboard} />
          <Route path='/a/dashboard' component={AdminDashboard} />
          <Route exact path='/' component={LandingPage} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
