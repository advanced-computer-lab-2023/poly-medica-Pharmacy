
import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';


const MonthPicker = ({ selectedMonth,handleMonthChange }) => {    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return (
        <FormControl>
        <InputLabel id="month-selector-label">Select a Month</InputLabel>
        <Select
        style={{ width: '200px' }}
            labelId="month-selector-label"
            id="month-selector"
            value={selectedMonth}
            label="Select a Month"
            onChange={handleMonthChange}
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
     
