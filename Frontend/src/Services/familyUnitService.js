import axios from 'axios';
import { BASE_URL } from '../Utiles/Url'; // Update with your correct URL
import { getuserToken } from '../Utiles/storageHandler';

// Helper function to get the configuration with token
const getConfig = () => {
    const token = getuserToken(); // Retrieve user token from storage
    return { headers: { Authorization: `Bearer ${token}` } };
};

// Create a new family unit
export const createFamilyUnitAPI = async (familyUnitData) => {
    const response = await axios.post(`${BASE_URL}/family-unit/`, familyUnitData, getConfig());
    return response.data;
};

// Get a family unit by ID
export const getFamilyUnitByIdAPI = async (id) => {
    const response = await axios.get(`${BASE_URL}/family-units/${id}`, getConfig());
    return response.data;
};

// Get all family units
export const getAllFamilyUnitsAPI = async () => {
    const response = await axios.get(`${BASE_URL}/family-unit`, getConfig());
    return response.data;
};

// Update family unit details
export const updateFamilyUnitAPI = async (id, familyUnitData) => {
    const response = await axios.put(`${BASE_URL}/family-units/${id}`, familyUnitData, getConfig());
    return response.data;
};

// Delete a family unit
export const deleteFamilyUnitAPI = async (id) => {
    const response = await axios.delete(`${BASE_URL}/family-units/${id}`, getConfig());
    return response.data;
};

// Get users associated with a family unit
export const getUsersInFamilyUnitAPI = async (familyUnitId) => {
    const response = await axios.get(`${BASE_URL}/family-units/${familyUnitId}/users`, getConfig());
    return response.data;
};
