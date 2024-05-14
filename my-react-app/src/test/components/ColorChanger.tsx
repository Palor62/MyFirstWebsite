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
//--------------------------------------------------------------------------

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

//--------------------------------------------------------------------------

import React from 'react';
import Plot from 'react-plotly.js';

const ColorChanger = () => {
  const sliderSteps = [
    { label: 'red', method: 'restyle', args: ['line.color', 'red'] },
    { label: 'green', method: 'restyle', args: ['line.color', 'green'] },
    { label: 'blue', method: 'restyle', args: ['line.color', 'blue'] }
  ];

  const slider = {
    pad: { t: 30 },
    currentvalue: {
      xanchor: 'right',
      prefix: 'color: ',
      font: {
        color: '#888',
        size: 20
      }
    },
    steps: sliderSteps
  };

  const data = [{
    x: [1, 2, 3],
    y: [2, 1, 3],
    line: { color: 'red' }
  }];

  const data2 = [{
    x: [1, 2, 3],
    y: [3, 1, 2],
    line: { color: 'red' }
  }];

  const layout = {
    width: 500,
    height: 400,
    title: 'Color slider',
    sliders: [slider]
  };

  return <div>
<Plot data={data} layout={layout} />
  <Plot data={data2} layout={layout} />

  </div>;
};

export default ColorChanger;



