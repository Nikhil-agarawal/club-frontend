import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "./Clubpage.css";
import { clubData } from '../../Data/data';


const Clubpage = () => {
  
  return (
    <div className="clubpage-container">
      <div className="clubpage-header">
        <h1>Clubs</h1>
      </div>

      <div className="club-grid">
        {clubData.map((club) => (
          <Link to={`/clubs/${club.id}`} key={club.id} className="club-card">
            <div className="club-logo-container">
              <img
                src={club.logoUrl}
                alt={`${club.name} logo`}
                className="club-logo"
              />
            </div>
            <div className="club-card-content">
              <h2 className="club-name">{club.name}</h2>
              <p className="club-description">{club.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default Clubpage;
