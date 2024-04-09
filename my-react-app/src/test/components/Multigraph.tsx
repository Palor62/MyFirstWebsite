import React from "react";
import Plot from 'react-plotly.js';

const Multigraph = () => {
    return (
      <div>
         <div style={{ flexDirection: "row" }}>
          <div style={{ flexDirection: "column" }}>
            <div style={{ display: "flex"}}>
                <Plot
                    data={[
                        {
                            x: [1, 2, 3, 4, 5, 6],
                            y: [30, 200, 100, 400, 150, 250],
                            type: 'bar',
                            marker: {color: 'blue'}
                        },
                        {type: 'bar', x: [1, 2, 3, 4, 5, 6], y: [230, 200, 200, 300, 250, 250], marker: {color: 'green'}},
                        {type: 'scatter', mode: 'lines+markers', x: [1, 2, 3, 4, 5, 6], y: [50, 20, 10, 40, 15, 25], marker: {color: 'orange'}, line: { shape: 'spline' }, fill: 'tozeroy'},
                    ]}
                    layout={ {width: 500, height: 400, barmode: 'stack'} }
                />
                <Plot
                    data={[
                        {
                            x: [1, 2, 3, 4, 5, 6],
                            y: [30, 200, 100, 400, 150, 250],
                            type: 'bar',
                            marker: {color: 'blue'}
                        },
                        {type: 'scatter', mode: 'lines+markers', x: [1, 2, 3, 4, 5, 6], y: [50, 20, 10, 40, 15, 25], marker: {color: 'orange'}, fill: 'tozeroy'},
                    ]}
                    layout={ {width: 500, height: 400, barmode: 'stack'} }
                />
                <Plot
                    data={[
                        {
                            x: [1, 2, 3, 4, 5, 6],
                            y: [30, 200, 100, 400, 150, 250],
                            type: 'bar',
                            name: 'Name1',
                            marker: {color: 'red'}
                        },
                        {type: 'bar', x: [1, 2, 3, 4, 5, 6], y: [230, 200, 200, 300, 250, 250], marker: {color: 'yellow'}},
                        {type: 'scatter', mode: 'lines+markers', x: [1, 2, 3, 4, 5, 6], y: [50, 20, 10, 40, 15, 25], marker: {color: 'green'}, name: 'Name2',},
                    ]}
                    layout={ {width: 500, height: 400, barmode: 'group'} }
                />
            </div>
            <div style={{ display: "flex"}}>
            </div>
            <div style={{ display: "flex"}}>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Multigraph;
