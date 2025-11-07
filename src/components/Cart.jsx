import React, { useEffect, useState } from "react";
import API from "../api/api.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      console.log("🛒 Cart Data:", res.data.cart);
      setCartItems(res.data.cart?.items || []); 
      
    } catch (err) {
      console.error("Error fetching cart:", err);
      MySwal.fire({
        title: "Error",
        text: "Failed to load your cart. Please try again.",
        icon: "error",
      });
    }
  };

  const handleRemove = async (productId) => {
    const result = await MySwal.fire({
      title: "Remove Item?",
      text: "Are you sure you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await API.delete("/cart", { data: { productId } });
      setCartItems((prev) =>
        prev.filter((item) => item.productId?._id !== productId)
      );
      MySwal.fire({
        title: "Removed!",
        text: "Item removed from cart.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error deleting cart item:", err);
      MySwal.fire({
        title: "Error",
        text: "Could not remove item. Try again later.",
        icon: "error",
      });
    }
  };

  
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      return MySwal.fire({
        title: "Empty Cart",
        text: "You have no items in your cart to checkout.",
        icon: "info",
      });
    }

    const result = await MySwal.fire({
      title: "Proceed to Order?",
      text: "Do you want to place this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Place Order",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await API.post("/order");
      MySwal.fire({
        title: "Order Placed!",
        text: res.data.message || "Your order was successfully placed.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setCartItems([]); 
      navigate("/allorders"); 
    } catch (err) {
      console.error("Order placement failed:", err);
      MySwal.fire({
        title: "Error",
        text: "Failed to place order. Please try again later.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchCart();
    console.log(cartItems)
  }, []);

 
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6 ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 My Cart</h1>
    </div>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          
          <p className="text-gray-600 mt-4 text-lg">Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="flex items-center gap-4 py-2 px-4">
                    {item.productId?.ProductImage ? (
                      <img
                        src={`http://localhost:3000/uploads/${item.productId.ProductImage}`}
                        alt={item.productId?.name || "Product"}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                    <span className="font-medium text-gray-800">
                      {item.productId?.name || "Unknown Product"}
                    </span>
                  </td>

                  <td className="py-2 px-4">₹{item.price}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4 font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleRemove(item.productId?._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-semibold">
              Total:{" "}
              <span className="text-blue-700">
                ₹{totalPrice.toFixed(2)}
              </span>
            </h2>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Proceed to Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
