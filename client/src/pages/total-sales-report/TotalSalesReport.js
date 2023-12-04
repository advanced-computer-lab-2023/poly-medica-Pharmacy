
import React, { useEffect, useState } from 'react'; 

import { pharmacyAxios } from '../../utils/AxiosConfig';
 import MonthPicker from './MonthPicker';
 import DayPicker from './DayPicker';
 import Medicines from './Medicines';



const TotalSalesReport = () => {
 
    const [selectedMonth, setSelectedMonth] = useState(0);
	const [medicines, setMedicines] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	//return the day from the date
	
	const render =selectedMonth!=0; 

	const handleSelectedDate = (date) => {
        setSelectedDate(date);
    };
	
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
			{render&&<DayPicker selectedDate={selectedDate} handleSelectedDate={handleSelectedDate} month={selectedMonth} />}
			<Medicines style={{ marginTop: '80px' }}  
			medicines={medicines} month={selectedMonth} day={selectedDate}  />
			
		</div>
	);	

	

};
export default TotalSalesReport;