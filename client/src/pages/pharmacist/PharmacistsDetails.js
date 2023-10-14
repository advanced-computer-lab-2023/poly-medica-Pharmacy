import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	DialogActions,
	Button,
} from '@mui/material';

const PharmacistsDetails = ({ selectedPharmacists, handleDialogClose }) => {
	return (
		<Dialog open={selectedPharmacists} onClose={handleDialogClose} PaperProps={{ sx: { minWidth: window.outerWidth > 800 ? 500 : 300 } }}  >
			{selectedPharmacists && (
				<>
					<DialogTitle align='center' variant='h2'>{selectedPharmacists.userData.name}</DialogTitle>
					<DialogContent>
						<Typography variant="subtitle1">Email:</Typography>
						<Typography variant="body1">{selectedPharmacists.userData.email}</Typography>
						<Typography variant="subtitle1">Date of Birth:</Typography>
						<Typography variant="body1">${selectedPharmacists.userData.dateOfBirth}</Typography>
						<Typography variant="subtitle1">Hourly Rate :</Typography>
						<Typography variant="body1">{selectedPharmacists.hourlyRate}</Typography>
						<Typography variant="subtitle1">Affiliation:</Typography>
						<Typography variant="body1">{selectedPharmacists.affiliation}</Typography>
						<Typography variant="subtitle1">Educational Background:</Typography>
						<Typography variant="body1">{selectedPharmacists.educationalBackground}</Typography>
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