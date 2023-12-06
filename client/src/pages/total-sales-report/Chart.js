import React from 'react';
 
import {  Legend,BarChart,Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
  
import {   Typography } from '@mui/material';
const Chart = (data) => {
    
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
        ) :  (<Typography variant="h5" component="h6" gutterBottom>
        No data available.
              </Typography>)
        

        }
      </div>
    );
  };

export default Chart ;
