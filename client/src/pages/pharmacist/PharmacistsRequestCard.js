// material-ui
import {
	Card,
	CardContent,
	CardHeader,
	ListItem,
	ListItemText,
	Button,
	Divider,
	IconButton,
	Tooltip,
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { formatDate } from 'utils/DateFormat';

// ==============================|| CUSTOM SUB CARD ||============================== //

const PharmacistsRequestCard = ({ pharmacistReq, onAccept, onReject }) => {
	const theme = useTheme();
	const [expanded, setExpanded] = useState(false);

	const handleExpand = () => {
		setExpanded(!expanded);
	};

	return (
		<Accordion expanded={expanded}>
			<AccordionSummary>
				<Card
					sx={{
						width: '80%',
						margin: '20px auto',
						marginBottom: '0px',
						border: '1px solid',
						borderColor: theme.palette.primary.light,
						':hover': {
							boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
						},
					}}
				>
					<CardHeader
						sx={{ padding: 3 }}
						avatar={<AccountCircleIcon />}
						title={pharmacistReq.userData.name}
						action={
							<IconButton aria-expanded={expanded} onClick={handleExpand}>
								{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							</IconButton>
						}
					/>
					<Divider
						sx={{
							opacity: 1,
							borderColor: theme.palette.primary.light,
						}}
					/>
					<CardContent sx={{ padding: 2 }}>
						<ListItem>
							<ListItemText
								primary='Email'
								secondary={pharmacistReq.userData.email}
								xs={20}
							/>
							<ListItemText
								primary='Hourly Rate'
								secondary={pharmacistReq.hourlyRate}
								xs={6}
							/>
							<ListItemText
								primary='Affiliation'
								secondary={pharmacistReq.affiliation}
								xs={6}
							/>
							<Button onClick={() => onAccept(pharmacistReq)}>
								<Tooltip title='Accept'>
									<IconButton color='success'>
										<CheckIcon />
									</IconButton>
								</Tooltip>
							</Button>
							<Button onClick={() => onReject(pharmacistReq)}>
								<Tooltip title='Reject'>
									<IconButton color='error'>
										<ClearIcon />
									</IconButton>
								</Tooltip>
							</Button>
						</ListItem>
					</CardContent>
				</Card>
			</AccordionSummary>
			<AccordionDetails>
				<CardContent
					sx={{
						width: '80%',
						margin: '20px auto',
						marginTop: '0px',
						border: '1px solid',
						borderColor: theme.palette.primary.light,
						':hover': {
							boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
						},
					}}
				>
					<ListItem>
						<ListItemText
							primary='Date of Birth'
							secondary={formatDate(pharmacistReq.userData.dateOfBirth)}
							xs={20}
						/>
						<ListItemText
							primary='Educational Background'
							secondary={pharmacistReq.educationalBackground}
							xs={6}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary='Documents'
							secondary={
								<>
									{pharmacistReq.documentsNames.map((documentName) => (
										<Button
											key={documentName}
											color='primary'
											href={`http://localhost:8003/pharmacist-requests/files/${documentName}`}
										>
											{documentName}
										</Button>
									))}
								</>
							}
							xs={20}
						/>
					</ListItem>
				</CardContent>
			</AccordionDetails>
		</Accordion>
	);
};

export default PharmacistsRequestCard;
