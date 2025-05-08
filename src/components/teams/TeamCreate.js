
import React, { useState, useEffect } from "react";
import "./Team.css";
import Swal from 'sweetalert2';
import axios from 'axios';

function TeamCreate() {
  const [teamNo, setTeamNo] = useState("");
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamNo, setSelectedTeamNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5001/getuser");
      if (response.data && response.data.data) {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to fetch students',
        icon: 'error',
        timer: 3001
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (teamMembers.length > 0) {
      if (studentName.trim() === "") {
        Swal.fire({
          title: 'Missing Information',
          text: 'Please select a student.',
          icon: 'warning',
          timer: 3001
        });
        return;
      }
    } else {
      if (teamNo.trim() === "" || studentName.trim() === "") {
        Swal.fire({
          title: 'Missing Information',
          text: 'Please fill in all the fields.',
          icon: 'warning',
          timer: 3001
        });
        return;
      }
    }

    const studentExists = teamMembers.some(member => member.studentName === studentName);
    if (studentExists) {
      Swal.fire({
        title: 'Duplicate Student',
        text: 'This student is already in the team.',
        icon: 'warning',
        timer: 3001
      });
      return;
    }

    const member = { teamNo: teamMembers.length === 0 ? teamNo : selectedTeamNo, studentName };
    if (teamMembers.length === 0) {
      setSelectedTeamNo(teamNo);
    }

    setTeamMembers([...teamMembers, member]);
    setStudentName("");
  };

  const handleCreateTeam = async () => {
    if (teamMembers.length === 0) {
      Swal.fire({
        title: 'No Team Members',
        text: 'Please add team members before creating a team.',
        icon: 'warning',
        timer: 3001
      });
      return;
    }

    setIsLoading(true);
    setServerResponse(null);

    try {
      const studentNames = teamMembers.map(member => ({ name: member.studentName }));

      const teamData = {
        teamNumber: selectedTeamNo,
        studentNames: studentNames
      };

      console.log("Sending team data:", JSON.stringify(teamData, null, 2));

      const response = await axios.post(
        "http://localhost:5001/addteams", 
        teamData, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setServerResponse(response.data);
      console.log("Server response:", response.data);

      Swal.fire({
        title: 'Success',
        text: 'Team created successfully',
        icon: 'success',
        timer: 3001
      });

      setTeamNo("");
      setSelectedTeamNo("");
      setTeamMembers([]);
    } catch (error) {
      console.error("Team creation error:", error);
      if (error.response) {
        setServerResponse(error.response.data);
        console.log("Error response:", error.response.data);
      }

      const errorMessage = error.response?.data?.error || 'Failed to create team. Please try again.';
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        timer: 5001
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    setStudentName(event.target.value);
  };

  return (
    <div className="dropdown-menu">
      <h1>Create Your Team</h1>
      <form className="dropdown-menu__form">
        <div>
          <label htmlFor="teamNo">Team No:</label>
          {teamMembers.length > 0 ? (
            <input
              id="teamNo"
              type="text"
              value={selectedTeamNo}
              disabled={true}
              className="locked-input"
            />
          ) : (
            <input
              id="teamNo"
              type="text"
              value={teamNo}
              onChange={(event) => setTeamNo(event.target.value)}
              placeholder="Enter team number"
            />
          )}
        </div>
        <div>
          <label htmlFor="studentName">Student Name:</label>
          <select 
            id="studentName" 
            value={studentName} 
            onChange={handleSelectChange}
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id || student._id} value={student.name}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <button 
          type="submit" 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Add to Team
        </button>
      </form>

      {teamMembers.length > 0 && (
        <div className="team-members">
          <h2>Team Members for Team {selectedTeamNo}</h2>
          <table>
            <thead>
              <tr>
                <th>Team No</th>
                <th>Student Name</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <tr key={index}>
                  <td>{member.teamNo}</td>
                  <td>{member.studentName}</td>
                </tr>
              ))}
            </tbody>
          </table>
         
        </div>
      )}

      {/* {serverResponse && process.env.NODE_ENV === 'development' && (
        <div style={{marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>
          <h3>Server Response (Debug)</h3>
          <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}

export default TeamCreate;