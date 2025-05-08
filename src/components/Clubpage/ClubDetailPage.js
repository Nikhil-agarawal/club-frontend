// src/components/ClubDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { clubData } from "../../Data/data";
import "./ClubDetailPage.css";
import ClubGallery from "../ClubGallery/ClubGallery"; // Import the ClubGallery component
import ClubForm from "../ClubForm/ClubForm";

const ClubDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // ⬅ Scroll to top after component mounts
  }, []);
  const { clubId } = useParams();
  const club = clubData.find((c) => c.id === parseInt(clubId));
  const [showForm, setShowForm] = useState(false);

  if (!club) {
    return (
      <div className="club-detail-page">
        <div className="club-not-found">
          <h2>Club not found</h2>
          <Link to="/clubs">Back to Clubs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="club-detail-page">
      <div className="club-detail-container">
        <div className="club-detail-header">
          <div className="club-detail-logo">
            <img src={club.logoUrl} alt={`${club.name} logo`} />
          </div>
          <div className="club-detail-title">
            <h2>{club.name}</h2>
            <p className="club-tagline">{club.description}</p>
          </div>
        </div>

        <div className="club-detail-body">
          <div className="club-about-section">
            <h3>About Us</h3>
            <p>{club.fullDescription}</p>
          </div>

          <div className="club-events-section">
            <h3>Events Conducted</h3>
            <ul className="event-list">
              {club.events.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Add the ClubGallery component */}
      <ClubGallery currentClubId={parseInt(clubId)} clubs={clubData} />

      <div className="button-container">
        <Link to="/clubs" className="back-button">
          Back to Clubs
        </Link>
        <button className="contact-us-btn" onClick={() => setShowForm(true)}>
          Contact Us
        </button>
      </div>

      {/* Add the form popup */}
      {showForm && (
        <div className="form-popup-overlay">
          <div className="form-popup">
            <button className="close-btn" onClick={() => setShowForm(false)}>
              ×
            </button>
            <ClubForm onClose={() => setShowForm(false)} clubName={club.name} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubDetailPage;
