import React, { useEffect, useState } from "react";
import API from "../api/api.jsx";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    categoryImage: null,
  });
  const [editCategory, setEditCategory] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/admin/allCategoery");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!newCategory.name.trim() || !newCategory.description.trim()) {
      return alert("Please fill all fields!");
    }

    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("description", newCategory.description);
    if (newCategory.categoryImage)
      formData.append("file", newCategory.categoryImage);

    try {
      await API.post("/admin/add/Categoery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Category added successfully!");
      setNewCategory({ name: "", description: "", categoryImage: null });
      fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
      alert(err.response?.data?.message || "Error adding category");
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("_id", editCategory._id);
      formData.append("name", editCategory.name);
      formData.append("description", editCategory.description);
      if (editCategory.categoryImage) {
        formData.append("file", editCategory.categoryImage);
      }
      await API.put(`/admin/updateCategoery`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Category updated successfully!");
      setEditCategory(null);
      setNewImagePreview(null);
      fetchCategories();
    } catch (err) {
      console.error("Error updating category:", err);
      alert(err.response?.data?.message || "Error updating category");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await API.delete(`/admin/Delete/Categoery/${id}`);
      alert("Category deleted!");
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      alert(err.response?.data?.message || "Error deleting category");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Manage Categories
      </h1>

      <div className="flex gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="Category Name"
          className="border px-3 py-2 rounded w-1/4"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          className="border px-3 py-2 rounded w-1/3"
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
        />
        <input
          type="file"
          accept="image/*"
          className="border px-3 py-2 rounded"
          onChange={(e) =>
            setNewCategory({
              ...newCategory,
              categoryImage: e.target.files[0],
            })
          }
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <table className="min-w-full bg-white rounded shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="border-t">
              <td className="py-2 px-4">
                {editCategory?._id === cat._id ? (
                  <div className="flex flex-col items-start gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setEditCategory({ ...editCategory, categoryImage: file });
                        setNewImagePreview(URL.createObjectURL(file));
                      }}
                    />
                    {newImagePreview ? (
                      <img
                        src={newImagePreview}
                        alt="New Preview"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <img
                        src={`http://40.192.14.44/uploads/${cat.CategoryImage}`}
                        alt={cat.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </div>
                ) : cat.CategoryImage ? (
                  <img
                    src={`http://40.192.14.44/uploads/${cat.CategoryImage}`}
                    alt={cat.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </td>

              <td className="py-2 px-4">
                {editCategory?._id === cat._id ? (
                  <input
                    value={editCategory.name}
                    onChange={(e) =>
                      setEditCategory({ ...editCategory, name: e.target.value })
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  cat.name
                )}
              </td>

              <td className="py-2 px-4">
                {editCategory?._id === cat._id ? (
                  <input
                    value={editCategory.description}
                    onChange={(e) =>
                      setEditCategory({
                        ...editCategory,
                        description: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  cat.description
                )}
              </td>

              <td className="py-2 px-4 text-center space-x-3">
                {editCategory?._id === cat._id ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-3 py-1 rounded inline-flex items-center gap-1"
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      onClick={() => {
                        setEditCategory(null);
                        setNewImagePreview(null);
                      }}
                      className="bg-gray-500 text-white px-3 py-1 rounded inline-flex items-center gap-1"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditCategory(cat)}
                      className="text-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
