import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	DialogActions,
	Button,
} from '@mui/material';
import { PHARMACY_BASE_URL } from 'utils/Constants';
import { useUserContext } from 'hooks/useUserContext';

const MedicineDetails = ({ selectedMedicine, handleDialogClose }) => {
	const { user } = useUserContext();
	const userType = user.type;
	console.log('user type in medicine details', userType);
	return (
		<Dialog
			open={selectedMedicine}
			onClose={handleDialogClose}
			PaperProps={{ sx: { minWidth: window.outerWidth > 800 ? 500 : 300 } }}
		>
			{selectedMedicine && (
				<>
					<DialogTitle align='center' variant='h2'>
						{selectedMedicine.name}
					</DialogTitle>
					<DialogContent>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
							}}
						>
							<img
								src={`${PHARMACY_BASE_URL}/medicines/${selectedMedicine._id}/pictures`}
								alt={selectedMedicine.name}
								width='180'
								height='180'
								style={{ margin: 'auto' }}
							/>
						</div>
						<Typography variant='subtitle1'>Description:</Typography>
						<Typography variant='body1'>
							{selectedMedicine.description}
						</Typography>
						<Typography variant='subtitle1'>Price:</Typography>
						<Typography variant='body1'>${selectedMedicine.price}</Typography>
						<Typography variant='subtitle1'>Medicinal Use:</Typography>
						<Typography variant='body1'>
							{selectedMedicine.medicinalUse}
						</Typography>
						<Typography variant='subtitle1'>Active Ingredients:</Typography>
						<Typography variant='body1'>
							{selectedMedicine.activeIngerdients}
						</Typography>
						{userType === 'pharmacist' && (
							<>
								<Typography variant='subtitle1'>Quantity:</Typography>
								<Typography variant='body1'>
									{selectedMedicine.quantity}
								</Typography>
							</>
						)}
						<Typography variant='subtitle1'>Sales:</Typography>
						<Typography variant='body1'>{selectedMedicine.sales}</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose} color='primary'>
							Close
						</Button>
					</DialogActions>
				</>
			)}
		</Dialog>
	);
};

export default MedicineDetails;
