import React, { useEffect, useState } from "react";
import API from "../api/api.jsx";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    ProductImage: null,
  });
  const [editProduct, setEditProduct] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/admin/allproducts");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/admin/allCategoery");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (
      !newProduct.name.trim() ||
      !newProduct.description.trim() ||
      !newProduct.price ||
      !newProduct.category
    ) {
      return alert("Please fill all fields!");
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("categoryId", newProduct.category);
    if (newProduct.ProductImage) {
      formData.append("file", newProduct.ProductImage);
    }

    try {
      await API.post("/admin/add/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        ProductImage: null,
      });
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      alert(err.response?.data?.message || "Error adding product");
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("_id", editProduct._id);
      formData.append("name", editProduct.name);
      formData.append("description", editProduct.description);
      formData.append("price", editProduct.price);
      formData.append("categoryId", editProduct.category?._id || editProduct.category);
      if (editProduct.ProductImage) {
        formData.append("file", editProduct.ProductImage);
      }

      await API.put("/admin/update/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
      setEditProduct(null);
      setNewImagePreview(null);
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
      alert(err.response?.data?.message || "Error updating product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/admin/delete/${id}`);
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Error deleting product");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Products</h1>
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="Product Name"
          className="border px-3 py-2 rounded w-1/5"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          className="border px-3 py-2 rounded w-1/4"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          className="border px-3 py-2 rounded w-1/6"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <select
          className="border px-3 py-2 rounded w-1/6 bg-white"
          value={newProduct.category || ""}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewProduct({ ...newProduct, ProductImage: e.target.files[0] })
          }
          className="border px-3 py-2 rounded w-1/6"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      <table className="min-w-full bg-white rounded shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">
                {editProduct?._id === p._id ? (
                  <div className="flex flex-col items-start gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setEditProduct({ ...editProduct, ProductImage: file });
                        setNewImagePreview(URL.createObjectURL(file));
                      }}
                    />
                    {newImagePreview ? (
                      <img
                        src={newImagePreview}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <img
                        src={`http://40.192.14.44/uploads/${p.ProductImage}`}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </div>
                ) : p.ProductImage ? (
                  <img
                    src={`http://40.192.14.44/uploads/${p.ProductImage}`}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </td>
              {editProduct?._id === p._id ? (
                <>
                  <td className="py-2 px-4">
                    <input
                      value={editProduct.name}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          name: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      value={editProduct.description}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          description: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={editProduct.price}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          price: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <select
                      value={editProduct.category?._id || editProduct.category}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          category: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded w-full"
                    >
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-4 text-center space-x-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => {
                        setEditProduct(null);
                        setNewImagePreview(null);
                      }}
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4">{p.name}</td>
                  <td className="py-2 px-4">{p.description}</td>
                  <td className="py-2 px-4">₹{p.price}</td>
                  <td className="py-2 px-4">{p.category?.name}</td>
                  <td className="py-2 px-4 text-center space-x-3">
                    <button
                      onClick={() => setEditProduct(p)}
                      className="text-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
