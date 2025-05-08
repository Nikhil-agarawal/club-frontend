import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import "./AdminDashboard.css";

import { Outlet } from "react-router-dom";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("events");

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar Navigation */}
      <div className="dashboard-sidebar">
        <h2>Admin Panel</h2>
        <ul className="sidebar-nav">
          <li className={activeTab === "events" ? "active" : ""}>
            <Link to="/admin/dashboard/events" onClick={() => setActiveTab("events")}>
              Manage Events
            </Link>
          </li>
          <li className={activeTab === "members" ? "active" : ""}>
            <Link to="/admin/dashboard/members" onClick={() => setActiveTab("members")}>
              Manage Members
            </Link>
          </li>
          {/* <li className={activeTab === "clubs" ? "active" : ""}>
            <Link to="/admin/dashboard/clubs" onClick={() => setActiveTab("clubs")}>
              Manage Clubs
            </Link>
          </li>
          <li className={activeTab === "reports" ? "active" : ""}>
            <Link to="/admin/dashboard/reports" onClick={() => setActiveTab("reports")}>
              Reports
            </Link>      
          </li> */}
          <li className={activeTab === "attendance" ? "active" : ""}>
            <Link to="/admin/dashboard/attendance" onClick={() => setActiveTab("attendance")}>
             Manage Attendance
            </Link>      
          </li>

        </ul>
      </div>


<div className="dashboard-content">
  <Outlet />
</div>

    </div>
  );
};

export default AdminDashboard;
