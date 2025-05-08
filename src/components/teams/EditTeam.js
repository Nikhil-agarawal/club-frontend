import React, { useState } from "react";
import "./EditTeam.css";
import axios from 'axios'

function EditTeam() {
  const [teamNo, setTeamNo] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (teamNo.trim() === "") {
      alert("Please select a team.");
      return;
    }
    axios.post('http://localhost:5001/getteams',{ teamNo: teamNo }).then((response)=>{
      setTeamMembers(response.data);
      console.log(teamMembers)
    }).catch((error)=>{
      console.log(error);
    });
  };

  return (
    <div className="dropdown-menu-edit">
      <h1>Edit Team</h1>
      <form className="dropdown-menu__form-edit">
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
        <button type="submit" onClick={handleSubmit}>Get TeamDetails </button>
      </form>
      {teamMembers.length > 0 && (
        <div className="team-members">
          <h2>Team Members</h2>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student Email</th>
              </tr>
            </thead>
            <tbody>
            {teamMembers.studentNames.map((student, index) => (
          <tr key={index}>
            <td>{student.name}</td>
          </tr>
        ))}

            </tbody>
          </table>
          <button className="final" type="submit">Submit</button>
        </div>
      )}
    </div>
  );
}

export default EditTeam;
