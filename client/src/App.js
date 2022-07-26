import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Forgot from "./pages/forgot/Forgot";
import PasswordReset from "./pages/resetpass/ResetPass"
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";




function App() {
  const {user} = useContext(AuthContext); 


  return (
    <Router> 
      <Routes> 
        <Route exact path="/" element ={ user ? <Home />: <Register/>} />
        <Route path="/profile/:username" element ={ <Profile />}/>
        <Route path="/login" element ={user ? <Navigate to="/"/> :<Login />} />
        <Route path="/register" element={user ? <Navigate to="/"/> :<Register />} />
        <Route path="/forgot" element={user ? <Navigate to="/"/> :<Forgot />} />
        <Route path="/password-reset/:id/:token" element={user ? <Navigate to="/"/> :<PasswordReset />} />
      </Routes>
    </Router>
  );
}

export default App;
