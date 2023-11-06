import { useState } from 'react';
import {
	Card,
	CardContent,
	Typography,
	Button,
	IconButton,
	Grid,
	Alert,
} from '@mui/material';
import DangerousIcon from '@mui/icons-material/Dangerous';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { PHARMACY_BASE_URL } from 'utils/Constants';

const CartMedicineCard = ({
	medicine,
	quantity,
	onRemove,
	onUpdateQuantity,
}) => {
	const { name, price } = medicine;
	const [localQuantity, setLocalQuantity] = useState(quantity);
	const [totalPrice, setTotalPrice] = useState(price * quantity);
	const [removeAlert, setRemoveAlert] = useState(false);

	const handleUpdateQuantity = (newQuantity) => {
		// Ensure the new quantity is within valid bounds (e.g., not negative)
		if (newQuantity === 0) {
			handleRemoveMedicine();
		} else {
			onUpdateQuantity(medicine._id, newQuantity);
			setLocalQuantity(newQuantity);
			setTotalPrice(price * newQuantity);
		}
	};

	const handleRemoveMedicine = () => {
		setTimeout(() => {
			setRemoveAlert(false);
		}, 1000);

		onRemove(medicine._id);
		setRemoveAlert(true);
	};

	return (
		<Card>
			<CardContent>
				<Grid
					container
					spacing={1}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
						width: '100%',
					}}
					mt={0}
				>
					<Grid item xs={1}>
						<img
							src={`${PHARMACY_BASE_URL}/medicines/${medicine._id}/pictures`}
							alt={name}
							style={{
								width: '80px',
								height: '80px',
							}}
						/>
					</Grid>
					<Grid item xs={4}>
						<Typography variant='h6' component='div'>
							{name}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body2'>
							Total: ${totalPrice.toFixed(2)}
						</Typography>
					</Grid>
					<Grid item xs={2.5}>
						<IconButton
							color='primary'
							size='small'
							onClick={() => handleUpdateQuantity(localQuantity - 1)}
						>
							<RemoveIcon />
						</IconButton>
						<span>{localQuantity}</span>
						<IconButton
							color='primary'
							size='small'
							onClick={() => handleUpdateQuantity(localQuantity + 1)}
						>
							<AddIcon />
						</IconButton>
					</Grid>
					<Grid item xs={1}>
						<Button color='error' onClick={() => handleRemoveMedicine()}>
							<DangerousIcon />
						</Button>
					</Grid>
				</Grid>
			</CardContent>

			{removeAlert && (
				<Grid
					item
					sx={{
						position: 'fixed',
						bottom: 16,
						right: 30,
						zIndex: 9999,
					}}
				>
					<Alert variant='filled' severity='success'>
						Medicine removed from cart
					</Alert>
				</Grid>
			)}
		</Card>
	);
};

export default CartMedicineCard;
