import React, { useState, useEffect } from 'react';
import { useUserContext } from 'hooks/useUserContext.js';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainCard from 'ui-component/cards/MainCard';
import AdminRow from './AdminRow';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog';
import AddAdminDialog from './AddAdminDialog';
import { authenticationAxios, pharmacyAxios } from 'utils/AxiosConfig';

const Admins = () => {
	const [admins, setAdmins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [openAddDialog, setOpenAddDialog] = useState(false);
	const [newAdminUsername, setNewAdminUsername] = useState('');
	const [newAdminPassword, setNewAdminPassword] = useState('');
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
	const [adminToDelete, setAdminToDelete] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const { user } = useUserContext();

	useEffect(() => {
		pharmacyAxios
			.get('/admins')
			.then((response) => response.data)
			.then((data) => {
				setAdmins(
					data.admins.filter((admin) => admin.userName !== user.userName),
				);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, []);

	const handleRemoveAdmin = (adminId) => {
		setAdminToDelete(adminId);
		setConfirmDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		const adminToBeDeleted = admins.find(
			(admin) => admin._id === adminToDelete,
		);
		if (adminToBeDeleted && adminToBeDeleted.mainAdmin) {
			// If it's a main admin, prevent deletion and show a message
			setConfirmDeleteDialogOpen(false);
			return;
		}

		pharmacyAxios
			.delete(`/admins/${adminToDelete}`)
			.then((response) => response.data)
			.then(() =>
				setAdmins((prevAdmins) =>
					prevAdmins.filter((admin) => admin._id !== adminToDelete),
				),
			)
			.catch((error) => {
				console.error('Error deleting admin:', error);
			})
			.finally(() => {
				setAdminToDelete(null);
				setConfirmDeleteDialogOpen(false);
			});
	};

	const handleCancelDelete = () => {
		setAdminToDelete(null);
		setConfirmDeleteDialogOpen(false);
	};

	const handleOpenAddDialog = () => {
		setOpenAddDialog(true);
	};

	const handleCloseAddDialog = () => {
		setOpenAddDialog(false);
		setNewAdminUsername('');
		setNewAdminPassword('');
		setErrorMessage('');
	};

	const handleAddAdmin = () => {
		const newAdmin = {
			userName: newAdminUsername,
			password: newAdminPassword,
		};

		if (!newAdminUsername || !newAdminPassword) {
			return;
		}

		authenticationAxios
			.post('/admins/pharmacy', JSON.stringify(newAdmin), {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => response.data)
			.then(() => {
				setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
				setOpenAddDialog(false);
				setNewAdminUsername('');
				setNewAdminPassword('');
				setErrorMessage('');
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status == 400) {
						setErrorMessage(
							`Username '${newAdminUsername}' already exists. Please choose a different username.`,
						);
						return;
					}
				} else console.error('Error adding admin:', error);
			});
	};

	const isAddButtonDisabled = !newAdminUsername || !newAdminPassword;

	return (
		<MainCard title='Admins'>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Username</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{Array.isArray(admins) &&
									admins.map((admin) => (
										<AdminRow
											key={admin._id}
											admin={admin}
											handleRemoveAdmin={handleRemoveAdmin}
										/>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<Button
						variant='contained'
						color='primary'
						onClick={handleOpenAddDialog}
						style={{
							position: 'fixed',
							bottom: '20px',
							right: '50px',
						}}
					>
						<AddIcon />
						Add Admin
					</Button>

					<AddAdminDialog
						openAddDialog={openAddDialog}
						handleCloseAddDialog={handleCloseAddDialog}
						newAdminUsername={newAdminUsername}
						newAdminPassword={newAdminPassword}
						setNewAdminUsername={setNewAdminUsername}
						setNewAdminPassword={setNewAdminPassword}
						handleAddAdmin={handleAddAdmin}
						isAddButtonDisabled={isAddButtonDisabled}
						errorMessage={errorMessage}
					/>

					<DeleteConfirmationDialog
						open={confirmDeleteDialogOpen}
						onClose={handleCancelDelete}
						onConfirm={handleConfirmDelete}
						title='Confirm Delete'
						content='Are you sure you want to delete this admin?'
					/>
				</div>
			)}
		</MainCard>
	);
};

export default Admins;
