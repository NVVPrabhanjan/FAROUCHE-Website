import { useState } from "react";
import { RESULTS_END_POINT } from "../utils/constants";

export function ResultForm() {
  const [formData, setFormData] = useState({
    name: "",
    teams: "",
    win: "",
    manofthematch: "",
    category: ""
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // List of sports categories
  const categories = [
    "Badminton",
    "Table Tennis",
    "E Sports",
    "Lagori",
    "Arm Wrestling",
    "Carrom",
    "Tug Of War",
    "Basket Ball",
    "Throw Ball",
    "Foot Ball",
    "Volley Ball",
    "Cricket",
    "Chess",
    "Others"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate form
    if (!formData.name || !formData.teams || !formData.win || !formData.category || !image) {
      setError("Please fill all required fields and upload an image.");
      setLoading(false);
      return;
    }

    try {
      const resultFormData = new FormData();
      resultFormData.append("name", formData.name);
      resultFormData.append("teams", formData.teams);
      resultFormData.append("win", formData.win);
      resultFormData.append("manofthematch", formData.manofthematch);
      resultFormData.append("category", formData.category);
      resultFormData.append("image", image);

      const response = await fetch(`${RESULTS_END_POINT}/addResults`, {
        method: "POST",
        body: resultFormData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Result added successfully!");
        // Reset form
        setFormData({
          name: "",
          teams: "",
          win: "",
          manofthematch: "",
          category: ""
        });
        setImage(null);
        
        // Refresh the results list if needed
        // This assumes you have a parent component function to refresh the list
        // if (props.onResultAdded) {
        //   props.onResultAdded();
        // }
      } else {
        setError(data.message || "Failed to add result.");
      }
    } catch (err) {
      setError("Error submitting form. Please try again.");
      console.error("Error adding result:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Event Name*
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
          placeholder="Event Name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Teams/Participants*
        </label>
        <input
          type="text"
          name="teams"
          value={formData.teams}
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
          placeholder="Teams or Participants"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Winner*
        </label>
        <input
          type="text"
          name="win"
          value={formData.win}
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
          placeholder="Winner"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Man of the Match
        </label>
        <input
          type="text"
          name="manofthematch"
          value={formData.manofthematch}
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
          placeholder="Man of the Match (if applicable)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Category*
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
          required
        >
          <option value="" disabled>Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Event Image*
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
          required
        />
        <p className="text-xs text-gray-400 mt-1">
          Please upload an image related to the event
        </p>
      </div>

      {error && (
        <div className="p-2 bg-red-900/50 border border-red-700 rounded-md text-red-200 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-2 bg-green-900/50 border border-green-700 rounded-md text-green-200 text-sm">
          {success}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-md ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          {loading ? "Adding..." : "Add Result"}
        </button>
      </div>
    </form>
  );
}