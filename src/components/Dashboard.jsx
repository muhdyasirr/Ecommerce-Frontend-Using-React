import React from "react";
import { FaTags, FaBoxOpen, FaUsers, FaWarehouse } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Dashboard = () => {
  const navigate = useNavigate();

  const options = [
    { title: "Categories", icon: <FaTags size={32} />, path: "/categories", color: "bg-black" },
    { title: "Products", icon: <FaBoxOpen size={32} />, path: "/products", color: "bg-black" },
    { title: "Users", icon: <FaUsers size={32} />, path: "/AlLUsers", color: "bg-black" },
    // { title: "Stock", icon: <FaWarehouse size={32} />, path: "/stock", color: "bg-black" },
  ];

  return (
    <div className="flex flex-col items-center p-8 h-screen bg-gray-100 justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {options.map((opt, i) => (
          <div
            key={i}
            onClick={() => navigate(opt.path)}
            className={`cursor-pointer rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-white ${opt.color} hover:scale-105 transition-transform duration-300`}
          >
            {opt.icon}
            <h2 className="mt-4 text-lg font-semibold">{opt.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
