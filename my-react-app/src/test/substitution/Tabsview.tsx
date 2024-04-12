import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import React from "react";
import View from "./View.tsx"
import Drone from "./Drone.tsx"
import Dato from "./Dato.tsx"
export default function Tabview() {
    return (
        <div>
            <h1>Drone Fleet Dashboard</h1>
            <Tabs>
              <TabList>
                <Tab>View</Tab>
                <Tab>Drone</Tab>
                <Tab>Dato</Tab>
              </TabList>
              <TabPanel>
                <h1>Textholder</h1>
                <View/>
              </TabPanel>
              <TabPanel>
                <h1>Textholder</h1>
                <Drone/>
              </TabPanel>
              <TabPanel>
                <h1>Tests</h1>
                <Dato/>
              </TabPanel>
            </Tabs>
        </div>
    )
}