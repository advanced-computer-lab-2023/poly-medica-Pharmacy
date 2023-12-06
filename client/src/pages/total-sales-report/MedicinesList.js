import React from 'react';
import { List } from '@mui/material';
import MedicineCard from './MedicineCard';

const MedicinesList = ({
	medicines,
	month,
	day,
	setSelectedMedicine,
	data,
	setDate


}) => {
	return (
		<List>
			{Array.isArray(medicines) &&
				medicines.map((medicine, index) => (
					<div key={index}>
						<div key={index}>
							<MedicineCard
							medicines={medicines} 
								medicine={medicine}
								month={month}
								day={day}
								setSelectedMedicine={setSelectedMedicine}
								data={data}
								setDate={setDate}
							></MedicineCard>
						</div>
					</div>
				))}
		</List>
	);
};

export default MedicinesList;
