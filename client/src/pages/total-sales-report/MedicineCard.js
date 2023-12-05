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
import { useEffect } from 'react';

const MedicineCard = ({
	medicine,
	month,
	day,
	setSelectedMedicine,
	data
}) => {
	const { user } = useUserContext(); 
	const userType = user.type; 
	const monthSales = medicine.monthlySales[month].reduce((a, b) => a + b, 0);
	let daySales = 0;
	if(day!=null){
	const currentDay= day.getDate();
    daySales = medicine.monthlySales[month][currentDay];
	
}

	const finalSales = day!=null?daySales:monthSales;
	
	
	useEffect(() => {
		if(finalSales!=0){
		data.push({ name:medicine.name, sales:finalSales });
	}
	console.log("dataa",data);
	
	}, [month,day]);
	
	return (
		<div>
			{userType !== 'patient' && finalSales!=0 && (
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
						primary={`${finalSales +" items were Sold"}`}
						//make a function that is executed when new item is to the list

					/>
					
				</ListItem>
			)}


			<Divider />
		</div>
	);
};

export default MedicineCard;
