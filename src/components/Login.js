import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showDeviceNamePopup, setShowDeviceNamePopup] = useState(false);
  const [deviceName, setDeviceName] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeviceNameChange = (e) => {
    setDeviceName(e.target.value);
  };

  const handleDeviceNameSubmit = async () => {
    const updatedFormData = {
      ...formData,
      device_name: deviceName,
    };
    try {
      const response = await axios.post(
        "http://192.168.1.104:5000/api/user/login",
        updatedFormData
      );

      if (response.status === 200) {
        console.log(response.data);
        alert("Login successful");
        localStorage.setItem("authToken", response.data.token);
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data["Message"]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.1.104:5000/api/user/login",
        formData
      );

      if (response.status === 203) {
        setShowDeviceNamePopup(true);
      } else if (response.status === 200) {
        console.log(response.data);
        alert("Login successful");
        localStorage.setItem("authToken", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log("TEST");
      console.log(error.response.status);
      alert(error.response.data["Message"]);
    }
  };

  return (
    <div className="signup_container">
      <h2 className="SignUpH2">Login</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
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
        <button className="signup-button" type="submit">Login</button>
      </form>
      {showDeviceNamePopup && (
        <div className="popup">
          <h3>Add Device Name</h3>
          <input
            type="text"
            placeholder="Enter device name"
            value={deviceName}
            onChange={handleDeviceNameChange}
          />
          <button onClick={handleDeviceNameSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Login;
