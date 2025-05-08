import React from 'react';
import './HomePage.css';
import { useNavigate, Link } from 'react-router-dom';
import { clubData } from '../../Data/data';

// Define the clubs to show in header (we'll show only specific clubs)
const headerClubIds = [1, 3, 7, 4, 5, 8, 9, 10]; // IDs of clubs to show in header

const HomePage = () => {
  const navigate = useNavigate();
  
  // Filter clubData to show only selected clubs in header
  const headerClubs = clubData.filter(club => headerClubIds.includes(club.id));

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tagline">Explore • Engage • Excel</p>
          <h1 className="klubb-heading">CAMPUS<br/> INNOVATION <br/>COUNCIL</h1>
          <p className="portal-tagline">NIT Kurukshetra's Club Portal</p>
          <button className="cta-button" onClick={() => navigate('/clubs')}>
            Discover Clubs
          </button>
        </div>
      </section>

      {/* About Us */}
    {/* About Section with Side-by-Side Layout */}
<section className="about">
  <div className="container">
    <h2 className="section-title">About Us</h2>
    <div className="divider"></div>
    
    <div className="about-stats-container">
      <div className="about-text-container">
        <p className="about-description">
        Welcome to our Club Management platform! We are here to provide clubs with a streamlined, user-friendly solution to manage their members, events, and activities. Our platform allows easy event registrations, member management, and event updates, all in one place. Whether you're managing a sports club, a cultural society, or any other community group, we make it simple to stay organized and connected.
        </p>
        <p className="about-description">
        We focus on making club management more efficient, reducing the administrative workload, and giving members a seamless experience. Join us and take your club to the next level with smart management tools that keep your community engaged and active!.
        </p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card blue-stat">
          <div className="stat-number">110+</div>
          <div className="stat-label">Students Connected</div>
        </div>
        <div className="stat-card purple-stat">
          <div className="stat-number">35+</div>
          <div className="stat-label">Events Organised</div>
        </div>
        <div className="stat-card pink-stat">
          <div className="stat-number">70+</div>
          <div className="stat-label">Students Volunteers Engaged</div>
        </div>
        <div className="stat-card cyan-stat">
          <div className="stat-number">11+</div>
          <div className="stat-label">Active Clubs</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* {OUR Family} */}



    <section className="family-section" id="our-family">
      <div className="container">
        <div className="family-header">
          <div className="family-title">
            <h2>Our Family</h2>
            <div className="divider"></div>
          </div>
          <div className="family-description">
            {/* <p>Explore our diverse collection of clubs and student initiatives.</p> */}
          </div>
          <div className="clubs-title">
            {/* <h3>Clubs</h3> */}
          </div>
        </div>

        <div className="club-logos-grid">
          {headerClubs.map((club) => (
            <Link 
              to={`/clubs/${club.id}`} 
              key={club.id} 
              className="club-logo-card"
              onClick={() => window.scrollTo(0, 0)} // Scroll to top when clicking
            >
              <div className="logo-circle">
                <img src={club.logoUrl} alt={club.name} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  


 
      
    </div>
)};
export default HomePage;