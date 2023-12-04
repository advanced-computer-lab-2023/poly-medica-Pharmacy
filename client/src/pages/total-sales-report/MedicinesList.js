import React from 'react';
import { List } from '@mui/material';
import MedicineCard from './MedicineCard';

const MedicinesList = ({
	medicines,
	month,
	setSelectedMedicine

}) => {
	return (
		<List>
			{Array.isArray(medicines) &&
				medicines.map((medicine, index) => (
					<div key={index}>
						<div key={index}>
							<MedicineCard
								medicine={medicine}
								month={month}
								setSelectedMedicine={setSelectedMedicine}
							></MedicineCard>
						</div>
					</div>
				))}
		</List>
	);
};

export default MedicinesList;