import { useState } from "react";
import { RESULTS_END_POINT } from "../utils/constants";
import { Info } from "lucide-react";

export function ResultForm() {
  const [formData, setFormData] = useState({
    name: "",
    teams: "",
    matchType: "General",
    winner: "",
    runner: "",
    manofthematch: "",
    category: "",
    hostelType: "National",
    runnerType: "National" 
  });
  const [winnerImage, setWinnerImage] = useState(null);
  const [runnerImage, setRunnerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


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

  const handleWinnerImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setWinnerImage(e.target.files[0]);
    }
  };

  const handleRunnerImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setRunnerImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");


    if (!formData.name || !formData.teams || !formData.winner || !formData.category || !formData.hostelType || !winnerImage) {
      setError("Please fill all required fields and upload winner image.");
      setLoading(false);
      return;
    }

    if (formData.matchType === "Finals" && (!formData.runner || !runnerImage || !formData.runnerType)) {
      setError("For Finals, runner, runner image, and runner type are required.");
      setLoading(false);
      return;
    }

    try {
      const resultFormData = new FormData();
      

      resultFormData.append("name", formData.name);
      resultFormData.append("teams", formData.teams);
      resultFormData.append("matchType", formData.matchType);
      resultFormData.append("winner", formData.winner);
      resultFormData.append("category", formData.category);
      resultFormData.append("hostelType", formData.hostelType);
      resultFormData.append("manofthematch", formData.manofthematch);
      

      if (winnerImage) {
        resultFormData.append("winner", winnerImage);
      }
      
      if (formData.matchType === "Finals") {
        resultFormData.append("runner", formData.runner);
        resultFormData.append("runnerType", formData.runnerType);
        
        if (runnerImage) {
          resultFormData.append("runner", runnerImage);
        }
      }

      const response = await fetch(`${RESULTS_END_POINT}/addResults`, {
        method: "POST",
        body: resultFormData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Result added successfully!");

        setFormData({
          name: "",
          teams: "",
          matchType: "General",
          winner: "",
          runner: "",
          manofthematch: "",
          category: "",
          hostelType: "National",
          runnerType: "National"
        });
        setWinnerImage(null);
        setRunnerImage(null);
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
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] md:max-h-[80vh] overflow-y-auto px-1 py-2">
      
      <div className="bg-gray-800/50 p-3 rounded-md mb-4 border-l-4 border-blue-500 flex items-start gap-2">
        <Info size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">
          Fields marked with an asterisk (*) are required. For finals matches, runner-up details are also required.
        </p>
      </div>

      
      <div className="grid md:grid-cols-2 gap-x-4 gap-y-3">
        <div className="md:col-span-2">
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

        <div className="md:col-span-2">
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
            Match Type*
          </label>
          <select
            name="matchType"
            value={formData.matchType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
            required
          >
            <option value="General">General</option>
            <option value="Finals">Finals</option>
          </select>
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

        
        <div className="md:col-span-2 pt-2 border-t border-gray-700">
          <h3 className="font-medium text-blue-400 mb-2">Winner Details</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Winner Hostel Type*
          </label>
          <select
            name="hostelType"
            value={formData.hostelType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
            required
          >
            <option value="National">National</option>
            <option value="International">International</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Winner*
          </label>
          <input
            type="text"
            name="winner"
            value={formData.winner}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
            placeholder="Winner"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Winner Image*
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleWinnerImageChange}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white text-sm file:mr-4 file:py-1 file:px-3
            file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-white
            hover:file:bg-gray-600"
            required
          />
        </div>

        
        {formData.matchType === "Finals" && (
          <>
            <div className="md:col-span-2 pt-2 border-t border-gray-700">
              <h3 className="font-medium text-green-400 mb-2">Runner-up Details</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Runner-up Hostel Type*
              </label>
              <select
                name="runnerType"
                value={formData.runnerType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                required
              >
                <option value="National">National</option>
                <option value="International">International</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Runner-up*
              </label>
              <input
                type="text"
                name="runner"
                value={formData.runner}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                placeholder="Runner-up"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Runner-up Image*
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleRunnerImageChange}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white text-sm file:mr-4 file:py-1 file:px-3
                file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-white
                hover:file:bg-gray-600"
                required
              />
            </div>
          </>
        )}

        
        <div className="md:col-span-2 pt-2 border-t border-gray-700">
          <h3 className="font-medium text-purple-400 mb-2">Additional Details</h3>
        </div>

        <div className="md:col-span-2">
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
      </div>

      
      {error && (
        <div className="p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200 text-sm mt-4">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-900/50 border border-green-700 rounded-md text-green-200 text-sm mt-4">
          {success}
        </div>
      )}

      
      <div className="flex justify-end pt-2 mt-4 border-t border-gray-700">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-md w-full md:w-auto ${
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