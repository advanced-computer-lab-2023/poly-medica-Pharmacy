
import React from 'react';
import { Fab,FormControl, InputLabel  } from '@mui/material';
import { Add } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
 

import { getMaxDate, getMinDate } from '../../utils/DateFormat';




const DayPicker = ({ selectedDate, handleSelectedDate,month }) => {
    const handleKeyDown = (event) => {
        // Prevent any keyboard input
        event.preventDefault();
      };
   
    return ( 
        <DatePicker  
        

             sx={{
                marginLeft: '20px',
                marginBottom: '20px',
               
             }}  
                label="Select a Day" 
               //only allow to select days in the selected month
             
             
              dateAdapter={AdapterDayjs}
              
             value={selectedDate} 
             onKeyDown={handleKeyDown} 
             KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
             

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