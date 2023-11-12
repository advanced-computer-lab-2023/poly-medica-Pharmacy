import React, { useState } from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
	Grid,
} from '@mui/material';

const PharmacistRequestCard = ({ pharmacistReq, onAccept, onReject }) => {
	const [expanded, setExpanded] = useState(false);

	const handleExpand = () => {
		setExpanded(!expanded);
	};

	return (
		<Card>
			<CardHeader title={pharmacistReq.userData.name} />
			<CardActions>
				<Button variant='contained' color='primary' onClick={handleExpand}>
					{expanded ? 'Collapse' : 'Expand'}
				</Button>
			</CardActions>
			<Accordion expanded={expanded}>
				<AccordionSummary>
					<Typography>Pharmacist Details</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<CardContent>
						<Typography>Email: {pharmacistReq.userData.email}</Typography>
						<Typography>
							Date of Birth: {pharmacistReq.userData.dateOfBirth}
						</Typography>
						<Typography>Hourly Rate: {pharmacistReq.hourlyRate}</Typography>
						<Typography>Affiliation: {pharmacistReq.affiliation}</Typography>
						<Typography>
							Educational Background: {pharmacistReq.educationalBackground}
						</Typography>
					</CardContent>
					<CardContent>
						<Typography>Documents:</Typography>
						<Grid item xs={12}>
							{pharmacistReq.documentsNames.map((documentName) => (
								<>
									<Button
										color='primary'
										href={`http://localhost:8003/pharmacist-requests/files/${documentName}`}
									>
										{documentName}
									</Button>
								</>
							))}
						</Grid>
					</CardContent>
					<CardActions>
						<Button
							variant='contained'
							color='primary'
							onClick={() => onAccept(pharmacistReq)}
						>
							Accept
						</Button>
						<Button
							variant='contained'
							color='secondary'
							onClick={() => onReject(pharmacistReq)}
						>
							Reject
						</Button>
					</CardActions>
				</AccordionDetails>
			</Accordion>
		</Card>
	);
};

export default PharmacistRequestCard;
