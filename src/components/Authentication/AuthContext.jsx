// import React, { createContext, useState, useContext } from "react";

// // Create AuthContext
// const AuthContext = createContext();

// // AuthProvider component to wrap the app
// export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(localStorage.getItem("authtoken"));

//   return (
//     <AuthContext.Provider value={{ authToken, setAuthToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use AuthContext
// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useState, useContext, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem("authtoken"); // Get token from localStorage
  });

  // Optionally, you can set the token again if it's updated
  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authtoken", authToken);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
