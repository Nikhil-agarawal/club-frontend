// src/pages/EventsPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EventPage.css"; // apne style ka file yahi rakha hai to import rehne do

const API_URL=process.env.REACT_APP_API_URL;

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [formData, setFormData] = useState({});
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [displayCount, setDisplayCount] = useState(6);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/event/all-events`)
      .then((res) => {
        setEvents(res.data.events);
      })
      .catch((err) => {
        console.error("Error fetching events", err);
      });
  }, []);

  const openModal = (posterUrl, title) => {
    setSelectedImage(posterUrl);
    setSelectedTitle(title);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const openDetailsModal = (event) => {
    setSelectedEvent(event);
    setDetailsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleInputChange = (eventId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [field]: value,
      },
    }));
  };

  const handleRegister = async (e, eventId) => {
    e.preventDefault();
    const data = formData[eventId];

    try {
      const res = await axios.post(`${API_URL}/api/event/${eventId}/register`, {
        eventId,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      alert("Registration successful!");
      setFormData((prev) => ({ ...prev, [eventId]: {} }));
    } catch (err) {
      console.error("Registration failed", err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleShowMore = () => {
    setDisplayCount(events.length);
    setShowMore(true);
  };

  const handleShowLess = () => {
    setDisplayCount(6);
    setShowMore(false);
  };

  return (
    <div className="events-container">
      <h2 className="events-heading">Upcoming Events</h2>
      <div className="card-grid">
        {events.slice(0, displayCount).map((event) => (
          <div className="event-card" key={event._id}>
            <div className="image-container">
              <img
                src={event.posterUrl}
                alt={event.title}
                className="poster-img"
                onClick={() => openModal(event.posterUrl, event.title)}
              />
            </div>
            <button 
              className="register-button"
              onClick={() => openDetailsModal(event)}
            >
              Register Now
            </button>
            <div className="event-details">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-date">
                <span className="date-label">Ends:</span>{" "}
                {new Date(event.endTime).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {events.length > 6 && (
        <div className="show-more-container">
          {!showMore ? (
            <button className="show-more-btn" onClick={handleShowMore}>
              Show More Events
            </button>
          ) : (
            <button className="show-more-btn" onClick={handleShowLess}>
              Show Less
            </button>
          )}
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>×</button>
            <h3 className="modal-title">{selectedTitle}</h3>
            <div className="modal-image-container">
              <img src={selectedImage} alt={selectedTitle} className="modal-image" />
            </div>
          </div>
        </div>
      )}

      {detailsModalOpen && (
        <div className="modal-overlay" onClick={closeDetailsModal}>
          <div className="modal-content details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeDetailsModal}>×</button>
            <h3 className="modal-title">{selectedEvent?.title}</h3>
            <div className="details-content">
              <img src={selectedEvent?.posterUrl} alt={selectedEvent?.title} className="modal-poster" />
              <div className="details-form">
                <p className="event-date">
                  <span className="date-label">Ends:</span>{" "}
                  {new Date(selectedEvent?.endTime).toLocaleString()}
                </p>
                {new Date(selectedEvent?.endTime) > new Date() ? (
                  <form className="register-form" onSubmit={(e) => handleRegister(e, selectedEvent?._id)}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={formData[selectedEvent?._id]?.name || ""}
                      onChange={(e) => handleInputChange(selectedEvent?._id, "name", e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      value={formData[selectedEvent?._id]?.email || ""}
                      onChange={(e) => handleInputChange(selectedEvent?._id, "email", e.target.value)}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={formData[selectedEvent?._id]?.phone || ""}
                      onChange={(e) => handleInputChange(selectedEvent?._id, "phone", e.target.value)}
                    />
                    <button type="submit">Complete Registration</button>
                  </form>
                ) : (
                  <p className="closed-text">Registration Closed</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
