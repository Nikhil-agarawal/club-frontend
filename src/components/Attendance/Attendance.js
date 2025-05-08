import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import "./Attendance.css";

const API_URL = process.env.REACT_APP_API_URL;

const AttendanceForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [studentsName, setStudentsName] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [viewMode, setViewMode] = useState(false);
  const [searchDay, setSearchDay] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const [searchYear, setSearchYear] = useState("");

  // 1. Fetch student names & initialize attendance
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get(`${API_URL}/getuser`, {
        headers: {
          "content-type": "application/json",
          "x-auth-token": token, // Changed from token to x-auth-token
        },
      })
      .then((response) => {
        const names = response.data.data.map((user) => user.name);
        setStudentsName(names);

        const initialAttendance = names.reduce((obj, name) => {
          obj[name] = "Absent";
          return obj;
        }, {});
        setAttendance(initialAttendance);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
        swal("Error", "Failed to fetch student data", "error");
      });
  };

  // 2. Mark Present or Absent
  const handleButtonClick = (student, status) => {
    setAttendance((prev) => ({ ...prev, [student]: status }));
  };

  // 3. Submit Attendance
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!day || !month || !year) {
      return swal("Error", "Please enter a valid date", "error");
    }

    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const attendanceArray = Object.entries(attendance).map(([name, status]) => ({
      name,
      status,
    }));

    axios
      .post(
        `${API_URL}/submit-attendence`,
        {
          attendanceData: attendanceArray,
          date: formattedDate,
        },
        {
          headers: {
            "content-type": "application/json",
            "x-auth-token": token, // Changed from token to x-auth-token
          },
        }
      )
      .then((res) => {
        if (res.data.message === "Attendance data saved successfully") {
          swal("Success", "Attendance recorded", "success");
        } else {
          swal("Error", "Failed to save attendance", "error");
        }
      })
      .catch((err) => {
        console.error("Submit Error:", err);
        swal("Error", "Something went wrong", "error");
      });
  };

  // 4. Search attendance for a specific date
  const handleSearchAttendance = () => {
    if (!searchDay || !searchMonth || !searchYear) {
      return swal("Error", "Please enter a valid date to search", "error");
    }

    const formattedDate = `${searchYear}-${String(searchMonth).padStart(2, "0")}-${String(searchDay).padStart(2, "0")}`;

    axios
      .post(
        `${API_URL}/getattendancebydate`,
        {
          date: formattedDate,
        },
        {
          headers: {
            "content-type": "application/json",
            "x-auth-token": token, // Changed from token to x-auth-token
          },
        }
      )
      .then((res) => {
        if (res.data.status === "ok") {
          // Convert response to attendance object format
          const fetchedAttendance = res.data.data.reduce((obj, item) => {
            obj[item.name] = item.status;
            return obj;
          }, {});
          
          setAttendance(fetchedAttendance);
          
          // Set the current date fields to match the search
          setDay(searchDay);
          setMonth(searchMonth);
          setYear(searchYear);
          
          swal("Success", "Attendance data retrieved", "success");
        } else {
          swal("Error", "Failed to retrieve attendance data", "error");
        }
      })
      .catch((err) => {
        console.error("Search Error:", err.response?.data || err.message);
        swal("Error", "Attendance data not found for this date", "error");
      });
  };

  // 5. Export to Excel/CSV
  const handleExportToExcel = () => {
    if (!day || !month || !year) {
      return swal("Error", "Please enter a valid date", "error");
    }

    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    
    // Prepare data for CSV export
    const headers = "Name,Status\n";
    const rows = Object.entries(attendance)
      .map(([name, status]) => `${name},${status}`)
      .join("\n");
    
    const csvContent = `Attendance for ${formattedDate}\n\n${headers}${rows}`;
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    // Set up and trigger download
    link.setAttribute("href", url);
    link.setAttribute("download", `Attendance_${formattedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    swal("Success", "Attendance exported to CSV file", "success");
  };

  // Toggle between record and view modes
  const toggleViewMode = () => {
    setViewMode(!viewMode);
    if (!viewMode) {
      // Switching to view mode, reset the search fields
      setSearchDay("");
      setSearchMonth("");
      setSearchYear("");
    } else {
      // Switching back to record mode
      fetchStudents(); // Reset the attendance
    }
  };

  return (
    <>
         <h1>Manage Attendance</h1>

    <div className="attendance-form-container">
   
      <div className="mode-toggle">
        <button 
          type="button" 
          className={`mode-button ${!viewMode ? 'active' : ''}`}
          onClick={() => viewMode && toggleViewMode()}
        >
          Record Attendance
        </button>
        <button 
          type="button" 
          className={`mode-button ${viewMode ? 'active' : ''}`}
          onClick={() => !viewMode && toggleViewMode()}
        >
          View Attendance
        </button>
      </div>
      
      {!viewMode ? (
        // Record Attendance Mode
        <form onSubmit={handleSubmit}>
          <h2 className="attendance-form-header">Record Attendance</h2>
          <div className="attendance-form-Date">
            <input
              type="number"
              min="1"
              max="31"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <input
              type="number"
              min="1"
              max="12"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              type="number"
              min="2000"
              max="2100"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          {studentsName.map((student, index) => (
            <div className="attendance-form-student" key={index}>
              <span>{student}</span>
              <div className="attendance-form-button-container">
                <button
                  type="button"
                  className={`attendance-form-button ${
                    attendance[student] === "Present" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick(student, "Present")}
                >
                  Present
                </button>
                <button
                  type="button"
                  className={`attendance-form-button ${
                    attendance[student] === "Absent" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick(student, "Absent")}
                >
                  Absent
                </button>
              </div>
            </div>
          ))}

          <div className="attendance-form-buttons-row">
            <button type="submit" className="attendance-form-submits">
              Submit Attendance
            </button>
            <button
              type="button"
              onClick={handleExportToExcel}
              className="attendance-form-submits"
            >
              Export to Excel
            </button>
          </div>
        </form>
      ) : (
        // View Attendance Mode
        <div>
          <h1 className="attendance-form-header">View Attendance</h1>
          <div className="search-container">
            <div className="attendance-form-Date">
              <input
                type="number"
                min="1"
                max="31"
                placeholder="DD"
                value={searchDay}
                onChange={(e) => setSearchDay(e.target.value)}
              />
              <input
                type="number"
                min="1"
                max="12"
                placeholder="MM"
                value={searchMonth}
                onChange={(e) => setSearchMonth(e.target.value)}
              />
              <input
                type="number"
                min="2000"
                max="2100"
                placeholder="YYYY"
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
              />
              <button 
                type="button" 
                className="search-button"
                onClick={handleSearchAttendance}
              >
                Search
              </button>
            </div>
          </div>
          
          {/* Only show attendance list if we have actual data to display */}
          {Object.keys(attendance).length > 0 && day && month && year && (
            <div>
              <h2 className="date-display">
                Attendance for: {day}/{month}/{year}
              </h2>
              <div className="attendance-list">
                {Object.entries(attendance).map(([name, status], index) => (
                  <div className="attendance-item" key={index}>
                    <span className="student-name">{name}</span>
                    <span className={`status-badge ${status.toLowerCase()}`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="attendance-form-buttons-row">
                <button
                  type="button"
                  onClick={handleExportToExcel}
                  className="attendance-form-submits"
                >
                  Export to Excel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default AttendanceForm;