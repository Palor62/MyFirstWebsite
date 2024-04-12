import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Barholder from '../components/Barholder.tsx'
      
      const MyComponent: React.FC = () => {
          const [error, setError] = useState<string | null>(null);
          const [firstTrace, setFirstTrace] = useState<any>();
          const [secondTrace, setSecondTrace] = useState<any>();
      
          useEffect(() => {
              const fetchData = async () => {
                  try {
                      const response1 = await fetch('http://localhost:80/agl');
                      if (!response1.ok) {
                          throw new Error('Failed to fetch data');
                      }
                      const data1 = await response1.json();
      
                      const response2 = await fetch('http://localhost:80/alti');
                      if (!response2.ok) {
                          throw new Error('Failed to fetch data');
                      }
                      const data2 = await response2.json();
      
                      setFirstTrace({
                          type: 'scatter',
                          mode: 'lines',
                          name: 'AGLBaro for all drones',
                          x: data1.map((item: any) => item._time),
                          y: data1.map((item: any) => item._value),
                          line: { color: 'red' }
                      });
      
                      setSecondTrace({
                          type: 'scatter',
                          mode: 'lines',
                          name: 'Altitude for all drones',
                          x: data2.map((item: any) => item._time),
                          y: data2.map((item: any) => item._value),
                          line: { color: '#17BECF' }
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
                        {firstTrace && secondTrace && (
                            <Plot
                                data={[firstTrace, secondTrace]}
                                layout={{ title: 'Drone heights the past 7 days', width: 1400 }}
                            />
                        )}
                    </div>
                    <div style={{ display: "flex"}}>
                        {firstTrace && secondTrace && (
                            <Plot
                                data={[firstTrace, secondTrace]}
                                layout={{ title: 'Drone heights the past 7 days', width: 700 }}
                            />
                        )}
                        {firstTrace && secondTrace && (
                            <Plot
                                data={[firstTrace, secondTrace]}
                                layout={{ title: 'Drone heights the past 7 days', width: 700  }}
                            />
                        )}
                    </div>
                    <div style={{ display: "flex"}}>
                        {firstTrace && secondTrace && (
                            <Plot
                                data={[firstTrace, secondTrace]}
                                layout={{ title: 'Drone heights the past 7 days', width: 700  }}
                            />
                        )}
                        {firstTrace && secondTrace && (
                            <Plot
                                data={[firstTrace, secondTrace]}
                                layout={{ title: 'Drone heights the past 7 days', width: 700  }}
                            />
                        )}
                    </div>
                    </div>
                  </div>
                </div>
              
          );
      };
      
      export default MyComponent;