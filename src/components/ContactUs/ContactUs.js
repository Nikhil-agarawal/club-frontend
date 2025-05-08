import React, { useState, useEffect } from 'react';
import './ContactUs.css';
import Card from '../Card/Card';
import { facultyMembers, conveners } from '../../Data/data';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ContactUs = () => {
  const [currentFacultyIndex, setCurrentFacultyIndex] = useState(0);
  const [currentConvenerIndex, setCurrentConvenerIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const cardsPerPage = 4;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextFaculty = () => {
    setCurrentFacultyIndex((prev) =>
      (prev + cardsPerPage) % facultyMembers.length
    );
  };

  const prevFaculty = () => {
    setCurrentFacultyIndex((prev) =>
      (prev - cardsPerPage + facultyMembers.length) % facultyMembers.length
    );
  };

  const nextConvener = () => {
    setCurrentConvenerIndex((prev) =>
      (prev + cardsPerPage) % conveners.length
    );
  };

  const prevConvener = () => {
    setCurrentConvenerIndex((prev) =>
      (prev - cardsPerPage + conveners.length) % conveners.length
    );
  };

  const visibleFaculty = isMobile
    ? facultyMembers
    : facultyMembers.slice(
        currentFacultyIndex,
        currentFacultyIndex + cardsPerPage
      );

  const visibleConveners = isMobile
    ? conveners
    : conveners.slice(
        currentConvenerIndex,
        currentConvenerIndex + cardsPerPage
      );

  return (
    <div className="contact-us-container">
      <main className="main-content">
        <div className="team-section">
          <h2 className="section-subtitle">Faculty Incharge of Council</h2>
          <div className="team-grid-container">
            {!isMobile && (
              <button className="nav-arrow left" onClick={prevFaculty}>
                <FaChevronLeft />
              </button>
            )}
            <div className="team-grid">
              {visibleFaculty.map((faculty, idx) => (
                <Card key={idx} member={faculty} type="faculty" />
              ))}
            </div>
            {!isMobile && (
              <button className="nav-arrow right" onClick={nextFaculty}>
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>

        <div className="team-section">
          <h2 className="section-subtitle">Conveners</h2>
          <div className="team-grid-container">
            {!isMobile && (
              <button className="nav-arrow left" onClick={prevConvener}>
                <FaChevronLeft />
              </button>
            )}
            <div className="team-grid">
              {visibleConveners.map((convener, idx) => (
                <Card key={idx} member={convener} type="convener" />
              ))}
            </div>
            {!isMobile && (
              <button className="nav-arrow right" onClick={nextConvener}>
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>

        <div className="location-section">
          <h2 className="section-subtitle">Where to find us?</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6914.337500690782!2d76.8114186926715!3d29.945824349893147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e3f51bab18cb5%3A0x96200205143e35f6!2sNIT%2C%20Thanesar%2C%20Haryana%20136119!5e0!3m2!1sen!2sin!4v1745345632860!5m2!1sen!2sin"
              className="map-iframe"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NIT Kurukshetra Location"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
