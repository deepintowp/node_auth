import React, {Fragment} from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgetPasswprdScreen from './components/screens/ForgetPasswprdScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';



function App() {
  return (
    <Router>
      <div className="app">
        
          <Routes>
          
          <Route exact 
                        path="/"
                        element={<PrivateRoute><PrivateScreen /></PrivateRoute>
                        }
                    />
          <Route exact path="/login" element={<LoginScreen/>} />
          <Route exact path="/register" element={<RegisterScreen/>} />
          <Route exact path="/forgetpasswprd" element={<ForgetPasswprdScreen/>} />
          <Route exact path="/resetpassword/:resetToken" element={<ResetPasswordScreen/>} />
          </Routes>
        
      </div>
    </Router>
  );
}

export default App;
