import React from 'react';
import Header from './components/header'
import Footer from './components/footer'
import LandingPage from './components/LandingPage';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ForgetPassword from './components/ForgetPassword';
import TeacherDashboard from './components/teacher'
function App() {
  return (
    <Router>

      <div className="App">
        <Header />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/reset' component={ForgetPassword} />
          <Route path='/dashboard' component={TeacherDashboard} />
          <Route exact path='/' component={LandingPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
