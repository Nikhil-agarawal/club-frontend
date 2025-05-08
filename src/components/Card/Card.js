import React from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Card.css';

const Card = ({ member }) => {
  return (
    <div className="glass-card">
      <div className="card-content">
        <div className="profile-image-wrapper">
          <img src={member.image} alt={member.name} className="profile-image" />
        </div>
        <h2 className="card-name">{member.name}</h2>
        <p className="card-role">{member.role}</p>
        
        <div className="social-icons">
          {/* Always show email icon */}
          <a 
            href={member.email ? `mailto:${member.email}` : '#'} 
            className={`social-icon-link ${!member.email ? 'disabled' : ''}`}
            onClick={(e) => !member.email && e.preventDefault()}
            title={member.email || 'Email not available'}
          >
            <FaEnvelope />
          </a>

          {/* Always show phone icon */}
          <a 
            href={member.phone ? `tel:${member.phone}` : '#'} 
            className={`social-icon-link ${!member.phone ? 'disabled' : ''}`}
            onClick={(e) => !member.phone && e.preventDefault()}
            title={member.phone || 'Phone not available'}
          >
            <FaPhone />
          </a>

          {/* Always show LinkedIn icon */}
          <a 
            href={member.linkedin || '#'} 
            className={`social-icon-link ${!member.linkedin ? 'disabled' : ''}`}
            onClick={(e) => !member.linkedin && e.preventDefault()}
            target={member.linkedin ? "_blank" : undefined}
            rel={member.linkedin ? "noopener noreferrer" : undefined}
            title={member.linkedin ? 'View LinkedIn Profile' : 'LinkedIn not available'}
          >
            <FaLinkedin />
          </a>

          {/* Always show Instagram icon */}
          <a 
            href={member.instagram || '#'} 
            className={`social-icon-link ${!member.instagram ? 'disabled' : ''}`}
            onClick={(e) => !member.instagram && e.preventDefault()}
            target={member.instagram ? "_blank" : undefined}
            rel={member.instagram ? "noopener noreferrer" : undefined}
            title={member.instagram ? 'View Instagram Profile' : 'Instagram not available'}
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;

