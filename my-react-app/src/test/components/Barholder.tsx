import React from "react";
import Plotly from "react-plotly.js";

const Plot = () => {
  const data = [
    {
      type: "bar",
      x: ["giraffes", "orangutans", "monkeys"],
      y: [20, 14, 23],
    },
  ];

  const layout = {width: 500, height: 400};

  return <Plotly data={data} layout={layout} />;
};

export default Plot;
