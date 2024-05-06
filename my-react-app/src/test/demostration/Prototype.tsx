import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "./style.css";
import logo from "./img/dashboard.png";
import Barholder from "../components/Barholder.tsx";

const bool = true;

export default function Demo() {
  //Csv
  const [data, setData] = useState<any[]>([]);
  const processDat = (csvData: string) => {
    const allRows = csvData.split("\n").map((row) => row.split(","));
    const time = [];
    const alt = [];
    const agl = [];
    const vdop = [];

    for (let i = 0; i < allRows.length; i++) {
      const row = allRows[i];
      time.push(row[0]);
      alt.push(row[1]);
      agl.push(row[2]);
      vdop.push(row[3]);
    }

    setData({ time, alt, agl, vdop });
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
            <div className="cardbox">
              <div className="location">
                <div className="location2">
                  <div className="location3">
                    <div className="number">Usage</div>
                    <div className="number">14</div>
                  </div>
                  <div className="location3">
                    <img src={logo} alt="Logo" className="logo" />
                  </div>
                </div>
              </div>
            </div>
            <div className="cardbox">
              <div className="location">
                <div className="location2">
                  <div className="location3">
                    <div className="number">Location</div>
                    <div className="number">Odense</div>
                  </div>
                  <div className="location3">
                    <img src={logo} alt="Logo" className="logo" />
                  </div>
                </div>
              </div>
            </div>
            <div className="cardbox">
              <div className="location">
                <div className="location2">
                  <div className="location3">
                    <div className="number">Airtime</div>
                    <div className="number">89:53:21</div>
                  </div>
                  <div className="location3">
                    <img src={logo} alt="Logo" className="logo" />
                  </div>
                </div>
              </div>
            </div>
            <div className="cardbox">
              <div className="location">
                <div className="location2">
                  <div className="location3">
                    <div className="number">NoF</div>
                    <div className="number">274</div>
                  </div>
                  <div className="location3">
                    <img src={logo} alt="Logo" className="logo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box3">
            <select>
              <option value="1h">1 hour</option>
              <option value="6h">6 hours</option>
              <option value="12h">12 hours</option>
              <option value="24h">24 hours</option>
            </select>
            <select>
              <option value="1h">ID1</option>
              <option value="6h">ID2</option>
              <option value="12h">ID3</option>
              <option value="24h">ID4</option>
            </select>
            <form>
              <input type="checkbox" />
              <label>ID1</label>
              <input type="checkbox" />
              <label>ID2</label>
              <input type="checkbox" />
              <label>ID3</label>
              <input type="checkbox" />
              <label>ID4</label>
            </form>
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
                      mode: 'lines'
                    },
                  ]}
                  layout={{ title: "AGLBaro through time" }}
                />
                <Plot
                  data={[
                    {
                      x: data.time,
                      y: data.vdop,
                      type: "scatter",
                      line: {shape: 'linear'},
                    },
                  ]}
                  layout={{ title: "VDOP through time" }}
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
            {bool ? (
              <div className="box3">
                <Plot
                  data={[
                    {
                      type: "indicator",
                      value: 111,
                      gauge: { axis: { range: [0, 150] } },
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
                            title: { text: "Speed" },
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
                <Plot
                  data={[
                    {
                      r: [24, 111, 40, 24],
                      theta: ["Temp", "Spd", "Bat", "Temp"],
                      fill: "toself",
                      type: "scatterpolar",
                      name: "latitude",
                    },
                  ]}
                  layout={{
                    width: 500,
                    height: 400,
                    title: "Temp",
                    polar: {
                      radialaxis: {
                        visible: true,
                        range: [0, 120],
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
          </div>
        </div>
      </div>
    </div>
  );
}
