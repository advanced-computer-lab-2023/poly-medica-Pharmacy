import React, { useState } from 'react';
// import { Fab } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
// import { Add as AddIcon } from '@mui/icons-material';
import MedicinesList from './MedicinesList';
import MedicineDetails from './MedicineDetails';
// import AddMedicine from './AddMedicine';
// import EditMedicine from './EditMedicine';
// import Message from 'ui-component/Message';
// import { useUserContext } from 'hooks/useUserContext';

const Medicines = ({ medicines, month }) => {
	// const { user } = useUserContext();
	// const userType = user.type;

	const [selectedMedicine, setSelectedMedicine] = useState(null);


const handleDialogClose = () => {
		setSelectedMedicine(null);
	};

	return (
		<MainCard title='Medicines'>
			<MedicinesList
				medicines={medicines}
				setSelectedMedicine={setSelectedMedicine}
				month={month}
			/>
			{/* {addToCartAlert && (
				<Message
					message={'Medicine added to cart successfully!'}
					type={'success'}
					time={1000}
					vertical={'bottom'}
					horizontal={'right'}
				/>
			)} */}

			{/* {medicineIsBeingAddedToCart && (
				<Message
					message={'Adding medicine to cart...'}
					type={'info'}
					time={1000}
					vertical={'bottom'}
					horizontal={'right'}
				/>
			)} */}

			{/* {errorAddingToCart && (
				<Message
					message={'Error adding medicine to cart'}
					type={'error'}
					time={1000}
					vertical={'bottom'}
					horizontal={'right'}
				/>
			)} */}

			{/* {userType === 'pharmacist' && (
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
			)} */}
			<MedicineDetails
				selectedMedicine={selectedMedicine}
				handleDialogClose={handleDialogClose}
			/>
			{/* {userType !== 'patient' && (
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
			)} */}
		</MainCard>
	);
};

export default Medicines;
