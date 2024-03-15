import { Responsive, WidthProvider } from "react-grid-layout";
import React, { useState } from "react";
import Plot from "./Plot.tsx";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Space: React.FC = () => {
  const [layout, setLayout] = useState([
    { i: "1", x: 0, y: 0, w: 2, h: 2 },
    { i: "2", x: 2, y: 0, w: 2, h: 2 },
    { i: "3", x: 0, y: 2, w: 2, h: 2 },
    { i: "4", x: 2, y: 2, w: 2, h: 2 },
  ]);

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      onLayoutChange={onLayoutChange}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 1 }}
      rowHeight={200}
      width={1200}
    >
      <div key="1" style={{ backgroundColor: "lightblue" }}>
        Component 1
        <Plot/>
      </div>
      <div key="2" style={{ backgroundColor: "lightgreen" }}>
        Component 2
      </div>
      <div key="3" style={{ backgroundColor: "lightcoral" }}>
        Component 3
      </div>
      <div key="4" style={{ backgroundColor: "yellow" }}>
        Component 4
      </div>
    </ResponsiveGridLayout>
  );
};

export default Space;