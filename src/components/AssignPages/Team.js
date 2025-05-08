import React from 'react';
// import Header from '../navbar/NavBar';
import './AdminCards.css';

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

function App() {
  return (
    <div>
      {/* <div className="App">
        <Header />
      </div> */}
      <div className="container">
        {/* <Card class="front" title="Student Info" link="#" /> */}
        {/* <Card class="front1" title="Performance" link="#" /> */}
        <Card class="front1" title="Adding Team" link="#" />
        {/* <Card class="front5" title="Code Compiler" link="#" /> */}
        <Card class="front2" title="Asssigning Team" link="#" />
        {/* <Card class="front8" title="Settings" link="#" /> */}
      </div>
    </div>
  );
}

export default App;