import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../../../hooks/useUserContext';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import { pharmacyAxios } from '../../../../utils/AxiosConfig';

// ==============================|| CART ||============================== //

const CartSection = () => {
	const navigate = useNavigate();
	const user = useUserContext();
	const userId = user.user.id;
	const [cartLength, setCartLength] = useState(0);

	useEffect(() => {
		console.log('In cart section useEffect');
		console.log('Cart length: ', cartLength);
		pharmacyAxios
			.get(`/cart/users/${userId}/items/length`)
			.then((response) => {
				setCartLength(response.data.length);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<IconButton onClick={() => navigate('pages/cart')}>
			<ShoppingCartIcon />
			<span>{cartLength}</span>
		</IconButton>
	);
};

export default CartSection;
