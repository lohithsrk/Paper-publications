import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import CreateUser from "./pages/auth/CreateUser.page";
import LoginPage from "./pages/auth/Login.page";
import Employee from "./pages/Employee.page";
import UserRoute from "./routes/User.route";
import Navbar from "./components/Navbar.component";
import Paper from "./pages/Paper.page";
import Employees from "./pages/Employees.page";
import Dashboard from "./pages/Dashboard.page";

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      <ToastContainer />
      <Router>
        <Navbar />
        <div className="main-body">
          <Routes>
            {user && user.role === 'standard' ? (
              <>
                <Route path="/" element={<UserRoute />}>
                  <Route path="/" element={<Employee />} />
                </Route>
              </>
            ) : user && user.role === 'admin' ? (
              <>
                <Route path="/" element={<UserRoute />}>
                  <Route path="/" element={<Dashboard />} />
                </Route>
                <Route path="/" element={<UserRoute />}>
                  <Route path="/user/:id_user" element={<Employee />} />
                </Route>
                <Route path="/" element={<UserRoute />}>
                  <Route path="/employees" element={<Employees />} />
                </Route>
                <Route path="/" element={<UserRoute />}>
                  <Route path="/create-user" element={<CreateUser />} />
                </Route>
              </>
            ) : (
              <>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
              </>
            )}
            <Route path="/" element={<UserRoute />}>
              <Route path="/paper/:id_user/:id_paper" element={<Paper />} />
            </Route>
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
