// src/Services/notificationService.js
import axios from 'axios';

const BASE_URL = '/api/notifications';

const getAuthConfig = () => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const notificationService = {
  getUserNotifications: async () => {
    const res = await axios.get(`${BASE_URL}/user`, getAuthConfig());
    return res.data;
  },

  markAsRead: async (notificationId) => {
    const res = await axios.put(`${BASE_URL}/read/${notificationId}`, {}, getAuthConfig());
    return res.data;
  },

  markAllAsRead: async () => {
    const res = await axios.put(`${BASE_URL}/read-all`, {}, getAuthConfig());
    return res.data;
  },
};
