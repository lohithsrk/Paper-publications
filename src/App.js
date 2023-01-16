
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

import RegisterPage from "./pages/auth/Register.page";
import LoginPage from "./pages/auth/Login.page";
import EmployeePage from './pages/Employee.page';
import UserRoute from './routes/User.route';
import Navbar from './components/Navbar.component';
import Paperpage from './pages/Paper.page';

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Router>
        <div className="main-body">
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<UserRoute />}>
                  <Route path="/" element={<EmployeePage />} />
                </Route>
                <Route path="/" element={<UserRoute />}>
                  <Route path="/register" element={<RegisterPage />} />
                </Route>
              </>
            ) : (
              <>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
              </>
            )}
            <Route path="/" element={<UserRoute />}>
              <Route path="/paper/:id_user/:id_paper" element={<Paperpage />} />
            </Route>
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
