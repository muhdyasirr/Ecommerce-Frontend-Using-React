import { Navigate } from "react-router-dom";
import React from "react";

function ProtectedRoute({ children }) {
  const storedadmin = localStorage.getItem("admin");
  const admin = storedadmin ? JSON.parse(storedadmin) : null; 

console.log(admin,"two");


  if (admin?.role === "admin"  ) {
    return children;
  
  }

  return <Navigate to="/admin" replace />;
}

export default ProtectedRoute;
