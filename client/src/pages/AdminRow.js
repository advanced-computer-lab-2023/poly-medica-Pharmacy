import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const AdminRow = ({ admin }) => {
	return (
		<TableRow key={admin._id}>
			<TableCell>{admin.userName}</TableCell>
			{/* <TableCell>
				{admin.mainAdmin ? (
					<Tooltip title="Main Admin Can't be deleted">
						<IconButton disabled>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				) : (
					<IconButton
						onClick={() => handleRemoveAdmin(admin._id)}
						color='error'
					>
						<DeleteIcon />
					</IconButton>
				)}
			</TableCell> */}
		</TableRow>
	);
};

export default AdminRow;
