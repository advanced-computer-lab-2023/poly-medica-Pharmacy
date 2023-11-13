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
	Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainCard from 'ui-component/cards/MainCard';
import AdminRow from './AdminRow';
import DeleteConfirmationDialog from '../../ui-component/DeleteConfirmationDialog';
import AddAdminDialog from './AddAdminDialog';
import Message from 'ui-component/Message';
import { authenticationAxios, pharmacyAxios } from 'utils/AxiosConfig';

const Admins = () => {
	const { user } = useUserContext();
	const [admins, setAdmins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [openAddDialog, setOpenAddDialog] = useState(false);
	const [newAdminUsername, setNewAdminUsername] = useState('');
	const [newAdminPassword, setNewAdminPassword] = useState('');
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
	const [adminToDelete, setAdminToDelete] = useState('');
	const [addAdmin, setAddAdmin] = useState(false);
	const [removeAdmin, setRemoveAdmin] = useState(false);
	const [adminIsBeingAdded, setAdminIsBeingAdded] = useState(false);
	const [adminIsBeingDeleted, setAdminIsBeingDeleted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

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
	}, [admins.length]);

	const handleRemoveAdmin = (adminId) => {
		setAdminToDelete(adminId);
		setConfirmDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		const adminToBeDeleted = admins.find(
			(admin) => admin._id === adminToDelete,
		);
		if (adminToBeDeleted && adminToBeDeleted.mainAdmin) {
			setConfirmDeleteDialogOpen(false);
			return;
		}
		setAdminIsBeingDeleted(true);
		pharmacyAxios
			.delete(`/admins/${adminToDelete}`)
			.then((response) => response.data)
			.then(() => {
				setAdmins((prevAdmins) =>
					prevAdmins.filter((admin) => admin._id !== adminToDelete),
				);
				setAdminIsBeingDeleted(false);
				setAdminToDelete('');
				setConfirmDeleteDialogOpen(false);
				setRemoveAdmin(true);
				setTimeout(() => {
					setRemoveAdmin(false);
				}, 2000);
			})
			.catch((error) => {
				setAdminIsBeingDeleted(false);
				setErrorMessage('Error in deleting admin.');
				console.error('Error deleting admin:', error);
			})
			.finally(() => {});
	};

	const handleCancelDelete = () => {
		setAdminToDelete('');
		setConfirmDeleteDialogOpen(false);
		setErrorMessage('');
		setAdminIsBeingDeleted(false);
	};

	const handleOpenAddDialog = () => {
		setOpenAddDialog(true);
	};

	const handleCloseAddDialog = () => {
		setOpenAddDialog(false);
		setNewAdminUsername('');
		setNewAdminPassword('');
		setErrorMessage('');
		setAdminIsBeingAdded(false);
	};

	const handleAddAdmin = () => {
		const newAdmin = {
			userName: newAdminUsername,
			password: newAdminPassword,
		};

		if (!newAdminUsername || !newAdminPassword) {
			return;
		}

		setAdminIsBeingAdded(true);
		authenticationAxios
			.post('/admins/pharmacy', JSON.stringify(newAdmin), {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => response.data)
			.then(() => {
				setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
				setAdminIsBeingAdded(false);
				setOpenAddDialog(false);
				setNewAdminUsername('');
				setNewAdminPassword('');
				setErrorMessage('');
				setAddAdmin(true);
				setTimeout(() => {
					setAddAdmin(false);
				}, 2000);
			})
			.catch((error) => {
				setAdminIsBeingAdded(false);
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

					<Fab
						color='secondary'
						aria-label='Add'
						onClick={handleOpenAddDialog}
						sx={{
							position: 'fixed',
							bottom: 16,
							right: 16,
							zIndex: 9999,
						}}
					>
						<AddIcon />
					</Fab>

					{addAdmin && (
						<Message
							message={'Admin added successfully!'}
							type={'success'}
							time={2000}
							vertical={'bottom'}
							horizontal={'left'}
						/>
					)}

					{removeAdmin && (
						<Message
							message={'Admin removed successfully!'}
							type={'success'}
							time={2000}
							vertical={'bottom'}
							horizontal={'left'}
						/>
					)}

					<AddAdminDialog
						openAddDialog={openAddDialog}
						handleCloseAddDialog={handleCloseAddDialog}
						newAdminUsername={newAdminUsername}
						newAdminPassword={newAdminPassword}
						setNewAdminUsername={setNewAdminUsername}
						setNewAdminPassword={setNewAdminPassword}
						handleAddAdmin={handleAddAdmin}
						isAddButtonDisabled={isAddButtonDisabled}
						adminIsBeingAdded={adminIsBeingAdded}
						errorMessage={errorMessage}
					/>

					<DeleteConfirmationDialog
						open={confirmDeleteDialogOpen}
						onClose={handleCancelDelete}
						onConfirm={handleConfirmDelete}
						title='Confirm Delete'
						content='Are you sure you want to delete this admin?'
						someoneIsBeingDeleted={adminIsBeingDeleted}
						errorMessage={errorMessage}
					/>
				</div>
			)}
		</MainCard>
	);
};

export default Admins;
