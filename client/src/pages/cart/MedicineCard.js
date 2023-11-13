import { useState } from 'react';
import {
	Card,
	CardContent,
	Typography,
	Button,
	IconButton,
	Grid,
	CircularProgress,
	ListItemAvatar,
	ListItemText,
} from '@mui/material';
import DangerousIcon from '@mui/icons-material/Dangerous';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { PHARMACY_BASE_URL } from 'utils/Constants';
import Message from 'ui-component/Message';

const CartMedicineCard = ({
	medicine,
	quantity,
	onRemove,
	onUpdateQuantity,
}) => {
	const { name, price } = medicine;
	const [localQuantity, setLocalQuantity] = useState(quantity);
	const [totalPrice, setTotalPrice] = useState(price * quantity);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [removeAlert, setRemoveAlert] = useState(false);
	const [quantityAlert, setQuantityAlert] = useState(false);

	const handleUpdateQuantity = (newQuantity) => {
		if (newQuantity === 0) {
			handleRemoveMedicine();
		} else if (newQuantity <= medicine.quantity) {
			if (newQuantity === medicine.quantity) {
				setQuantityAlert(true);
				setTimeout(() => {
					setQuantityAlert(false);
				}, 2000);
			}
			onUpdateQuantity(medicine._id, newQuantity);
			setLocalQuantity(newQuantity);
			setTotalPrice(price * newQuantity);
		}
	};

	const handleRemoveMedicine = () => {
		setDeleteLoading(true);
		setRemoveAlert(true);
		onRemove(medicine._id);
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
					<ListItemAvatar sx={{ paddingRight: '2%' }}>
						<img
							src={`${PHARMACY_BASE_URL}/medicines/${medicine._id}/pictures`}
							alt={name}
							width='80'
							height='80'
						/>
					</ListItemAvatar>
					<ListItemText
						primary={name}
						sx={{
							lineHeight: '1.5em',
							maxHeight: '3em',
						}}
					/>
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
							disabled={localQuantity === medicine.quantity}
							onClick={() => handleUpdateQuantity(localQuantity + 1)}
						>
							<AddIcon />
						</IconButton>
					</Grid>
					<Grid item xs={1}>
						{!deleteLoading && (
							<Button color='error' onClick={() => handleRemoveMedicine()}>
								<DangerousIcon size='small' />
							</Button>
						)}
						{deleteLoading && <CircularProgress />}
					</Grid>
				</Grid>
				{removeAlert && (
					<Message
						message={'Medicine is being removed from cart . . .'}
						type={'info'}
						time={2000}
						vertical={'bottom'}
						horizontal={'right'}
					/>
				)}

				{quantityAlert && (
					<Message
						message={'You reached the maximum quantity of this medicine!'}
						type={'error'}
						time={2000}
						vertical={'bottom'}
						horizontal={'right'}
					/>
				)}
			</CardContent>
		</Card>
	);
};

export default CartMedicineCard;
