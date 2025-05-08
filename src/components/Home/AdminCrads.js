import React from 'react';
// import Header from '../navbar/NavBar';
import './AdminCards.css';
import { Navigate, useNavigate } from 'react-router-dom';
import  {  useEffect } from 'react';
import swal from 'sweetalert'
const token = localStorage.getItem('token');
function Card(props) {
 
  return (
    <a href={props.link}>
      <div className="card">
        <div className={`front ${props.class}`}></div>
        <div className="back">
          {props.title}
        </div>
      </div>
    </a>
  );
}

function AdminCards() {
  
  return (
    <div>
      {/* <div className="App">
        <Header />
      </div> */}
      <div className="container">
        {/* <Card class="front" title="Student Info" link="#" /> */}
        {/* <Card class="front1" title="Performance" link="#" /> */}
        <Card class="front4" title="Schedule" link="/calender" />
        {/* <Card class="front5" title="Code Compiler" link="#" /> */}
        <Card class="front9" title="Todo" link="/todo" />
        <Card class="front6" title="Projects" link="/projectassign"/>
        <Card class="front3" title="Team Info" link="/admin-TeamCreate" />
        <Card class="front7" title="Announcements" link="/notify" />
        {/* <Card class="front10" title="Courses" link="/notes" /> */}
        <Card class="front11" title="Id card" link="#" />
        {/* <Card class="front8" title="Settings" link="#" /> */}
      </div>
    </div>
  );
}

export default AdminCards;