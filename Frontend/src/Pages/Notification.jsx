import React, { useEffect, useState } from 'react';
import { notificationService } from '../Services/notificationService';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

//   const fetchNotifications = async () => {
//     try {
//     //   const data = await notificationService.getNotifications();
//     const data = await notificationService.getUserNotifications();

//       setNotifications(data);
//     } catch (error) {
//       console.error("Fetch Notification Error:", error);
//     }
//   };


const fetchNotifications = async () => {
    try {
      const data = await notificationService.getUserNotifications();
      console.log("Fetched notification data:", data);
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Fetch Notification Error:", error);
    }
  };
  
  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      fetchNotifications();
    } catch (error) {
      console.error("Mark as Read Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">🔔 Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li
              key={note._id}
              className={`border p-4 rounded-lg ${note.read ? 'bg-gray-100' : 'bg-yellow-50'}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-800">{note.message}</p>
                  <p className="text-sm text-gray-500">{new Date(note.createdAt).toLocaleString()}</p>
                </div>
                {!note.read && (
                  <button
                    onClick={() => handleMarkAsRead(note._id)}
                    className="ml-4 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
