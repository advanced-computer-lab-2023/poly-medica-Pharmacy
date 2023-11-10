import React, { useState, useEffect } from 'react';
import { Fab, Grid, Alert } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import { pharmacyAxios } from '../../utils/AxiosConfig';
import { Add as AddIcon } from '@mui/icons-material';
import MedicinesList from './MedicinesList';
import MedicineDetails from './MedicineDetails';
import AddMedicine from './AddMedicine';
import EditMedicine from './EditMedicine';
import { useSearch } from 'contexts/SearchContext';
import { useUserContext } from 'hooks/useUserContext';

let userId;

const Medicines = () => {
	const user = useUserContext();
	const userType = user.user.type;
	userId = user.user.id;

	const [medicines, setMedicines] = useState([]);
	const [originalMedicines, setOriginalMedicines] = useState([]);
	const { searchQuery } = useSearch();
	const [selectedMedicine, setSelectedMedicine] = useState(null);
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [newMedicine, setNewMedicine] = useState({
		name: '',
		price: '',
		description: '',
		quantity: '',
		medicinalUse: '',
		activeIngerdients: '',
	});
	const [image, setImage] = useState(null);
	const [selectedEditMedicine, setSelectedEditMedicine] = useState(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [addToCartAlert, setAddToCartAlert] = useState(false);

	useEffect(() => {
		pharmacyAxios
			.get('/medicines')
			.then((response) => {
				setMedicines(response.data.medicines);
				setOriginalMedicines(response.data.medicines);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		const filteredMedicines = originalMedicines.filter((medicine) =>
			medicine.name.toLowerCase().includes(searchQuery.toLowerCase()),
		);
		setMedicines(filteredMedicines);
	}, [searchQuery, originalMedicines]);

	const handleDialogClose = () => {
		setSelectedMedicine(null);
	};

	const handleAddDialogOpen = () => {
		setIsAddDialogOpen(true);
	};

	const handleAddDialogClose = () => {
		setIsAddDialogOpen(false);
		setNewMedicine({
			name: '',
			price: '',
			description: '',
			quantity: '',
			medicinalUse: '',
			activeIngerdients: '',
		});
	};

	const handleFormInputChange = (e) => {
		const { name, value } = e.target;
		setNewMedicine((prevMedicine) => ({
			...prevMedicine,
			[name]: value,
		}));
	};

	const handleImageUpload = (e) => {
		const selectedImage = e.target.files[0];
		setImage(selectedImage);
	};

	const handleAddMedicine = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('newMedicine', JSON.stringify(newMedicine));
		formData.append('image', image);
		pharmacyAxios
			.post('/medicines', formData)
			.then((response) => {
				const newMedicineData = response.data.addedMedicine;
				setMedicines((prevMedicines) => [...prevMedicines, newMedicineData]);
				handleAddDialogClose();
			})
			.catch((error) => {
				console.log('Error adding medicine:', error);
				handleAddDialogClose();
			});
	};

	const handleEditButtonClick = (medicine, event) => {
		event.stopPropagation();
		setSelectedEditMedicine(medicine);
		setIsEditDialogOpen(true);
	};

	const handleSaveEdit = () => {
		if (selectedEditMedicine) {
			pharmacyAxios
				.patch(`/medicines/${selectedEditMedicine._id}`, {
					updatedMedicine: selectedEditMedicine,
				})
				.then(() => {
					setSelectedEditMedicine(null);
					setIsEditDialogOpen(false);
					setMedicines((prevMedicines) => {
						const updatedMedicines = prevMedicines.map((med) => {
							if (med._id === selectedEditMedicine._id) {
								return selectedEditMedicine;
							}
							return med;
						});
						return updatedMedicines;
					});
				})
				.catch((error) => {
					console.log('Error updating medicine:', error);
				});
		}
	};

	const handleAddToCart = (medicine) => {
		pharmacyAxios
			.post(`/cart/${userId}/medicines`, { medicine })
			.then((response) => {
				console.log(response.data);
				setAddToCartAlert(true);
				setTimeout(() => {
					setAddToCartAlert(false);
				}, 1000);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<MainCard title='Medicines'>
			<MedicinesList
				medicines={medicines}
				setSelectedMedicine={setSelectedMedicine}
				handleEditButtonClick={handleEditButtonClick}
				handleAddToCart={handleAddToCart}
				userId={userId}
				userType={userType}
			/>
			{addToCartAlert && (
				<Grid
					item
					sx={{
						position: 'fixed',
						bottom: 16,
						right: 30,
						zIndex: 9999,
					}}
				>
					<Alert variant='filled' severity='success'>
						Medicine added to cart!
					</Alert>
				</Grid>
			)}
			{userType === 'pharmacist' && (
				<Fab
					color='secondary'
					aria-label='Add'
					onClick={handleAddDialogOpen}
					sx={{
						position: 'fixed',
						bottom: 16,
						right: 16,
						zIndex: 9999,
					}}
				>
					<AddIcon />
				</Fab>
			)}
			<MedicineDetails
				selectedMedicine={selectedMedicine}
				handleDialogClose={handleDialogClose}
				userType={userType}
			/>
			{userType === 'pharmacist' && (
				<div>
					<AddMedicine
						isAddDialogOpen={isAddDialogOpen}
						handleAddDialogClose={handleAddDialogClose}
						handleFormInputChange={handleFormInputChange}
						handleImageUpload={handleImageUpload}
						handleAddMedicine={handleAddMedicine}
						newMedicine={newMedicine}
					/>
					<EditMedicine
						isEditDialogOpen={isEditDialogOpen}
						setIsEditDialogOpen={setIsEditDialogOpen}
						setSelectedEditMedicine={setSelectedEditMedicine}
						handleSaveEdit={handleSaveEdit}
						selectedEditMedicine={selectedEditMedicine}
					/>
				</div>
			)}
		</MainCard>
	);
};

export default Medicines;
