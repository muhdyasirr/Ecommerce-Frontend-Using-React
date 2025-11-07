import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.jsx"; 
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);

      // 🔹 Call backend API
      const response = await API.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const user = response.data.user;
       
        

        
        localStorage.setItem("user", JSON.stringify(user));


       
        

        MySwal.fire({
  title: "👋 Welcome back!",
  text: `Hello, ${user.name || "User"}!`,
  icon: "success",
  confirmButtonText: "Let's Go!",
});
        navigate("/"); 
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);

      if (error.response?.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-black/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
        <h1 className="text-white text-3xl font-bold mb-2 tracking-wide">User Login</h1>
        <p className="text-gray-300 text-sm mb-8">Sign in to explore the latest watches</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-200 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-xs mt-6">
          Don’t have an account?{" "}
          <span
            className="text-white cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
