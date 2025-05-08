import React, { useState } from 'react';
import './AssignPage.css';

function TeamPage() {
  const [teamnumber, setTeamNumber] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const handleInputChange = (event) => {
    setTeamNumber(event.target.value);
  };

  return (
    <div className="assign-team-container">
      <h1 className="assign-team-container__heading">Team Page</h1>
      <form onSubmit={handleFormSubmit} className="assign-team-container__form">
        <div>
          <label htmlFor="teamnumber">Team Number:</label>
          <input type="text" id="teamnumber" name="teamnumber" value={teamnumber} onChange={handleInputChange} />
        </div>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default TeamPage;
