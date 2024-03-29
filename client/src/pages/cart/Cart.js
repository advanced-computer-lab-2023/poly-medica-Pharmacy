import React, { useState, useEffect } from 'react';
import { useUserContext } from 'hooks/useUserContext';
import { useCartContext } from 'contexts/CartContext';
import { pharmacyAxios } from '../../utils/AxiosConfig';
import MedicineCard from './MedicineCard';
import PrescriptionCard from './PrescriptionCard';
import { Box } from '@mui/system';
import { Button, Grid, Paper } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

const Cart = () => {
	const navigate = useNavigate();
	const user = useUserContext();
	const userId = user.user.id;
	const [cartItems, setCartItems] = useState([]);
	const [cartPrescriptions, setCartPrescriptions] = useState([]);
	const [itemsLength, setItemsLength] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const { cartLength, updateCartLength } = useCartContext();

	useEffect(() => {
		pharmacyAxios
			.get(`/cart/users/${userId}/medicines`)
			.then((response) => {
				console.log(response.data);
				setCartItems(response.data.medicines);
				setCartPrescriptions(response.data.prescriptions);
				setItemsLength(
					response.data.medicines.length + response.data.prescriptions.length,
				);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
		console.log('cart items: ', cartItems);
	}, [cartLength]);

	const handleDeleteMedicine = async (medicineId) => {
		await pharmacyAxios
			.delete(`/cart/users/${userId}/medicines/${medicineId}`)
			.then((response) => {
				console.log(response.data);
				setCartItems(
					cartItems.filter((item) => item.medicine._id !== medicineId),
				);
				setItemsLength(itemsLength - 1);
				updateCartLength();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const updateMedicineQuantity = (id, quantity) => {
		console.log("was here");
		pharmacyAxios
			.patch(`/cart/users/${userId}/medicines/${id}?quantity=${quantity}`)
			.then((response) => {
				console.log(response.data);
				updateCartLength();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const removePrescription = async (prescriptionId) => {
		await pharmacyAxios
			.delete(`/cart/users/${userId}/prescriptions/${prescriptionId}`)
			.then((response) => {
				console.log(response.data);
				setCartPrescriptions(
					cartPrescriptions.filter(
						(item) => item.prescriptionId !== prescriptionId,
					),
				);
				setItemsLength(itemsLength - 1);
				updateCartLength();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<>
					{itemsLength ? (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '0.5rem',
								width: '80%',
								margin: 'auto',
							}}
						>
							<h1>Shopping Cart</h1>
							{Array.isArray(cartItems) &&
								cartItems.map((item) => (
									<MedicineCard
										key={item.medicine._id}
										medicine={item.medicine}
										quantity={item.quantity}
										onRemove={handleDeleteMedicine}
										onUpdateQuantity={updateMedicineQuantity}
									/>
								))}

							{Array.isArray(cartPrescriptions) &&
								cartPrescriptions.map((item) => (
									<PrescriptionCard
										key={item._id}
										prescriptionId={item.prescriptionId}
										doctorName={item.doctorName}
										description={item.description}
										price={item.price}
										medicinesQuantity={item.medicinesQuantity}
										removePrescription={removePrescription}
									/>
								))}

							<Grid
								container
								spacing={2}
								mt={2}
								sx={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									width: '400px',
									margin: 'auto',
								}}
							>
								<Grid item xs={6}>
									<Button
										color='primary'
										onClick={() => navigate('/patient/pages/medicines')}
										sx={{
											border: '1px solid #3f51b5',
											borderRadius: '25px',
											'&:hover': {
												backgroundColor: '#4D4C7D',
												color: '#fff',
											},
											padding: '0.5rem 1rem',
										}}
									>
										<ChevronLeftIcon />
										continue shopping
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button
										color='primary'
										onClick={() =>
											navigate(`/patient/pages/checkout/cart/${userId}`)
										}
										sx={{
											border: '1px solid #3f51b5',
											borderRadius: '25px',
											'&:hover': {
												backgroundColor: '#4D4C7D',
												color: '#fff',
											},
											padding: '0.5rem 1rem',
										}}
									>
										Proceed to checkout
									</Button>
								</Grid>
							</Grid>
						</Box>
					) : (
						<Grid
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '0.5rem',
								height: '600px',
								width: '80%',
								margin: 'auto',
							}}
						>
							<h1>Shopping Cart</h1>
							<Paper
								elevation={1}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									textAlign: 'center',
									height: '100%',
								}}
							>
								<Box style={{ margin: 'auto' }}>
									<ShoppingCartIcon style={{ fontSize: 100, color: '#aaa' }} />
									<Typography variant='h5' color='textSecondary' style={{}}>
										Your cart is empty.
									</Typography>
								</Box>
							</Paper>
							<Button
								color='primary'
								onClick={() => navigate('/patient/pages/medicines')}
								sx={{
									border: '1px solid #3f51b5',
									borderRadius: '25px',
									'&:hover': {
										backgroundColor: '#4D4C7D',
										color: '#fff',
									},
									padding: '0.5rem 1rem',
								}}
							>
								<ChevronLeftIcon />
								Explore medicines
							</Button>
						</Grid>
					)}
				</>
			)}
		</>
	);
};

export default Cart;
