import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Collapsible from "react-collapsible";
import Barholder from "./Barholder.tsx"

export default function Dropdowns() {
  return (
    <div>
      <div style={{ flexDirection: "row" }}>
        <div style={{ flexDirection: "column" }}>
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
                  <Barholder />
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
              <Barholder />
            </Collapsible>
          </div>
        </div>      
      </div>      
    </div>
  );
}
