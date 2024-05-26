//Imports
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "../demostration/style.css";

//Circle card interface and component
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

const App: React.FC = () => {
  //States for controls and traces
  const [error, setError] = useState<string | null>(null);
  const [bool, setIsChecked] = useState(true);

  const [timeRange, setTimeRange] = useState("12h"); 
  const [measurements, setMeasurements] = useState<string[]>([]); 
  const [startTime, setStartTime] = useState<string>(""); 
  const [stopTime, setStopTime] = useState<string>(""); 

  const [altTrace, setAltTrace] = useState<any[]>([]);
  const [aglTrace, setAglTrace] = useState<any[]>([]);

  const [vdopTrace, setVdopTrace] = useState<any[]>([]);
  const [hdopTrace, setHdopTrace] = useState<any[]>([]);

  const [latTrace, setLatTrace] = useState<any[]>([]);
  const [latViolinTrace, setLatViolinTrace] = useState<any[]>([]);
  const [latLongTrace, setLatLongTrace] = useState<any[]>([]);
  const [longViolinTrace, setLongViolinTrace] = useState<any[]>([]);
  const [longTrace, setLongTrace] = useState<any[]>([]);

  const [lastTrace, setLastTrace] = useState<any[]>([]);
  const [meanTrace, setMeanTrace] = useState<any[]>([]);
  const [tempTrace, setTempTrace] = useState<any[]>([]);
  const [spdTrace, setSpdTrace] = useState<any[]>([]);
  const [batvTrace, setBatvTrace] = useState<any[]>([]);
  const [msgTrace, setMsgTrace] = useState<any[]>([]);

  const [snrTrace, setSnrTrace] = useState<any[]>([]);
  const [rssiTrace, setRssiTrace] = useState<any[]>([]);
  const [rsrpTrace, setRsrpTrace] = useState<any[]>([]);
  const [rsrqTrace, setRsrqTrace] = useState<any[]>([]);

  const [testTrace, setTestTrace] = useState<any[]>([]);

  const [airtime, setAirtime] = useState("12");
  const [airborne, setAirborne] = useState("false");
  const [disconnected, setDisconnected] = useState("false");

  //List of ID
  const availableMeasurements = [
    "352709570738112",
    "352709570805663",
    "4DF5E020C901F8BC9",
  ];

  //Mapping ID's to colors
  const measurementColors = {
    "352709570738112": "red",
    "352709570805663": "blue",
    "4DF5E020C901F8BC9": "green",
  };

  //Function for changing the boolean value
  const handleToggle = () => {
    setIsChecked(!bool);
  };

  useEffect(() => {
    //Function for calculating selected time range
    const calculateTimeRange = () => {
      const now = new Date();

      const stopTime = now.toISOString();

      let startTime = new Date();
      if (timeRange === "1h") {
        startTime.setHours(now.getHours() - 1);
      } else if (timeRange === "6h") {
        startTime.setHours(now.getHours() - 6);
      } else if (timeRange === "12h") {
        startTime.setHours(now.getHours() - 12);
      } else if (timeRange === "24h") {
        startTime.setHours(now.getHours() - 24);
      }

      setStartTime(startTime.toISOString());
      setStopTime(stopTime);
    };
    calculateTimeRange();

    //Function for changing Airtime card corresponding to selected time range
    const updateAirtimeValue = (range: string) => {
      switch (range) {
        case "1h":
          return "1";
        case "6h":
          return "6";
        case "12h":
          return "12";
        case "24h":
          return "24";
        default:
          return "1";
      }
    };
    setAirtime(updateAirtimeValue(timeRange));

    //If-statement for changing Airborne and Disconnected card depended on selected time range
    if (timeRange === "1h") {
      setAirborne("true");
      setDisconnected("0");
    } else {
      setAirborne("false");
      setDisconnected("3");
    }

    //Function for fetching data from backend endpoints and defining traces while updating the traces state
    const fetchData = async () => {
      try {
        const measurementQuery = measurements
          .map((m) => `measurement=${m}`)
          .join("&");

        const altResponse = await fetch(
          `http://localhost:80/alt?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const aglResponse = await fetch(
          `http://localhost:80/agl?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const vdopResponse = await fetch(
          `http://localhost:80/vdop?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const hdopResponse = await fetch(
          `http://localhost:80/hdop?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const snrResponse = await fetch(
          `http://localhost:80/snr?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const rssiResponse = await fetch(
          `http://localhost:80/rssi?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const rsrpResponse = await fetch(
          `http://localhost:80/rsrp?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const rsrqResponse = await fetch(
          `http://localhost:80/rsrq?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const latResponse = await fetch(
          `http://localhost:80/lat?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const longResponse = await fetch(
          `http://localhost:80/long?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const tempResponse = await fetch(
          `http://localhost:80/temp?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const spdResponse = await fetch(
          `http://localhost:80/spd?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const batvResponse = await fetch(
          `http://localhost:80/batv?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const msgResponse = await fetch(
          `http://localhost:80/msg?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );

        const tempLastResponse = await fetch(
          `http://localhost:80/templast?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const spdLastResponse = await fetch(
          `http://localhost:80/spdlast?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const batvLastResponse = await fetch(
          `http://localhost:80/batvlast?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const msgLastResponse = await fetch(
          `http://localhost:80/msglast?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );

        const tempMeanResponse = await fetch(
          `http://localhost:80/tempmean?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const spdMeanResponse = await fetch(
          `http://localhost:80/spdmean?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const batvMeanResponse = await fetch(
          `http://localhost:80/batvmean?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );
        const msgMeanResponse = await fetch(
          `http://localhost:80/msgmean?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`
        );

        if (
          !altResponse.ok ||
          !aglResponse.ok ||
          !vdopResponse.ok ||
          !hdopResponse.ok ||
          !snrResponse.ok ||
          !rssiResponse.ok ||
          !rsrpResponse.ok ||
          !rsrqResponse.ok ||
          !latResponse.ok ||
          !longResponse.ok ||
          !tempLastResponse.ok ||
          !spdLastResponse.ok ||
          !batvLastResponse.ok ||
          !msgLastResponse.ok ||
          !tempMeanResponse.ok ||
          !spdMeanResponse.ok ||
          !batvMeanResponse.ok ||
          !msgMeanResponse.ok ||
          !tempResponse.ok ||
          !spdResponse.ok ||
          !batvResponse.ok ||
          !msgResponse.ok
        ) {
          throw new Error("Failed to fetch data");
        }
        const altData = await altResponse.json();
        const aglData = await aglResponse.json();
        const vdopData = await vdopResponse.json();
        const hdopData = await hdopResponse.json();
        const snrData = await snrResponse.json();
        const rssiData = await rssiResponse.json();
        const rsrpData = await rsrpResponse.json();
        const rsrqData = await rsrqResponse.json();
        const latData = await latResponse.json();
        const longData = await longResponse.json();
        const tempData = await tempResponse.json();
        const spdData = await spdResponse.json();
        const batvData = await batvResponse.json();
        const msgData = await msgResponse.json();

        const tempLastData = await tempLastResponse.json();
        const spdLastData = await spdLastResponse.json();
        const batvLastData = await batvLastResponse.json();
        const msgLastData = await msgLastResponse.json();

        const tempMeanData = await tempMeanResponse.json();
        const spdMeanData = await spdMeanResponse.json();
        const batvMeanData = await batvMeanResponse.json();
        const msgMeanData = await msgMeanResponse.json();

        const traceForAlt = measurements.map((measurement) => {
          const measurementData = altData[measurement] || [];
          return {
            type: "scatter",
            fill: "tozeroy",
            name: `ID ${measurement}`,
            x: measurementData.map((item: any) => item._time),
            y: measurementData.map((item: any) => item._value),
            line: { color: measurementColors[measurement] || "black" }, 
          };
        });

        const traceForAgl = measurements.map((measurement) => {
          const measurementData = aglData[measurement] || [];
          return {
            type: "scatter",
            mode: "lines",
            fill: "tozeroy",
            name: `ID ${measurement}`,
            x: measurementData.map((item: any) => item._time),
            y: measurementData.map((item: any) => item._value),
            line: {
              color: measurementColors[measurement] || "black",
              shape: "spline",
            }, 
          };
        });

        const traceForVdop = measurements.map((measurement) => {
          const measurementData = vdopData[measurement] || [];
          return {
            type: "scatter",
            mode: "lines+markers",
            name: `ID ${measurement} VDOP`,
            x: measurementData.map((item: any) => item._time),
            y: measurementData.map((item: any) => item._value),
            line: {
              color: measurementColors[measurement] || "black",
              shape: "hv",
            }, 
          };
        });

        const traceForHdop = measurements.map((measurement) => {
          const measurementData = hdopData[measurement] || [];
          return {
            type: "scatter",
            mode: "lines+markers",
            name: `ID ${measurement} HDOP`,
            x: measurementData.map((item: any) => item._time),
            y: measurementData.map((item: any) => item._value),
            line: {
              color: measurementColors[measurement] || "black",
              shape: "hv",
              dash: "dot",
            }, 
          };
        });

        const traceForLat = measurements.map((measurement) => {
          const measurementData = latData[measurement] || [];
          return {
            type: "histogram",
            name: `ID ${measurement}`,
            x: measurementData.map((item: any) => item._value),
            marker: { color: measurementColors[measurement] || "black" },
          };
        });

        const traceForLatViolin = measurements.map((measurement) => {
          const measurementData = latData[measurement] || [];
          return {
            type: "violin",
            yaxis: "y2",
            name: "Lat",
            box: {
              visible: true
            },
            x: measurementData.map((item: any) => item._value),
            marker: { color: measurementColors[measurement] || "black" },
          };
        });

        const traceForLatLong = measurements.map((measurement) => {
          const measurementData1 = latData[measurement] || [];
          const measurementData2 = longData[measurement] || [];
          const alignedData = measurementData1
            .map((latItem: any) => {
              const longItem = measurementData2.find(
                (item: any) => item._time === latItem._time
              );
              return {
                time: latItem._time,
                lat: latItem._value,
                long: longItem ? longItem._value : null,
              };
            })
            .filter((item: any) => item.long !== null); 

          return {
            type: "scatter",
            mode: "markers",
            name: `ID ${measurement}`,
            x: alignedData.map((item: any) => item.lat),
            y: alignedData.map((item: any) => item.long),
            marker: { color: measurementColors[measurement] || "black" },
          };
        });

        const traceForLongViolin = measurements.map((measurement) => {
          const measurementData = longData[measurement] || [];
          return {
            type: "violin",
            name: "Long",
            xaxis: "x2",
            box: {
              visible: true
            },
            y: measurementData.map((item: any) => item._value),
            marker: { color: measurementColors[measurement] || "black" },
          };
        });

        const traceForLong = measurements.map((measurement) => {
          const measurementData = longData[measurement] || [];
          return {
            type: "histogram",
            name: `ID ${measurement}`,
            x: measurementData.map((item: any) => item._value),
            marker: { color: measurementColors[measurement] || "black" },
          };
        });

        const traceForLast = measurements.map((measurement) => {
          const measurementData = tempLastData[measurement] || [];
          const measurementData2 = spdLastData[measurement] || [];
          const measurementData3 = batvLastData[measurement] || [];
          const measurementData4 = msgLastData[measurement] || [];
          const data = measurementData.map((item: any) => item._value);
          const data2 = measurementData2.map((item: any) => item._value);
          const data3 = measurementData3.map((item: any) => item._value);
          const data4 = measurementData4.map((item: any) => item._value);
          const data5 = measurementData3.map((item: any) => item._value / 0.4);
          return {
            r: [...data, ...data2, ...data3, ...data4, ...data5, ...data],
            theta: ["Temp(°C)", "Spd(m/s)", "Bat(V)", "Msg(N)", "Bat%", "Temp(°C)"],
            fill: "toself",
            type: "scatterpolar",
            name: `ID ${measurement}`,
            line: { color: measurementColors[measurement] || "black" },
          };
        });

        const traceForMean = measurements.map((measurement) => {
          const measurementData = tempMeanData[measurement] || [];
          const measurementData2 = spdMeanData[measurement] || [];
          const measurementData3 = batvMeanData[measurement] || [];
          const measurementData4 = msgMeanData[measurement] || [];
          const data = measurementData.map((item: any) => item._value);
          const data2 = measurementData2.map((item: any) => item._value);
          const data3 = measurementData3.map((item: any) => item._value);
          const data4 = measurementData4.map((item: any) => item._value);
          const data5 = measurementData3.map((item: any) => item._value / 0.4);
          return {
            r: [...data, ...data2, ...data3, ...data4, ...data5, ...data],
            theta: ["Temp(°C)", "Spd(m/s)", "Bat(V)", "Msg(N)", "Bat%", "Temp(°C)"],
            fill: "toself",
            type: "scatterpolar",
            name: `ID ${measurement}`,
            line: { color: measurementColors[measurement] || "black" },
          };
        });

        const traceForTemp = measurements.map((measurement) => {
          const measurementData = tempData[measurement] || [];
          return {
            type: "bar",
            name: `ID ${measurement} Temp(°C)`,
            x: measurementData.map((item: any) => item._time),
            y: measurementData.map((item: any) => item._value),
            marker: { color: measurementColors[measurement] || "black" },
          };
        });

        const traceForSpd = measurements.map((measurement) => {
          const measurementData = spdData[measurement] || [];
          return {
            type: "bar",
            name: `ID ${measurement} Spd(m/s)`,
            xaxis: "x2",
            yaxis: "y2",
            x: measurementData.map((item: any) => item._time),
            y: measurementData.map((item: any) => item._value),
            marker: { color: measurementColors[measurement] || "black" },
          };
        });

        const traceForBatv = measurements.map((measurement) => {
          const measurementData = batvData[measurement] || [];
          return {
            type: "bar",
            name: `ID ${measurement} Bat(V)`,
            xaxis: "x3",
            yaxis: "y3",
            x: measurementData.map((item: any) => item._time),
            y: measurementData.map((item: any) => item._value),
            marker: { color: measurementColors[measurement] || "black" },
          };
        });

        const traceForMsg = measurements.map((measurement) => {
          const measurementData = msgData[measurement] || [];
          return {
            type: "bar",
            name: `ID ${measurement} Msg(N)`,
            xaxis: "x4",
            yaxis: "y4",
            x: measurementData.map((item: any) => item._time),
            y: measurementData.map((item: any) => item._value),
            marker: { color: measurementColors[measurement] || "black" },
          };
        });

        const traceForSnr = measurements.map((measurement) => {
          const measurementData = snrData[measurement] || [];
          return {
            type: "scatter",
            mode: "lines",
            name: `ID ${measurement}`,
            x: measurementData.map((item: any) => item._time),
            y: measurementData.map((item: any) => item._value),
            line: { color: measurementColors[measurement] || "black" }, 
          };
        });

        const traceForRssi = measurements.map((measurement) => {
          const measurementData = rssiData[measurement] || [];
          return {
            type: "scatter",
            name: `ID ${measurement} RSSI(strength indicator)`,
            x: measurementData.map((item: any) => item._time),
            y: measurementData.map((item: any) => item._value),
            line: { color: measurementColors[measurement] || "black" }, 
          };
        });

        const traceForRsrp = measurements.map((measurement) => {
          const measurementData = rsrpData[measurement] || [];
          return {
            type: "scatter",
            xaxis: "x2",
            yaxis: "y2",
            name: `ID ${measurement} RSRP(received power)`,
            x: measurementData.map((item: any) => item._time),
            y: measurementData.map((item: any) => item._value),
            line: { color: measurementColors[measurement] || "black" }, 
          };
        });

        const traceForRsrq = measurements.map((measurement) => {
          const measurementData = rsrqData[measurement] || [];
          return {
            type: "scatter",
            xaxis: "x3",
            yaxis: "y3",
            name: `ID ${measurement} RSRQ(received quality)`,
            x: measurementData.map((item: any) => item._time),
            y: measurementData.map((item: any) => item._value),
            line: { color: measurementColors[measurement] || "black" }, 
          };
        });

        const traceForTest = measurements.map((measurement) => {
          const measurementData = latData[measurement] || [];
          const measurementData2 = longData[measurement] || [];
          const data = measurementData.map((item: any) => item._value);
          const data2 = measurementData2.map((item: any) => item._value);
          return {
            type: "scatter",
            mode: "markers",
            name: `ID ${measurement}`,
            x: measurementData.map((item: any) => item.lat),
            y: measurementData2.map((item: any) => item.long),
            marker: { color: measurementColors[measurement] || "black" },
          };
        });

        setAltTrace(traceForAlt);
        setAglTrace(traceForAgl);

        setVdopTrace(traceForVdop);
        setHdopTrace(traceForHdop);

        setLatTrace(traceForLat);
        setLatViolinTrace(traceForLatViolin);
        setLatLongTrace(traceForLatLong);
        setLongViolinTrace(traceForLongViolin);
        setLongTrace(traceForLong);

        setLastTrace(traceForLast);
        setMeanTrace(traceForMean);

        setTempTrace(traceForTemp);
        setSpdTrace(traceForSpd);
        setBatvTrace(traceForBatv);
        setMsgTrace(traceForMsg);

        setSnrTrace(traceForSnr);
        setRssiTrace(traceForRssi);
        setRsrpTrace(traceForRsrp);
        setRsrqTrace(traceForRsrq);

        setTestTrace(traceForTest);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, [measurements, timeRange, startTime, stopTime]);

  return (
    <div>
      <div className="box">
        <div className="box2">
          <div className="box3">
            <h1>AirPlates drone flight history dashboard</h1>
            {/* Toggle checkbox */}
            <div>
              <input
                type="checkbox"
                checked={bool}
                onChange={handleToggle}
                onClick={handleToggle}
              />
              <span style={{ fontSize: 16 }}>{bool ? "On" : "Off"}</span>
            </div>
          </div>
          <div className="box3">
            {/* Circle cards */}
            <Circle value={airborne} label="Airborne" />
            <Circle value={disconnected} label="Disconnectioned" />
            <Circle value={airtime} label="Airtime(h)" />
          </div>
          <div className="box3">
            {/* Checkboxes for selecting the 3 ID's */}
            {availableMeasurements.map((measurement) => (
              <label key={measurement}>
                <input
                  type="checkbox"
                  value={measurement}
                  checked={measurements.includes(measurement)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      setMeasurements((prev) => [...prev, measurement]);
                    } else {
                      setMeasurements((prev) =>
                        prev.filter((m) => m !== measurement)
                      );
                    }
                  }}
                />
                ID {measurement}
              </label>
            ))}

            {/* Dropdown for selecting the time range */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              {["1h", "6h", "12h", "24h"].map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div className="box3">
            {/* If data fails to be fetch from the backend server an error message will be displayed */}
            {error && <div>Error fetching data: {error}</div>}
          </div>
          <h2>Heights during flight</h2>
          {/* Renders the plots if data is accessible */}
          <div className="box3">
            {altTrace.length > 0 && (
              <Plot
                data={altTrace}
                layout={{
                  title: "Altitude through time",
                  xaxis: { title: "Time(TS) " },
                  yaxis: { title: "Altitude(m)" },
                }}
              />
            )}
            {aglTrace.length > 0 && (
              <Plot
                data={aglTrace}
                layout={{
                  title: "AGL(Above Ground Level) through time",
                  xaxis: { title: "Time(TS) " },
                  yaxis: { title: "AGL(m)" },
                }}
              />
            )}
          </div>
          <h2>DOP(Dilution Of Precision) during flight</h2>
          <div className="box3">
            {vdopTrace.length > 0 && hdopTrace.length > 0 && (
              <Plot
                data={[...vdopTrace, ...hdopTrace]}
                layout={{
                  title: "Vertical DOP and Horizontal DOP through time",
                  xaxis: { title: "Time(TS) " },
                  yaxis: { title: "VDOP/HDOP(unitless)" },
                }}
              />
            )}
          </div>
          <h2>Geographic coordinates during flight</h2>
          <div className="box3">
            {latTrace.length > 0 && (
              <Plot
                data={latTrace}
                layout={{
                  title: "Latitude through time",
                  xaxis: { title: "Time(TS) " },
                  yaxis: { title: "Latitude(°)" },
                }}
              />
            )}
            {latLongTrace.length > 0 && latViolinTrace.length > 0 && longViolinTrace.length > 0 &&(
              <Plot
                data={[...latLongTrace, ...latViolinTrace, ...longViolinTrace]}
                layout={{
                  title: "Latitude and Longtitude during flight",
                  margin: { t: 50 },
                  bargap: 0,
                  showlegend: false,
                  xaxis: {
                    domain: [0, 0.85],
                    showgrid: false,
                    zeroline: false,
                    title: "Latitude(°)",
                  },
                  yaxis: {
                    domain: [0, 0.85],
                    showgrid: false,
                    zeroline: false,
                    title: "Longtitude(°)",
                  },
                  xaxis2: {
                    domain: [0.85, 1],
                    showgrid: false,
                    zeroline: false,
                  },
                  yaxis2: {
                    domain: [0.85, 1],
                    showgrid: false,
                    zeroline: false,
                  },
                }}
              />
            )}
            {longTrace.length > 0 && (
              <Plot
                data={longTrace}
                layout={{
                  title: "Longtitude through time",
                  xaxis: { title: "Time(TS) " },
                  yaxis: { title: "Longtitude(°)" },
                }}
              />
            )}
          </div>
          <h2>Statistics of parameters</h2>
          <div className="box3">
            {lastTrace.length > 0 && (
              <Plot
                data={lastTrace}
                layout={{ title: "Last recording parameters" }}
              />
            )}
            {meanTrace.length > 0 && (
              <Plot data={meanTrace} layout={{ title: "Parameters average" }} />
            )}
          </div>
          <h2>Parameters, SNR and RS during flight</h2>
          <div className="box3">
            {tempTrace.length > 0 &&
              spdTrace.length > 0 &&
              batvTrace.length > 0 &&
              msgTrace.length > 0 && (
                <Plot
                  data={[...tempTrace, ...spdTrace, ...batvTrace, ...msgTrace]}
                  layout={{
                    title: "Parameters through time",
                    grid: { rows: 2, columns: 2, pattern: "independent" },
                    xaxis: { showticklabels: false },
                    xaxis2: { showticklabels: false },
                    xaxis3: { title: "Time(TS) " },
                    xaxis4: { title: "Time(TS) " },
                    yaxis: { title: "Temp(°C)" },
                    yaxis2: { title: "Spd(m/s)" },
                    yaxis3: { title: "Bat(V)" },
                    yaxis4: { title: "Msg(N)" },
                  }}
                />
              )}
            {snrTrace.length > 0 && (
              <Plot
                data={snrTrace}
                layout={{
                  title: "SNR(Signal-to-Noise Ratio) through time",
                  xaxis: { title: "Time(TS) " },
                  yaxis: { title: "SNR(dB)" },
                }}
              />
            )}
            {rssiTrace.length > 0 &&
              rsrpTrace.length > 0 &&
              rsrqTrace.length > 0 && (
                <Plot
                  data={[...rssiTrace, ...rsrpTrace, ...rsrqTrace]}
                  layout={{
                    title: "RS(Reference Signal) attributes",
                    grid: { rows: 3, columns: 1, pattern: "independent" },
                    xaxis3: { title: "Time(TS) " },
                    yaxis: { title: "RSSI(dBm)" },
                    yaxis2: { title: "RSRP(dBm)" },
                    yaxis3: { title: "RSRQ(dB)" },
                  }}
                />
              )}
          </div>
          <div className="box3">
            {testTrace.length > 0 && latLongTrace.length > 0 && (
              <Plot
                data={[...testTrace, ...latLongTrace]}
                layout={{
                  title: "Test",
                  margin: { t: 50 },
                  bargap: 0,
                  showlegend: false,
                  xaxis: {
                    domain: [0, 0.85],
                    showgrid: false,
                    zeroline: false,
                    title: "Latitude(°)",
                  },
                  yaxis: {
                    domain: [0, 0.85],
                    showgrid: false,
                    zeroline: false,
                    title: "Longtitude(°)",
                  },
                  xaxis2: {
                    domain: [0.85, 1],
                    showgrid: false,
                    zeroline: false,
                  },
                  yaxis2: {
                    domain: [0.85, 1],
                    showgrid: false,
                    zeroline: false,
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
