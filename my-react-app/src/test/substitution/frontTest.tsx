/*
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Barholder from '../components/Barholder.tsx'
      
      const MyComponent: React.FC = () => {
          const [error, setError] = useState<string | null>(null);
          const [firstTrace, setFirstTrace] = useState<any>();
      
          useEffect(() => {
              const fetchData = async () => {
                  try {
                      const response1 = await fetch('http://localhost:80/test123');
                      if (!response1.ok) {
                          throw new Error('Failed to fetch data');
                      }
                      const data1 = await response1.json();
      
                      setFirstTrace({
                          type: 'scatter',
                          mode: 'lines',
                          name: 'AGLBaro for all drones',
                          x: data1.map((item: any) => item._time),
                          y: data1.map((item: any) => item._value),
                          line: { color: 'red' }
                      });
      
                  } catch (error) {
                      console.error('Error fetching data:', error);
                      setError('Failed to fetch data');
                  }
              };
      
              fetchData();
          }, []);
      
          if (error) {
              return <div>
                Error fetching data: {error} 
                <Barholder/>
                </div>;
          }
      
          return (
              <div>
                <div style={{ flexDirection: "row" }}>
                  <div style={{ flexDirection: "column" }}>
                  <div style={{ display: "flex"}}>
                        {firstTrace && (
                            <Plot
                                data={[firstTrace]}
                                layout={{ title: 'Drone heights the past 7 days', width: 1400 }}
                            />
                        )}
                    </div>
                    </div>
                  </div>
                </div>
              
          );
      };
      
      export default MyComponent;
*/









/*
//-------------------------------------------------
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const App: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [firstTrace, setFirstTrace] = useState<any>();
    const [timeRange, setTimeRange] = useState('12h'); // State to manage the selected time range

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the backend server
                const response = await fetch(`http://localhost:80/test?timeRange=${timeRange}`);
                //const response = await fetch(`http://localhost:80/test?timeRange=6h`);
                
                //const response = await fetch(`http://localhost:80/test`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Create the trace for Plotly
                const trace = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Altitude',
                    x: data.map((item: any) => item._time),
                    y: data.map((item: any) => item._value),
                    line: { color: 'red' }
                };

                // Update the state with the trace data
                setFirstTrace(trace);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            }
        };

        // Fetch data when the component mounts or when the time range changes
        fetchData();
    }, [timeRange]);

    // Define a list of available time range options for the dropdown
    const timeRanges = ['1h', '6h', '12h', '24h'];

    return (
        <div>
            
            <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
            >

                {timeRanges.map((range) => (
                    <option key={range} value={range}>
                        {range}
                    </option>
                ))}
            </select>


            {error && <div>Error fetching data: {error}</div>}

            
            {firstTrace && (
                <Plot
                    data={[firstTrace]}
                    layout={{ title: 'Altitude over Time' }}
                />
            )}
        </div>
    );
};

export default App;*/







/*
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const App: React.FC = () => {
    const [timeRange, setTimeRange] = useState('1h');
    const [measurements, setMeasurements] = useState<string[]>([]);
    const [data, setData] = useState<any[]>([]);

    const availableMeasurements = ['measurement1', 'measurement2', 'measurement3']; // Replace with actual measurements

    const fetchData = async () => {
        try {
            // Join the selected measurements with commas and include them in the request
            const measurementsParam = measurements.join(',');

            const response = await fetch(`http://localhost/testid?timeRange=${timeRange}&measurements=${measurementsParam}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const fetchedData = await response.json();

            // Create the trace for Plotly
            const trace = {
                type: 'scatter',
                mode: 'lines',
                name: 'Altitude',
                x: fetchedData.map((item: any) => item._time),
                y: fetchedData.map((item: any) => item._value),
                line: { color: 'red' }
            };
            
            setData([trace]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Fetch data when the time range or measurements change
        fetchData();
    }, [timeRange, measurements]);

    // Function to handle checkbox change
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setMeasurements((prevMeasurements) => {
            if (checked) {
                // Add the measurement to the list
                return [...prevMeasurements, value];
            } else {
                // Remove the measurement from the list
                return prevMeasurements.filter((measurement) => measurement !== value);
            }
        });
    };

    return (
        <div>
            
            <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
            >
                <option value="1h">1 hour</option>
                <option value="6h">6 hours</option>
                <option value="12h">12 hours</option>
                <option value="24h">24 hours</option>
            </select>

            
            <div>
                {availableMeasurements.map((measurement) => (
                    <div key={measurement}>
                        <input
                            type="checkbox"
                            id={measurement}
                            value={measurement}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={measurement}>{measurement}</label>
                    </div>
                ))}
            </div>

           
            {data.length > 0 && (
                <Plot
                    data={data}
                    layout={{ title: 'Altitude over Time' }}
                />
            )}
        </div>
    );
};

export default App;
*/









/*
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const App: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [firstTrace, setFirstTrace] = useState<any>();
    const [startTime, setStartTime] = useState('2024-05-09T05:14:43.465Z'); // Default start time
    const [stopTime, setStopTime] = useState('2024-05-09T17:14:43.465Z'); // Default stop time

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Construct the URL with the start and stop times
                const response = await fetch(`http://localhost:80/test?startTime=${startTime}&stopTime=${stopTime}`);
                console.log(`URL requested: http://localhost:80/test?startTime=${startTime}&stopTime=${stopTime}`);
                //const response = await fetch('http://localhost:80/test123');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Create the trace for Plotly
                const trace = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Altitude',
                    x: data.map((item: any) => item._time),
                    y: data.map((item: any) => item._value),
                    line: { color: 'red' }
                };

                // Update the state with the trace data
                setFirstTrace(trace);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            }
        };

        // Fetch data when the component mounts or when the start and stop times change
        fetchData();
    }, [startTime, stopTime]);

    return (
        <div>
          
            <div>
                <label>
                    Start Time:
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </label>
                <label>
                    Stop Time:
                    <input
                        type="datetime-local"
                        value={stopTime}
                        onChange={(e) => setStopTime(e.target.value)}
                    />
                </label>
            </div>

          
            {error && <div>Error fetching data: {error}</div>}

           
            {firstTrace && (
                <Plot
                    data={[firstTrace]}
                    layout={{ title: 'Altitude over Time' }}
                />
            )}
        </div>
    );
};

export default App;*/


/*
//MEASUREMENT
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const App: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [traces, setTraces] = useState<any[]>([]);
    const [timeRange, setTimeRange] = useState('12h'); // State to manage the selected time range
    const [measurements, setMeasurements] = useState<string[]>([]); // State to manage selected measurements

    // List of available measurements to choose from
    const availableMeasurements = [
        '4DF5E020C901F8D3E',
        '4DF5E020C901F8D67',
        '4DF5E020C901F8DA1'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Create a query string with the selected measurements
                const measurementQuery = measurements.map((m) => `measurement=${m}`).join('&');

                // Fetch data from the backend server
                const response = await fetch(`http://localhost:80/test?${measurementQuery}&timeRange=${timeRange}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Create an array of traces for Plotly, one for each measurement
                const newTraces = measurements.map((measurement) => {
                    const measurementData = data[measurement] || [];
                    return {
                        type: 'scatter',
                        mode: 'lines',
                        name: `ID ${measurement}`,
                        x: measurementData.map((item: any) => item._time),
                        y: measurementData.map((item: any) => item._value),
                        line: { color: 'red' } // You can customize color as desired
                    };
                });

                // Update the state with the traces data
                setTraces(newTraces);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            }
        };

        // Fetch data when the selected measurements or time range change
        fetchData();
    }, [measurements, timeRange]);

    return (
        <div>
     
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

         
            <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
            >
               
                {['1h', '6h', '12h', '24h'].map((range) => (
                    <option key={range} value={range}>
                        {range}
                    </option>
                ))}
            </select>

           
            {error && <div>Error fetching data: {error}</div>}

         
            {traces.length > 0 && (
                <Plot
                    data={traces}
                    layout={{ title: 'Measurements over Time' }}
                />
            )}
        </div>
    );
};

export default App;*/



/*
//THIS WORKS
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const App: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [firstTrace, setFirstTrace] = useState<any>();
    const [timeRange, setTimeRange] = useState('12h'); // State to manage the selected time range
    const [startTime, setStartTime] = useState<string>(''); // State to manage the start time
    const [stopTime, setStopTime] = useState<string>(''); // State to manage the stop time

    useEffect(() => {
        // Calculate start and stop times based on the selected time range
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

        // Call the function to calculate times
        calculateTimeRange();

        // Fetch data from the backend server
        const fetchData = async () => {
            try {
                // Use the startTime and stopTime as query parameters
                const response = await fetch(`http://localhost:80/test?startTime=${startTime}&stopTime=${stopTime}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Create the trace for Plotly
                const trace = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Altitude',
                    x: data.map((item: any) => item._time),
                    y: data.map((item: any) => item._value),
                    line: { color: 'red' }
                };

                // Update the state with the trace data
                setFirstTrace(trace);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            }
        };

        // Fetch data whenever the time range, start time, or stop time changes
        fetchData();
    }, [timeRange, startTime, stopTime]);

    // Define a list of available time range options for the dropdown
    const timeRanges = ['1h', '6h', '12h', '24h'];

    return (
        <div>
           
            <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
            >
                
                {timeRanges.map((range) => (
                    <option key={range} value={range}>
                        {range}
                    </option>
                ))}
            </select>

          
            {error && <div>Error fetching data: {error}</div>}

            
            {firstTrace && (
                <Plot
                    data={[firstTrace]}
                    layout={{ title: 'Altitude over Time' }}
                />
            )}
        </div>
    );
};

export default App;*/






/*
//measurement color
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const App: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [traces, setTraces] = useState<any[]>([]);
    const [timeRange, setTimeRange] = useState('12h'); // State to manage the selected time range
    const [measurements, setMeasurements] = useState<string[]>([]); // State to manage selected measurements

    // List of available measurements to choose from
    const availableMeasurements = [
        '4DF5E020C901F8D3E',
        '4DF5E020C901F8D67',
        '4DF5E020C901F8DA1'
    ];

    // Define a mapping of measurements to colors
    const measurementColors = {
        '4DF5E020C901F8D3E': 'red',
        '4DF5E020C901F8D67': 'blue',
        '4DF5E020C901F8DA1': 'green'
        // Add more colors for additional measurements
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Create a query string with the selected measurements
                const measurementQuery = measurements.map((m) => `measurement=${m}`).join('&');

                // Fetch data from the backend server
                const response = await fetch(`http://localhost:80/test?${measurementQuery}&timeRange=${timeRange}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Create an array of traces for Plotly, one for each measurement
                const newTraces = measurements.map((measurement) => {
                    const measurementData = data[measurement] || [];
                    return {
                        type: 'scatter',
                        mode: 'lines',
                        name: `Measurement ${measurement}`,
                        x: measurementData.map((item: any) => item._time),
                        y: measurementData.map((item: any) => item._value),
                        line: { color: measurementColors[measurement] || 'black' } // Use the defined color or fallback to black
                    };
                });

                // Update the state with the traces data
                setTraces(newTraces);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            }
        };

        // Fetch data when the selected measurements or time range change
        fetchData();
    }, [measurements, timeRange]);

    return (
        <div>
  
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

            
            <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
            >
                
                {['1h', '6h', '12h', '24h'].map((range) => (
                    <option key={range} value={range}>
                        {range}
                    </option>
                ))}
            </select>

           
            {error && <div>Error fetching data: {error}</div>}

           
            {traces.length > 0 && (
                <Plot
                    data={traces}
                    layout={{ title: 'Measurements over Time' }}
                />
            )}
        </div>
    );
};

export default App;*/






/*
//manuel combine
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const App: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [firstTrace, setFirstTrace] = useState<any>();
    const [timeRange, setTimeRange] = useState('12h'); // State to manage the selected time range
    const [startTime, setStartTime] = useState<string>(''); // State to manage the start time
    const [stopTime, setStopTime] = useState<string>(''); // State to manage the stop time
    const [measurements, setMeasurements] = useState<string[]>([]); // State to manage selected measurements

    // List of available measurements to choose from
    const availableMeasurements = [
        '4DF5E020C901F8D3E',
        '4DF5E020C901F8D67',
        '4DF5E020C901F8DA1'
    ];

    // Define a mapping of measurements to colors
    const measurementColors = {
        '4DF5E020C901F8D3E': 'red',
        '4DF5E020C901F8D67': 'blue',
        '4DF5E020C901F8DA1': 'green'
        // Add more colors for additional measurements
    };

    useEffect(() => {
        // Calculate start and stop times based on the selected time range
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

        // Call the function to calculate times
        calculateTimeRange();

        // Fetch data from the backend server
        const fetchData = async () => {
            try {
                // Use the startTime and stopTime as query parameters
                const response = await fetch(`http://localhost:80/test?startTime=${startTime}&stopTime=${stopTime}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Create the trace for Plotly
                const trace = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Altitude',
                    x: data.map((item: any) => item._time),
                    y: data.map((item: any) => item._value),
                    line: { color: 'red' }
                };

                // Update the state with the trace data
                setFirstTrace(trace);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            }
        };

        // Fetch data whenever the time range, start time, or stop time changes
        fetchData();
    }, [timeRange, startTime, stopTime]);

    // Define a list of available time range options for the dropdown
    const timeRanges = ['1h', '6h', '12h', '24h'];*/












import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const App: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('12h'); // State to manage the selected time range
  const [measurements, setMeasurements] = useState<string[]>([]); // State to manage selected measurements
  const [startTime, setStartTime] = useState<string>(''); // State to manage the start time
  const [stopTime, setStopTime] = useState<string>(''); // State to manage the stop time
  const [altTrace, setAltTrace] = useState<any[]>([]);
  const [aglTrace, setAglTrace] = useState<any[]>([]);
  const [latLongScatterTrace, setLatLongScatterTrace] = useState<any[]>([]);
  const [vdopTrace, setVdopTrace] = useState<any[]>([]);
  const [hdopTrace, setHdopTrace] = useState<any[]>([]);
  const [spdTrace, setSpdTrace] = useState<any[]>([]);
  const [radarTrace, setRadarTrace] = useState<any[]>([]);
  const [batTrace, setBatTrace] = useState<any[]>([]);
  const [snrTrace, setSnrTrace] = useState<any[]>([]);
  const [rssiTrace, setRssiTrace] = useState<any[]>([]);
  const [rsrpTrace, setRsrpTrace] = useState<any[]>([]);
  const [rsrqTrace, setRsrqTrace] = useState<any[]>([]);
  const [testTrace, setTestTrace] = useState<any[]>([]);

  // List of available measurements to choose from
  const availableMeasurements = [
    '352709570739581',
    '352709570805663',
    '4DF5E657CE0B5AB03'
  ];

  // Define a mapping of measurements to colors
  const measurementColors = {
    '352709570739581': 'red',
    '352709570805663': 'blue',
    '4DF5E657CE0B5AB03': 'green'
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

    const fetchData = async () => {
      try {
        // Create a query string with the selected measurements
        const measurementQuery = measurements.map((m) => `measurement=${m}`).join('&');

        // Fetch data from the backend server
        const altResponse = await fetch(`http://localhost:80/test?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
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

        const speedResponse = await fetch(`http://localhost:80/speed?${measurementQuery}&timeRange=${timeRange}&startTime=${startTime}&stopTime=${stopTime}`);
        
        if (!altResponse.ok || !aglResponse.ok || !vdopResponse.ok || !hdopResponse.ok || !snrResponse.ok || !rssiResponse.ok || !rsrpResponse.ok || !rsrqResponse.ok || !latResponse.ok || !longResponse.ok || !tempResponse.ok || !spdResponse.ok || !batvResponse.ok || !msgResponse.ok|| !speedResponse.ok) {
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

        const speedData = await speedResponse.json();

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

          const traceForLatLongScatter = measurements.map((measurement) => {
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

          const traceForRadar = measurements.map((measurement) => {
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

          const traceForBat = measurements.map((measurement) => {
            const measurementData = batvData[measurement] || [];
            const data = measurementData.map((item: any) => item._value)
            const data2 = measurementData.map((item: any) => item._value * 10)
            return {
                values: [...data , ...data2],
                /*labels: [
                  ...data.map((_, index) => `Data ${index + 1}`),
                  ...data2.map((_, index) => `Data2 ${index + 1}`)
                ],*/
                //values: measurementData.map((item: any) => item._value),
                type: "pie",
                //type: "scatter",
                //x: measurementData.map((item: any) => item._time),
                //y: data,
                line: { color: measurementColors[measurement] || 'black' }
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
            //const data =
            return {
              /*
              type: "scatter",
              name: `Measurement ${measurement}`,
              x: measurementData.map((item: any) => item._value),
              y: measurementData2.map((item: any) => item._value),
              line: { color: measurementColors[measurement] || 'black' }
            };*/
            r: [...measurementData.map((item: any) => item._value), ...measurementData2.map((item: any) => item._value), ...measurementData3.map((item: any) => item._value), ...measurementData4.map((item: any) => item._value)],
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
          };
          });

        // Update the state with the traces data
        setAltTrace(traceForAlt);
        setAglTrace(traceForAgl);
        setLatLongScatterTrace(traceForLatLongScatter);
        setVdopTrace(traceForVdop);
        setHdopTrace(traceForHdop);
        setSpdTrace(traceForSpd);
        setRadarTrace(traceForRadar);
        setBatTrace(traceForBat);
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

      {/* Display an error message if fetching data fails */}
      {error && <div>Error fetching data: {error}</div>}

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
      {latLongScatterTrace.length > 0 && (
        <Plot
          data={latLongScatterTrace}
          layout={{ title: "Latitude and Longtitude", xaxis: {title: 'Latitude(°) '}, yaxis: {title: 'Longtitude(°)'} }}
        />
      )}
      {vdopTrace.length > 0 && hdopTrace.length > 0 &&(
        <Plot
          data={[...vdopTrace, ...hdopTrace]}
          layout={{ title: "VDOP and HDOP during flight", xaxis: {title: 'Time(TS) '}, yaxis: {title: 'VDOP and HDOP'} }}
        />
      )}
      
      {spdTrace.length > 0 && (
        <Plot
          data={spdTrace}
          layout={{ title: "Avg spd", 
  
           }}
        />
      )}
      {radarTrace.length > 0 && (
        <Plot
          data={radarTrace}
          layout={{ title: "Radar", xaxis: {title: 'Time(TS) '}, yaxis: {title: 'SNR(dB)'} }}
        />
      )}
      {batTrace.length > 0 && (
        <Plot
          data={batTrace}
          layout={{ title: "Bat pie", xaxis: {title: 'Time(TS) '}, yaxis: {title: 'SNR(dB)'} }}
        />
      )}
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
      {testTrace.length > 0 && (
        <Plot
          data={testTrace}
          layout={{ title: "Test", xaxis: {title: 'Time(TS) '}, yaxis: {title: 'Altitude(m)'}, 

        }}
        />
      )}
      
    </div>
  );
};

export default App;