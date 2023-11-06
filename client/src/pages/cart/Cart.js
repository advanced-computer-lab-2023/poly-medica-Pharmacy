import React, { useState, useEffect } from 'react';
import { useUserContext } from 'hooks/useUserContext';
import { pharmacyAxios } from '../../utils/AxiosConfig';
import MedicineCard from './MedicineCard';
import { Box } from '@mui/system';
import { Button, Grid, Paper } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';

const Cart = () => {
	const user = useUserContext();
	const userId = user.user.id;
	console.log('user id: ', userId);
	const [cartItems, setCartItems] = useState([]);
	const [itemsLength, setItemsLength] = useState(0);

	useEffect(() => {
		pharmacyAxios
			.get(`/cart/${userId}/medicines`)
			.then((response) => {
				setCartItems(response.data.medicines);
				setItemsLength(response.data.medicines.length);
			})
			.catch((error) => {
				console.log(error);
			});

		console.log('cart items: ', cartItems);
	}, []);

	const handleDeleteMedicine = (medicineId) => {
		pharmacyAxios
			.delete(`/cart/users/${userId}/medicines/${medicineId}`)
			.then((response) => {
				console.log(response.data);
				setCartItems(
					cartItems.filter((item) => item.medicine._id !== medicineId),
				);
				setItemsLength(itemsLength - 1);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const updateMedicineQuantity = (id, quantity) => {
		pharmacyAxios
			.patch(`/cart/medicines/${id}`, { userId, quantity })
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
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
								onClick={() => history.push('/medicines')}
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
								onClick={() => history.push('/checkout')}
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
						onClick={() => history.push('/medicines')}
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
	);
};

export default Cart;
