import React, { useEffect } from 'react';
import { useCartContext } from '../../../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Avatar, Box, ButtonBase } from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import { pharmacyAxios } from 'utils/AxiosConfig';
import { useTheme } from '@mui/material/styles';

// ==============================|| CART ||============================== //

const CartSection = () => {
	const theme = useTheme();
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
		<Box
			sx={{
				ml: 2,
				mr: 3,
				[theme.breakpoints.down('md')]: {
					mr: 2,
				},
			}}
		>
			<ButtonBase sx={{ borderRadius: '12px' }}>
				<Badge badgeContent={cartLength} color='secondary'>
					<Avatar
						variant='rounded'
						sx={{
							...theme.typography.commonAvatar,
							...theme.typography.mediumAvatar,
							transition: 'all .2s ease-in-out',
							'&[aria-controls="menu-list-grow"]': {
								background: theme.palette.secondary.light,
								color: theme.palette.secondary.dark,
							},
							'&:hover': {
								background: theme.palette.secondary.dark,
								color: theme.palette.secondary.light,
							},
						}}
						aria-controls={open ? 'menu-list-grow' : undefined}
						aria-haspopup='true'
						onClick={() => navigate('pages/cart')}
					>
						<ShoppingCartOutlinedIcon />
					</Avatar>
				</Badge>
			</ButtonBase>
		</Box>
	);
};

export default CartSection;
