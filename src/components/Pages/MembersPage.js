import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL=process.env.REACT_APP_API_URL;

const MembersPage = () => {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [members, setMembers] = useState([]);

  // Fetch members on page load
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/members`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMembers(res.data.members);
    } catch (error) {
      console.error("Failed to fetch members:", error);
      setNotification({
        show: true,
        message: "Failed to fetch members",
        type: "error"
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3001);
    }
  };

  const handleCreateMember = async (e) => {
    e.preventDefault();
    
    if (!name || !rollNo || !email || !password) {
      setNotification({
        show: true,
        message: "Please fill all fields",
        type: "error"
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3001);
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      await axios.post(
        `${API_URL}/api/members`,
        {
          name,
          rollNo,
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      // Reset form
      setName("");
      setRollNo("");
      setEmail("");
      setPassword("");

      // Refresh members list
      fetchMembers();

      setNotification({
        show: true,
        message: "Member created successfully!",
        type: "success"
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3001);
    } catch (error) {
      console.error("Error creating member:", error);
      setNotification({
        show: true,
        message: error.response?.data?.message || "Failed to create member",
        type: "error"
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3001);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMember = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this member?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/members/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update UI
      setMembers(members.filter(member => member._id !== id));
      setNotification({
        show: true,
        message: "Member deleted successfully!",
        type: "success"
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3001);
    } catch (error) {
      console.error("Failed to delete member:", error);
      setNotification({
        show: true,
        message: "Failed to delete member",
        type: "error"
      });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3001);
    }
  };

  return (
    <>
      <h1>Member Management</h1>
      
      <div className="dashboard-card">
        <h2>Create New Member</h2>
        <form onSubmit={handleCreateMember} className="member-form">
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter member name"
            />
          </div>
          
          <div className="input-group">
            <label>Roll Number</label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter roll number"
            />
          </div>
          
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          
          <button
            type="submit"
            className={`action-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Member"}
          </button>
        </form>
      </div>

      <div className="dashboard-card">
        <h2>All Members</h2>
        {members.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member._id}>
                    <td>{member.name}</td>
                    <td>{member.rollNo}</td>
                    <td>{member.email}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteMember(member._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No members found.</p>
        )}
      </div>

      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </>
  );
};

export default MembersPage;