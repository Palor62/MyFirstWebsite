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

//const bool = true;

const TypeChanger: React.FC = () => {
  const [plotType, setPlotType] = useState<string>("scatter");
  const [plotColor, setPlotColor] = useState<string>("red");
  const [message, setMessage] = useState("");
  const [bool, setIsChecked] = useState(true);

  const handleTypeChange = (type: string) => {
    setPlotType(type);
  };

  const handleColorChange = (color: string) => {
    setPlotColor(color);
  };

  const alertFunction = () => {
    const result = window.confirm("Press a button!");
    if (result) {
      setMessage("You pressed OK!");
    } else {
      setMessage("You pressed Cancel!");
    }
  };

  const handleToggle = () => {
    setIsChecked(!bool);
  };

  //---
  const [batteryPercentage, setBatteryPercentage] = useState(0);

  const data = {
    values: [6, 34], // Example values, replace with actual data
    labels: ['Used', 'Total'],
  };

  const handlePieChartUpdated = () => {
    const firstValue = data.values[0];
    const secondValue = data.values[1];
    //const percentage = (firstValue / secondValue) * 100;
    const percentage = (secondValue / 40) * 100;
    setBatteryPercentage(percentage);

    const isBelow20Percent = percentage < 20;
    if (isBelow20Percent) {
      alert(`Battery is low at: ${percentage}%! Need charging!`);
    } else {
      alert(`Battery percentage: ${percentage.toFixed(2)}%`);
    }
  };
  /*
  const [data, setData] = useState({
    values: [3, 7],
    labels: ['Battery used', 'Battery left'],
  });

  const [batteryPercentage, setBatteryPercentage] = useState(0);

  const handlePieChartUpdated = () => {
    const firstValue = data.values[0];
    const secondValue = data.values[1];
    //const percentage = (firstValue / secondValue) * 100;
    //setBatteryPercentage(percentage);

    const is20Percent = firstValue / secondValue >= 0.2;
    if (is20Percent) {
      alert('Battery is low!');
      
    } else {
      alert(`Battery percentage: ${firstValue / secondValue * 100}%`);
      
    }
  };*/
/*
  const handleAlert = () => {
    if (batteryPercentage <= 20) {
      alert('Battery is low!');
    } else if(batteryPercentage > 20) {
      alert(`You have ${Math.round(100 - batteryPercentage)}% left`);
    }
  };*/
  //---

  return (
    <div>
      <div>
        <button onClick={() => handleTypeChange("scatter")}>Scatter</button>
        <button onClick={() => handleTypeChange("bar")}>Bar</button>
        <button onClick={() => alertFunction()}>Alert</button>
        <fieldset>
          <div>
            <input
              type="radio"
              name="color"
              onClick={() => handleColorChange("red")}
            />
            <label>Red</label>
          </div>
          <div>
            <input
              type="radio"
              name="color"
              onClick={() => handleColorChange("green")}
            />
            <label>Green</label>
          </div>
          <div>
            <input
              type="radio"
              name="color"
              onClick={() => handleColorChange("blue")}
            />
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
                marker: { color: plotColor },
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
                marker: { color: plotColor },
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
      <div>
        <input
          type="checkbox"
          checked={bool}
          onChange={handleToggle}
          onClick={handleToggle}
        />
        <span style={{ fontSize: 16 }}>{bool ? "On" : "Off"}</span>
      </div>
      <div>
      <Plot
        data={[
          {
            values: data.values,
            labels: data.labels,
            type: 'pie',
          },
        ]}
        layout={ {
          width: 500,
          height: 400,
          title: 'Battery usage',
        } }
        
      />
      <button onClick={handlePieChartUpdated}>Check Battery</button>
    </div>
    <div>
    <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 1, 3],
                type: "bar",
                colorscale: 'Hot',
              },
            ]}
            layout={{
              width: 500,
              height: 400,
              title: "button",
            }}
          />
    </div>
    </div>
  );
};

export default TypeChanger;
//onClick={handleAlert} in last button