import React, { Component } from 'react'
import Plot from 'react-plotly.js'
export default class Comp extends Component {
    render() {
        return (
            <div>
                <div style={{ flexDirection: "row" }}>
                    <div style={{ flexDirection: "column" }}>
                        <div style={{ display: "flex"}}>
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
                    </div>
                </div>
            </div>
        )
    }
}