import DoctorIcon from '../../assets/images/icons/DoctorIcon.png';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import PaidIcon from '@mui/icons-material/Paid';

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
		<Dialog
			open={selectedPharmacist}
			onClose={handleDialogClose}
			PaperProps={{ sx: { minWidth: window.outerWidth > 800 ? 500 : 300 } }}
		>
			{selectedPharmacist && (
				<>
					<DialogTitle align='center' variant='h2'>
						{selectedPharmacist.userData.name}
					</DialogTitle>
					<DialogContent>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center',
								flexDirection: 'row',
								marginBottom: '5em',
							}}
						>
							<img
								src={DoctorIcon}
								alt={selectedPharmacist.userData.name}
								width='100'
								height='100'
							/>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.7em',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'row',
									}}
								>
									<WorkIcon style={{ marginRight: '0.4em' }} />
									<Typography variant='body1'>
										{`${selectedPharmacist.affiliation}`}
									</Typography>
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'row',
									}}
								>
									<SchoolIcon style={{ marginRight: '0.4em' }} />
									<Typography variant='body1'>
										{`${selectedPharmacist.educationalBackground}`}
									</Typography>
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'row',
									}}
								>
									<PaidIcon style={{ marginRight: '0.4em' }} />
									<Typography variant='body1'>
										{selectedPharmacist.hourlyRate}
									</Typography>
								</div>
							</div>
						</div>
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

export default PharmacistsDetails;
