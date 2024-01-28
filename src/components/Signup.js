import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Styles/SignUp.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signup",
        formData
      );
      if (response.status === 201) {
        console.log(response.data);
        alert(response.data["Message"]);
        navigate("/login");
      }
      console.log("Signup Successful", response.data);
    } catch (error) {
      alert(error.response.data["Message"]);
    }
  };

  return (
    <div className="signup_container">
      <h2 className="SignUpH2">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label className="signup-label">
          Full Name:
          <input
            className="signup-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label className="signup-label">
          Email:
          <input
            className="signup-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label className="signup-label">
          Password:
          <input
            className="signup-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
