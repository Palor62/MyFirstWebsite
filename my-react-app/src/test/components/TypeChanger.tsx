/*
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const TypeChanger: React.FC = () => {
    const [zData, setZData] = useState<any[]>([]);
    const [plotType, setPlotType] = useState<string>('surface');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv');
          const csvData = await response.text();
          const rows = csvData.split('\n').map(row => row.split(','));
  
          const unpack = (rows: any[], key: string) => {
            return rows.map(row => row[key]);
          }
  
          const z_data: any[] = [];
          for (let i = 0; i < 24; i++) {
            z_data.push(unpack(rows, i));
          }
  
          setZData(z_data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleTypeChange = (type: string) => {
      setPlotType(type);
    };
  
    return (
      <div>
        <div>
          <button onClick={() => handleTypeChange('surface')}>Surface</button>
          <button onClick={() => handleTypeChange('heatmap')}>Heatmap</button>
        </div>
        <Plot
          data={[
            {
              z: zData,
              type: plotType,
              colorscale: 'Viridis'
            }
          ]}
          layout={{
            width: 800,
            height: 900,
            autosize: false,
            scene: {
              xaxis: {
                gridcolor: 'rgb(255, 255, 255)',
                zerolinecolor: 'rgb(255, 255, 255)',
                showbackground: true,
                backgroundcolor: 'rgb(230, 230,230)'
              },
              yaxis: {
                gridcolor: 'rgb(255, 255, 255)',
                zerolinecolor: 'rgb(255, 255, 255)',
                showbackground: true,
                backgroundcolor: 'rgb(230, 230, 230)'
              },
              zaxis: {
                gridcolor: 'rgb(255, 255, 255)',
                zerolinecolor: 'rgb(255, 255, 255)',
                showbackground: true,
                backgroundcolor: 'rgb(230, 230,230)'
              },
              aspectratio: { x: 1, y: 1, z: 0.7 },
              aspectmode: 'manual'
            }
          }}
        />
      </div>
    );
  };

export default TypeChanger;
*/

import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const bool = true;

const TypeChanger: React.FC = () => {
  const [plotType, setPlotType] = useState<string>("scatter");
  const [plotColor, setPlotColor] = useState<string>("red");

  const handleTypeChange = (type: string) => {
    setPlotType(type);
  };

  const handleColorChange = (color: string) => {
    setPlotColor(color);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTypeChange("scatter")}>Scatter</button>
        <button onClick={() => handleTypeChange("bar")}>Bar</button>
        <fieldset>
        <div>
        <input type="radio" name="color" onClick={() => handleColorChange("red")}/>
        <label>Red</label>
        </div>
        <div>
        <input type="radio" name="color" onClick={() => handleColorChange("green")}/>
        <label>Green</label>
        </div>
        <div>
        <input type="radio" name="color" onClick={() => handleColorChange("blue")}/>
        <label>Blue</label>
        </div>
        </fieldset>
      </div>
      {bool ? (
        <div>
          <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 1, 3],
                type: plotType,
                marker: {color: plotColor}
              },
            ]}
            layout={{
              width: 500,
              height: 400,
              title: "button",
            }}
          />
          <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 3, 1],
                type: plotType,
                marker: {color: plotColor}
              },
            ]}
            layout={{
              width: 500,
              height: 400,
              title: "button",
            }}
          />
        </div>
      ) : (
        <div>
          <h1>hi</h1>
        </div>
      )}
    </div>
    
  );
};

export default TypeChanger;
