import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@mui/material';

const AltrentivesMedicine = ({
	isAltDialogOpen,
	setIsAltDialogOpen,
}) => {
    

    

	return (
		<Dialog open={isAltDialogOpen} onClose={() => setIsAltDialogOpen(false)}>
			<DialogTitle>Alterentive Medicines</DialogTitle>
			<DialogContent>
                
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
