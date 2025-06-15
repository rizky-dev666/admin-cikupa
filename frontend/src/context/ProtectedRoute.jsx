// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios
      .get("/api/auth/check", {
        withCredentials: true,
      })
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={50} color="#4F46E5" />
      </div>
    );
  }

  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
