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
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { PHARMACY_BASE_URL } from 'utils/Constants';
import { pharmacyAxios } from '../../utils/AxiosConfig';

const MedicineCard = ({
	userId,
	medicine,
	setSelectedMedicine,
	handleEditButtonClick,
	userType,
	handleAddToCart,
}) => {
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

	return (
		<div>
			{userType === 'pharmacist' && (
				<ListItem button onClick={() => setSelectedMedicine(medicine)}>
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
							width: '60%',
							lineHeight: '1.5em',
							maxHeight: '3em',
						}}
					/>
					<ListItemText
						sx={{ paddingLeft: '2%' }}
						primary={`$${medicine.price}`}
					/>

					<IconButton
						edge='end'
						aria-label='edit'
						onClick={(event) => handleEditButtonClick(medicine, event)}
					>
						<EditIcon />
					</IconButton>
				</ListItem>
			)}

			{userType === 'patient' && (
				<Grid container spacing={5} m={0}>
					<Grid item xs={10}>
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
						{isLoading ? (
							<CircularProgress />
						) : (
							<Button
								disabled={!addToCartStatus}
								onClick={() => {
									setAddToCartStatus(false);
									handleAddToCart(medicine);
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
					</Grid>
				</Grid>
			)}

			<Divider />
		</div>
	);
};

export default MedicineCard;
