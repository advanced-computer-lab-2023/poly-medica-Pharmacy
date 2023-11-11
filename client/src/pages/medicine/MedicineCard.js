import { useEffect, useState } from 'react';
import {
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider,
	Button,
	CircularProgress,
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
				{userType == 'pharmacist' && (
					<IconButton
						edge='end'
						aria-label='edit'
						onClick={(event) => handleEditButtonClick(medicine, event)}
					>
						<EditIcon />
					</IconButton>
				)}
			</ListItem>
			{userType !== 'pharmacist' && (
				<ListItem
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
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
								aria-label='add to shopping cart'
								variant='contained'
								disabled={!addToCartStatus}
							>
								<AddShoppingCartIcon />
							</IconButton>
						</Button>
					)}
				</ListItem>
			)}
			<Divider />
		</div>
	);
};

export default MedicineCard;
