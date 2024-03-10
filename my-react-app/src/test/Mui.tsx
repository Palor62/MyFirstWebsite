//import * as React from 'react';
//import * from '@mui/x-charts';
//import { BarChart } from '@mui/x-charts';

/*
function Mui() {
  return (
    <div>
    <h1>Hi</h1>
    </div>
    );
}

export default Mui;
*/

/*
<BarChart
xAxis={[
  {
    id: 'barCategories',
    data: ['bar A', 'bar B', 'bar C'],
    scaleType: 'band',
  },
]}
series={[
  {
    data: [2, 5, 3],
  },
]}
width={500}
height={300}
/>
*/

import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function Mui() {
  const [chart, setChart] = useState({
    data: [
      { x: [1, 2, 3, 4, 5, 6], y: [30, 200, 100, 400, 150, 250], type: "bar", name: "data1" },
    ],
    layout: {
      title: "Grouped by Country",
      xaxis: { title: "Country" },
      yaxis: { title: "Medals" },
    },
  });


  useEffect(() => {
    setTimeout(function () {
      setChart({
        data: [{ x: [1, 2, 3, 4, 5, 6], y: [230, 190, 300, 500, 300, 400], type: "scatter", mode: "lines", fill: "tozeroy", name: "data1" }],
        layout: { title: "Updated Chart",       xaxis: { title: "Country" },
        yaxis: { title: "Medals" }, },
      });
    }, 3000);
  }, []);

  //----------------------------------------

  const [chartData, setChartData] = useState({
    data: [
      { x: [1, 2, 3, 4, 5, 6], y: [30, 200, 100, 400, 150, 250], type: "bar", name: "data1" },
    ],
    layout: {
      title: "Grouped by Country",
      xaxis: { title: "Country" },
      yaxis: { title: "Medals" },
    },
  });

  const [index, setIndex] = useState(0);

  // Change the dataset every 1000ms (1 second)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setChartData({
      data: [{
        x: [1, 2, 3, 4, 5, 6],
        y: index === 0 ? [30, 200, 100, 400, 150, 250] : [230, 190, 300, 500, 300, 400],
        type: "bar",
        name: "data1"
      }],
      layout: {
        title: index === 0 ? "Original Chart" : "Updated Chart",
        xaxis: { title: "X Axis" },
        yaxis: { title: "Y Axis" },
      },
    });
  }, [index]);

  return (
    <div>
      <Plot
        data={chartData.data}
        layout={chartData.layout}
      />
      <Plot
        data={chart.data}
        layout={chart.layout}
      />
    </div>
  );
}

/*
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function Animate() {
  const [chartData, setChartData] = useState({
    data: [
      { x: [1, 2, 3, 4, 5, 6], y: [30, 200, 100, 400, 150, 250], type: "bar", name: "data1" },
      { x: [1, 2, 3, 4, 5, 6], y: [50, 20, 10, 40, 15, 25], type: "scatter", mode: "lines", fill: "tozeroy", name: "data2" },
      { x: [1, 2, 3, 4, 5, 6], y: [230, 200, 200, 300, 250, 250], type: "bar", name: "data3" },
    ],
    layout: {
      title: "Grouped by Country",
      xaxis: { title: "Country" },
      yaxis: { title: "Medals" },
    },
  });

  useEffect(() => {
    // Simulate data loading after 1 second
    setTimeout(function () {
      setChartData({
        data: [{ x: [1, 2, 3, 4, 5, 6], y: [230, 190, 300, 500, 300, 400], type: "scatter", mode: "lines", fill: "tozeroy", name: "data1" }],
        layout: { title: "Updated Chart" },
      });
    }, 3000);
  }, []);

  const [index, setIndex] = useState(0);

  // Change the dataset every 1000ms (1 second)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setChartData({
      data: [{
        x: [1, 2, 3, 4, 5, 6],
        y: index === 0 ? [30, 200, 100, 400, 150, 250] : [230, 190, 300, 500, 300, 400],
        type: "bar",
        name: "data1"
      }],
      layout: {
        title: index === 0 ? "Original Chart" : "Updated Chart",
        xaxis: { title: "X Axis" },
        yaxis: { title: "Y Axis" },
      },
    });
  }, [index]);

  return (
    <div>
      <Plot
        data={chartData.data}
        layout={chartData.layout}
      />
    </div>
  );
}

*/
