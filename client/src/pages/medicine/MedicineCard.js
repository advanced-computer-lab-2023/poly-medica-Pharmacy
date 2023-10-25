import {
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { PHARMACY_BASE_URL } from 'utils/Constants';

const MedicineCard = ({
	medicine,
	setSelectedMedicine,
	handleEditButtonClick,
	userType,
	handleAddToCart,
}) => {
	console.log('medicine= ', medicine);
	return (
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
			<ListItemText sx={{ paddingLeft: '2%' }} primary={`$${medicine.price}`} />
			{userType == 'pharmacist' ? (
				<IconButton
					edge='end'
					aria-label='edit'
					onClick={(event) => handleEditButtonClick(medicine, event)}
				>
					<EditIcon />
				</IconButton>
			) : (
				<div>
					<IconButton
						color='primary'
						aria-label='add to shopping cart'
						onClick={() => handleAddToCart(medicine)}
						variant='contained'
					>
						<AddShoppingCartIcon />
					</IconButton>
					<TextField
						id='outlined-number'
						label='Quantity'
						type='number'
						min={1}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
			)}
		</ListItem>
	);
};

export default MedicineCard;
