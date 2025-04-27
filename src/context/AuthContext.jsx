import React, { createContext, useState, useContext } from 'react';

// Create context
const AuthContext = createContext();

// Provide context to your app
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userData, setUserData] = useState(null); // Add userData state

  // Set the token to local storage or in state
  const setToken = (token) => {
    localStorage.setItem('authToken', token); // Save to localStorage
    setAuthToken(token); // Update state
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken, setUserData, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Use context in other components
export const useAuth = () => {
  return useContext(AuthContext);
};
