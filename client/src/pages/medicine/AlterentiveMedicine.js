import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@mui/material';
import AltMedicines from './AltMedicines';
const AltrentivesMedicine = ({
	isAltDialogOpen,
	setIsAltDialogOpen,
	activeIngerdients
}) => {
    

    

	return (
		<Dialog open={isAltDialogOpen} onClose={() => setIsAltDialogOpen(false)}>
			<DialogTitle>Alterentive Medicines</DialogTitle>
			<DialogContent>
                <AltMedicines activeIngerdients={activeIngerdients}/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setIsAltDialogOpen(false)} color='secondary'>
					Done
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AltrentivesMedicine;
