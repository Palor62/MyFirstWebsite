import React from "react";
import Plot from 'react-plotly.js';

export default function Geo() {
    return (
        <div>
         <div style={{ flexDirection: "row" }}>
          <div style={{ flexDirection: "column" }}>
            <div style={{ display: "flex"}}>
            <Plot
                data={[
                  {
                    type: 'scattergeo',
                    lat: [ 40.7127, 51.5072 ],
                    lon: [ -74.0059, 0.1275 ],
                    mode: 'lines',
                    line:{
                        width: 2,
                        color: 'blue'
                    }
                  }
                ]}
                layout={ {width: 500, height: 400, title: 'A Fancy Plot'} }
              />
              <Plot
                data={[
                  {
                    type: 'scattergeo',
                    mode: 'markers',
                    locations: ['FRA', 'DEU', 'RUS', 'ESP'],
                    marker: {
                        size: [20, 30, 15, 10],
                        color: [10, 20, 40, 50],
                        cmin: 0,
                        cmax: 50,
                        colorscale: 'Greens',
                        colorbar: {
                            title: 'Some rate',
                            ticksuffix: '%',
                            showticksuffix: 'last'
                        },
                        line: {
                            color: 'black'
                        }
                    },
                    name: 'europe data'
                  }
                ]}
                layout={ {width: 500, height: 400, title: 'A Fancy Plot'} }
              />   
            </div>
          </div>
        </div>
      </div>
    )
}