import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const formatDate = (dateString) => {
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};

const PharmacistRow = ({ pharmacist, handleRemovePharmacist }) => {
	return (
		<TableRow key={pharmacist._id}>
			<TableCell>{pharmacist.userData.name}</TableCell>
			<TableCell>{pharmacist.userData.userName}</TableCell>
			<TableCell>{pharmacist.userData.email}</TableCell>
			<TableCell>{formatDate(pharmacist.userData.dateOfBirth)}</TableCell>
			<TableCell>{pharmacist.hourlyRate}</TableCell>
			<TableCell>{pharmacist.affiliation}</TableCell>
			<TableCell>{pharmacist.educationalBackground}</TableCell>
			<TableCell>
				<IconButton
					aria-label='delete'
					onClick={() => handleRemovePharmacist(pharmacist._id)}
					color='error'
				>
					<DeleteIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default PharmacistRow;
