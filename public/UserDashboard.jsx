import React, { useEffect, useState } from "react";
import API from "../src/api/api.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UserDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  
  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        API.get("/get/Categoery"),
        API.get("/get/Products"), 
      ]);
      setCategories(catRes.data);
      setProducts(prodRes.data);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleAddToCart = async (productId) => {
    try {
      await API.post("/addCart", { productId, quantity: 1 }); 
      alert("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart!");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
  
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🛍️ Shop Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            🛒 Cart
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            📦 Orders
          </button>
        </div>
      </div>

    
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Categories</h2>
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white shadow rounded-lg p-4 w-56 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg">{cat.name}</h3>
              <p className="text-gray-600">{cat.description}</p>
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((prod) => (
            <div
              key={prod._id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg mb-2">{prod.name}</h3>
              <p className="text-gray-600 mb-2">{prod.description}</p>
              <p className="font-semibold text-gray-800 mb-3">₹{prod.price}</p>
              <button
                onClick={() => handleAddToCart(prod._id)}
                className="bg-blue-600 text-white px-3 py-2 rounded w-full hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
