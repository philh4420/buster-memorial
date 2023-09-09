import React from 'react';

function ImageGallery({ folder }) {
  console.log('Folder Prop:', folder); // Check if folder prop is correct
  return (
    <div className="image-gallery">
      {Array.from({ length: 4 }, (_, index) => {
        const imageUrl = `/images/${folder}/buster (${
          index + 1
        }).webp`;
        console.log('Image URL:', imageUrl); // Log the image URLs
        return (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index + 1}`}
          />
        );
      })}
    </div>
  );
}

export default ImageGallery; 
