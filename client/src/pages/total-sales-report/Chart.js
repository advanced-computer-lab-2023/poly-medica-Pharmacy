import React from 'react';
 
import {  Legend,BarChart,Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
  
const Chart = (data) => {
    // const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    //               { name: 'Page B', uv: 300, pv: 2400, amt: 2400 },
    //               { name: 'Page C', uv: 200, pv: 2400, amt: 2400 },
    //                 { name: 'Page D', uv: 500, pv: 2400, amt: 2400 },
    //                 { name: 'Page E', uv: 100, pv: 2400, amt: 2400 },
    //                 { name: 'Page F', uv: 300, pv: 2400, amt: 2400 },
    //                 { name: 'Page G', uv: 400, pv: 2400, amt: 2400 }
    // ];
    console.log("data from chart",data);
    return (
        <BarChart
          width={1300}
          height={600}
          data={data.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend /> 
          <Bar dataKey="sales" fill="#82ca9d" />
        </BarChart>
      );
    };

export default Chart ;
