import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import AdminLogin from "./components/AdminLogin";
import AdminPage from "./components/AdminPage";
import Home from "./components/Home";
import Employee from "./components/Employee";
import AddEmployee from "./components/AddEmployee";
import Dashboard from "./components/Dashboard";
import ApplyLeave from "./components/ApplyLeave";
import Timetrack from "./components/Timetrack";
import AdminLeaveRequests from "./components/AdminLeaveRequests";
import Wallet from "./components/Wallet";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              isLogin ? (
                <Login switchToSignup={switchToSignup} />
              ) : (
                <Signup switchToLogin={switchToLogin} />
              )
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-page" element={<AdminPage />}>
            <Route path="home" element={<Home />} />
            <Route path="employee" element={<Employee />} />
            <Route path="leave-requests" element={<AdminLeaveRequests />} />
            <Route path="track-time" element={<Timetrack/>} />
            <Route path="add_employee" element={<AddEmployee />} />
            <Route path="wallet" element={<Wallet/>} />
          </Route>
          <Route path="/apply-leave" element={<ApplyLeave/>} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

