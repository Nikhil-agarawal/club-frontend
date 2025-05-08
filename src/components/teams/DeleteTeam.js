import React, { useState } from "react";
import "./delete.css";

function DeleteTeam() {
  const [teamNo, setTeamNo] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (teamNo.trim() === "") {
      alert("Please select a team.");
      return;
    }
    setTeamMembers([...teamMembers, { teamNo }]);
    setTeamNo("");
  };

  return (
    <div className="dropdown-menu-delete">
      <h1>Delete Team</h1>
      <form onSubmit={handleSubmit} className="dropdown-menu__form-delete">
        <div>
          <label htmlFor="teamNo">Team No:</label>
          <select
            id="teamNo"
            value={teamNo}
            onChange={(event) => setTeamNo(event.target.value)}
          >
            <option value="">Select a team</option>
            <option value="1">Team 1</option>
            <option value="2">Team 2</option>
            <option value="3">Team 3</option>
          </select>
        </div>
        <button type="submit">Delete Team</button>
      </form>
      {teamMembers.length > 0 && (
        <div className="team-members">
          <h2>Team Members</h2>
          <table>
            <thead>
              <tr>
                <th>Team No</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <tr key={index}>
                  <td>{member.teamNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DeleteTeam;
