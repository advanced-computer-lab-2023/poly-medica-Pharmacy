import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import DeleteConfirmationDialog from '../../ui-component/DeleteConfirmationDialog';
import { pharmacyAxios } from 'utils/AxiosConfig';
import Message from 'ui-component/Message';
import PharmacistsList from './PharmacistsList';
import PharmacistsDetails from './PharmacistsDetails';

const Pharmacists = () => {
	const [pharmacists, setPharmacists] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
	const [pharmacistToDelete, setPharmacistToDelete] = useState(null);
	const [pharmacistIsBeingDeleted, setPharmacistIsBeingDeleted] =
		useState(false);
	const [pharmacistDeleted, setPharmacistDeleted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [selectedPharmacist, setSelectedPharmacist] = useState(null);

	useEffect(() => {
		pharmacyAxios
			.get('/pharmacists')
			.then((response) => response.data)
			.then((data) => {
				setPharmacists(data.pharmacists);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, [pharmacists.length]);

	const handleDialogClose = () => {
		setSelectedPharmacist(null);
		setErrorMessage('');
	};

	const handleRemovePharmacist = (e, pharmacistId) => {
		e.stopPropagation();
		setPharmacistToDelete(pharmacistId);
		setConfirmDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		setPharmacistIsBeingDeleted(true);
		pharmacyAxios
			.delete(`/pharmacists/${pharmacistToDelete}`)
			.then((response) => response.data)
			.then(() => {
				setPharmacists((prevPharmacists) =>
					prevPharmacists.filter(
						(pharmacist) => pharmacist._id !== pharmacistToDelete,
					),
				);
				setPharmacistIsBeingDeleted(false);
				setPharmacistToDelete(null);
				setConfirmDeleteDialogOpen(false);
				setPharmacistDeleted(true);
				setTimeout(() => {
					setPharmacistDeleted(false);
				}, 2000);
			})
			.catch((error) => {
				setPharmacistIsBeingDeleted(false);
				setErrorMessage('Error deleting pharmacist');
				console.error('Error deleting pharmacist:', error);
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
				<>
					<PharmacistsList
						pharmacists={pharmacists}
						handleRemovePharmacist={handleRemovePharmacist}
						setSelectedPharmacist={setSelectedPharmacist}
					/>

					<PharmacistsDetails
						selectedPharmacist={selectedPharmacist}
						handleDialogClose={handleDialogClose}
					/>

					{pharmacistDeleted && (
						<Message
							message={'Pharmacist deleted successfully!'}
							type={'success'}
							time={2000}
							vertical={'bottom'}
							horizontal={'right'}
						/>
					)}

					<DeleteConfirmationDialog
						open={confirmDeleteDialogOpen}
						onClose={handleCancelDelete}
						onConfirm={handleConfirmDelete}
						title='Confirm Delete'
						content='Are you sure you want to delete this pharmacist?'
						errorMessage={errorMessage}
						someoneIsBeingDeleted={pharmacistIsBeingDeleted}
					/>
				</>
			)}
		</MainCard>
	);
};

export default Pharmacists;
