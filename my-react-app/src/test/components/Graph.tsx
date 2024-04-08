import React from 'react';
//import CalendarHeatmap from 'react-calendar-heatmap';
//import 'react-calendar-heatmap/dist/styles.css';
import HeatMap from '@uiw/react-heat-map';

const value = [
    { date: '2016/01/11', count: 2 },
    { date: '2016/01/12', count: 20 },
    { date: '2016/01/13', count: 10 },
    ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, content: '' })),
    { date: '2016/04/11', count: 2 },
    { date: '2016/05/01', count: 5 },
    { date: '2016/05/02', count: 5 },
    { date: '2016/05/04', count: 11 },
  ];

const Graph = () => {
    return(
        <div>
            <HeatMap
                value={value}
                weekLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
                startDate={new Date('2016/01/01')}
            />
        </div>
    );
};


export default Graph;


/*
            <CalendarHeatmap
                startDate={new Date('2016-01-01')}
                endDate={new Date('2016-04-01')}
                values={[
                    { date: '2016-01-01', count: 12 },
                    { date: '2016-01-22', count: 122 },
                    { date: '2016-01-30', count: 38 },
                    // ...and so on
                ]}
            />
*/