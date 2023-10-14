import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	DialogActions,
	Button,
} from '@mui/material';

const PharmacistsDetails = ({ selectedPharmacist, handleDialogClose }) => {
	return (
		<Dialog open={selectedPharmacist} onClose={handleDialogClose} PaperProps={{ sx: { minWidth: window.outerWidth > 800 ? 500 : 300 } }}  >
			{selectedPharmacist && (
				<>
					<DialogTitle align='center' variant='h2'>{selectedPharmacist.userData.name}</DialogTitle>
					<DialogContent>
						<Typography variant="subtitle1">Email:</Typography>
						<Typography variant="body1">{selectedPharmacist.userData.email}</Typography>
						<Typography variant="subtitle1">Date of Birth:</Typography>
						<Typography variant="body1">${selectedPharmacist.userData.dateOfBirth}</Typography>
						<Typography variant="subtitle1">Hourly Rate :</Typography>
						<Typography variant="body1">{selectedPharmacist.hourlyRate}</Typography>
						<Typography variant="subtitle1">Affiliation:</Typography>
						<Typography variant="body1">{selectedPharmacist.affiliation}</Typography>
						<Typography variant="subtitle1">Educational Background:</Typography>
						<Typography variant="body1">{selectedPharmacist.educationalBackground}</Typography>
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

export default PharmacistsDetails;