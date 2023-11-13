import React from 'react';
import { List } from '@mui/material';
import MedicineCard from './MedicineCard';

const MedicinesList = ({
	medicines,
	setSelectedMedicine,
	handleEditButtonClick,
	handleAddToCart,
}) => {
	return (
		<List>
			{Array.isArray(medicines) &&
				medicines.map((medicine, index) => (
					<div key={index}>
						<div key={index}>
							<MedicineCard
								medicine={medicine}
								handleEditButtonClick={handleEditButtonClick}
								setSelectedMedicine={setSelectedMedicine}
								handleAddToCart={handleAddToCart}
							></MedicineCard>
						</div>
					</div>
				))}
		</List>
	);
};

export default MedicinesList;
