import React, { useState } from 'react'; 
import MainCard from '../../ui-component/cards/MainCard'; 
import MedicinesList from './MedicinesList';
import MedicineDetails from './MedicineDetails'; 

const Medicines = ({ medicines, month, day,data,setDate }) => {

	const [selectedMedicine, setSelectedMedicine] = useState(null);


const handleDialogClose = () => {
		setSelectedMedicine(null);
	};

	return (
		<MainCard title='Medicines' sx={{
            marginBottom: '20px', 
			marginTop: '20px',
         }} >
			<MedicinesList
				medicines={medicines}
				setSelectedMedicine={setSelectedMedicine}
				month={month}
				day={day}
				data={data}
				setDate={setDate}
			/>
			<MedicineDetails
				selectedMedicine={selectedMedicine}
				handleDialogClose={handleDialogClose}
			/>
		</MainCard>
	);
};

export default Medicines;
