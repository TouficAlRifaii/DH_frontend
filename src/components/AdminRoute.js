import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateAdmin = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          console.error("User not authenticated");
          setAuthorized(false);
          setIsAdmin(false);
          setLoading(false); 
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
      } finally {
        setLoading(false); 
      }
    };

    validateAdmin();
  }, []);

  useEffect(() => {
    console.log("Authorized state changed:", authorized);
  }, [authorized]); 

  if (loading) {
    return null;
  }

  if (authorized && isAdmin) {
    console.log("Authorized");
    return children;
  } else {
    console.log("Not Authorized");
    return <Navigate to="/" replace={true} />;
  }
};

export default AdminRoute;
