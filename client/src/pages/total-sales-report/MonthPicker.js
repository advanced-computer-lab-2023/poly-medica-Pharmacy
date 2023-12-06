
import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { months } from '../../utils/DateFormat';


const MonthPicker = ({ selectedMonth,handleMonthChange,setChartDate }) => {    
    const handelDateChange=  (event) => {
        handleMonthChange(event);
        setChartDate([]);
    };
    
    return (
        <FormControl>
        <InputLabel id="month-selector-label">Select a Month</InputLabel>
        <Select
        sx={{
            marginBottom: '20px', 
         }} 
        style={{ width: '200px' }}
            labelId="month-selector-label"
            id="month-selector"
            value={selectedMonth}
            label="Select a Month" 
            onChange={handelDateChange}
            
        >
            {months.map((month, index) => (
            <MenuItem key={index} value={index + 1}>
                {month}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
    );
};
export default MonthPicker;
     
