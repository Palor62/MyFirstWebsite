import React from "react";
import Plot from 'react-plotly.js';
import './style.css'
import logo from './img/dashboard.png';

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

export default function Demo() {
    return (
        <div>
            <div className="box">
                <div className="box2">
                    <div className="box3">
                        <div className="cardbox">
                            <div className="number">Drones</div>
                            <div className="number">40</div>
                        </div>
                        <div className="cardbox">
                            <div className="number">Drones</div>
                            <div className="number">40</div>
                        </div>
                        <div className="cardbox">
                        <div className='location'>
                        <div className='location2'>  
                            <div className='location3'> 
                                <div className="number">Drones</div>
                                <div className="number">40</div>
                            </div>
                            <div className='location3'> 
                            <img src={logo} alt="Logo" className="logo" />
                            </div>
                        </div>
                        </div>
                        </div>
                        <div className="cardbox">
                        <div className='location'>
                        <div className='location2'>  
                            <div className='location3'> 
                                <div className="number">Drones</div>
                                <div className="number">40</div>
                            </div>
                            <div className='location3'> 
                            <img src={logo} alt="Logo" className="logo" />
                            </div>
                        </div>
                        </div>
                        </div>
                        <Circle value={40} label="Drones" />
                        <Circle value={64} label="Batteries" />
                        <Circle value={36} label="Equipment" />
                        <Circle value={37} label="Locations" />
                    </div>
                    <div className="box3">
                        <select>
                            <option value="1h">1 hour</option>
                            <option value="6h">6 hours</option>
                            <option value="12h">12 hours</option>
                            <option value="24h">24 hours</option>
                        </select>
                        <select>
                            <option value="1h">ID1</option>
                            <option value="6h">ID2</option>
                            <option value="12h">ID3</option>
                            <option value="24h">ID4</option>
                        </select>
                        <form>
                        <input type="checkbox"/>
                        <label>ID1</label>
                        <input type="checkbox"/>
                        <label>ID2</label>
                        <input type="checkbox"/>
                        <label>ID3</label>
                        <input type="checkbox"/>
                        <label>ID4</label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}