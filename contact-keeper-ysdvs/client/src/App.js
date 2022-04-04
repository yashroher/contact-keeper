import './App.css';
import Navbar from './components/layout/navbar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRouting from './components/routing/PrivateRouting';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

if(localStorage.token){
  setAuthToken(localStorage.token);
} 

const  App = () => {
  return (
    <AuthState>
    <ContactState>
    <AlertState>
    <Router>
    <div className="App">
      <Navbar/>
      <div className = "container">
        <Alerts />
        <Switch>
          <PrivateRouting 
            exact 
            path = "/"
            component = {Home}
          />
          <Route
            exact 
            path = "/about"
            component = {About}
          />
          <Route 
            exact 
            path = "/register"
            component = {Register}
          />
          <Route 
            exact
            path = "/login"
            component = {Login}
          />
        </Switch>
      </div>
    </div>
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
