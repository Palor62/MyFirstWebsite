import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import React from "react";

import Demo from "./tabs/Demo.tsx"
import Types from "./tabs/Types.tsx";
import Grid from './tabs/Grid.tsx';
import Replacement from './tabs/Replacement.tsx';
import Testsite from './tabs/Testsite.tsx';
import Prototype from './demostration/Prototype.tsx'

export default function TabsOverview() {
    return (
        <div>
            <h1>Drone Fleet Management Dashboard</h1>
            <Tabs>
              <TabList>
                <Tab>Demo</Tab>
                <Tab>Types</Tab>
                <Tab>Grid</Tab>
                <Tab>Replacement</Tab>
                <Tab>Testsite</Tab>
                <Tab>Prototype</Tab>
              </TabList>
              <TabPanel>
                <Demo />
              </TabPanel>
              <TabPanel>
                <Types />
              </TabPanel>
              <TabPanel style={{width: 1800}}>
                <Grid />
              </TabPanel>
              <TabPanel>
                <div style={{ flexDirection: "row" }}>
                  <div style={{ flexDirection: "column" }}>
                    <div style={{ display: "flex"}}>
                      <Replacement/>
                      <Replacement/>
                    </div>
                    <div style={{ display: "flex"}}>
                      <Replacement/>
                      <Replacement/>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <Testsite/>
              </TabPanel>
              <TabPanel>
                <Prototype/>
              </TabPanel>
            </Tabs>
        </div>
    )
}