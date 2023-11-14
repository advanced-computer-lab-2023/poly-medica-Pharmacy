import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	FormControl,
} from '@mui/material';

const EditMedicine = ({
	isEditDialogOpen,
	setIsEditDialogOpen,
	setSelectedEditMedicine,
	handleSaveEdit,
	selectedEditMedicine,
}) => {


	return (
		<Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
			<DialogTitle>Edit Medicine</DialogTitle>
			<DialogContent>
				{selectedEditMedicine && (
					<form onSubmit={(e) => handleSaveEdit(e)} id='editMedicineForm'>
						<FormControl required fullWidth>
							<TextField
								name='name'
								label='Name'
								variant='outlined'
								fullWidth
								margin='normal'
								value={selectedEditMedicine.name}
								onChange={(e) =>
									setSelectedEditMedicine({
										...selectedEditMedicine,
										name: e.target.value,
									})
								}
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
								value={selectedEditMedicine.price}
								onChange={(e) => {
									if (parseFloat(e.target.value) > 0)
										setSelectedEditMedicine({
											...selectedEditMedicine,
											price: e.target.value,
										});
								}
								}
								type='number'
								required
							/>
						</FormControl>

						<FormControl required fullWidth>
							<TextField
								name='description'
								label='Description'
								variant='outlined'
								fullWidth
								margin='normal'
								value={selectedEditMedicine.description}
								onChange={(e) =>
									setSelectedEditMedicine({
										...selectedEditMedicine,
										description: e.target.value,
									})
								}
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
								value={selectedEditMedicine.quantity}
								onChange={(e) => {
									if (parseFloat(e.target.value) > 0)
										setSelectedEditMedicine({
											...selectedEditMedicine,
											quantity: e.target.value,
										});
								}
								}
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
								value={selectedEditMedicine.medicinalUse}
								onChange={(e) =>
									setSelectedEditMedicine({
										...selectedEditMedicine,
										medicinalUse: e.target.value,
									})
								}
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
								value={selectedEditMedicine.activeIngerdients}
								onChange={(e) =>
									setSelectedEditMedicine({
										...selectedEditMedicine,
										activeIngerdients: e.target.value,
									})
								}
								required
							/>
						</FormControl>
					</form>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setIsEditDialogOpen(false)} color='secondary'>
					Cancel
				</Button>
				<Button type='submit' color='primary' form='editMedicineForm'>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditMedicine;
