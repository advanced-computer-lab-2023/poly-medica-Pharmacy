import React from 'react';
 
import {  Legend,BarChart,Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
  
import {   Typography } from '@mui/material';
const Chart = (data, month) => {
    // const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    //               { name: 'Page B', uv: 300, pv: 2400, amt: 2400 },
    //               { name: 'Page C', uv: 200, pv: 2400, amt: 2400 },
    //                 { name: 'Page D', uv: 500, pv: 2400, amt: 2400 },
    //                 { name: 'Page E', uv: 100, pv: 2400, amt: 2400 },
    //                 { name: 'Page F', uv: 300, pv: 2400, amt: 2400 },
    //                 { name: 'Page G', uv: 400, pv: 2400, amt: 2400 }
    // ];
    console.log("data from chart",data);
    const isDataAvailable = data && data.data.length > 0; 
    return (
      <div>
        {isDataAvailable ? (
          <BarChart width={1300} height={600} data={data.data}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="sales" fill="#8884d8" barSize={30} />
          </BarChart>
        ) : month > 0 ? (
           
            <Typography variant="h5" component="h6" gutterBottom>
                No data available.
            </Typography>
          
        ):
        (  
              <Typography variant="h5" component="h6" gutterBottom>
                  Please select a month to display the monthly-sales report.
              </Typography>
             
          )

        }
      </div>
    );
  };

export default Chart ;
