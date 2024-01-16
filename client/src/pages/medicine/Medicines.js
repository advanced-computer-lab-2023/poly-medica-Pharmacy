import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import { pharmacyAxios } from '../../utils/AxiosConfig';
import { Add as AddIcon } from '@mui/icons-material';
import MedicinesList from './MedicinesList';
import MedicineDetails from './MedicineDetails';
import AddMedicine from './AddMedicine';
import EditMedicine from './EditMedicine';
import Message from 'ui-component/Message';
import { useSearch } from 'contexts/SearchContext';
import { useFilter } from 'contexts/FilterContext';
import { useUserContext } from 'hooks/useUserContext';
import { useCartContext } from 'contexts/CartContext';

const Medicines = () => {
	const { user } = useUserContext();
	const userType = user.type;
	const userId = user.id;

	const [medicines, setMedicines] = useState([]);
	const [originalMedicines, setOriginalMedicines] = useState([]);
	const { searchQuery } = useSearch();
	const { filterData, updateFilter } = useFilter();
	const [selectedMedicine, setSelectedMedicine] = useState(null);
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [newMedicine, setNewMedicine] = useState({
		name: '',
		price: '',
		description: '',
		quantity: '',
		medicinalUse: '',
		activeIngerdients: '',
		prescriptionMedicine: false,
	});
	const [image, setImage] = useState(null);
	const [selectedEditMedicine, setSelectedEditMedicine] = useState(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const medicinalUses = [];
	const [addToCartAlert, setAddToCartAlert] = useState(false);
	const [medicineIsBeingAddedToCart, setMedicineIsBeingAddedToCart] =
		useState(false);
	const [errorAddingToCart, setErrorAddingToCart] = useState(false);
	const [dataChange, setDataChange] = useState(false);
	const { updateCartLength } = useCartContext();

	const handleDataChange = () => {
		setDataChange(!dataChange);
	};

	useEffect(() => {
		pharmacyAxios
			.get('/medicines')
			.then((response) => {
				setMedicines(response.data.medicines);
				setOriginalMedicines(response.data.medicines);
				for (let i = 0; i < response.data.medicines.length; i++) {
					const medicine = response.data.medicines[i];
					if (!medicinalUses.includes(medicine.medicinalUse))
						medicinalUses.push(medicine.medicinalUse);
				}
				updateFilter([
					{
						attribute: 'Medicinal Use',
						values: medicinalUses,
					},
				]);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [dataChange]);

	useEffect(() => {
		const filteredMedicines = originalMedicines.filter(
			(medicine) =>
				medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
				(!filterData[0].selectedValue ||
					medicine.medicinalUse === filterData[0].selectedValue),
		);
		setMedicines(filteredMedicines);
	}, [searchQuery, originalMedicines, filterData]);

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
			prescriptionMedicine: false,
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
				setOriginalMedicines((prevMedicines) => [
					...prevMedicines,
					newMedicineData,
				]);
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

	const handleSaveEdit = (e) => {
		e.preventDefault();
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
		setErrorAddingToCart(false);
		setMedicineIsBeingAddedToCart(true);
		pharmacyAxios
			.post(`/cart/users/${userId}/medicines`, { medicine })
			.then((response) => {
				console.log(response.data);
				setMedicineIsBeingAddedToCart(false);
				setAddToCartAlert(true);
				setTimeout(() => {
					setAddToCartAlert(false);
				}, 1000);
				updateCartItemsLength();
			})
			.catch((error) => {
				setMedicineIsBeingAddedToCart(false);
				errorAddingToCart(true);
				console.log(error);
			});
	};

	const updateCartItemsLength = () => {
		pharmacyAxios
			.get(`/cart/users/${userId}/items/length`)
			.then((response) => {
				console.log(response.data);
				updateCartLength(response.data.length);
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
				medicineIsBeingAddedToCart={medicineIsBeingAddedToCart}
				handleDataChange={handleDataChange}
				addToCartAlert={addToCartAlert}
				errorAddingToCart={errorAddingToCart}
			/>
			{addToCartAlert && (
				<Message
					message={'Medicine added to cart successfully!'}
					type={'success'}
					time={1000}
					vertical={'bottom'}
					horizontal={'right'}
				/>
			)}

			{medicineIsBeingAddedToCart && (
				<Message
					message={'Adding medicine to cart...'}
					type={'info'}
					time={1000}
					vertical={'bottom'}
					horizontal={'right'}
				/>
			)}
			{errorAddingToCart && (
				<Message
					message={'Error adding medicine to cart'}
					type={'error'}
					time={1000}
					vertical={'bottom'}
					horizontal={'right'}
				/>
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
			/>
			{userType !== 'patient' && (
				<div>
					<AddMedicine
						isAddDialogOpen={isAddDialogOpen}
						handleAddDialogClose={handleAddDialogClose}
						handleFormInputChange={handleFormInputChange}
						handleImageUpload={handleImageUpload}
						handleAddMedicine={handleAddMedicine}
						newMedicine={newMedicine}
						setNewMedicine={setNewMedicine}
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
