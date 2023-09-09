import React, { useEffect, useState } from 'react';
import './App.css';
import ImageModal from './ImageModal';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Initial page number
  const perPage = 27; // Number of images to load per page
  const totalImages = 207; // Total number of available images
  const imagesToLoad = perPage * page;

  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const loadMoreImages = () => {
      setLoading(true);
      const newImages = [];

      // Load images from the images folder based on the current page
      for (let i = images.length + 1; i <= imagesToLoad; i++) {
        if (i <= totalImages) {
          newImages.push(`images/buster (${i}).webp`);
        }
      }

      setImages((prevImages) => [...prevImages, ...newImages]);
      setLoading(false);
    };

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (images.length < totalImages) {
          setPage(page + 1); // Increment the page number
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    loadMoreImages();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [imagesToLoad, images.length, page, totalImages]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">In Loving Memory of Buster</h1>
        <p className="memorial-text">
          "In loving memory of our dear Buster, who brought endless joy and happiness into our lives. Buster was more
          than just a pet; he was a loyal companion, a source of comfort, and a true member of our family.</p>
        <p className="memorial-text">We will forever cherish the special moments we shared with him, from playful days in
          the park to quiet nights by the fireplace.{' '}. Buster's boundless energy, unwavering loyalty, and gentle nature
          touched the hearts of everyone he met.</p>
        <p className="memorial-text">His wagging tail and affectionate kisses brightened even the darkest days.
          Buster's memory will forever live on in our hearts. As we say goodbye to our beloved friend,
          we take solace in knowing that he is now resting peacefully.</p>
        <p className="memorial-text">R.I.P. Little Man." "Until we meet again, dear Buster."</p>
      </header>
      <div className="image-gallery">
        {images.map((image, index) => (
          <div
            className="image-container"
            key={index}
            onClick={() => openModal(image)}
          >
            <img src={image} alt={`Buster Memorial ${index + 1}`} />
          </div>
        ))}
        {loading && <p className="loading">Loading...</p>}
      </div>
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeModal}
          imageSrc={selectedImage}
        />
      )}
    </div>
  );
}

export default App;
