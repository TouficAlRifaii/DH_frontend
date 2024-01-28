import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState(0);
  const fetchUsers = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("User not authenticated");
        return;
      }
      const response = await axios.get(
        "http://192.168.1.104:5000/api/admin/get_devices",
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );
      setUsers(response.data.users);
      setCurrent(response.data.device_id);
    } catch (error) {
      console.error("Error fetching users", error.response.data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        // Handle the case where the user is not authenticated
        console.error("User not authenticated");
        return;
      }

      // Send a block user request to the backend
      await axios.delete(
        `http://192.168.1.104:5000/api/admin/block_user/${userId}`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );

      // After blocking the user, refresh the users list
      fetchUsers();
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Error blocking user", error.response.data);
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        // Handle the case where the user is not authenticated
        console.error("User not authenticated");
        return;
      }

      // Send a block user request to the backend
      await axios.post(
        `http://192.168.1.104:5000/api/admin/unblock_user/${userId}`,
        null,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );

      // After blocking the user, refresh the users list
      fetchUsers();
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Error blocking user", error.response.data);
    }
  };

  const handleLogoutDevice = async (deviceId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        // Handle the case where the user is not authenticated
        console.error("User not authenticated");
        return;
      }

      // Send a logout device request to the backend
      await axios.delete(
        `http://192.168.1.104:5000/api/admin/logout_device/${deviceId}`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );

      // After logging out the device, refresh the users list
      fetchUsers();
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Error logging out device", error.response.data);
    }
  };

  const handleLogoutUser = async (userId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        // Handle the case where the user is not authenticated
        console.error("User not authenticated");
        return;
      }

      // Send a logout device request to the backend
      await axios.delete(
        `http://192.168.1.104:5000/api/admin/logout_user/${userId}`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );

      // After logging out the device, refresh the users list
      fetchUsers();
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Error logging out user", error.response.data);
    }
  };

  const handleBlockDevice = async (deviceId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        // Handle the case where the user is not authenticated
        console.error("User not authenticated");
        return;
      }

      // Send a logout device request to the backend
      await axios.delete(
        `http://192.168.1.104:5000/api/admin/block_device/${deviceId}`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );

      // After logging out the device, refresh the users list
      fetchUsers();
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Error logging out device", error.response.data);
    }
  };

  const handleUnblockDevice = async (deviceId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        // Handle the case where the user is not authenticated
        console.error("User not authenticated");
        return;
      }

      // Send a logout device request to the backend
      await axios.post(
        `http://192.168.1.104:5000/api/admin/unblock_device/${deviceId}`,
        null,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );

      // After logging out the device, refresh the users list
      fetchUsers();
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Error logging out device", error.response.data);
    }
  };

  return (
    <div>
      <h2 className="users-h2">All Users and Devices</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div>
          {users.map((user) => (
            <div key={user.id} className="user-container">
              <h3>{user.name}</h3>
              <ul className="users-ul">
                {user.devices.map((device) => (
                  <li key={device.id} className="users-li device-container">
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
                    {!(current === device.id) && (
                      <>
                        <button
                          className="users-button"
                          onClick={() => {
                            if (device.isblocked) {
                              handleUnblockDevice(device.id);
                            } else {
                              handleBlockDevice(device.id);
                            }
                          }}
                        >
                          {device.isblocked ? "Unblock Device" : "Block Device"}
                        </button>
                        <button
                          className="users-button"
                          onClick={() => handleLogoutDevice(user.id, device.id)}
                        >
                          Logout Device
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              {!user.is_admin && (
                <>
                  <button
                    className="users-button"
                    onClick={() => {
                      if (user.is_active) {
                        handleBlockUser(user.id);
                      } else {
                        handleUnblockUser(user.id);
                      }
                    }}
                  >
                    {user.is_active ? "Block User" : "Unblock User"}
                  </button>
                  <button
                    className="users-button"
                    onClick={() => handleLogoutUser(user.id)}
                  >
                    Logout User
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

export default Users;
