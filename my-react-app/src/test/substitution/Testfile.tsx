/*
import React from 'react';
import Plot from 'react-plotly.js';

const makeTrace = (i: number) => {
  return {
    y: Array.from({ length: 10 }, () => Math.random()),
    line: {
      shape: 'spline',
      color: 'red',
    },
    visible: i === 0,
    name: 'Data set ' + i,
  };
};

const Testfile: React.FC = () => {
  const traces = [0, 1, 2, 3].map(makeTrace);

  const handleColorChange = (color: string) => {
    const newTraces = traces.map(trace => ({
      ...trace,
      line: { ...trace.line, color },
    }));
    return newTraces;
  };

  const handleVisibilityChange = (index: number) => {
    const newTraces = traces.map((trace, i) => ({
      ...trace,
      visible: i === index,
    }));
    return newTraces;
  };

  const layout = {
    updatemenus: [
      {
        y: 0.8,
        yanchor: 'top',
        buttons: [
          {
            method: 'restyle',
            args: ['line.color', 'red'],
            label: 'red',
          },
          {
            method: 'restyle',
            args: ['line.color', 'blue'],
            label: 'blue',
          },
          {
            method: 'restyle',
            args: ['line.color', 'green'],
            label: 'green',
          },
        ],
      },
      {
        y: 1,
        yanchor: 'top',
        buttons: [
          {
            method: 'restyle',
            args: ['visible', [true, false, false, false]],
            label: 'Data set 0',
          },
          {
            method: 'restyle',
            args: ['visible', [false, true, false, false]],
            label: 'Data set 1',
          },
          {
            method: 'restyle',
            args: ['visible', [false, false, true, false]],
            label: 'Data set 2',
          },
          {
            method: 'restyle',
            args: ['visible', [false, false, false, true]],
            label: 'Data set 3',
          },
        ],
      },
    ],
  };

  return (
    <div>
      <Plot data={traces} layout={layout} />
    </div>
  );
};

export default Testfile;
*/


/*
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const Testfile: React.FC = () => {
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

export default Testfile;
*/















/*
import React from 'react';
import Plot from 'react-plotly.js';

const Testfile: React.FC = () => {
  const data = [
    {
      x: [1, 2, 3],
      y: [2, 1, 3],
      line: {
        color: 'red',
        simplify: false,
      }
    }
  ];

  const layout = {
    sliders: [{
      pad: {t: 30},
      x: 0.05,
      len: 0.95,
      currentvalue: {
        xanchor: 'right',
        prefix: 'color: ',
        font: {
          color: '#888',
          size: 20
        }
      },
      transition: {duration: 500},
      steps: [{
        label: 'red',
        method: 'animate',
        args: [['red'], {
          mode: 'immediate',
          frame: {redraw: false, duration: 500},
          transition: {duration: 500}
        }]
      }, {
        label: 'green',
        method: 'animate',
        args: [['green'], {
          mode: 'immediate',
          frame: {redraw: false, duration: 500},
          transition: {duration: 500}
        }]
      }, {
        label: 'blue',
        method: 'animate',
        args: [['blue'], {
          mode: 'immediate',
          frame: {redraw: false, duration: 500},
          transition: {duration: 500}
        }]
      }]
    }],
    updatemenus: [{
      type: 'buttons',
      showactive: false,
      x: 0.05,
      y: 0,
      xanchor: 'right',
      yanchor: 'top',
      pad: {t: 60, r: 20},
      buttons: [{
        label: 'Play',
        method: 'animate',
        args: [null, {
          fromcurrent: true,
          frame: {redraw: false, duration: 1000},
          transition: {duration: 500}
        }]
      }]
    }]
  };

  const frames = [
    {
      name: 'red',
      data: [{
        y: [2, 1, 3],
        'line.color': 'red'
      }]
    }, {
      name: 'green',
      data: [{
        y: [3, 2, 1],
        'line.color': 'green'
      }]
    }, {
      name: 'blue',
      data: [{
        y: [1, 3, 2],
        'line.color': 'blue'
      }]
    }
  ];

  return (
    <Plot
      data={data}
      layout={layout}
      frames={frames}
    />
  );
};

export default Testfile;
*/












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
