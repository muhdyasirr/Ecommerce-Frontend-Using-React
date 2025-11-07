import React, { useEffect, useState } from "react";
import API from "../api/api.jsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/allorders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load your orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (id) => {
    try {
      const result = await MySwal.fire({
        title: "Confirm Order?",
        text: "Do you want to place this order?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, place it!",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#2563eb",
      });

      if (result.isConfirmed) {
        const res = await API.get(`/allorders`);
        MySwal.fire({
          title: "Order Placed!",
          text: res.data.message || "Your order was created successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchOrders();
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      MySwal.fire({
        title: "Error",
        text: "Failed to place order. Please try again.",
        icon: "error",
      });
    }
  };

  const handleCancelOrder = async (id) => {
    try {
  
      const result = await MySwal.fire({
        title: "Cancel Order?",
        text: "Do you really want to cancel this order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it",
        cancelButtonText: "No, keep it",
        confirmButtonColor: "#dc2626",
      });
 console.log("one");
 
      if (result.isConfirmed) {
        const res =await API.delete(`/order/${id}`)
        MySwal.fire({
          title: "Order Cancelled",
          text: res.data.message || "Your order has been cancelled.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchOrders();
        console.log("hello");
        
      }
    } catch (error) {
      console.error("Cancel order failed:", error);
      MySwal.fire({
        title: "Error",
        text: "Failed to cancel order. Please try again.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
             
              <div className="flex justify-between items-center border-b pb-3 mb-3">
                <div>
                  <p className="text-gray-800 font-semibold">
                    Order ID: <span className="text-gray-600">{order._id}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Ordered on: {new Date(order.orderDate).toLocaleDateString()}{" "}
                    • {new Date(order.orderDate).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                  {order.status !== "Cancelled" &&
                    order.status !== "Delivered" && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="text-red-600 text-sm font-semibold hover:underline"
                      >
                        Cancel Order
                      </button>
                    )}
                </div>
              </div>

       
              <div className="divide-y">
                {order.items.map((item) =>{

                  console.log(item)
                
                return(
                  <div
                    key={item._id}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`http://localhost:3000/uploads/${item.productId.ProductImage}`}
                        alt={item.productId?.name || "Product"}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.productId?.name || "Unknown Product"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-800 font-medium">
                        ₹{item.productId?.price || 0}
                      </p>
                    </div>
                  </div>
                )})}
              </div>

              {/* Order Summary */}
              <div className="border-t mt-3 pt-3 flex justify-between items-center">
                <p className="font-semibold text-gray-700">
                  Total Amount:{" "}
                  <span className="text-lg text-blue-700">
                    ₹{order.totalAmount}
                  </span>
                </p>
                <p className="text-gray-500 text-sm">
                  {order.items.length} item
                  {order.items.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
