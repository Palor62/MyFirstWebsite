import React from "react";
import Plot from 'react-plotly.js';
import Indicators from '../components/Indicators.tsx'
import Geo from '../components/Geo.tsx'
import Boxviolin from '../components/Boxviolin.tsx';
import Sub from '../components/Subplots.tsx';
import Roundbar from '../components/Roundbar.tsx';

export default function Demo() {
    return (
        <div>
         <div style={{ flexDirection: "row" }}>
          <div style={{ flexDirection: "column" }}>
            <div style={{ display: "flex"}}>
              <h1>Simple</h1>
            </div>
            <div style={{ display: "flex"}}>
            <Plot
                    data={[
                        {
                            x: [1, 2, 3, 4, 5, 6],
                            y: [30, 200, 100, 400, 150, 250],
                            type: 'bar',
                            marker: {color: 'blue'},
                            orientation: "h"
                        },
                    ]}
                    layout={ {width: 500, height: 400, barmode: 'stack'} }
              />
            <Plot
                data={[
                  {
                    type: "scatter3d",
                    x: [1, 2, 3, 4, 5, 6],
                    y: [30, 200, 100, 400, 150, 250],
                    z: [30, 200, 100, 400, 150, 250],
                    mode: "markers",
                    marker: {color: 'blue'},
                  },
                ]} 
                layout={{width: 500, height: 400}}   
              />
              <Plot
                            data={[
                                {
                                    r: [39, 28, 8, 7, 28, 39],
                                    theta: ['A','B','C', 'D', 'E', 'A'],
                                    fill: 'toself',
                                    type: 'scatterpolar',
                                },
                            ]}
                            layout={ {width: 500, height: 400,
                                polar: {
                                    radialaxis: {
                                      visible: true,
                                      range: [0, 50]
                                    }
                                  },
                            } }
                        />
            </div>
            <div style={{ display: "flex"}}>
              <h1>Geo</h1>
            </div>
            <div style={{ display: "flex"}}>
                <Geo/>
            </div>
            <div style={{ display: "flex"}}>
              <h1>Indicators</h1>
            </div>
            <div style={{ display: "flex"}}>
                <Indicators/>
            </div>
            <div style={{ display: "flex"}}>
              <h1>Javascript</h1>
            </div>
            <div style={{ display: "flex"}}>
              <Boxviolin/>
              <Sub/>
              <Roundbar/>
            </div>
          </div>
        </div>
      </div>
    )
}