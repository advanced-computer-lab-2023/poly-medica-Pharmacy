import {
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemSecondaryAction,
	Avatar,
	IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';

const PharmacistCard = ({
	pharmacist,
	handleRemovePharmacist,
	setSelectedPharmacist,
}) => {
	return (
		<ListItem
			button
			key={pharmacist._id}
			onClick={() => setSelectedPharmacist(pharmacist)}
		>
			<ListItemAvatar>
				<Avatar>
					<PersonIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={pharmacist.userData.name} secondary={pharmacist.userData.email} />
			<ListItemSecondaryAction>
				<IconButton
					edge='end'
					aria-label='delete'
					onClick={(e) => handleRemovePharmacist(e, pharmacist._id)}
					color='error'
				>
					<DeleteIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default PharmacistCard;
