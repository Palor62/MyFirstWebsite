import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "./style.css";
import Barholder from "../components/Barholder.tsx";

const bool = true; 

//Circle
interface CircleProps {
  value: string;
  label: string;
}

const Circle: React.FC<CircleProps> = ({ value, label }) => {
  return (
    <div className="circle">
      <div className="circle-content">
        <div className="value">{value}</div>
        <div className="label">{label}</div>
      </div>
    </div>
  );
};

export default function Demo() {
  //Csv
  const [data, setData] = useState<any[]>([]);
  const processDat = (csvData: string) => {
    const allRows = csvData.split("\n").map((row) => row.split(","));
    const time = [];
    const alt = [];
    const agl = [];
    const vdop = [];
    const hdop = [];
    const snr = [];
    const lat = [];
    const long = [];
    const rssi = [];
    const rssp = [];
    const rssq = [];

    for (let i = 0; i < allRows.length; i++) {
      const row = allRows[i];
      time.push(row[0]);
      alt.push(row[1]);
      agl.push(row[2]);
      vdop.push(row[3]);
      hdop.push(row[4]);
      snr.push(row[5]);
      lat.push(row[6]);
      long.push(row[7]);
      rssi.push(row[8]);
      rssp.push(row[9]);
      rssq.push(row[10]);
    }

    setData({ time, alt, agl, vdop, hdop, snr, lat, long, rssi, rssp, rssq });
  };

  useEffect(() => {
    const fetchDat = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/martinloevborg/martinloevborg.github.io/main/my-react-app/src/test/demostration/points.csv"
        );
        const csvData = await response.text();
        console.log(csvData);
        processDat(csvData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDat();
  }, []);

  return (
    <div>
      <div className="box">
        <div className="box2">
          <div className="box3">
            <h1>AirPlates drone flight history</h1>
          </div>
          <div className="box3">
            <Circle value={"false"} label="Airborne" />
            <Circle value={"0"} label="Disconnectioned" />
            <Circle value={"1"} label="Airtime(h)" />
          </div>
          <div className="box3">
            {bool ? (
              <div className="box3">
                <Plot
                  data={[
                    {
                      x: data.time,
                      y: data.alt,
                      type: "scatter",
                      fill: "tozeroy",
                    },
                  ]}
                  layout={{ title: "Altitude through time" }}
                />
                <Plot
                  data={[
                    {
                      x: data.time,
                      y: data.agl,
                      type: "scatter",
                      mode: "lines",
                      fill: "tozeroy",
                      line: { shape: "spline" },
                    },
                  ]}
                  layout={{ title: "AGLBaro through time" }}
                />
              </div>
            ) : (
              <div className="box3">
                <Barholder />
                <Barholder />
              </div>
            )}
          </div>
          <div className="box3">
            <Plot
              data={[
                {
                  r: [39, 28, 8, 7, 28, 39, 18, 11, 39],
                  theta: ["E", "NE", "N", "NW", "W", "SW", "S", "SE", "E"],
                  fill: "toself",
                  type: "scatterpolar",
                  name: "latitude",
                },
                {
                  r: [30, 39, 17, 9, 6, 33, 12, 48, 30],
                  theta: ["E", "NE", "N", "NW", "W", "SW", "S", "SE", "E"],
                  fill: "toself",
                  type: "scatterpolar",
                  name: "longtitude",
                },
              ]}
              layout={{
                title: "Latitude and Longtitude",
                polar: {
                  radialaxis: {
                    visible: true,
                    range: [0, 50],
                  },
                },
              }}
            />
            <Plot
              data={[
                {
                  x: data.time,
                  y: data.vdop,
                  type: "scatter",
                  line: { shape: "hv" },
                  mode: "lines+markers",
                  name: "VDOP",
                },
                {
                  x: data.time,
                  y: data.hdop,
                  type: "scatter",
                  line: { shape: "hv" },
                  mode: "lines+markers",
                  name: "HDOP",
                },
              ]}
              layout={{ title: "VDOP and HDOP through time" }}
            />
          </div>
          <div className="box3">
            {bool ? (
              <div className="box3">
                <Plot
                  data={[
                    {
                      type: "indicator",
                      value: 87,
                      gauge: { axis: { range: [0, 100] } },
                      domain: { row: 0, column: 0 },
                    },
                  ]}
                  layout={{
                    width: 500,
                    height: 400,
                    margin: { t: 25, b: 25, l: 25, r: 25 },
                    grid: { rows: 2, columns: 2, pattern: "independent" },
                    template: {
                      data: {
                        indicator: [
                          {
                            title: { text: "Top speed" },
                            mode: "gauge+number",
                          },
                        ],
                      },
                    },
                  }}
                />
                <Plot
                  data={[
                    {
                      r: [39, 71, 58, 62, 48, 39],
                      theta: ["Temp", "Spd", "Bat", "Msg", "Bat%", "Temp"],
                      fill: "toself",
                      type: "scatterpolar",
                    },
                  ]}
                  layout={{
                    width: 500,
                    height: 400,
                    title: "Last recording parameters",
                    polar: {
                      radialaxis: {
                        visible: true,
                        range: [0, 100],
                      },
                    },
                  }}
                />
                <Plot
                  data={[
                    {
                      type: "indicator",
                      value: 40,
                      gauge: { shape: "bullet", axis: { range: [0, 100] } },
                      domain: { row: 0, column: 0 },
                    },
                  ]}
                  layout={{
                    width: 700,
                    height: 300,
                    grid: { rows: 2, columns: 2, pattern: "independent" },
                    template: {
                      data: {
                        indicator: [
                          {
                            title: { text: "Battery" },
                            mode: "gauge+number",
                          },
                        ],
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <div className="box3">
                <Barholder />
                <Barholder />
                <Barholder />
              </div>
            )}
          </div>
          <div className="box3">
            <Plot
              data={[
                {
                  x: data.time,
                  y: data.snr,
                  type: "scatter",
                  mode: "lines",
                },
              ]}
              layout={{ title: "SNR through time" }}
            />
            <Plot
              data={[
                {
                  x: data.time,
                  y: data.rssi,
                  type: "scatter",
                  name: "rssi"
                },
                {
                  x: data.time,
                  y: data.rssp,
                  xaxis: 'x2',
                  yaxis: 'y2',
                  type: "scatter",
                  name: "rssp"
                },
                {
                  x: data.time,
                  y: data.rssq,
                  xaxis: 'x3',
                  yaxis: 'y3',
                  type: "scatter",
                  name: "rssq"
                },
                {
                  x: data.time,
                  y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  xaxis: 'x4',
                  yaxis: 'y4',
                  type: "scatter",
                  name: "rssq_nc"
                },
              ]}
              layout={{ title: "Rs", grid: {rows: 2, columns: 2, pattern: 'independent'}, }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
/*    const rssi = [];
    const rssp = [];
    const rssq = [];
    //rsrq_nc = 0
    */ 