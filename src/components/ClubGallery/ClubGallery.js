// src/components/ClubGallery/ClubGallery.jsx
import React, { useState } from 'react';
import './ClubGallery.css';

const ClubGallery = ({ currentClubId, clubs }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const currentClub = clubs.find(club => club.id === currentClubId);
  
  if (!currentClub) return null;

  // Extract valid image URLs from current club
  const clubImages = [
    currentClub.img1, currentClub.img2, currentClub.img3,
    currentClub.img4, currentClub.img5, currentClub.img6
  ].filter(Boolean);

  const totalSlides = Math.ceil(clubImages.length / 3);

  const handlePrevSlide = () => {
    setActiveSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section className="club-gallery">
      <div className="club-gallery__container">
        <h3 className="club-gallery__heading">Gallery</h3>
        <div className="club-gallery__carousel">
          <div className="club-gallery__carousel-inner" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div 
                key={slideIndex}
                className={`club-gallery__slide ${slideIndex === activeSlide ? 'active' : ''}`}
              >
                <div className="club-gallery__grid">
                  {clubImages.slice(slideIndex * 3, slideIndex * 3 + 3).map((img, index) => (
                    <div key={index} className="club-gallery__item">
                      <div className="club-gallery__image-container">
                        <img src={img} alt={`Gallery ${index + 1}`} className="club-gallery__image" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {totalSlides > 1 && (
            <>
              <button className="club-gallery__control club-gallery__control--prev" onClick={handlePrevSlide}>
                &lt;
              </button>
              <button className="club-gallery__control club-gallery__control--next" onClick={handleNextSlide}>
                &gt;
              </button>
            </>
          )}
        </div>

        <div className="club-gallery__indicators">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`club-gallery__indicator ${index === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubGallery;
