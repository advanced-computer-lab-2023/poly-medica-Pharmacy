
import React, { useEffect, useState } from 'react'; 

import { pharmacyAxios } from '../../utils/AxiosConfig';
 import MonthPicker from './MonthPicker';
 import DayPicker from './DayPicker';
 import Medicines from './Medicines';  
 import Chart from './Chart'; 
import MainCard from 'ui-component/cards/MainCard';



const TotalSalesReport = () => {
 
    const [selectedMonth, setSelectedMonth] = useState(0);
	const [medicines, setMedicines] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	const [chartDate, setChartDate] = useState([]);

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
	
	const render =selectedMonth!=0; 

	const handleSelectedDate = (date) => {
        setSelectedDate(date);
    };
	
	
	const handleMonthChange = (event) => {
		setSelectedMonth(event.target.value);
		setSelectedDate(null);
	};											

	console.log("chartDate total",chartDate);
    return (
			<MainCard title='Monthly-Sales Report'> 
			<MonthPicker selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} setChartDate={setChartDate} />
			{render&&<DayPicker selectedDate={selectedDate} handleSelectedDate={handleSelectedDate} month={selectedMonth} setChartDate={setChartDate}/>}
			<Chart data={chartDate} month={selectedMonth} />  
			<Medicines  
			medicines={medicines} month={selectedMonth} day={selectedDate} data={chartDate} setDate={setChartDate} />
			</MainCard>
	);	

	

};
export default TotalSalesReport;