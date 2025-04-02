import React, { useState } from "react";

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleMediaClick = (mediaSrc) => {
    setSelectedMedia(mediaSrc);
  };

  const handleClose = () => {
    setSelectedMedia(null);
  };

  const mediaItems = [
    { type: 'image', src: '/rr.jpg' },
    { type: 'video', src: '/perunal.mp4' },
    { type: 'image', src: '/ee.jpg' },
    { type: 'video', src: '/thirunal.mp4' },
    { type: 'image', src: '/photoo.jpg' },
    { type: 'video', src: '/video6.mp4' },
    { type: 'video', src: '/video4.mp4' },
    { type: 'video', src: '/video5.mp4' },
    { type: 'video', src: '/video7.mp4' },
    { type: 'video', src: '/video8.mp4' }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Church Gallery</h1>
      <div className="masonry sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {mediaItems.map((item, index) => (
          item.type === 'image' ? (
            <img 
              key={index} 
              src={item.src} 
              alt="Gallery Image" 
              className="rounded-lg shadow-lg cursor-pointer w-full mb-4 break-inside-avoid" 
            />
          ) : (
            <video 
              key={index} 
              onClick={() => handleMediaClick(item.src)} 
              autoPlay loop muted 
              className="rounded-lg shadow-lg cursor-pointer w-full mb-4 break-inside-avoid"
            >
              <source src={item.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        ))}
      </div>

      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleClose}>
          {selectedMedia.endsWith('.mp4') ? (
            <video src={selectedMedia} controls autoPlay className="rounded-lg shadow-lg w-3/4 max-w-4xl" />
          ) : (
            <img src={selectedMedia} className="rounded-lg shadow-lg w-3/4 max-w-4xl" alt="Full View" />
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
