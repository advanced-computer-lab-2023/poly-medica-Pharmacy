import PrescriptionItem from './PrescriptionItem';
import List from '@mui/material/List';

const PrescriptionsList = ({
	prescriptions,
	handleSelectingPrescription,
	addToCart,
}) => {
	return (
		<List>
			{Array.isArray(prescriptions) &&
				prescriptions.map((prescription, index) => {
					return (
						<div key={index}>
							<PrescriptionItem
								key={index}
								prescription={prescription}
								handleClicking={handleSelectingPrescription}
								addToCart={addToCart}
							/>
						</div>
					);
				})}
		</List>
	);
};

export default PrescriptionsList;
