import React from "react";
import Plot from 'react-plotly.js';
import Indicators from '../components/Indicators.tsx'
import Geo from '../components/Geo.tsx'
import Boxviolin from '../components/Boxviolin.tsx';
import Subplots from '../components/Subplots.tsx';
import Roundbar from '../components/Roundbar.tsx';
import Calendarheatmap from '../components/Calendarheatmap.tsx';
import Multigraph from '../components/Multigraph.tsx';
import Transformgraph from "../components/Transformgraph.tsx";
import Dropdowns from "../components/Dropdowns.tsx";
import Calendar from 'react-calendar'
import ColorChanger from "../components/ColorChanger.tsx";
import TypeChanger from "../components/TypeChanger.tsx";

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
              <Subplots/>
              <Roundbar/>
            </div>
            <div style={{ display: "flex"}}>
              <h1>Calender/Heatmap</h1>
            </div>
            <div style={{ display: "flex"}}>
              <Plot 
                    data= {[{
                        z:[[1,null,20,25,1],[45,46,67,13,85],[26,null,90,52,32]],
                        x: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
                        y: ['Week1','Week2','Week3'],
                        type: 'heatmap',
                    }]}layout={ {width: 500, height: 400, title: 'A Fancy Plot'} }
                />
                <Calendarheatmap />
            </div>
            <div style={{ display: "flex"}}>
              <Calendar />
            </div>
            <div style={{ display: "flex"}}>
              <h1>Multiple graphs</h1>
            </div>
            <div style={{ display: "flex"}}>
              <Multigraph/>
            </div>
            <div style={{ display: "flex"}}>
              <h1>Transforming graphs</h1>
            </div>
            <div style={{ display: "flex"}}>
              <Transformgraph/>
            </div>
            <div style={{ display: "flex"}}>
              <h1>Dropdowns</h1>
            </div>
            <div style={{ display: "flex"}}>
              <Dropdowns/>
            </div>
            <div style={{ display: "flex"}}>
              <ColorChanger/>
            </div>
            <div style={{ display: "flex"}}>
              <TypeChanger/>
            </div>
          </div>
        </div>
      </div>
    )
}