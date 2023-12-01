import { 
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider, 
} from '@mui/material';
// import { Edit as EditIcon } from '@mui/icons-material';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { PHARMACY_BASE_URL } from 'utils/Constants';
// import { pharmacyAxios } from '../../utils/AxiosConfig';
import { useUserContext } from 'hooks/useUserContext';

const MedicineCard = ({
	medicine,
	month,
	setSelectedMedicine,
}) => {
	const { user } = useUserContext(); 
	const userType = user.type;
	

	return (
		<div>
			{userType !== 'patient' && medicine.monthlySales[month]!=0 && (
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
						primary={`${medicine.monthlySales[month] +" items were Sold"}`}
					/>
					
				</ListItem>
			)}


			<Divider />
		</div>
	);
};

export default MedicineCard;
