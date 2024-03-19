import React from "react";
import Plot from "react-plotly.js";

const CalendarHeatmap: React.FC = () => {
  // Sample data for demonstration
  const data = [
    {
      type: "heatmap",
      x: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      y: ["Week 1", "Week 2", "Week 3", "Week 4"],
      z: [
        [5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8],
        [3, 4, 5, 6, 7],
        [2, 3, 4, 5, 6],
      ],
      colorscale: "Viridis", // You can use any color scale you prefer
    },
  ];

  const layout = {
    title: "Calendar Heatmap",
    xaxis: {
      title: "Day of Week",
    },
    yaxis: {
      title: "Week Number",
    },
  };

  return <Plot data={data} layout={layout} />;
};

export default CalendarHeatmap;
