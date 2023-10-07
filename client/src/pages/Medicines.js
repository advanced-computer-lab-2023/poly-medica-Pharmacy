import React, { useState, useEffect } from 'react';
import {
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Fab,
	TextField,
	FormControl,
	Input,
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { pharmacyAxios } from 'utils/AxiosConfig';
import medicineImage from './medicine.jpg';
import { Add as AddIcon } from '@mui/icons-material';

const Medicines = () => {
	const [medicines, setMedicines] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedMedicine, setSelectedMedicine] = useState(null);
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [newMedicine, setNewMedicine] = useState({
		name: '',
		price: '',
		description: '',
		quantity: '',
		medicinalUse: '',
		activeIngerdients: '',
		image: null,
	});

	useEffect(() => {
		pharmacyAxios.get('/medicines')
			.then((response) => {
				setMedicines(response.data.medicines);
				setIsLoading(false);
			})
			.catch(error => {
				setIsLoading(false);
				console.log(error);
			});
	}, []);

	const handleDialogOpen = (medicine) => {
		setSelectedMedicine(medicine);
	};

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
			image: null,
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
		setNewMedicine((prevMedicine) => ({
			...prevMedicine,
			image: selectedImage,
		}));
	};

	const handleAddMedicine = () => {
		// Implement the logic to add a new medicine to your server here
		// You can make a POST request using pharmacyAxios to the /medicine endpoint
		// Send the newMedicine data to the server
		// Don't forget to handle errors and update the medicines list on success

		// After successfully adding the medicine, close the dialog
		handleAddDialogClose();
	};

	return (
		<MainCard title="Medicines">
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<List>
					{Array.isArray(medicines) && medicines.map((medicine, index) => (
						<div key={index}>
							<div key={index}>
								<ListItem button onClick={() => handleDialogOpen(medicine)}>
									<ListItemAvatar>
										<img src={medicineImage} alt={medicine.name} width="50" height="50" />
									</ListItemAvatar>
									<ListItemText primary={medicine.name} secondary={medicine.description} sx={{
										width: '60%',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										lineHeight: '1.5em',
										maxHeight: '3em',
									}} />
									<ListItemText primary={`Price: $${medicine.price}`} sx={{ paddingLeft: '2%' }} />
								</ListItem>
							</div>
						</div>
					))}
				</List>
			)}
			<Fab
				color="secondary"
				aria-label="Add"
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
			<Dialog open={selectedMedicine} onClose={handleDialogClose}>
				{selectedMedicine && (
					<>
						<DialogTitle align='center' variant='h2'>{selectedMedicine.name}</DialogTitle>
						<DialogContent>
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
								<img src={medicineImage} alt={selectedMedicine.name} width="150" height="150" style={{ margin: 'auto' }} />
							</div>
							<Typography variant="subtitle1">Description:</Typography>
							<Typography variant="body1">{selectedMedicine.description}</Typography>
							<Typography variant="subtitle1">Price:</Typography>
							<Typography variant="body1">${selectedMedicine.price}</Typography>
							<Typography variant="subtitle1">Medicinal Use:</Typography>
							<Typography variant="body1">{selectedMedicine.medicinalUse}</Typography>
							<Typography variant="subtitle1">Active Ingredients:</Typography>
							<Typography variant="body1">{selectedMedicine.activeIngerdients}</Typography>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleDialogClose} color="primary">
								Close
							</Button>
						</DialogActions>
					</>
				)}
			</Dialog>
			<Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
				<DialogTitle>Add New Medicine</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							name="name"
							label="Name"
							variant="outlined"
							fullWidth
							margin="normal"
							value={newMedicine.name}
							onChange={handleFormInputChange}
							required
						/>
						<TextField
							name="price"
							label="Price"
							variant="outlined"
							fullWidth
							margin="normal"
							value={newMedicine.price}
							onChange={handleFormInputChange}
							required
						/>
						
						<TextField
							name="description"
							label="Description"
							variant="outlined"
							fullWidth
							margin="normal"
							value={newMedicine.description}
							onChange={handleFormInputChange}
							required
						/>
						<TextField
							name="quantity"
							label="Quantity"
							variant="outlined"
							fullWidth
							margin="normal"
							value={newMedicine.quantity}
							onChange={handleFormInputChange}
							required
						/>
						<TextField
							name="medicinalUse"
							label="Medicinal use"
							variant="outlined"
							fullWidth
							margin="normal"
							value={newMedicine.medicinalUse}
							onChange={handleFormInputChange}
							required
						/>
						<TextField
							name="activeIngredients"
							label="Active Ingredients"
							variant="outlined"
							fullWidth
							margin="normal"
							value={newMedicine.activeIngerdients}
							onChange={handleFormInputChange}
							required
						/>
						{/* File input for image upload */}
						<FormControl fullWidth margin="normal">
							<Input
								type="file"
								name="image"
								onChange={handleImageUpload}
							/>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddDialogClose} color="secondary">
						Cancel
					</Button>
					<Button
						onClick={handleAddMedicine}
						color="primary"
					>
						Add Medicine
					</Button>
				</DialogActions>
			</Dialog>
		</MainCard>
	);
};

export default Medicines;
