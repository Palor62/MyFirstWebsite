import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import "../demostration/style.css";

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
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('12h'); // State to manage the selected time range
  const [measurements, setMeasurements] = useState<string[]>([]); // State to manage selected measurements
  const [startTime, setStartTime] = useState<string>(''); // State to manage the start time
  const [stopTime, setStopTime] = useState<string>(''); // State to manage the stop time
  
  const [altTrace, setAltTrace] = useState<any[]>([]);
  const [aglTrace, setAglTrace] = useState<any[]>([]);

  const [vdopTrace, setVdopTrace] = useState<any[]>([]);
  const [hdopTrace, setHdopTrace] = useState<any[]>([]);

  const [latTrace, setLatTrace] = useState<any[]>([]);
  const [latLongTrace, setLatLongTrace] = useState<any[]>([]);
  const [longTrace, setLongTrace] = useState<any[]>([]);

  const [tempTrace, setTempTrace] = useState<any[]>([]);
  const [spdTrace, setSpdTrace] = useState<any[]>([]);
  const [batvTrace, setBatvTrace] = useState<any[]>([]);
  const [msgTrace, setMsgTrace] = useState<any[]>([]);
  const [lastTrace, setLastTrace] = useState<any[]>([]);
  const [meanTrace, setMeanTrace] = useState<any[]>([]);

  const [snrTrace, setSnrTrace] = useState<any[]>([]);
  const [rssiTrace, setRssiTrace] = useState<any[]>([]);
  const [rsrpTrace, setRsrpTrace] = useState<any[]>([]);
  const [rsrqTrace, setRsrqTrace] = useState<any[]>([]);

  const [testTrace, setTestTrace] = useState<any[]>([]);

  const [airtime, setAirtime] = useState('12');
  const [airborne, setAirborne] = useState('false');
  const [disconnected, setDisconnected] = useState('false');

  // List of available measurements to choose from
  const availableMeasurements = [
    '352709570738112',
    '352709570805663',
    '4DF5E020C901F8BC9'
  ];

  // Define a mapping of measurements to colors
  const measurementColors = {
    '352709570738112': 'red',
    '352709570805663': 'blue',
    '4DF5E020C901F8BC9': 'green'
    // Add more colors for additional measurements
  };

  useEffect(() => {
    const calculateTimeRange = () => {
      const now = new Date(); // Current time

      // Calculate the stop time
      const stopTime = now.toISOString();

      // Calculate the start time based on the selected time range
      let startTime = new Date();
      if (timeRange === '1h') {
        startTime.setHours(now.getHours() - 1);
      } else if (timeRange === '6h') {
        startTime.setHours(now.getHours() - 6);
      } else if (timeRange === '12h') {
        startTime.setHours(now.getHours() - 12);
      } else if (timeRange === '24h') {
        startTime.setHours(now.getHours() - 24);
      }

      setStartTime(startTime.toISOString());
      setStopTime(stopTime);
    };
    calculateTimeRange();

    const updateAirtimeValue = (range: string) => {
        switch (range) {
          case '1h':
            return '1';
          case '6h':
            return '6';
          case '12h':
            return '12';
          case '24h':
            return '24';
          default:
            return '1';
        }
    };
    setAirtime(updateAirtimeValue(timeRange));

    if (timeRange === '1h') {
        setAirborne('true');
        setDisconnected('0');
      } else {
        setAirborne('false');
        setDisconnected('3');
      }

    const fetchData = async () => {
      try {
        // Create a query string with the selected measurements
        const measurementQuery = measurements.map((m) => `measurement=${m}`).join('&');

        // Fetch data from the backend server
        const altResponse = await fetch(`http://localhost:80/alt?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const aglResponse = await fetch(`http://localhost:80/agl?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const vdopResponse = await fetch(`http://localhost:80/vdop?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const hdopResponse = await fetch(`http://localhost:80/hdop?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const snrResponse = await fetch(`http://localhost:80/snr?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const rssiResponse = await fetch(`http://localhost:80/rssi?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const rsrpResponse = await fetch(`http://localhost:80/rsrp?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const rsrqResponse = await fetch(`http://localhost:80/rsrq?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const latResponse = await fetch(`http://localhost:80/lat?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const longResponse = await fetch(`http://localhost:80/long?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const tempResponse = await fetch(`http://localhost:80/temp?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const spdResponse = await fetch(`http://localhost:80/spd?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const batvResponse = await fetch(`http://localhost:80/batv?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const msgResponse = await fetch(`http://localhost:80/msg?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);

        const tempLastResponse = await fetch(`http://localhost:80/templast?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const spdLastResponse = await fetch(`http://localhost:80/spdlast?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const batvLastResponse = await fetch(`http://localhost:80/batvlast?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const msgLastResponse = await fetch(`http://localhost:80/msglast?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);

        const tempMeanResponse = await fetch(`http://localhost:80/tempmean?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const spdMeanResponse = await fetch(`http://localhost:80/spdmean?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const batvMeanResponse = await fetch(`http://localhost:80/batvmean?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        const msgMeanResponse = await fetch(`http://localhost:80/msgmean?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);

        if (!altResponse.ok || !aglResponse.ok || !vdopResponse.ok || !hdopResponse.ok || !snrResponse.ok || !rssiResponse.ok || !rsrpResponse.ok || !rsrqResponse.ok 
          || !latResponse.ok || !longResponse.ok || !tempLastResponse.ok || !spdLastResponse.ok || !batvLastResponse.ok || !msgLastResponse.ok 
          || !tempMeanResponse.ok || !spdMeanResponse.ok || !batvMeanResponse.ok || !msgMeanResponse.ok 
          || !tempResponse.ok || !spdResponse.ok || !batvResponse.ok || !msgResponse.ok) {
          throw new Error('Failed to fetch data');
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

        // Create an array of traces for Plotly, one for each measurement
        const traceForAlt = measurements.map((measurement) => {
          const measurementData = altData[measurement] || [];
          return {
            type: 'scatter',
            fill: "tozeroy",
            name: `Measurement ${measurement}`,
            x: measurementData.map((item: any) => item._time),
            y: measurementData.map((item: any) => item._value),
            line: { color: measurementColors[measurement] || 'black' } // Use the defined color or fallback to black
          };
        });

        const traceForAgl = measurements.map((measurement) => {
            const measurementData = aglData[measurement] || [];
            return {
              type: "scatter",
              mode: "lines",
              fill: "tozeroy",
              name: `Measurement ${measurement}`,
              x: measurementData.map((item: any) => item._time),
              y: measurementData.map((item: any) => item._value),
              line: { color: measurementColors[measurement] || 'black', shape: "spline" } // Use the defined color or fallback to black
            };
          });

          const traceForLatLong = measurements.map((measurement) => {
            const measurementData1 = latData[measurement] || [];
            const measurementData2 = longData[measurement] || [];
            const alignedData = measurementData1.map((latItem: any) => {
                const longItem = measurementData2.find((item: any) => item._time === latItem._time);
            return {
                time: latItem._time,
                lat: latItem._value,
                long: longItem ? longItem._value : null,
            };
        }).filter((item: any) => item.long !== null); // Filter out data points where speed is not available

        return {
            //type: 'histogram2dcontour',
            type: 'scatter',
            mode: 'markers',
            name: `Measurement ${measurement}`,
            x: alignedData.map((item: any) => item.lat),
            y: alignedData.map((item: any) => item.long),
            marker: { color: measurementColors[measurement] || 'black' }
            };
          });

          const traceForVdop = measurements.map((measurement) => {
            const measurementData = vdopData[measurement] || [];
            return {
              type: "scatter",
              mode: "lines+markers",
              name: `Measurement ${measurement} VDOP`,
              x: measurementData.map((item: any) => item._time),
              y: measurementData.map((item: any) => item._value),
              line: { color: measurementColors[measurement] || 'black', shape: "hv" } // Use the defined color or fallback to black
            };
          });

          const traceForHdop = measurements.map((measurement) => {
            const measurementData = hdopData[measurement] || [];
            return {
              type: "scatter",
              mode: "lines+markers",
              name: `Measurement ${measurement} HDOP`,
              x: measurementData.map((item: any) => item._time),
              y: measurementData.map((item: any) => item._value),
              line: { color: measurementColors[measurement] || 'black', shape: "hv", dash: "dot" } // Use the defined color or fallback to black
            };
          });

          const traceForSpd = measurements.map((measurement) => {
            const measurementData = spdData[measurement] || [];
            return {
              type: "bar",
              name: `Measurement ${measurement}`,
              x: measurementData.map((item: any) => item._time),
              y: measurementData.map((item: any) => item._value),
              line: { color: measurementColors[measurement] || 'black' }
            };
          });

          const traceForLast = measurements.map((measurement) => {
            const measurementData = tempLastData[measurement] || [];
            const measurementData2 = spdLastData[measurement] || [];
            const measurementData3 = batvLastData[measurement] || [];
            const measurementData4 = msgLastData[measurement] || [];
            const data = measurementData.map((item: any) => item._value)
            const data2 = measurementData2.map((item: any) => item._value)
            const data3 = measurementData3.map((item: any) => item._value)
            const data4 = measurementData4.map((item: any) => item._value)
            const data5 = measurementData3.map((item: any) => item._value * 10)
            return {
              r: [...data , ...data2, ...data3 , ...data4, ...data5, ...data],
            theta: [
                              "temp",
                              "Spd",
                              "Bat(V)",
                              "Msg",
                              "Bat%",
                              "temp",
                            ],
            fill: "toself",
            type: "scatterpolar",
            name: `Measurement ${measurement}`,
            line: { color: measurementColors[measurement] || 'black'}
            };
          });

          const traceForMean = measurements.map((measurement) => {
            const measurementData = tempMeanData[measurement] || [];
            const measurementData2 = spdMeanData[measurement] || [];
            const measurementData3 = batvMeanData[measurement] || [];
            const measurementData4 = msgMeanData[measurement] || [];
            const data = measurementData.map((item: any) => item._value)
            const data2 = measurementData2.map((item: any) => item._value)
            const data3 = measurementData3.map((item: any) => item._value)
            const data4 = measurementData4.map((item: any) => item._value)
            const data5 = measurementData3.map((item: any) => item._value * 10)
            return {
              r: [...data , ...data2, ...data3 , ...data4, ...data5, ...data],
            theta: [
                              "temp",
                              "Spd",
                              "Bat(V)",
                              "Msg",
                              "Bat%",
                              "temp",
                            ],
            fill: "toself",
            type: "scatterpolar",
            name: `Measurement ${measurement}`,
            line: { color: measurementColors[measurement] || 'black'}
            };
          });

          const traceForSnr = measurements.map((measurement) => {
            const measurementData = snrData[measurement] || [];
            return {
              type: "scatter",
              mode: "lines",
              name: `Measurement ${measurement}`,
              x: measurementData.map((item: any) => item._time),
              y: measurementData.map((item: any) => item._value),
              line: { color: measurementColors[measurement] || 'black' } // Use the defined color or fallback to black
            };
          });

          const traceForRssi = measurements.map((measurement) => {
            const measurementData = rssiData[measurement] || [];
            return {
              type: "scatter",
              name: `Measurement ${measurement}`,
              x: measurementData.map((item: any) => item._time),
              y: measurementData.map((item: any) => item._value),
              line: { color: measurementColors[measurement] || 'black' } // Use the defined color or fallback to black
            };
          });

          const traceForRsrp = measurements.map((measurement) => {
            const measurementData = rsrpData[measurement] || [];
            return {
              type: "scatter",
              xaxis: "x2",
              yaxis: "y2",
              name: `Measurement ${measurement}`,
              x: measurementData.map((item: any) => item._time),
              y: measurementData.map((item: any) => item._value),
              line: { color: measurementColors[measurement] || 'black' } // Use the defined color or fallback to black
            };
          });

          const traceForRsrq = measurements.map((measurement) => {
            const measurementData = rsrqData[measurement] || [];
            return {
              type: "scatter",
              xaxis: "x3",
              yaxis: "y3",
              name: `Measurement ${measurement}`,
              x: measurementData.map((item: any) => item._time),
              y: measurementData.map((item: any) => item._value),
              line: { color: measurementColors[measurement] || 'black' } // Use the defined color or fallback to black
            };
          });



          const traceForTest = measurements.map((measurement) => {
            const measurementData = tempData[measurement] || [];
            const measurementData2 = spdData[measurement] || [];
            const measurementData3 = batvData[measurement] || [];
            const measurementData4 = msgData[measurement] || [];
            const measurementData5 = aglData[measurement] || [];
            const measurementData6 = batvLastData[measurement] || [];
            const data = measurementData6.map((item: any) => item._value * 2);
            //const data =
            return {
              /*
              type: "scatter",
              name: `Measurement ${measurement}`,
              x: measurementData.map((item: any) => item._value),
              y: measurementData2.map((item: any) => item._value),
              line: { color: measurementColors[measurement] || 'black' }
            };*//*
            r: [...measurementData.map((item: any) => item._value), ...measurementData2.map((item: any) => item._value), ...measurementData3.map((item: any) => item._value), ...measurementData4.map((item: any) => item._value)],
            theta: [
                              "temp",
                              "Spd",
                              "Bat(V)",
                              "Msg",
                              "Bat%",
                              "temp",
                            ],
            fill: measurementColors[measurement] || 'black' ,
            type: "scatterpolar",*//*
            type: "bar",
              name: `Measurement ${measurement}`,
              x: measurementData5.map((item: any) => item._time),
              y: measurementData5.map((item: any) => item._value),
              marker: { color: measurementColors[measurement] || 'black' }*/
              type: "histogram",
              name: `Measurement ${measurement}`,
              x: measurementData5.map((item: any) => item._value),
              marker: { color: measurementColors[measurement] || 'black' }/*
              values: [...measurementData6.map((item: any) => item._value), ...data],
              type: "pie",
              marker: { colors: measurementColors[measurement] || 'black' }*/
          };
          });

        // Update the state with the traces data
        setAltTrace(traceForAlt);
        setAglTrace(traceForAgl);
        setLatLongTrace(traceForLatLong);
        setVdopTrace(traceForVdop);
        setHdopTrace(traceForHdop);
        setSpdTrace(traceForSpd);
        setLastTrace(traceForLast);
        setMeanTrace(traceForMean);
        setSnrTrace(traceForSnr);
        setRssiTrace(traceForRssi);
        setRsrpTrace(traceForRsrp);
        setRsrqTrace(traceForRsrq);

        setTestTrace(traceForTest);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      }
    };

    // Fetch data when the selected measurements or time range change
    fetchData();
  }, [measurements, timeRange, startTime, stopTime]);

  return (
    <div>
        <div className="box">
        <div className="box2">
          <div className="box3">
            <h1>AirPlates drone flight history</h1>
          </div>
          <div className="box3">
            <Circle value={airborne} label="Airborne" />
            <Circle value={disconnected} label="Disconnectioned" />
            <Circle value={airtime} label="Airtime(h)" />
          </div>
          <div className="box3">
                  {/* Checkboxes to select up to three measurements */}
      {availableMeasurements.map((measurement) => (
        <label key={measurement}>
          <input
            type="checkbox"
            value={measurement}
            checked={measurements.includes(measurement)}
            onChange={(e) => {
              const checked = e.target.checked;
              if (checked) {
                // Add the measurement to the list if it's selected
                setMeasurements((prev) => [...prev, measurement]);
              } else {
                // Remove the measurement from the list if it's deselected
                setMeasurements((prev) => prev.filter((m) => m !== measurement));
              }
            }}
          />
          Measurement {measurement}
        </label>
      ))}

      {/* Dropdown to select the time range */}
      <select
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
      >
        {/* Render options for the time range */}
        {['1h', '6h', '12h', '24h'].map((range) => (
          <option key={range} value={range}>
            {range}
          </option>
        ))}
      </select>
          </div>
          </div>
          </div>
      
          <div className="box3">
      {/* Display an error message if fetching data fails */}
      {error && <div>Error fetching data: {error}</div>}
      </div>

      <div className="box3">
      {/* Render the Plotly chart if trace data is available */}
      {altTrace.length > 0 && (
        <Plot
          data={altTrace}
          layout={{ title: "Altitude during flight", xaxis: {title: 'Time(TS) '}, yaxis: {title: 'Altitude(m)'} }}
        />
      )}
      {aglTrace.length > 0 && (
        <Plot
          data={aglTrace}
          layout={{ title: "AGL during flight", xaxis: {title: 'Time(TS) '}, yaxis: {title: 'AGL(m)'} }}
        />
      )}
      </div>
      <div className="box3">
      {vdopTrace.length > 0 && hdopTrace.length > 0 &&(
        <Plot
          data={[...vdopTrace, ...hdopTrace]}
          layout={{ title: "VDOP and HDOP during flight", xaxis: {title: 'Time(TS) '}, yaxis: {title: 'VDOP and HDOP'} }}
        />
      )}
      </div>
      <div className="box3">
      {latLongTrace.length > 0 && (
        <Plot
          data={latLongTrace}
          layout={{ title: "Latitude and Longtitude", xaxis: {title: 'Latitude(°) '}, yaxis: {title: 'Longtitude(°)'} }}
        />
      )}
      </div>
      <div className="box3">
      {spdTrace.length > 0 && (
        <Plot
          data={spdTrace}
          layout={{ title: "Parameters during flight", 
  
           }}
        />
      )}
      {lastTrace.length > 0 && (
        <Plot
          data={lastTrace}
          layout={{ title: "Last recording parameters", }}
        />
      )}
      {meanTrace.length > 0 && (
        <Plot
          data={meanTrace}
          layout={{ title: "Avg. of parameters", }}
        />
      )}
      </div>
      <div className="box3">
      {snrTrace.length > 0 && (
        <Plot
          data={snrTrace}
          layout={{ title: "SNR during flight", xaxis: {title: 'Time(TS) '}, yaxis: {title: 'SNR(dB)'} }}
        />
      )}
      {rssiTrace.length > 0 && rsrpTrace.length > 0 && rsrqTrace.length > 0 &&(
        <Plot
          data={[...rssiTrace, ...rsrpTrace, ...rsrqTrace]}
          layout={{ title: "RS during flight", 
          grid: { rows: 3, columns: 1, pattern: "independent" },
          xaxis3: {title: 'Time(TS) '}, yaxis: {title: 'RSSI(dBm)'}, yaxis2: {title: 'RSRP(dBm)'}, yaxis3: {title: 'RSRQ(dB)'}
           }}
        />
      )}
      </div>
      <div className="box3">
      {testTrace.length > 0 && (
        <Plot
          data={testTrace}
          layout={{ title: "Test", xaxis: {title: 'Time(TS) '}, yaxis: {title: 'Altitude(m)'}, 

        }}
        />
      )}
      </div>
      
    </div>
  );
};

export default App;