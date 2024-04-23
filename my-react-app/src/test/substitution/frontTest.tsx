
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
                //const response = await fetch(`http://localhost:80/test?timeRange=${timeRange}`);
                //const response = await fetch(`http://localhost:80/test?timeRange=6h`);
                const response = await fetch(`http://localhost:80/test`);
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
