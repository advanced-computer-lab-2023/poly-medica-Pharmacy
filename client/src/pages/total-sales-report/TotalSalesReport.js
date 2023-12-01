
//make amonthly report of total sales
//firstly make a dropdown menu for months
//then make a table for total sales of each month

//code
//make a dropdown menu for months
import React, { useEffect, useState } from 'react'; 

import { pharmacyAxios } from '../../utils/AxiosConfig';
 import MonthPicker from './MonthPicker';
 import Medicines from './Medicines';


const TotalSalesReport = () => {
 
    const [selectedMonth, setSelectedMonth] = React.useState(1);
	const [medicines, setMedicines] = useState([]);
	
	useEffect(() => {
		pharmacyAxios
			.get('/medicines')
			.then((response) => {
				setMedicines(response.data.medicines); 
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);	
	const handleMonthChange = (event) => {
		setSelectedMonth(event.target.value);
	};											

	
    return (
		<div>
			<MonthPicker selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
			<Medicines style={{ marginTop: '80px' }}  
			medicines={medicines} month={selectedMonth} />
			
		</div>
	);	

	

};
export default TotalSalesReport;