
import React, { createContext, useState, useContext, useEffect } from "react";
import { Base_url } from "../ApiController/ApiController";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem("authtoken"); // Get token from localStorage
  });
  const navigate = useNavigate();

  // Optionally, you can set the token again if it's updated
  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authtoken", authToken);
    }
    const fetchProfile = async () => {
      if (!authToken) {
        navigate('/'); // Redirect to login if token is missing
        return;
      }

      try {
        const response = await axios.get(Base_url+'getProfile', {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (response.data.status) {
           console.log(response.data)
        } else {
          navigate('/'); // Redirect to login if token is missing
          localStorage.removeItem('authtoken')
        }
      } catch (err) {
        navigate('/'); // Redirect to login if token is missing
        localStorage.removeItem('authtoken')
      } 
    };

    fetchProfile();
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
