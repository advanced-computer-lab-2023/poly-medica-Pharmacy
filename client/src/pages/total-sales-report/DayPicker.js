
import React from 'react';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { getMaxDate, getMinDate } from '../../utils/DateFormat';




const DayPicker = ({ selectedDate, handleSelectedDate,month }) => {

   
    return (
        <DatePicker 
        //set margin for date picker

             sx={{
                marginLeft: '20px',
                marginBottom: '20px',
               
             }} 
             
              dateAdapter={AdapterDayjs}
              
             value={selectedDate} 
             

             onChange={(date) => handleSelectedDate(date)}
			minDate={getMinDate(month-1)}
            maxDate={getMaxDate(month-1)}
            >

            <Fab color="primary" aria-label="add" size="small">
                <Add />
            </Fab> 
            <input type="text" required />
            </DatePicker>
    );
};

export default DayPicker;