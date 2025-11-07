import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.jsx";
import watch1 from "../assets/imagesjs/watch1.jpg";
import Main from "../assets/imagesjs/Main.mp4";
import { MdWatch } from "react-icons/md";
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
    <div className="bg-black flex">
      <div className="flex-col w-full justify-between items-center">
    
        <div className="relative h-screen w-full overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={Main}
            autoPlay
            loop
            muted
            playsInline
          ></video>

          <div className="absolute inset-0 bg-black/40 z-0"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 text-white">
            <h1 className="text-5xl font-bold">MVMT</h1>
            <p className="text-lg mt-4">Time flows. Style stays.</p>
            <button className="border-2 rounded-4xl p-2 font-extrabold flex justify-center items-center"
            onClick={()=>navigate("/allproducts")}>
              Shop Now <MdWatch className="ml-2" />
            </button>
          </div>
        </div>

        <div className="w-full bg-white">
          <div className="w-full bg-gray-100 flex justify-center items-center gap-28 py-10">
            <img className="w-30 h-30" src={turck} alt="Truck" />
            <img className="w-30 h-30" src={year} alt="Year warranty" />
            <img className="w-30 h-30" src={parcel} alt="Parcel" />
          </div>

          <div className="p-4 md:p-10 bg-white">
            <div className="flex justify-between items-center mb-6">
               <h2 className="font-extrabold font-serif text-4xl opacity-70 mb-6">
              Shop By Categories
            </h2>
            <h2 className="hover:underline text-xl font-semibold" 
            onClick={()=>navigate("/allproducts")
            }>Show All </h2>
            </div>
           
            <div className="flex gap-6 overflow-x-auto scrollbar-hide no-scrollbar scroll-smooth pb-4">
              {categories.length === 0 ? (
                <p className="text-gray-500">No categories available.</p>
              ) : ( 
                categories.map((cat) => (
                  <div
                    key={cat._id}
                    className="relative w-[700px] h-[300px] rounded-xl overflow-hidden flex-shrink-0 group cursor-pointer"
                  >
                    <img
                      src={`http://localhost:3000/uploads/${cat.CategoryImage}`}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-5 left-5 text-white bg-black/30 px-3 py-2 rounded-lg">
                      <h2 className="text-xl font-semibold">{cat.name}</h2>
                      <button
                        onClick={() => navigate(`/category/${cat._id}`)}
                        className="text-sm border-b border-white hover:text-gray-300"
                      >
                        SHOP ALL 
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

<div className="flex justify-center my-10"> <img src={star} alt="Star design" /> </div>


          <div className="bg-[#f4efe9] text-[#1b1b1b] py-12 px-6 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
              <div>
                <h2 className="text-xl font-semibold mb-2">Get the Good Stuff</h2>
                <p className="text-sm text-gray-700 mb-4">
                  Increase savings to 30% off your first purchase and keep up with our
                  latest drops, special editions and members-only sales.
                </p>

                <div className="flex items-center bg-white rounded-full shadow-sm w-full max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-2 bg-transparent text-sm focus:outline-none"
                  />
                  <button className="bg-black text-white px-5 py-2 text-sm font-medium rounded-full hover:bg-gray-800 transition"
                  onClick={()=>navigate("/signup")}>
                    SIGN UP
                  </button>
                </div>

                <div className="flex items-center space-x-4 mt-5 text-lg text-gray-700">
                  <i className="fa-brands fa-facebook-f hover:text-black cursor-pointer"></i>
                  <i className="fa-brands fa-instagram hover:text-black cursor-pointer"></i>
                  <i className="fa-brands fa-youtube hover:text-black cursor-pointer"></i>
                  <i className="fa-brands fa-tiktok hover:text-black cursor-pointer"></i>
                </div>

                <div className="mt-5">
                  <select
                    className="bg-transparent border border-gray-400 text-sm px-3 py-1 rounded-md"
                    id="country"
                  >
                    <option>🇦🇱 ALBANIA</option>
                    <option>🇮🇳 INDIA</option>
                    <option>🇺🇸 USA</option>
                  </select>
                </div>
              </div>

      
              <div>
                <h3 className="font-semibold mb-3">Shop MVMT</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Shop Watches</li>
                  <li>Shop Eyewear</li>
                  <li>Shop Jewelry</li>
                  <li>Shop Insta</li>
                </ul>
              </div>

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

            <div className="border-t border-gray-400 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-600">
              <p>© 2025 MVMT</p>
              <div className="flex space-x-4 mt-2 md:mt-0">
                <span className="cursor-pointer hover:text-black">Terms & Conditions</span>
                <span className="cursor-pointer hover:text-black">Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBar;
