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
    const rsrp = [];
    const rsrq = [];

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
      rsrp.push(row[9]);
      rsrq.push(row[10]);
    }

    setData({ time, alt, agl, vdop, hdop, snr, lat, long, rssi, rsrp, rsrq });
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
                  layout={{ title: "Altitude through time", xaxis: {title: 'Time(TS) '}, yaxis: {title: 'Altitude(m)'},}}
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
                  layout={{ title: "AGLBaro through time", xaxis: {title: 'Time(TS) '}, yaxis: {title: 'AGLBaro(m)'}, }}
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
               {type: 'scatter', x: [0,0,0,0,50,55.7,55.7,54.2,0,38.9,0,0,0,0,0,0], y: [0,0,0,0,12.5,12.5,12.5,0,0,12.5,0,0,0,0,0,0], mode: "markers", marker: {color: "rgb(102,0,0)"}},
               {type: 'histogram2dcontour', x: [0,0,0,0,50,55.7,55.7,54.2,0,38.9,0,0,0,0,0,0], y: [0,0,0,0,12.5,12.5,12.5,0,0,12.5,0,0,0,0,0,0]},
               {type: 'histogram', x: [0,0,0,0,50,55.7,55.7,54.2,0,38.9,0,0,0,0,0,0], yaxis: "y2", marker: {color: 'rgb(102,0,0)'},},
               {type: 'histogram', y: [0,0,0,0,12.5,12.5,12.5,0,0,12.5,0,0,0,0,0,0], xaxis: "x2", marker: {color: 'rgb(102,0,0)'},},
              ]}
               layout={{ title: "Latitude and Longtitude", margin: {t: 50}, bargap: 0, showlegend: false,
               xaxis: {
                domain: [0, 0.85],
                showgrid: false,
                zeroline: false,
                title: 'Latitude(°)',
              },
              yaxis: {
                domain: [0, 0.85],
                showgrid: false,
                zeroline: false,
                title: 'Longtitude(°)',
              }, 
              xaxis2: {
                domain: [0.85, 1],
                showgrid: false,
                zeroline: false,
              },
              yaxis2: {
                domain: [0.85, 1],
                showgrid: false,
                zeroline: false
              }
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
              layout={{ title: "VDOP and HDOP through time", xaxis: {title: 'Time(TS) '}, yaxis: {title: 'VDOP/HDOP'}, }}
            />
          </div>
          <div className="box3">
            {bool ? (
              <div className="box3">
                <Plot
                  data={[
                    {
                      type: "indicator",
                      value: 67,
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
                            title: { text: "Average speed" },
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
                      r: [39, 71, 34, 62, 85, 39],
                      theta: ["Temp", "Spd", "Bat(V)", "Msg", "Bat%", "Temp"],
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
                    values: [6, 34],
                    labels: ['Battery used', 'Battery left'],
                    type: 'pie',
                  },
                ]}
                layout={ {width: 500, height: 400, title: 'Battery usage'} }
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
              layout={{ title: "SNR through time", xaxis: {title: 'Time(TS) '}, yaxis: {title: 'SNR(dB)'}, }}
            />
            <Plot
              data={[
                {
                  x: data.time,
                  y: data.rssi,
                  type: "scatter",
                  name: "RSSI",
                },
                {
                  x: data.time,
                  y: data.rsrp,
                  xaxis: "x2",
                  yaxis: "y2",
                  type: "scatter",
                  name: "RSRP",
                },
                {
                  x: data.time,
                  y: data.rsrq,
                  xaxis: "x3",
                  yaxis: "y3",
                  type: "scatter",
                  name: "RSRQ",
                },
              ]}
              layout={{
                title: "Reference Signal(RS) attributes",
                grid: { rows: 3, columns: 1, pattern: "independent" },
                xaxis3: {title: 'Time(TS) '}, yaxis: {title: 'RSSI(dBm)'}, yaxis2: {title: 'RSRP(dBm)'}, yaxis3: {title: 'RSRQ(dB)'}
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

