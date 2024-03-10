import React from 'react';
import Plot from 'react-plotly.js';

const ReactVis = () => {
    return (
      <div>
         <div style={{ flexDirection: "row" }}>
          <div style={{ flexDirection: "column" }}>
            <div style={{ display: "flex"}}>
              <Plot
                data={[
                  {
                    x: [1, 2, 3, 4, 5, 6],
                    y: [50, 20, 10, 40, 15, 25],
                    fill: 'tozeroy',
                    type: 'scatter',
                    marker: {color: 'orange'},
                  },
                  {type: 'bar', x: [1, 2, 3, 4, 5, 6], y: [30, 200, 100, 400, 150, 250], marker: {color: 'blue'}},
                ]}
                layout={ {width: 500, height: 400, title: 'A Fancy Plot'} }
              />
              <Plot
                data={[
                  {
                    x: [1, 2, 3, 4, 5, 6],
                    y: [50, 20, 10, 40, 15, 25],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'orange'},
                    line: { shape: 'spline' }
                  },
                  {type: 'scatter', mode: 'lines+markers', x: [1, 2, 3, 4, 5, 6], y: [30, 200, 100, 400, 150, 250], marker: {color: 'blue'}},
                ]}
                layout={ {width: 500, height: 400, title: 'A Fancy Plot'} }
              />
            </div>
            <div style={{ display: "flex"}}>
              <Plot
                data={[
                  {
                    values: [30, 50],
                    hole: .6,
                    type: 'pie',
                  },
                ]}
                layout={ {width: 500, height: 400, title: 'A Fancy Plot'} }
              />
              <Plot
                data={[
                  {
                    values: [30, 120],
                    type: 'pie',
                  },
                ]}
                layout={ {width: 500, height: 400, title: 'A Fancy Plot'} }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

export default ReactVis;