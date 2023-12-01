import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Grid,
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MedicineCard from './MedicineCard';
import { formatMedicines } from '../../utils/PrescriptionUtils';
const PrescriptionDetails = ({
	selectedPrescription,
	prescriptionDoctor,
	handleDialogClose,
	medicines,
}) => {
	const formattedMedicines = formatMedicines(medicines, selectedPrescription);

	return (
		<Dialog
			open={selectedPrescription}
			onClose={handleDialogClose}
			PaperProps={{ sx: { minWidth: window.outerWidth > 800 ? 500 : 300 } }}
		>
			{selectedPrescription && prescriptionDoctor && (
				<>
					<DialogContent>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
							}}
						>
							<Typography variant='h4'>{`Dr. ${prescriptionDoctor.userData.name}`}</Typography>
							<Typography variant='body1'>{`${prescriptionDoctor.speciality} Clinic`}</Typography>
						</div>
						<Typography variant='subtitle1'>Date:</Typography>
						<Typography variant='body1'>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								{dayjs(selectedPrescription.date).format('LL')}
							</LocalizationProvider>
						</Typography>
						<Typography variant='subtitle1'>Filled:</Typography>
						<Typography variant='body1'>
							{selectedPrescription.filled ? 'Yes' : 'No'}
						</Typography>
						<Typography sx={{ marginBottom: '5%' }} variant='subtitle1'>
							Medicines:
						</Typography>
						<Grid container spacing={2}>
							<Grid container spacing={2} alignItems={'center'}>
								{formattedMedicines.map((medicine, index) => (
									<Grid item xs={4} key={index}>
										<MedicineCard medicine={medicine} />
									</Grid>
								))}
							</Grid>
						</Grid>

						<Typography sx={{ marginTop: '5%' }} variant='subtitle1'>
							Description:
						</Typography>
						<Typography variant='body1'>
							{selectedPrescription.description}
						</Typography>
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

export default PrescriptionDetails;
