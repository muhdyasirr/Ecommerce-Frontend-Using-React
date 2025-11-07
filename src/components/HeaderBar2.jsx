import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SlBag } from "react-icons/sl";
import { IoMdPerson, IoMdCart } from "react-icons/io";
import image from "../assets/imagesjs/image.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const HeaderBar2 = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const storedAdmin = JSON.parse(localStorage.getItem("admin") || "null");

  const user = storedUser;
  const admin = storedAdmin;

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  const handlePublicAccess = () => {
    alert("Take Premium for this feature (New feature).");
  };

  return (
    <header className="bg-white flex justify-between items-center w-full h-16 px-6 md:px-10 shadow-md relative z-50">
    
      <img
        onClick={() => navigate("/")}
        className="h-8 object-contain cursor-pointer"
        src={image}
        alt="Logo"
      />

     
      <div className="hidden md:flex gap-5 items-center text-xl relative">
      
        {user?.role === "user" && (
          <>
            <button
              onClick={() => navigate("/cart")}
              className="hover:text-gray-600"
            >
              <IoMdCart />
            </button>
            <button
              onClick={() => navigate("/allorders")}
              className="hover:text-gray-600"
            >
              <SlBag />
            </button>
          </>
        )}

      
        <div className="relative">
          <button className="hover:text-gray-600" onClick={toggleMenu}>
            <IoMdPerson />
          </button>

          {!isLoggedIn && menuOpen && (
            <div
              className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300"
              onMouseLeave={closeMenu}
            >
              <button
                onClick={() => {
                  navigate("/Userlogin");
                  closeMenu();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                User Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  closeMenu();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Signup
              </button>
              <button
                onClick={() => {
                  navigate("/admin");
                  closeMenu();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Admin Login
              </button>
            </div>
          )}
        </div>

       
        {(user?.role === "user" || admin?.role === "admin") && (
          <button
            onClick={handleLogout}
            className="text-sm bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>

    
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={toggleMobileMenu}
      >
        ☰
      </button>

 
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-lg flex flex-col items-start p-4 md:hidden">
          
          {user?.role === "user" && (
            <>
              <button
                onClick={() => {
                  navigate("/cart");
                  toggleMobileMenu();
                }}
                className="flex items-center gap-2 py-2 w-full text-left hover:bg-gray-100"
              >
                <IoMdCart /> Cart
              </button>
              <button
                onClick={() => {
                  navigate("/allorders");
                  toggleMobileMenu();
                }}
                className="flex items-center gap-2 py-2 w-full text-left hover:bg-gray-100"
              >
                <SlBag /> Orders
              </button>
            </>
          )}

         
          {!isLoggedIn && (
            <>
              <button
                onClick={() => {
                  navigate("/Userlogin");
                  toggleMobileMenu();
                }}
                className="py-2 w-full text-left hover:bg-gray-100"
              >
                User Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  toggleMobileMenu();
                }}
                className="py-2 w-full text-left hover:bg-gray-100"
              >
                Signup
              </button>
              <button
                onClick={() => {
                  navigate("/admin");
                  toggleMobileMenu();
                }}
                className="py-2 w-full text-left hover:bg-gray-100"
              >
                Admin Login
              </button>
            </>
          )}

   
          {(user?.role === "user" || admin?.role === "admin") && (
            <button
              onClick={() => {
                handleLogout();
                toggleMobileMenu();
              }}
              className="mt-2 bg-red-600 text-white w-full py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default HeaderBar2;
