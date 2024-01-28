import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Styles/Home.css";

const Home = () => {
  const [devices, setDevices] = useState([]);
  const [current_device, setCurrent_device] = useState(0);
  const navigate = useNavigate();
  const fetchDevices = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("User not authenticated");
        navigate("/login");
      }

      const response = await axios.get(
        "http://192.168.1.104:5000/api/device/get_all",
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );
      setDevices(response.data.devices);
      setCurrent_device(response.data.device_id);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching devices", error.response.data);
    }
  };
  useEffect(() => {
    fetchDevices();
  }, []);

  const handleLogout = async (deviceId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("User not authenticated");
        return;
      }

      await axios.delete(
        `http://192.168.1.104:5000/api/device/logout/${deviceId}`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );
      fetchDevices();
    } catch (error) {
      console.error("Error logging out device", error.response.data);
    }
  };

  const handleDelete = async (deviceId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("User not authenticated");
        return;
      }

      await axios.delete(
        `http://192.168.1.104:5000/api/device/delete/${deviceId}`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );
      fetchDevices();
    } catch (error) {
      console.error("Error logging out device", error.response.data);
    }
  };

  return (
    <div className="home-container">
      <h2 className="home-h2">Your Devices</h2>
      {devices.length === 0 ? (
        <p>No devices found.</p>
      ) : (
        <div>
          {devices.map((device) => (
            <div key={device.id} className="device-container">
              <div>
                <strong>Name:</strong> {device.device_name}
              </div>
              <div>
                      <strong>Status:</strong>{" "}
                      {device.isblocked
                        ? "Blocked"
                        : device.isactive
                        ? "Active"
                        : "Inactive"}
                    </div>
              {!(current_device === device.id) && (
                <>
                  {device.isactive && (
                    <button
                      className="home-button"
                      onClick={() => handleLogout(device.id)}
                    >
                      Logout Device
                    </button>
                  )}
                  <button
                    className="home-button"
                    onClick={() => handleDelete(device.id)}
                  >
                    Delete Device
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
