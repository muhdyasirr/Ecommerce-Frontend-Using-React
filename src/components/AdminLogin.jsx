import React, { useState } from "react";
import API from "../api/api.jsx";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Enter all fields");
      return;
    }

    try {
      setLoading(true);

     
      const res = await API.post("/admin/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.status === 200) {
        const admin = res.data.admin;
        console.log(res.data);
        

       
        localStorage.setItem("admin", JSON.stringify(admin));
        

       MySwal.fire({
  title: "Welcome back!",
  text: `Hello, ${admin.email || "Admin"} 👋`,
  icon: "success",
  confirmButtonText: "Continue",
});
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      // console.log(error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-gray-900 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
        <h1 className="text-white text-3xl font-bold mb-2 tracking-wide">
          Admin Panel
        </h1>
        <p className="text-gray-300 text-sm mb-8">
          Sign in to manage the MVMT collection
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Admin email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black/30 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black/30 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-xs mt-6">
          © 2025 SNEAKSA. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
