import React, { useEffect } from 'react';
import { useCartContext } from '../../../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, Badge } from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import { pharmacyAxios } from 'utils/AxiosConfig';

// ==============================|| CART ||============================== //

const CartSection = () => {
	const navigate = useNavigate();
	const { cartLength, updateCartLength } = useCartContext();
	const { user } = useUserContext();
	const userId = user.id;

	useEffect(() => {
		pharmacyAxios
			.get(`/cart/users/${userId}/items/length`)
			.then((response) => {
				console.log(response.data);
				updateCartLength();
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<IconButton onClick={() => navigate('pages/cart')}>
			<Badge badgeContent={cartLength} color='secondary'>
				<ShoppingCartIcon />
			</Badge>
		</IconButton>
	);
};

export default CartSection;
