import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	DialogActions,
	Button,
} from '@mui/material';

const PatientDetails = ({ selectedPatients, handleDialogClose }) => {
	return (
		<Dialog open={selectedPatients} onClose={handleDialogClose} PaperProps={{ sx: { minWidth: window.outerWidth > 800 ? 500 : 300 } }}  >
			{selectedPatients && (
				<>
					<DialogTitle align='center' variant='h2'>{selectedPatients.name}</DialogTitle>
					<DialogContent>
						<Typography variant="subtitle1">Email:</Typography>
						<Typography variant="body1">{selectedPatients.email}</Typography>
						<Typography variant="subtitle1">Date of Birth:</Typography>
						<Typography variant="body1">${selectedPatients.dateOfBirth}</Typography>
						<Typography variant="subtitle1">Gender :</Typography>
						<Typography variant="body1">{selectedPatients.gender}</Typography>
						<Typography variant="subtitle1">Mobile Number:</Typography>
						<Typography variant="body1">{selectedPatients.mobileNumber}</Typography>
						<Typography variant="subtitle1">Emergency Contact :</Typography>
						<Typography variant="body1">{selectedPatients.emergencyContact.name}</Typography>
                        <Typography variant="body2">{selectedPatients.emergencyContact.mobile}</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose} color="primary">
                            Close
						</Button>
					</DialogActions>
				</>
			)}
		</Dialog>
	);
};

export default PatientDetails;