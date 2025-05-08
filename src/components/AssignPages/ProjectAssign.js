import React, { useState } from 'react';
import './ProjectAssign.css'

function TeamPage() {
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [formValues, setFormValues] = useState({projectname: '', teamnumber: ''});

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!formValues.projectname || !formValues.teamnumber) {
      alert('Please fill in all the fields.');
      return;
    }
    if (currentTeam) {
      setTeams(
        teams.map((team) => {
          if (team === currentTeam) {
            return { ...team, ...formValues };
          } else {
            return team;
          }
        })
      );
      setCurrentTeam(null);
    } else {
      setTeams([...teams, formValues]);
    }
    setFormValues({teamnumber: '', projectname: ''  });
  };

  const handleInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleEdit = (team) => {
    setCurrentTeam(team);
    setFormValues(team);
  };

  const handleDelete = (team) => {
    setTeams(teams.filter((t) => t !== team));
    if (currentTeam === team) {
      setCurrentTeam(null);
    }
  };

  return (
    <div className="project-assign-container">
      <h1 className="project-assign-container__heading">Team Assign</h1>
      <form onSubmit={handleFormSubmit} className="project-assign-container__form">
        <div>
          <label htmlFor="rollnumber">Work Name:</label>
          <input type="text" id="projectname" name="projectname" value={formValues.projectname} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="teamnumber">Team Number:</label>
          <input type="text" id="teamnumber" name="teamnumber" value={formValues.teamnumber} onChange={handleInputChange} />
        </div>
        <button type="submit">{currentTeam ? 'Update' : 'Add'}</button>
        {currentTeam && <button type="button" onClick={() => setCurrentTeam(null)}>Cancel</button>}
      </form>
      <table className="project-assign-container__table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Team Number</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.projectname}>
              <td>{team.projectname}</td>
              <td>{team.teamnumber}</td>
              <td>
                <button type="button" onClick={() => handleEdit(team)}>Edit</button>
                <button type="button" onClick={() => handleDelete(team)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamPage;
