import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import "./calender.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const API_URL=process.env.REACT_APP_API_URL;

function ScheduleCalendar() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [initialView, setInitialView] = useState("dayGridMonth");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const [isVisible, setIsVisible] = useState(true);
  const calendarRef = useRef(null);

  // Handle responsive view switch and isMobile state
  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 500;
      setInitialView(isSmall ? "listMonth" : "dayGridMonth");
      setIsMobile(isSmall);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL}/calendarschema`);
        const calendarEvents = response.data.map((event) => ({
          title: event.title,
          start: event.start,
          end: event.end,
          id: event._id,
          allDay: event.allDay || true
        }));
        setEvents(calendarEvents);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  // 🟢 For PC: Tap-to-add
  function handleDateSelect(selectInfo) {
    // Check if selected date is in the past
    const selectedDate = new Date(selectInfo.startStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    if (selectedDate < today) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date',
        text: 'Cannot add events to past dates.'
      });
      selectInfo.view.calendar.unselect();
      return;
    }

    Swal.fire({
      title: "Enter a new title for your event",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Create",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const title = result.value;
        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();

        if (title) {
          const event = {
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: true
          };

          axios.post(`${API_URL}/calendarschema`, event)
            .then((response) => {
              const newEvent = {
                ...event,
                id: response.data._id
              };
              setEvents(prevEvents => [...prevEvents, newEvent]);
              
              Swal.fire({
                icon: 'success',
                title: 'Event Added!',
                text: 'Your event has been successfully added to the calendar.',
                timer: 2000,
                showConfirmButton: false
              });
            })
            .catch((error) => {
              console.error('Error adding event:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add event. Please try again.'
              });
            });
        }
      }
    });
  }

  // 🟢 For Mobile: Add via floating button
  function handleMobileAddEvent() {
    Swal.fire({
      title: "Add Event",
      html:
        '<input id="event-title" class="swal2-input" placeholder="Event title">' +
        '<input id="event-date" type="date" class="swal2-input" min="' + new Date().toISOString().split('T')[0] + '">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Create",
      preConfirm: () => {
        const title = document.getElementById("event-title").value;
        const date = document.getElementById("event-date").value;
        
        if (!title || !date) {
          Swal.showValidationMessage("Please enter both title and date");
          return false;
        }

        // Check if selected date is in the past
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day

        if (selectedDate < today) {
          Swal.showValidationMessage("Cannot add events to past dates");
          return false;
        }

        return { title, date };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, date } = result.value;
        const event = {
          title,
          start: date,
          end: date,
          allDay: true
        };
  
        axios.post(`${API_URL}/calendarschema`, event)
          .then((response) => {
            const newEvent = {
              ...event,
              id: response.data._id
            };
            setEvents(prevEvents => [...prevEvents, newEvent]);
            
            Swal.fire({
              icon: 'success',
              title: 'Event Added!',
              text: 'Your event has been successfully added to the calendar.',
              timer: 2000,
              showConfirmButton: false
            });
          })
          .catch((error) => {
            console.error('Error adding event:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to add event. Please try again.'
            });
          });
      }
    });
  }
  
  function handleEventRemove(clickInfo) {
    Swal.fire({
      title: `Are you sure you want to delete the event '${clickInfo.event.title}'?`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/calendarschema/${clickInfo.event.id}`).then(() => {
          const filteredEvents = events.filter((event) => event.id !== clickInfo.event.id);
          setEvents(filteredEvents);
        });
      }
    });
  }

  function handleEventUpdate(updateInfo) {
    const { event } = updateInfo;
    const updatedEvent = {
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay
    };

    axios.put(`${API_URL}/calendarschema/${event.id}`, updatedEvent).then(() => {
      // FullCalendar will reflect the changes automatically
    });
  }

  return (
    <div className="calendar-container">
      {isMobile && isVisible && (
        <button className="close-calendar-btn" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={initialView}
        selectable={!isMobile} // only allow date selection on desktop
        select={handleDateSelect}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        editable={true}
        eventDurationEditable={true}
        eventResize={handleEventUpdate}
        eventDrop={handleEventUpdate}
        eventClick={handleEventRemove}
        events={events}
      />

      {isMobile && (
        <button className="add-event-btn" onClick={handleMobileAddEvent}>
          +
        </button>
      )}
    </div>
  );
}

export default ScheduleCalendar;

