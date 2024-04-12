import React from "react";
import Tabsview from "../substitution/Tabsview.tsx";

export default function Demo() {
    return (
        <div>
         <div style={{ flexDirection: "row" }}>
          <div style={{ flexDirection: "column" }}>
            <div style={{ display: "flex"}}>
              <h1></h1>
            </div>
            <div style={{ display: "flex"}}>
              <Tabsview/>
            </div>
          </div>
        </div>
      </div>
    )
}