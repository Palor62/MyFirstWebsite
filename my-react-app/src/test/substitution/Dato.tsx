import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Testfile from "./Testfile.tsx"

const firstchoice = true;

export default function Dato() {
    const [data, setData] = useState<any[]>([]);
    const processDat = (csvData: string) => {
        const allRows = csvData.split('\n').map(row => row.split(','));
        const x = [];
        const y = [];

        for (let i = 0; i < allRows.length; i++) {
            const row = allRows[i];
            x.push(row[0]);
            y.push(row[1]);
        }

        setData({ x, y });
    };

    useEffect(() => {
        const fetchDat = async () => {
            try {
                //const response = await fetch("https://raw.githubusercontent.com/plotly/datasets/master/2014_apple_stock.csv");
                //const response = await fetch("./data.csv");
                const response = await fetch("https://raw.githubusercontent.com/martinloevborg/martinloevborg.github.io/main/my-react-app/src/test/assets/c3_test.csv");
                const csvData = await response.text();
                console.log(csvData)
                processDat(csvData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDat();
    }, []);

    const values = [
        ['Salaries', 'Office', 'Merchandise', 'Legal', '<b>TOTAL</b>'],
        [1200000, 20000, 80000, 2000, 12120000],
        [1300000, 20000, 70000, 2000, 130902000],
        [1300000, 20000, 120000, 2000, 131222000],
        [1400000, 20000, 90000, 2000, 14102000]
    ];

    // Define the data array as an array of objects representing the plot data
    const table = [{
        type: 'table',
        header: {
            values: [["<b>EXPENSES</b>"], ["<b>Q1</b>"],
            ["<b>Q2</b>"], ["<b>Q3</b>"], ["<b>Q4</b>"]],
            align: "center",
            line: { width: 1, color: 'black' },
            fill: { color: "grey" },
            font: { family: "Arial", size: 12, color: "white" }
        },
        cells: {
            values: values,
            align: "center",
            line: { color: "black", width: 1 },
            font: { family: "Arial", size: 11, color: ["black"] }
        }
    }];

    return (
        <div style={{ flexDirection: "row" }}>
            <div style={{ flexDirection: "column" }}>
                <div style={{ display: "flex" }}>
                    <Plot
                        data={[{ x: data.x, y: data.y, type: 'scatter' }]}
                        layout={{ title: 'Plotting CSV data from AJAX call' }}
                    />
                </div>
                <div style={{ display: "flex" }}>
                    {
                        firstchoice
                            ?
                            <div>
                                <h1>First choice</h1>
                                <Plot
                                    data={[
                                        {
                                            values: [30, 120],
                                            type: 'pie',
                                        },
                                    ]}
                                    layout={{ width: 500, height: 400, title: 'A Fancy Plot' }}
                                />
                            </div>
                            :
                            <h1>second choice</h1>
                    }
                </div>
                <div style={{ display: "flex" }}>
                    <Testfile />
                </div>
                <div style={{ display: "flex" }}>
                    <Plot
                        data={data}
                        layout={{ width: 800, height: 400, title: 'Expenses Table' }} // Optional: set the layout
                        style={{ width: '100%', height: '400px' }}
                        useResizeHandler={true}
                    />
                    <Plot
                        data={[
                            {
                                x: ["1", "2", "3","4"],
                                y: [60,80,-40,-20],
                                name: "2018",
                                type: "waterfall",
                                orientation: "v",
                            },
                        ]}
                        layout={{title: 'water fall' }}
                    />
                </div>
            </div>
        </div>
    )
}














/*
What have been tested

    import Papa from 'papaparse';

    const csv = '../assets/c3_test_copy.csv'
    const path = './data.csv'

    const [firstTrace, setFirstTrace] = useState<any>();
    const [dat, setDat] = useState<{ x: string[]; y: string[] }>({ x: [], y: [] });

    const fetchData = async () => {
            try {
                const response = await fetch('./data.csv');
                const reader = response.body?.getReader();
                const result = await reader?.read();
                const decoder = new TextDecoder('utf-8');
                const csv = decoder.decode(result?.value);
                const parsedData = Papa.parse(csv, { header: true }).data;
                console.log('Parsed CSV data:', parsedData);
                setData(parsedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const fetchTrace = async () => {
            try {
                const response = await fetch(path);
                const reader = response.body?.getReader();
                const result = await reader?.read();
                const decoder = new TextDecoder('utf-8');
                const csv = decoder.decode(result?.value);
                const parsedData = Papa.parse(csv, { header: true }).data;
                console.log('Parsed CSV data:', parsedData);
                setFirstTrace({
                    type: 'scatter',
                    mode: 'lines',
                    name: 'AGLBaro for all drones', 
                    x: data.map((item: any) => item.Date),
                    y: data.map((item: any) => item.Value),
                    line: { color: 'red' }
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTrace();

        //-----------

        <div style={{ display: "flex"}}>
                    <Plot
                        data={[
                        {
                            type: "scatter",
                            x: [csv],
                            y: [30, 200, 100, 400, 150, 250],
                            mode: "lines",
                        },
                        ]} 
                        layout={{width: 500, height: 400}}   
                    />
                </div>
                <div style={{ display: "flex"}}>
                <h1>CSV Data Plot</h1>
                </div>
                <div style={{ display: "flex"}}>
                {data.length > 0 && (
                <Plot
                    data={[
                        {
                            type: "scatter",
                            x: data.map((item) => item.Date),
                            y: data.map((item) => item.Value),
                            mode: "lines",
                        },
                    ]}
                    layout={{ width: 500, height: 400 }}
                />
                )}
                </div>
                <div style={{ display: "flex"}}>
                {firstTrace && (
                            <Plot
                                data={[firstTrace]}
                                layout={{ title: 'Drone heights the past 7 days'}}
                            />
                        )}
                </div>
*/