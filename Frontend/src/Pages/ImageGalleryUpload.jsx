import React, { useState } from "react";

const ImageGalleryUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Convert files to URL for preview
    const imagePreviews = files.map((file) => ({
      id: URL.createObjectURL(file), // Unique URL for preview
      file,
    }));

    setSelectedImages([...selectedImages, ...imagePreviews]);
  };

  // Remove an image from selection
  const handleRemoveImage = (id) => {
    setSelectedImages(selectedImages.filter((image) => image.id !== id));
  };

  // Handle form submission (placeholder for backend integration)
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Images uploaded successfully! (Backend integration needed)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          📸 Upload Images to Gallery
        </h2>

        {/* Image Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-gray-700 font-medium">
            Select images:
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />

          {/* Image Preview Section */}
          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {selectedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.id}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg shadow-md border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            🚀 Upload Images
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageGalleryUpload;
