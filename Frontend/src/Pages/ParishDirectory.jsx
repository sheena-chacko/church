import React, { useState } from "react";
import axios from "axios";
import { getuserToken, getDecodeData } from "../Utiles/storageHandler"; // Ensure correct import
import { BASE_URL } from "../Utiles/Url";

const ParishDirectory = () => {
    const [formData, setFormData] = useState({
        name: "",
        relation: "",
        occupation: "",
        contactNumber: "",
        dateOfBirth: "",
        familyUnitCode: "",
        uniqueFamilyCode: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const token = getuserToken();
        const userData = getDecodeData(); // Decode JWT to get user role

        console.log("Retrieved Token:", token);
        console.log("Decoded User Data:", userData);

        if (!token) {
            setError("Unauthorized: Only verified users can add family members.");
            setLoading(false);
            return;
        }

        // Check if the role is either "Admin" or "Vicar"
        const userRole = userData?.role?.toLowerCase(); // Convert to lowercase for consistency
        if (userRole !== "admin" && userRole !== "vicar") {
            setError("Unauthorized: You do not have permission to add a family member.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/family`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Response Data:", response.data);

            setSuccess("Family member added successfully!");
            setFormData({
                name: "",
                relation: "",
                occupation: "",
                contactNumber: "",
                dateOfBirth: "",
                familyUnitCode: "",
                uniqueFamilyCode: "",
            });
        } catch (err) {
            console.error("Error adding family member:", err.response);
            setError(err.response?.data?.message || "Failed to add family member.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                Add Family Member
            </h2>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "relation", "occupation", "contactNumber", "dateOfBirth", "familyUnitCode", "uniqueFamilyCode"].map((field, index) => (
                    <div key={index}>
                        <label className="block text-gray-700 font-semibold">{field.replace(/([A-Z])/g, " $1").trim()}</label>
                        <input
                            type={field === "dateOfBirth" ? "date" : "text"}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required={field !== "occupation"}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Add Member"}
                </button>
            </form>
        </div>
    );
};

export default ParishDirectory;
