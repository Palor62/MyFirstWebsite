import React from "react";
import Plot from 'react-plotly.js';

export default function Indicators() {
    return (
        <div>
         <div style={{ flexDirection: "row" }}>
          <div style={{ flexDirection: "column" }}>
            <div style={{ display: "flex"}}>
            <Plot
                data={[
                  {
                    type: "indicator",
                    value: 200,
                    delta: { reference: 160 },
                    gauge: { axis: { visible: false, range: [0, 250] } },
                    domain: { row: 0, column: 0 }
                  },
                ]} 
                layout={ {width: 500, height: 400,
                  margin: { t: 25, b: 25, l: 25, r: 25 },
                  grid: { rows: 2, columns: 2, pattern: "independent" },
                  template: {
                    data: {
                      indicator: [
                        {
                          title: { text: "Speed" },
                          mode: "gauge+number+delta",
                          delta: { reference: 90 }
                        }
                      ]
                    }
                  }
                } }   
              />
              <Plot
                            data={[
                            {
                                type: "indicator",
                                value: 220,
                                delta: { reference: 300 },
                                gauge: { shape: "bullet" },
                                domain: { row: 0, column: 0 }
                            },
                            ]} 
                            layout={ {width: 700, height: 300,
                            grid: { rows: 2, columns: 2, pattern: "independent" },
                            template: {
                                data: {
                                indicator: [
                                    {
                                    title: { text: "Speed" },
                                    mode: "gauge+number+delta",
                                    delta: { reference: 90 }
                                    }
                                ]
                                }
                            }
                            } }   
                        />
                        <Plot
                            data={[
                            {
                                type: "indicator",
                                value: 220,
                                delta: { reference: 300 },
                                gauge: { shape: "bullet" },
                                domain: { row: 0, column: 0 }
                            },
                            ]} 
                            layout={ {width: 700, height: 300,
                            grid: { rows: 2, columns: 2, pattern: "independent" },
                            template: {
                                data: {
                                indicator: [
                                    {
                                    title: { text: "Speed" },
                                    mode: "number+delta",
                                    delta: { reference: 90, position: "top" }
                                    }
                                ]
                                }
                            }
                            } }   
                        />
            </div>
          </div>
        </div>
      </div>
    )
}