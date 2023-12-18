// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
	Button,
	Chip,
	Grid,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Typography
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useUserContext } from 'hooks/useUserContext';

// assets
import { IconCalendarTime } from '@tabler/icons';
import { MEDICINE_NOTIFICATION_TYPE_ENUM } from 'utils/Constants';


const ListItemWrapper = styled('div')(({ theme }) => ({
	cursor: 'pointer',
	padding: 16,
	'&:hover': {
		background: theme.palette.primary.light
	},
	'& .MuiListItem-root': {
		padding: 0
	}
}));

const chipSX = {
	height: 24,
	padding: '0 6px'
};

const BasicNotification = ({ header, body, date, notificationType, chipLabel, chipType, key }) => {
    const theme = useTheme();
	const navigate = useNavigate();
	const { user } = useUserContext();

	const chipStyles = {
		error:{
			...chipSX,
			color: theme.palette.orange.dark,
			backgroundColor: theme.palette.orange.light,
		},
		success: {
			...chipSX,
			color: theme.palette.success.dark,
			backgroundColor: theme.palette.success.light,
			height: 28
		},
		warning: {
			...chipSX,
			color: theme.palette.warning.dark,
			backgroundColor: theme.palette.warning.light
		}
	};
    return ( 
        <ListItemWrapper key={key}>

				<ListItem alignItems="center" sx={{ marginBottom: 1, marginTop: 1 }}>
					<ListItemText primary={header} sx={{ marginLeft: 1 }} />
					<ListItemSecondaryAction sx={{ marginTop: -1 }}>
						<Grid container justifyContent="flex-end">
							<Grid item xs={12}>
								<Typography variant="caption" display="block" gutterBottom>
                                    {date}
								</Typography>
							</Grid>
						</Grid>
					</ListItemSecondaryAction>
				</ListItem>
				<Grid container direction="column" className="list-container">
					<Grid item xs={12} sx={{ pb: 2, marginLeft: 3 }} justifyContent={ 'center' }>
						<Typography variant="subtitle2">{body}</Typography>
					</Grid>
					
						{/* Buttons */}
					{notificationType === MEDICINE_NOTIFICATION_TYPE_ENUM &&
					<Grid item xs={12} sx={{ marginBottom: 2 }}>
					<Grid item xs={12}>
						<Grid container>
							<Grid item>
								<Button variant="contained" onClick={ () => navigate(`/${user.type}/pages/medicines`) } disableElevation endIcon={<IconCalendarTime stroke={1.5} size="1.3rem" />}>
									Medicines
								</Button>
							</Grid>
						</Grid>
					</Grid>
					</Grid>
					}


					
					
					{/* labels */}	
					<Grid item xs={12} sx={{ paddingLeft: '20%' }}>
					<Grid item xs={12}>
						<Grid container>
							<Grid item>
							<Grid item>
								<Chip label={chipLabel} sx={chipStyles[chipType]} />
							</Grid>
							</Grid>
						</Grid>
					</Grid>
					</Grid>
				
				</Grid>
			</ListItemWrapper>
     );
};
 
export default BasicNotification;