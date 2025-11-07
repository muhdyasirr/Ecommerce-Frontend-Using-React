
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Admin components
import Dashboard from "./components/Dashboard.jsx";
import Categories from "./components/Categories.jsx";
import Products from "./components/Products.jsx";
import Users from "./components/Users.jsx";
import Stock from "./components/Stock.jsx";

// User components
import Cart from "./components/Cart.jsx";
import Orders from "./components/Orders.jsx";

// Home Page
import MainBar from "./components/MainBar.jsx";
import Headerbar from "./components/HeaderBar.jsx";
import HeaderBar2 from "./components/HeaderBar2.jsx";
import Signup from "./components/Signup.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import UserLogin from "./components/UserLogin.jsx";
import AlLUsers from "./components/AlLUsers.jsx";
import CategoryPage from "./components/CategoryPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UserAllProducts from "./components/UserAllProducts.jsx";

const App = () => {
  return (
    <div>
      <div className="flex flex-col   ">
        <Headerbar />
        <HeaderBar2 />
      </div>

      <Routes>
        <Route path="/" element={<MainBar />} />
        <Route path="/category/:id" element={<CategoryPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />

        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/allUsers" element={<AlLUsers />} />
        <Route path="/stock" element={<Stock />} />

        {/* User Routes */}
        <Route path="/Userlogin" element={<UserLogin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/allorders" element={<Orders />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allproducts" element={<UserAllProducts />} />
      </Routes>
    </div>
  );
};

export default App;
