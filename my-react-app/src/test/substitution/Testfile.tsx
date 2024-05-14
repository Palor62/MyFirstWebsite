

//Simple version
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './Circle.css';

interface CircleProps {
    value: number;
    label: string;
  }
  
  const Circle: React.FC<CircleProps> = ({ value, label }) => {
    return (
      <div className="circle">
        <div className="circle-content">
          <div className="value">{value}</div>
          <div className="label">{label}</div>
        </div>
      </div>
    );
  };

const Testfile: React.FC = () => {
    return (
        <div>
          <Circle value={40} label="Drones" />
          <Circle value={64} label="Batteries" />
          <Circle value={36} label="Equipment" />
          <Circle value={37} label="Locations" />
        </div>
      );
    };

export default Testfile;
