import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Forgot from "./pages/forgot/Forgot";
import PasswordForm from "./pages/password Form/PasswordForm";
import Chat from "./pages/chat/Chat";
import UpdateProfile from "./pages/update/UpdateProfile";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./app.css";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route
          exact
          path="/profile/:username"
          element={user ? <Profile /> : <Login />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route
          path="/password-reset"
          element={user ? <Navigate to="/" /> : <PasswordForm />}
        />
        <Route
          path="/settings"
          element={user ? <UpdateProfile /> : <Login />}
        />
        <Route path="/chat" element={user ? <Chat /> : <Login />} />
        <Route
          path="/settings/profile/:username"
          element={
            user ? <Navigate replace to="/profile/:username" /> : <Profile />
          }
        />
        <Route
          path="/chat/profile/:username"
          element={
            user ? <Navigate replace to="/profile/:username" /> : <Profile />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
