import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Styles/Navbar.css";
import axios from "axios";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateAdmin = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          console.error("User not authenticated");
          setAuthorized(false);
          setIsAdmin(false);
          return;
        }

        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/api/admin/validate",
          {
            headers: {
              Authorization: `${authToken}`,
            },
          }
        );
        setIsAdmin(response.data.isAdmin === "True");
        setAuthorized(true);
      } catch (error) {
        console.error("Error validating admin status", error.response.data);
        setIsAdmin(false);
        setAuthorized(false);
      }
    };
    validateAdmin();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthorized(false);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">DH</Link>
      </div>
      <div className="nav-links">
        {authorized && <Link to="/">Home</Link>}
        {authorized && isAdmin && <Link to="/admin/users">Users</Link>}
        {!authorized ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
