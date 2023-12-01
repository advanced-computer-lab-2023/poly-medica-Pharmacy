import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { PHARMACY_BASE_URL } from '../../utils/Constants';
export default function MedicineCard({
	medicine,
}) {
	return (
		<Card
			sx={{
				maxWidth: 250,
				margin: '2%',
				padding: '4%',
				border: '2px solid black',
				background: '#F5F5F5',
			}}
		>
			<CardActionArea>
				<CardMedia
					component='img'
					height='140'
					image={`${PHARMACY_BASE_URL}/medicines/${medicine._id}/pictures`}
					alt='green iguana'
					sx={{ objectFit: 'contain', cursor: 'default' }}
				/>
				<CardContent sx={{ cursor: 'default', textAlign: 'center' }}>
					<Typography gutterBottom variant='h5' component='div'>
						{medicine.name}
					</Typography>
					<Grid container alignItems='center' maxHeight={50}>
						<Grid item xs={3}>
							<Typography variant='h2' color='text.secondary'>
								{medicine.amount}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
