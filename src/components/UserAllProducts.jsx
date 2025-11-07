
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api.jsx";
import  {useNavigate}  from "react-router-dom";
import Swal from "sweetalert2";

import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UserAllProducts = () => {
 const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get(`/allproducts`);
       
        setProducts(res.data || []);
        setCategory(res.data.categoryName || "Category");
      } catch (err) {
        console.error("Error fetching products by category:", err);
      }
    };
    fetchProducts();
  }, [id]);
  const addCart = async(_id)=>{
      try {


      await API.post(`/cart`,{productId:_id,quantity:1})
      MySwal.fire({
  title: "Success!",
  text: "Product added to cart!",
  icon: "success",
  confirmButtonText: "OK",
});
      
    } catch (err) {
      console.error("Error adding cart", err);
      alert(err.response?.data?.message || "Error adding cart");
    }
  }

const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        All Products
      </h1>
      {products.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={`http://localhost:3000/uploads/${p.ProductImage}`}
                alt={p.name}
                className="h-60 w-full object-cover"
              />
              <div className="p-4 flex justify-between">
                <div>
                    <h2 className="text-xl font-semibold">{p.name}</h2>
                   <p className="text-gray-600">{p.description}</p>
                   <p className="text-lg font-bold mt-2">₹{p.price}</p>
                </div>
                <div className="flex items-baseline-last">
               {user?.role === "user" ? (
  <button
    onClick={() => addCart(p._id)}
    className="bg-black text-white font-bold p-1 rounded-3xl opacity-85 hover:opacity-100 transition"
  >
    Add to Cart
  </button>
) : (
 <> <button
    onClick={() =>
       navigate("/Userlogin")}
    className="bg-black text-white font-bold p-1 rounded-3xl opacity-85 hover:opacity-100 transition"
  >
    Add to Cart
  </button></>
)}

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAllProducts;
