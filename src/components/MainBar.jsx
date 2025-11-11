import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.jsx";
import { MdWatch } from "react-icons/md";

import Main from "../assets/imagesjs/Main.mp4";
import turck from "../assets/imagesjs/turck.webp";
import year from "../assets/imagesjs/year.webp";
import parcel from "../assets/imagesjs/parcel.webp";
import star from "../assets/imagesjs/star.webp";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const MainBar = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/admin/allCategoery");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-black flex flex-col w-full min-h-screen">
      {/* HERO SECTION */}
      <div className="relative h-[80vh] sm:h-screen w-full overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={Main}
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">MVMT</h1>
          <p className="text-base sm:text-lg mt-3">Time flows. Style stays.</p>
          <button
            className="mt-5 border-2 rounded-full px-5 py-2 text-sm sm:text-base font-extrabold flex items-center justify-center hover:bg-white hover:text-black transition"
            onClick={() => navigate("/allproducts")}
          >
            Shop Now <MdWatch className="ml-2" />
          </button>
        </div>
      </div>

      {/* ICON STRIP */}
      <div className="w-full bg-gray-100 flex justify-center items-center flex-wrap gap-6 sm:gap-10 md:gap-16 py-6 px-3">
        <img
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
          src={turck}
          alt="Truck"
        />
        <img
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
          src={year}
          alt="Year Warranty"
        />
        <img
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
          src={parcel}
          alt="Parcel"
        />
      </div>

      {/* CATEGORY SECTION */}
      <div className="p-4 sm:p-6 md:p-10 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-center sm:text-left">
          <h2 className="font-extrabold font-serif text-3xl sm:text-4xl opacity-80 mb-4 sm:mb-0">
            Shop By Categories
          </h2>
          <h2
            className="hover:underline text-lg sm:text-xl font-semibold cursor-pointer"
            onClick={() => navigate("/allproducts")}
          >
            Show All
          </h2>
        </div>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide no-scrollbar scroll-smooth pb-4">
          {categories.length === 0 ? (
            <p className="text-gray-500 text-center w-full">
              No categories available.
            </p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat._id}
                className="relative w-[250px] sm:w-[350px] md:w-[500px] lg:w-[700px] h-[200px] sm:h-[250px] md:h-[300px] rounded-xl overflow-hidden flex-shrink-0 group cursor-pointer"
              >
                <img
                  src={`http://40.192.14.44/uploads/${cat.CategoryImage}`}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 text-white bg-black/30 px-3 py-2 rounded-lg">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold">
                    {cat.name}
                  </h2>
                  <button
                    onClick={() => navigate(`/category/${cat._id}`)}
                    className="text-xs sm:text-sm border-b border-white hover:text-gray-300"
                  >
                    SHOP ALL
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* STAR DIVIDER */}
      <div className="flex justify-center my-10">
        <img className="w-32 sm:w-40 md:w-56" src={star} alt="Star design" />
      </div>

      {/* FOOTER SECTION */}
      <div className="bg-[#f4efe9] text-[#1b1b1b] py-10 px-6 sm:px-10 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* 1️⃣ Newsletter Section */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Get the Good Stuff
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Save up to 30% on your first purchase and keep up with our latest
              drops, special editions, and members-only sales.
            </p>

            <div className="flex items-center bg-white rounded-full shadow-sm w-full max-w-xs">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-sm bg-transparent focus:outline-none"
              />
              <button
                className="bg-black text-white px-4 sm:px-5 py-2 text-sm rounded-full hover:bg-gray-800 transition"
                onClick={() => navigate("/signup")}
              >
                SIGN UP
              </button>
            </div>

            <div className="flex items-center space-x-4 mt-5 text-lg text-gray-700 justify-center sm:justify-start">
              <i className="fa-brands fa-facebook-f hover:text-black cursor-pointer"></i>
              <i className="fa-brands fa-instagram hover:text-black cursor-pointer"></i>
              <i className="fa-brands fa-youtube hover:text-black cursor-pointer"></i>
              <i className="fa-brands fa-tiktok hover:text-black cursor-pointer"></i>
            </div>

            <div className="mt-5">
              <select className="bg-transparent border border-gray-400 text-sm px-3 py-1 rounded-md">
                <option>🇦🇱 ALBANIA</option>
                <option>🇮🇳 INDIA</option>
                <option>🇺🇸 USA</option>
              </select>
            </div>
          </div>

          {/* 2️⃣ Shop MVMT */}
          <div>
            <h3 className="font-semibold mb-3">Shop MVMT</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Shop Watches</li>
              <li>Shop Eyewear</li>
              <li>Shop Jewelry</li>
              <li>Shop Insta</li>
            </ul>
          </div>

          {/* 3️⃣ Customer Service */}
          <div>
            <h3 className="font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Accessibility Statement</li>
              <li>My Account</li>
              <li>Contact Us</li>
              <li>Shipping & Returns</li>
              <li>FAQ</li>
              <li>Store Locator</li>
              <li>Site Map</li>
            </ul>
          </div>

          {/* 4️⃣ Info Section */}
          <div>
            <h3 className="font-semibold mb-3">#jointhemvmt</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Our Story</li>
              <li>Our Blog</li>
              <li>Ambassadors & Affiliates</li>
              <li>US Privacy</li>
              <li>Cookies Settings</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-400 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 text-center md:text-left">
          <p>© 2025 MVMT</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <span className="cursor-pointer hover:text-black">
              Terms & Conditions
            </span>
            <span className="cursor-pointer hover:text-black">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBar;
