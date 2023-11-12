import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import PharmacistRow from './PharmacistRow';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { pharmacyAxios } from 'utils/AxiosConfig';

const Pharmacists = () => {
	const [pharmacists, setPharmacists] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
	const [pharmacistToDelete, setPharmacistToDelete] = useState(null);

	useEffect(() => {
		pharmacists.get('/pharmacists')
			.then((response) => response.data)
			.then((data) => {
				setPharmacists(data.pharmacists);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, []);

	const handleRemovePharmacist = (pharmacistId) => {
		setPharmacistToDelete(pharmacistId);
		setConfirmDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		pharmacyAxios.delete(`/pharmacists/${pharmacistToDelete}`)
			.then((response) => response.data)
			.then(() =>
				setPharmacists((prevPharmacists) =>
					prevPharmacists.filter(
						(pharmacist) => pharmacist._id !== pharmacistToDelete,
					),
				),
			)
			.catch((error) => {
				console.error('Error deleting pharmacist:', error);
			})
			.finally(() => {
				setPharmacistToDelete(null);
				setConfirmDeleteDialogOpen(false);
			});
	};

	const handleCancelDelete = () => {
		setPharmacistToDelete(null);
		setConfirmDeleteDialogOpen(false);
	};

	return (
		<MainCard title='Pharmacists'>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>User Name</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Date of Birth</TableCell>
									<TableCell>Hourly Rate</TableCell>
									<TableCell>Affiliation</TableCell>
									<TableCell>Educational Background</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{Array.isArray(pharmacists) &&
									pharmacists.map((pharmacist) => (
										<PharmacistRow
											key={pharmacist._id}
											pharmacist={pharmacist}
											handleRemovePharmacist={handleRemovePharmacist}
										/>
									))}
							</TableBody>
						</Table>
					</TableContainer>

					{/* Confirmation Dialog for Delete */}
					<DeleteConfirmationDialog
						open={confirmDeleteDialogOpen}
						onClose={handleCancelDelete}
						onConfirm={handleConfirmDelete}
						title='Confirm Delete'
						content='Are you sure you want to delete this pharmacist?'
					/>
				</div>
			)}
		</MainCard>
	);
};

export default Pharmacists;
