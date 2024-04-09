import React, { useEffect, useState } from "react";
import Plotly from "react-plotly.js";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export default function Transformgraph() {
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
          </div>      
        </div>      
      </div>
    );
  }