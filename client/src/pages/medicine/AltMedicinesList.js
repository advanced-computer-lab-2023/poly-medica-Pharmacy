import React from 'react';
import { List } from '@mui/material';
import AltMedicineCard from './AltMedicineCard';
const AltMedicinesList = ({
	medicines,
	setSelectedMedicine,
	handleAddToCart,
	medicineIsBeingAddedToCart,
	foundInPrescription,
}) => {
	return (
		<List>
			{Array.isArray(medicines) &&
				medicines.map((medicine, index) => (
					<div key={index}>
						<div key={index}>
							<AltMedicineCard
								medicine={medicine}
								setSelectedMedicine={setSelectedMedicine}
								handleAddToCart={handleAddToCart}
								medicineIsBeingAddedToCart={medicineIsBeingAddedToCart}
								foundInPrescription={foundInPrescription}
							></AltMedicineCard>
						</div>
					</div>
				))}
		</List>
	);
};

export default AltMedicinesList;
