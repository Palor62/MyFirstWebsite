import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
      
      const MyComponent: React.FC = () => {
          const [error, setError] = useState<string | null>(null);
          const [firstTrace, setFirstTrace] = useState<any>();
          const [secondTrace, setSecondTrace] = useState<any>();
      
          useEffect(() => {
              const fetchData = async () => {
                  try {
                      const response1 = await fetch('http://localhost:80/dashData');
                      if (!response1.ok) {
                          throw new Error('Failed to fetch data');
                      }
                      const data1 = await response1.json();
      
                      const response2 = await fetch('http://localhost:80/alt');
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
              return <div>Error fetching data: {error}</div>;
          }
      
          return (
              <div>
                  {firstTrace && secondTrace && (
                      <Plot
                          data={[firstTrace, secondTrace]}
                          layout={{ title: 'Drone heights the past 7 days' }}
                      />
                  )}
              </div>
          );
      };
      
      export default MyComponent;








/*
//old attempt that worked
import React, { useEffect, useState } from "react";

function Tryout() {
  const formInfo = {
    username: "Bill123",
    password: "mypassword"
  }

  useEffect(() => {
    fetch("http://localhost:8000/message", {
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify(formInfo)
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
}

export default Tryout;
*/