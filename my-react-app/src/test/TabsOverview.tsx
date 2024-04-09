import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import React from "react";

import Demo from "./tabs/Demo.tsx"
import Types from "./tabs/Types.tsx";
import Grid from './tabs/Grid.tsx';
import Replacement from './tabs/Replacement.tsx';

export default function TabsOverview() {
    return (
        <div>
            <h1>Drone Fleet Management Dashboard</h1>
            <Tabs>
              <TabList>
                <Tab>Demo</Tab>
                <Tab>Types</Tab>
                <Tab>Special</Tab>
                <Tab>Non</Tab>
                <Tab>Grid</Tab>
                <Tab>Test</Tab>
              </TabList>
              <TabPanel>
                <Demo />
              </TabPanel>
              <TabPanel>
                <Types />
              </TabPanel>
              <TabPanel style={{width: 1800}}>
              <h1>Drone Fleet Management Dashboard</h1>
              </TabPanel>
              <TabPanel>
              
              </TabPanel>
              <TabPanel style={{width: 1800}}>
                <Grid />
              </TabPanel>
              <TabPanel>
                <Replacement/>
              </TabPanel>
            </Tabs>
        </div>
    )
}