import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';

// ==============================|| CART ||============================== //

const CartSection = () => {
	const cartItemsCount = 5;
	const navigate = useNavigate();

	return (
		<IconButton onClick={() => navigate('pages/cart')}>
			<ShoppingCartIcon />
			{cartItemsCount > 0 && <span>{cartItemsCount}</span>}
		</IconButton>
	);
};

export default CartSection;
