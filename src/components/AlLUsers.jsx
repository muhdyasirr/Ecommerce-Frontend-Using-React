import React, { useEffect, useState } from "react";
import API from "../api/api.jsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    
    try {
      const res = await API.get("/admin/allUsers");
      console.log(res.data);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };


  const toggleActive = async (userId, currentStatus) => {
    try {
      const res = await API.put(`/admin/user/${userId}`, {
        status: currentStatus == "active" ? "inactive" : "active",
      });

      
      const updatedUser = res.data.user || res.data;
      
      console.log(updatedUser)
      setUsers((prev) => prev.map((u) => (u._id === userId ? updatedUser : u)));
    } catch (err) {
      console.error(err);
      alert("Error updating user status");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border border-gray-200 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>

            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && !loading && (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No users found
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>

              <td className="p-2 border">
               {user.status}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => toggleActive(user._id, user.status)}
                  className={`px-3 py-1 rounded text-white ${
                    user.status === "active" ? "bg-red-600" : "bg-green-600"
                  }`}
                >
                  {user.status == "active" ? "Inactive" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
