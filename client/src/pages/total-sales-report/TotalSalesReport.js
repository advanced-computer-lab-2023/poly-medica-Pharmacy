
//make amonthly report of total sales
//firstly make a dropdown menu for months
//then make a table for total sales of each month

//code
//make a dropdown menu for months
import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
 import MonthPicker from './MonthPicker';


const TotalSalesReport = () => {
 
    const [selectedMonth, setSelectedMonth] = React.useState(1);	
	const handleMonthChange = (event) => {
		setSelectedMonth(event.target.value);
	};											

	
    return (
		<div>
			<MonthPicker selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
		</div>
	);	

	

};
export default TotalSalesReport;