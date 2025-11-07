import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("isLoggedIn")
  );
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  const login = (role) => {
    setIsLoggedIn(true);
    setRole(role);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", role);
    console.log(isLoggedIn);
    
  };

const logout = () => {
  setIsLoggedIn(false);
  setRole(null); 
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  localStorage.removeItem("admin"); 
  console.log("Logged out successfully!");
};

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
            