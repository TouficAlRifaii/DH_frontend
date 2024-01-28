import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Users from "./components/Users";
import "./App.css";
import Navbar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import UnauthorizedRoute from "./components/UnauthorizedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="body">
        <Routes>
          <Route
            path="/signup"
            element={
              <UnauthorizedRoute>
                <Signup />
              </UnauthorizedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <UnauthorizedRoute>
                <Login />
              </UnauthorizedRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
