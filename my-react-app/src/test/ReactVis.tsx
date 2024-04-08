import React from 'react';
import Map from './components/Map.tsx';

const ReactVis = () => {
    return (
      <div>
      <div style={{ flexDirection: "row" }}>
          <div style={{ flexDirection: "column" }}>
            <div style={{ display: "flex"}}>
              <Map/>
             
            </div>
            <div style={{ display: "flex"}}>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default ReactVis;