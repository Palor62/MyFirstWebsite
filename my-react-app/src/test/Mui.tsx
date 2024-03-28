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
import Plotly from "react-plotly.js";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Plot from "./extra/Plot.tsx";
import Collapsible from "react-collapsible";
import Frontend from "./extra/Connect.tsx";
//import Tryout from "./extra/Tryout.tsx"; <Tryout/>

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
      <div style={{ flexDirection: "row" }}>
        <div style={{ flexDirection: "column" }}>
          <div style={{ display: "flex"}}>
            <Plotly
              data={chartData.data}
              layout={chartData.layout}
            />
            <Plotly
              data={chart.data}
              layout={chart.layout}
            />
          </div>
          <div style={{ display: "flex"}}>
            <Sidebar style={{borderColor: "black", width: 1000, backgroundColor: "lightsblue"}}>
              <Menu
                menuItemStyles={{
                  button: {
                    // the active class will be added automatically by react router
                    // so we can use it to style the active menu item
                    [`&.active`]: {
                      backgroundColor: "#13395e",
                      color: "#b6c8d9",
                    },
                  },
                }}
              >
                <SubMenu label="Charts">
                  <MenuItem>Pie charts</MenuItem>
                  <MenuItem> Line charts </MenuItem>
                  <Plot />
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem>
              </Menu>
            </Sidebar>
            <Collapsible trigger="Start here" className="collapsible">
              <p>
                This is the collapsible content. It can be any element or React
                component you like.
              </p>
              <p>
                It can even be another Collapsible component. Check out the next
                section!
              </p>
              <Plot />
            </Collapsible>
          </div>
          <div style={{ display: "flex"}}>
            <Frontend/>
          </div>
        </div>      
      </div>      
    </div>
  );
}
/*
const styles = `
  .collapsible {
    background-color: #f5f5f5;
    color: #333;
    transition: all 0.3s ease;
  }

  .collapsible:hover {
    background-color: #ddd;
  }

  .collapsible.is-open {
    background-color: #fff;
  }

  .collapsible-content {
    padding: 0.5em;
    background-color: #fff;
  }
`;
*/
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
