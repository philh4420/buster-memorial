// ImageModal.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const ImageModal = ({ isOpen, onClose, imageSrc }) => {
  const [imageHeight, setImageHeight] = useState('auto');

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const imageElement = document.querySelector('.modal-image');
      if (imageElement) {
        const aspectRatio =
          imageElement.naturalWidth / imageElement.naturalHeight;
        const calculatedHeight = windowHeight - 40; // Adjust for padding and close button
        const calculatedWidth = calculatedHeight * aspectRatio;
        setImageHeight(`${calculatedHeight}px`);
        imageElement.style.width = `${calculatedWidth}px`;
      }
    };

    if (isOpen) {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <button onClick={onClose} className="modal-close-button">
        Close
      </button>
      <div className="modal-content">
        <img
          src={imageSrc}
          alt="Enlarged Image"
          className="modal-image"
          style={{ maxHeight: imageHeight }}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
