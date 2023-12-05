
import React, { useEffect, useState } from 'react'; 

import { pharmacyAxios } from '../../utils/AxiosConfig';
 import MonthPicker from './MonthPicker';
 import DayPicker from './DayPicker';
 import Medicines from './Medicines';
 //import barchart from './barchart'; 
 import Chart from './Chart';



const TotalSalesReport = () => {
 
    const [selectedMonth, setSelectedMonth] = useState(0);
	const [medicines, setMedicines] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	const [chartDate, setChartDate] = useState([]);
	
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

	console.log("chartDate total",chartDate);
    return (
		<div>
			<MonthPicker selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} setChartDate={setChartDate} />
			{render&&<DayPicker selectedDate={selectedDate} handleSelectedDate={handleSelectedDate} month={selectedMonth} setChartDate={setChartDate}/>}
			<Medicines style={{ marginTop: '80px' }}  
			medicines={medicines} month={selectedMonth} day={selectedDate} data={chartDate}  />
			<Chart data={chartDate} />  
			
		</div>
	);	

	

};
export default TotalSalesReport;