import React from 'react';
import { developers } from '../../Data/data';
import Card from '../Card/Card';
import './Developers.css';

const Developers = () => {
  return (
    <div className="developers-container">
      <h1 className="developers-title">Developers</h1>
      <div className="developers-grid">
        {developers.map((developer, index) => (
          <Card 
            key={index}
            member={developer}
            type="developer"
          />
        ))}
      </div>
    </div>
  );
};

export default Developers; 