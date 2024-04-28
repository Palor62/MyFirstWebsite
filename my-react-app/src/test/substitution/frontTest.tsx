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
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const App: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [firstTrace, setFirstTrace] = useState<any>();
    const [timeRange, setTimeRange] = useState('6h'); // State to manage the selected time range

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
            {/* Dropdown to select the time range */}
            <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
            >
                <option value="1h">1 hour</option>
                <option value="6h">6 hours</option>
                <option value="12h">12 hours</option>
                <option value="24h">24 hours</option>
            </select>

            {/* Checkboxes to select measurements */}
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

            {/* Render the Plotly chart if data is available */}
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
