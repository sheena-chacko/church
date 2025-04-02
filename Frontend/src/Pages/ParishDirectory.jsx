import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { BASE_URL } from "../Utiles/Url";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaPlus, FaList, FaHome, FaHashtag } from "react-icons/fa";
import { getuserToken } from "../Utiles/storageHandler";

export const fetchMembers = async () => {
  const token = getuserToken()
  console.log(token);
  const response = await axios.get(`${BASE_URL}/parish-member/parish`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  return response.data;
};

const ParishDirectory = () => {
  const token = getuserToken()
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: members } = useQuery({
    queryKey: ["parish-members"],
    queryFn: fetchMembers,
  });

  console.log(members);
  
  const addMemberMutation = useMutation({
    mutationKey:['add-parish-member'],
    mutationFn: async (newMember) =>
      axios.post(`${BASE_URL}/parish-member`, newMember, {
        headers: { Authorization:`Bearer ${token}` },
      })
  })

  const formik = useFormik({
    initialValues: {
      fullName: "",
      dateOfBirth: "",
      relation: "Son", 
      location: "",
      houseName: "",
      houseNumber: ""
    },
    onSubmit: (values) => addMemberMutation.mutate(values),
  });

  console.log(addMemberMutation.data);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Parish Directory</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Full Name"
              {...formik.getFieldProps("fullName")}
              required
            />
          </div>

          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="date"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Date of Birth"
              {...formik.getFieldProps("dateOfBirth")}
              required
            />
          </div>

          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <select
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              {...formik.getFieldProps("relation")}
              required
            >
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Spouse">Spouse</option>
              <option value="Parent">Parent</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
            <select
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              {...formik.getFieldProps("location")}
              required
            >
              <option value="City A">City A</option>
              <option value="City B">City B</option>
              <option value="City C">City C</option>
            </select>
          </div> */}

          <div className="relative">
            <FaHome className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="House Name"
              {...formik.getFieldProps("houseName")}
              required
            />
          </div>

          <div className="relative">
            <FaHashtag className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="House Number"
              {...formik.getFieldProps("houseNumber")}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            <FaPlus /> Add Member
          </button>
        </form>

        <button
          onClick={() => navigate("/parish-list")}
          className="mt-5 w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          <FaList /> View Parish Members
        </button>
      </div>
    </div>
  );
};

export default ParishDirectory;