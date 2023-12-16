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
import Message from 'ui-component/Message';
import prescrptionImage from '../utilities/prescription.png';

const PrescriptionCard = ({
	prescriptionId,
	description,
	doctorName,
	medicinesQuantity,
	price,
	removePrescription,
}) => {
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [removeAlert, setRemoveAlert] = useState(false);

	const handleRemovePrescription = () => {
		setDeleteLoading(true);
		setRemoveAlert(true);
		removePrescription(prescriptionId);
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
						<img src={prescrptionImage} width='80' height='80' />
					</ListItemAvatar>
					<ListItemText
						primary={`Dr. ${doctorName}`}
                        secondary={
                            <div
                                style={{
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {description}
                            </div>
                        }
						sx={{
							lineHeight: '1.5em',
							maxHeight: '3em',
						}}
					/>
					<Grid item xs={3}>
						<Typography variant='body2'>Total: ${price.toFixed(2)}</Typography>
					</Grid>
					<Grid item xs={2.5}>
						<IconButton color='primary' size='small' disabled>
							<RemoveIcon />
						</IconButton>
						<span>{medicinesQuantity}</span>
						<IconButton color='primary' size='small' disabled>
							<AddIcon />
						</IconButton>
					</Grid>
					<Grid item xs={1}>
						{!deleteLoading && (
							<Button color='error' onClick={() => handleRemovePrescription()}>
								<DangerousIcon size='small' />
							</Button>
						)}
						{deleteLoading && <CircularProgress />}
					</Grid>
				</Grid>
				{removeAlert && (
					<Message
						message={'Prescription is being removed from cart . . .'}
						type={'info'}
						time={2000}
						vertical={'bottom'}
						horizontal={'right'}
					/>
				)}
			</CardContent>
		</Card>
	);
};

export default PrescriptionCard;
