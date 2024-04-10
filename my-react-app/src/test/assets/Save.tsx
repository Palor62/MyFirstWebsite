const express = require('express');
const app = express();
const influxDroneData = require('./utilities/httpsServer/influxdbClient');

app.use(express.json());

const fetchData = async (field) => {
    const query = `
        from(bucket: "droneid")
        |> range(start: -7d, stop: now())
        |> filter(fn: (r) => r["_field"] == "${field}")
    `;
    const data = await influxDroneData.query(query);
    return data;
};

app.get('/alt', async (req, res) => {
    const data = await fetchData('AGLBaro');
    res.json(data);
});

app.get('/lat', async (req, res) => {
    const data = await fetchData('latitude');
    res.json(data);
});

app.get('/long', async (req, res) => {
    const data = await fetchData('longitude');
    res.json(data);
});

app.get('/vdop', async (req, res) => {
    const data = await fetchData('VDOP');
    res.json(data);
});

app.get('/hdop', async (req, res) => {
    const data = await fetchData('HDOP');
    res.json(data);
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//--------------------------------------------------

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const Overview: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [traces, setTraces] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async (endpoint: string) => {
            try {
                const response = await fetch(`http://localhost:80/${endpoint}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
                return null;
            }
        };

        const fetchAllData = async () => {
            const endpoints = ['alt', 'lat', 'long', 'vdop', 'hdop'];
            const fetchedTraces = await Promise.all(
                endpoints.map(async (endpoint) => {
                    const data = await fetchData(endpoint);
                    return {
                        data: data.map((item: any) => item._value),
                        layout: { title: endpoint.toUpperCase() },
                    };
                })
            );
            setTraces(fetchedTraces);
        };

        fetchAllData();
    }, []);

    if (error) {
        return <div>Error fetching data: {error}</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {traces.map((trace, index) => (
                <Plot
                    key={index}
                    data={[{ y: trace.data, ...trace.layout }]}
                    layout={{ width: 500, height: 380 }}
                />
            ))}
        </div>
    );
};

export default Overview;
