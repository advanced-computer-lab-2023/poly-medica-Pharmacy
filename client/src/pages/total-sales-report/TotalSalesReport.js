
import React, { useEffect, useState } from 'react'; 

import { pharmacyAxios } from '../../utils/AxiosConfig';
 import MonthPicker from './MonthPicker';
 import DayPicker from './DayPicker';
 import Medicines from './Medicines';  
 import Chart from './Chart'; 
import MainCard from 'ui-component/cards/MainCard';


import { useFilter } from 'contexts/FilterContext';
import { useSearch } from 'contexts/SearchContext';



const TotalSalesReport = () => {
 
    const [selectedMonth, setSelectedMonth] = useState(0);
	const [originalMedicines, setOriginalMedicines] = useState([]);
	const [medicines, setMedicines] = useState([]);
	const { filterData, updateFilter } = useFilter();
	const medicinalNames = [];
	const { searchQuery } = useSearch();
	const [selectedDate, setSelectedDate] = useState(null);
	const [chartDate, setChartDate] = useState([]);  

	useEffect(() => {
		pharmacyAxios
			.get('/medicines')
			.then((response) => {
				setOriginalMedicines(response.data.medicines);
				setMedicines(response.data.medicines); 
				for (let i = 0; i < response.data.medicines.length; i++) {
					const medicine = response.data.medicines[i];
					if (!medicinalNames.includes(medicine.name))
					medicinalNames.push(medicine.name);
				}
				updateFilter([
					{
						attribute: 'Medicine Name',
						values: medicinalNames,
					},
				]);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);	

	useEffect(() => {
		const filteredMedicines = originalMedicines.filter(
			(medicine) =>
				medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
				(!filterData[0].selectedValue ||
					medicine.name === filterData[0].selectedValue),
		);
		
		
		setMedicines(filteredMedicines); 
	}, [originalMedicines, filterData]);
	
	const render =selectedMonth!=0; 

	const handleSelectedDate = (date) => {
        setSelectedDate(date);
    };
	
	
	const handleMonthChange = (event) => {
		setSelectedMonth(event.target.value);
		setSelectedDate(null);
	};											

    return (
			<MainCard title='Monthly-Sales Report'> 
			<MonthPicker selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} setChartDate={setChartDate} />
			{render&&<DayPicker selectedDate={selectedDate} handleSelectedDate={handleSelectedDate} month={selectedMonth} setChartDate={setChartDate}/>}
			<Chart data={chartDate} />  
			<Medicines  
			medicines={medicines} month={selectedMonth} day={selectedDate} data={chartDate} setDate={setChartDate} />
			</MainCard>
	);	

	

};
export default TotalSalesReport;