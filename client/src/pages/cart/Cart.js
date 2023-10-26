import React, { useState, useEffect } from 'react';
import { Avatar, Paper, Typography } from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import { pharmacyAxios } from '../../utils/AxiosConfig';
import { Box, color } from '@mui/system';
import Button from '@mui/material/Button';
import { PHARMACY_BASE_URL } from 'utils/Constants';

const Cart = () => {
	const user = useUserContext();
	const userId = user.user.id;
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		pharmacyAxios
			.get(`/cart/${userId}/medicines`)
			.then((response) => {
				setCartItems(response.data.medicines);
			})
			.catch((error) => {
				console.log(error);
			});

		console.log('cart items: ', cartItems);
	}, []);

	// const handleDeleteMedicine = (id) => {
	// 	pharmacyAxios
	// 		.delete(`/cart/medicines/${id}`)
	// 		.then((response) => {
	// 			console.log(response.data);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	return (
		<>
			<Box
				sx={{ p: 4 }}
				display='flex'
				justifyContent='center'
				flexDirection='column'
				alignItems='left'
			>
				<Typography variant='h3' color={color.black}>
					Your Cart
				</Typography>
				<Paper
					elevation={0}
					sx={{
						p: 30,
						pl: 10,
						display: 'flex',
						flexDirection: 'column',
						height: 240,
						justifyContent: 'center',
					}}
				>
					{Array.isArray &&
						cartItems.map((item) => (
							<Box key={item.medicine.id}>
								<Box
									display='flex'
									sx={{ pt: 3, pb: 2 }}
									alignItems='start'
									justifyContent='space-between'
								></Box>
								<Avatar
									src={`${PHARMACY_BASE_URL}/medicines/${item.medicine._id}/pictures`}
									sx={{ width: 80, height: 80, mr: 2 }}
								/>
								<Box display='flex' flexDirection={'column'}>
									<Typography variant='h6'>{item.medicine.name}</Typography>
									<Typography variant='body2'>
										{item.medicine.description}
									</Typography>
								</Box>
								<Typography variant='body1' justifyContent={'end'}>
									{item.medicine.price}
								</Typography>
							</Box>
						))}
				</Paper>
				<Button variant='contained' color='primary'>
					Proceed to Checkout
				</Button>
			</Box>
		</>
	);
};

export default Cart;
