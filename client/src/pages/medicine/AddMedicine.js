import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	FormControl,
	FormControlLabel,
	Input,
	Checkbox
} from '@mui/material';

const AddMedicine = ({
	isAddDialogOpen,
	handleAddDialogClose,
	handleFormInputChange,
	handleImageUpload,
	handleAddMedicine,
	newMedicine,
	setNewMedicine
}) => {

	const handleInputChange = (e) => {
		const { value } = e.target;
		if (parseFloat(value) <= 0) {
			return;
		}

		handleFormInputChange(e);
	};

	const handleCheckboxChange = (e) => {
		setNewMedicine({
			...newMedicine,
			prescriptionMedicine: e.target.checked,
		});
	};

	return (
		<Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
			<DialogTitle>Add New Medicine</DialogTitle>
			<DialogContent>
				<form onSubmit={(e) => handleAddMedicine(e)} id='addMedicineForm'>
					<FormControl required fullWidth>
						<TextField
							name='name'
							label='Name'
							variant='outlined'
							fullWidth
							margin='normal'
							value={newMedicine.name}
							onChange={handleFormInputChange}
							required
						/>
					</FormControl>
					<FormControl required fullWidth>
						<TextField
							name='price'
							label='Price'
							variant='outlined'
							fullWidth
							margin='normal'
							value={newMedicine.price}
							onChange={handleInputChange}
							required
							type='number'
						/>
					</FormControl>

					<FormControl required fullWidth>
						<TextField
							name='description'
							label='Description'
							variant='outlined'
							fullWidth
							margin='normal'
							value={newMedicine.description}
							onChange={handleFormInputChange}
							required
						/>
					</FormControl>
					<FormControl required fullWidth>
						<TextField
							name='quantity'
							label='Quantity'
							variant='outlined'
							fullWidth
							margin='normal'
							value={newMedicine.quantity}
							onChange={handleInputChange}
							type='number'
							required
						/>
					</FormControl>
					<FormControl required fullWidth>
						<TextField
							name='medicinalUse'
							label='Medicinal use'
							variant='outlined'
							fullWidth
							margin='normal'
							value={newMedicine.medicinalUse}
							onChange={handleFormInputChange}
							required
						/>
					</FormControl>
					<FormControl required fullWidth>
						<TextField
							name='activeIngerdients'
							label='Active Ingredients'
							variant='outlined'
							fullWidth
							margin='normal'
							value={newMedicine.activeIngerdients}
							onChange={handleFormInputChange}
							required
						/>
					</FormControl>
					<FormControl required fullWidth>
						<FormControlLabel control={<Checkbox
							checked={newMedicine.prescriptionMedicine}
							onChange={handleCheckboxChange}
							name='prescriptionMedicine'
							color='primary' />} label="Prescription Medicine" />
					</FormControl>

					<FormControl fullWidth margin='normal'>
						<Input type='file' name='image' onChange={handleImageUpload} />
					</FormControl>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleAddDialogClose} color='secondary'>
					Cancel
				</Button>
				<Button type='submit' color='primary' form='addMedicineForm'>
					Add Medicine
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddMedicine;
