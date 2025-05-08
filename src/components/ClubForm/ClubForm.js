import React, { useState, useEffect } from "react";
import "./ClubForm.css";
import { clubData } from '../../Data/data';

const ClubForm = ({ onClose, clubName }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    course: "",
    year: "",
    purpose: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [clubPhoneNumber, setClubPhoneNumber] = useState("");
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

  useEffect(() => {
    // Find the club's phone number from clubData
    const club = clubData.find(club => club.name === clubName);
    if (club) {
      setClubPhoneNumber(club.phNumber);
    }
  }, [clubName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Reset year when course changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      year: ''
    }));
  }, [formData.course]);

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) {
      errors.fullName = "Please enter your full name";
    }
    if (!formData.email) {
      errors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.mobileNumber) {
      errors.mobileNumber = "Please enter your mobile number";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Mobile number must be 10 digits";
    }
    if (!formData.course) {
      errors.course = "Please select your course";
    }
    if (!formData.year) {
      errors.year = "Please select your year";
    }
    if (!formData.purpose) {
      errors.purpose = "Please enter your purpose";
    }
    return errors;
  };

  const isYearDisabled = (yearValue) => {
    if (!formData.course) return false;
    
    const yearNum = parseInt(yearValue);
    
    // For MBA, M.Sc, M.Tech - only 1st and 2nd year allowed
    if (['MBA', 'M.Sc', 'M.Tech'].includes(formData.course)) {
      return yearNum > 2;
    }
    
    // For MCA - up to 3rd year allowed
    if (formData.course === 'MCA') {
      return yearNum > 3;
    }
    
    // For B.Tech - all years allowed
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Format the message
      const message = `${clubName} Query from :-
      
Name: ${formData.fullName}
Email: ${formData.email}
Mobile: ${formData.mobileNumber}
Course: ${formData.course}
Year: ${formData.year}
Purpose: ${formData.purpose}`;

      // Create WhatsApp URL
      if (!clubPhoneNumber) {
        alert('Club phone number not found. Please try again later.');
        return;
      }
      
      const whatsappUrl = `https://wa.me/${clubPhoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      
      // Try to open WhatsApp
      const newWindow = window.open(whatsappUrl, '_blank');
      
      // If window was blocked or WhatsApp didn't open
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        setShowWhatsAppPopup(true);
        return;
      }

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        mobileNumber: "",
        course: "",
        year: "",
        purpose: "",
      });

      // Close the form after submission
      if (onClose) {
        onClose();
      }
    }
  };

  const handleDownloadWhatsApp = () => {
    window.open('https://www.whatsapp.com/download', '_blank');
  };

  return (
    <div className="club-contact-form__wrapper">
      <div className="club-contact-form__container">
        <div className="club-contact-form">
          <h2 className="club-contact-form__title">Contact {clubName || "Club"}</h2>
          
          <div className="club-contact-form__group">
            <label className="club-contact-form__label" htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="club-contact-form__input"
              placeholder="Enter your full name"
            />
            {formErrors.fullName && <span className="club-contact-form__error">{formErrors.fullName}</span>}
          </div>

          <div className="club-contact-form__group">
            <label className="club-contact-form__label" htmlFor="mobileNumber">Mobile Number</label>
            <input
              id="mobileNumber"
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="club-contact-form__input"
              placeholder="Enter your mobile number"
            />
            {formErrors.mobileNumber && <span className="club-contact-form__error">{formErrors.mobileNumber}</span>}
          </div>

          <div className="club-contact-form__group">
            <label className="club-contact-form__label" htmlFor="email">Email ID</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="club-contact-form__input"
              placeholder="Enter your email address"
            />
            {formErrors.email && <span className="club-contact-form__error">{formErrors.email}</span>}
          </div>

          <div className="club-contact-form__group">
            <label className="club-contact-form__label" htmlFor="course">Course</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="club-contact-form__input club-contact-form__select"
            >
              <option value="">Select your course</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MCA">MCA</option>
              <option value="M.Sc">M.Sc</option>
              <option value="MBA">MBA</option>
            </select>
            {formErrors.course && <span className="club-contact-form__error">{formErrors.course}</span>}
          </div>

          <div className="club-contact-form__group">
            <label className="club-contact-form__label" htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="club-contact-form__input club-contact-form__select"
            >
              <option value="">Select your year</option>
              <option value="1" disabled={isYearDisabled(1)} style={{ opacity: isYearDisabled(1) ? 0.5 : 1 }}>1st Year</option>
              <option value="2" disabled={isYearDisabled(2)} style={{ opacity: isYearDisabled(2) ? 0.5 : 1 }}>2nd Year</option>
              <option value="3" disabled={isYearDisabled(3)} style={{ opacity: isYearDisabled(3) ? 0.5 : 1 }}>3rd Year</option>
              <option value="4" disabled={isYearDisabled(4)} style={{ opacity: isYearDisabled(4) ? 0.5 : 1 }}>4th Year</option>
            </select>
            {formErrors.year && <span className="club-contact-form__error">{formErrors.year}</span>}
          </div>

          <div className="club-contact-form__group">
            <label className="club-contact-form__label" htmlFor="purpose">Purpose</label>
            <textarea
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="club-contact-form__input club-contact-form__textarea"
              placeholder="Enter your purpose for joining the club"
              rows="4"
            ></textarea>
            {formErrors.purpose && <span className="club-contact-form__error">{formErrors.purpose}</span>}
          </div>

          <div className="club-contact-form__group">
            <button type="submit" className="club-contact-form__submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          
          <div className="club-contact-form__divider" />
        </div>
      </div>

      {showWhatsAppPopup && (
        <div className="club-contact-form__whatsapp-overlay">
          <div className="club-contact-form__whatsapp-modal">
            <div className="club-contact-form__whatsapp-content">
              <div className="club-contact-form__whatsapp-icon">
                <i className="fab fa-whatsapp"></i>
              </div>
              <h3 className="club-contact-form__whatsapp-title">WhatsApp Not Found</h3>
              <p className="club-contact-form__whatsapp-text">To contact the club, you need to have WhatsApp installed on your device.</p>
              <p className="club-contact-form__whatsapp-text">Please download WhatsApp to continue.</p>
              <button className="club-contact-form__download-btn" onClick={handleDownloadWhatsApp}>
                Download WhatsApp
              </button>
              <button className="club-contact-form__close-btn" onClick={() => setShowWhatsAppPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubForm;