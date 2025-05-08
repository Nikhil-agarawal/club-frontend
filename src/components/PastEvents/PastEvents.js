import React, { useState, useEffect, useRef } from 'react';
import { pastEvents } from '../../Data/data';
import './PastEvents.css';

const PastEvents = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEntrance, setShowEntrance] = useState(true);
  const [clickedImage, setClickedImage] = useState(null);
  const modalRef = useRef(null);
  const images = Object.values(pastEvents.pastImages);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const entranceTimer = setTimeout(() => {
      setShowEntrance(false);
    }, 2500);
    return () => clearTimeout(entranceTimer);
  }, []);

  const handleImageClick = (index, event) => {
    const clickedElement = event.currentTarget;
    const rect = clickedElement.getBoundingClientRect();
    setClickedImage({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    });
    setActiveIndex(index);
    setShowModal(true);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setClickedImage(null);
  };

  const handleKeyDown = (e) => {
    if (showModal) {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        handleCloseModal();
      }
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(images[activeIndex]);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `event-image-${activeIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  return (
    <div className={`past-events ${showEntrance ? 'entrance' : ''}`}>
      <h2 className={`past-events__title ${showEntrance ? 'entrance' : ''}`}>
        Our Gallery
      </h2>
      <div className="past-events__grid">
        {images.map((image, index) => (
          <div
            key={index}
            className={`past-events__item ${index === activeIndex ? 'active' : ''} ${
              isLoading ? 'loading' : ''
            }`}
            onClick={(e) => handleImageClick(index, e)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="past-events__image-wrapper">
              <img
                src={image}
                alt={`Gallery item ${index + 1}`}
                className="past-events__image"
                loading="lazy"
              />
              <div className="past-events__overlay">
                <span className="past-events__view-text">View</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="past-events__modal-overlay active" onClick={handleCloseModal}>
          <div className="past-events__modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <div className="past-events__modal-image-container">
              <img
                src={images[activeIndex]}
                alt={`Event ${activeIndex + 1}`}
                className="past-events__modal-image"
                style={{
                  transform: clickedImage ? 'scale(1)' : 'scale(0.8)',
                  transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              />
              <button className="past-events__nav-button past-events__nav-button--prev" onClick={handlePrev}>
                ←
              </button>
              <button className="past-events__nav-button past-events__nav-button--next" onClick={handleNext}>
                →
              </button>
            </div>
            <button className="past-events__download-button" onClick={handleDownload}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastEvents;
