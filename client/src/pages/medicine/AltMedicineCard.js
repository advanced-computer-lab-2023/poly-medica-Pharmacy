import { useEffect, useState } from 'react';
import {
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider,
	CircularProgress,
	Grid,
	Button,
	Typography,
	Box,
	Stack
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { PHARMACY_BASE_URL } from 'utils/Constants';
import { pharmacyAxios } from '../../utils/AxiosConfig';
import { useUserContext } from 'hooks/useUserContext';


const AltMedicineCard = ({
	medicine,
	setSelectedMedicine,
	handleAddToCart,
	medicineIsBeingAddedToCart,
}) => {
	const { user } = useUserContext();
	const userId = user.id;
	const userType = user.type;
	const [addToCartStatus, setAddToCartStatus] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		pharmacyAxios
			.get(`/cart/users/${userId}/medicines/${medicine._id}`)
			.then((response) => {
				console.log(response.data);
				setAddToCartStatus(false);
				setIsLoading(false);
			})
			.catch((error) => {
				setAddToCartStatus(true);
				setIsLoading(false);
				console.log(error);
			});
	}, []);

	const addToCart = (medicine) => {
		handleAddToCart(medicine);
		setIsLoading(medicineIsBeingAddedToCart);
	};


	return (
		<div>
			{userType === 'patient' && (
				<div>
					<Grid container spacing={5} m={0}>
						<Grid item xs={9}>
							<ListItem
								button
								onClick={() => setSelectedMedicine(medicine)}
								sx={{ width: '100%' }}
							>
								<ListItemAvatar sx={{ paddingRight: '2%' }}>
									<img
										src={`${PHARMACY_BASE_URL}/medicines/${medicine._id}/pictures`}
										alt={medicine.name}
										width='80'
										height='80'
									/>
								</ListItemAvatar>
								<ListItemText
									primary={medicine.name}
									secondary={
										<div
											style={{
												overflow: 'hidden',
												whiteSpace: 'nowrap',
												textOverflow: 'ellipsis',
											}}
										>
											{medicine.description}
										</div>
									}
									sx={{
										width: '70%',
										lineHeight: '1.5em',
										maxHeight: '3em',
									}}
								/>
								<ListItemText
									sx={{ paddingLeft: '2%' }}
									primary={`$${medicine.price}`}
								/>
							</ListItem>
						</Grid>
						<Grid item sx={{ alignSelf: 'center' }} xs={2}>
							{medicine.quantity === 0 ? (
								<Box sx={{ width: '100%' }}>
									<Stack spacing={2}>
										<Typography variant='body1' color='error' ml={0}>
											Out of Stock
										</Typography>
									</Stack>
								</Box>
							) : (
								<>
									{isLoading ? (
										<CircularProgress />
									) : (
										<Button
											disabled={!addToCartStatus}
											onClick={() => {
												setAddToCartStatus(false);
												addToCart(medicine);
											}}
										>
											<IconButton
												color='primary'
												edge='end'
												aria-label='add to cart'
												disabled={!addToCartStatus}
											>
												<AddShoppingCartIcon />
											</IconButton>
										</Button>
									)}
								</>
							)}
						</Grid>
					</Grid>
				</div>
			)}

			<Divider />
		</div>

	);
};

export default AltMedicineCard;