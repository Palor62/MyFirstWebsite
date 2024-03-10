//import { LineChart, Line } from 'recharts';
import React from 'react';
import Plot from "react-plotly.js";

const Re = () => {
  return(
    <div>
      <h1>hi</h1>
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
  );
};


export default Re;

/*
const Re = () => {
  const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

  return(
    <div>
      <h1>hi</h1>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
  </div>
  );
};
*/
/*
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const Re = () => {
  const data = [
    { name: "Facebook", users: 2000000000 },
    { name: "Instagram", users: 1500000000 },
    { name: "Twiter", users: 1000000000 },
    { name: "Telegram", users: 500000000 },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Socail Media Users</h1>
      <div className="App">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
  );
};

*/