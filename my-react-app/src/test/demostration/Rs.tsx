import React, { Component, useState, useEffect } from 'react'
import Plot from 'react-plotly.js'

export default class SubPlot extends Component {

    constructor(props){
        super(props)

        var trace1 = {
            x: [1,2,3],
            y: [2,3,4],
            type: 'scatter'
        }

        var trace2 = {
            x: [20,30,40],
            y: [5,5,5],
            xaxis: 'x2',
            yaxis: 'y',
            type:'scatter',
        }

        var trace3 = {
            x: [2,3,4],
            y: [600,700,800],
            xaxis: 'x',
            yaxis: 'y3',
            type: 'scatter'
        }

        var trace4 = {
            x: [4000,5000,6000],
            y: [7000,8000,9000],
            xaxis: 'x4',
            yaxis: 'y4',
            type: 'scatter'
        }

        var data = [trace1,trace2,trace3,trace4]

        var layout = {
            grid: {
                rows: 2,
                columns: 2,
                subplots: [['xy','x2y'],['xy3','x4y4']],
                roworder: 'bottom to top' ,
            }
        };
        this.state = {data: data,layout: layout}
    }

    //Csv
const [data, setData] = useState<any[]>([]);
const processDat = (csvData: string) => {
  const allRows = csvData.split("\n").map((row) => row.split(","));
  const time = [];
  const alt = [];
  const agl = [];
  const vdop = [];
  const hdop = [];
  const snr = [];
  const lat = [];
  const long = [];
  const rssi = [];
  const rssp = [];
  const rssq = [];

  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    time.push(row[0]);
    alt.push(row[1]);
    agl.push(row[2]);
    vdop.push(row[3]);
    hdop.push(row[4]);
    snr.push(row[5]);
    lat.push(row[6]);
    long.push(row[7]);
    rssi.push(row[8]);
    rssp.push(row[9]);
    rssq.push(row[10]);
  }

  setData({ time, alt, agl, vdop, hdop, snr, lat, long, rssi, rssp, rssq });
};

useEffect(() => {
  const fetchDat = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/martinloevborg/martinloevborg.github.io/main/my-react-app/src/test/demostration/points.csv"
      );
      const csvData = await response.text();
      console.log(csvData);
      processDat(csvData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchDat();
}, []);

    render() {
        return (
            <div>
                <Plot
                    data={this.state.data} layout={this.state.layout}
                />
            </div>
        )
    }
}

/*
  const trace1 = {
    x: [1, 2, 3],
    y: [2, 3, 4],
    type: "scatter",
  };

  const trace2 = {
    x: [20, 30, 40],
    y: [5, 5, 5],
    xaxis: "x2",
    yaxis: "y",
    type: "scatter",
  };

  const trace3 = {
    x: [2, 3, 4],
    y: [600, 700, 800],
    xaxis: "x",
    yaxis: "y3",
    type: "scatter",
  };

  const trace4 = {
    x: [4000, 5000, 6000],
    y: [7000, 8000, 9000],
    xaxis: "x4",
    yaxis: "y4",
    type: "scatter",
  };

  // Combine the traces into an array
  const tracedata = [trace1, trace2, trace3, trace4];

  // Define the layout with a grid configuration
  const tracelayout = {
    grid: {
      rows: 2,
      columns: 2,
      subplots: [
        ["xy", "x2y"],
        ["xy3", "x4y4"],
      ],
      roworder: "bottom to top",
    },
  };
*/