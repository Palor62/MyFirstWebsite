import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const New: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [firstTrace, setFirstTrace] = useState<any>();
    const [secondTrace, setSecondTrace] = useState<any>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch('http://localhost:80/usage');
                if (!response1.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data1 = await response1.json();

                setFirstTrace({
                    type: 'scatter',
                    mode: 'lines',
                    name: 'AGLBaro for all drones',
                    x: data1.map((item: any) => item.time),
                    y: data1.map((item: any) => item.mean_altitude),
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
        return <div>Error fetching data: {error} </div>;
    }

    return (
        <div>
            {firstTrace && (
                <Plot
                    data={[firstTrace]}
                    layout={{ title: 'Method'}}
                />
            )}
        </div>
    );
};

export default New;











/*
  const loadData = () => {
    fetch('http://localhost:80/usage')
      .then(response => {
        if (response.status !== 200) {
          console.log(response);
        }
        return response.json();
      })
      .then(parsedResponse => {
        const unpackData = (arr: any[], key: string) => {
          return arr.map(obj => obj[key]);
        };

        const firstTrace = {
          type: 'scatter',
          mode: 'lines',
          name: 'Mean User Usage',
          x: unpackData(parsedResponse, 'time'),
          y: unpackData(parsedResponse, 'mean_AGLBaro'),
          line: { color: '#17BECF' }
        };

        const secondTrace = {
          type: 'scatter',
          mode: 'lines',
          name: 'Mean System Usage',
          x: unpackData(parsedResponse, 'time'),
          y: unpackData(parsedResponse, 'mean_altitude'),
          line: { color: '#7F7F7F' }
        };

        const data = [firstTrace, secondTrace];
        const layout = {
          title: 'Local CPU Usage',
        };

        // Plotly.newPlot can be replaced with react-plotly.js's Plot component
        return (
          <Plot
            data={data}
            layout={layout}
            divId="graphs-container"
          />
        );
      })
      .catch(error => console.log(error));
  };

  // Use useEffect to run loadData on component mount
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div id="graphs-container"></div>
  );
*/