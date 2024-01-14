import React from 'react';
import { List, Grid } from '@mui/material';
import MedicineCard from './MedicineCard';
import { useUserContext } from 'hooks/useUserContext';
import { PHARMACIST_TYPE_ENUM } from 'utils/Constants';

const MedicinesList = ({
	medicines,
	setSelectedMedicine,
	handleEditButtonClick,
	handleAddToCart,
	medicineIsBeingAddedToCart,
	handleDataChange,
	addToCartAlert,
	errorAddingToCart,
}) => {

	const { user } = useUserContext();
	console.log({ user });
	return (
		<List>
			<Grid container>
				{Array.isArray(medicines) &&
					medicines.map((medicine, index) => {
						return (!medicine.archive || (user.type === PHARMACIST_TYPE_ENUM)) ? (
							<Grid item xs={6}>
								<div key={index}>
									<div key={index}>
										<MedicineCard
											medicine={medicine}
											handleEditButtonClick={handleEditButtonClick}
											setSelectedMedicine={setSelectedMedicine}
											handleAddToCart={handleAddToCart}
											medicineIsBeingAddedToCart={medicineIsBeingAddedToCart}
											handleDataChange={handleDataChange}
											addToCartAlert={addToCartAlert}
											errorAddingToCart={errorAddingToCart}
										></MedicineCard>
									</div>
								</div>
							</Grid>
						) : <></>;
					})}
			</Grid>
		</List>
	);
};

export default MedicinesList;
