import { useEffect, useState } from 'react';
import {
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider,
	CircularProgress,
	Grid,
	Button,
	Typography,
	Box,
	Stack
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { PHARMACY_BASE_URL } from 'utils/Constants';
import { patientAxios, pharmacyAxios } from '../../utils/AxiosConfig';
import { useUserContext } from 'hooks/useUserContext';
import AltrentivesMedicine from './AlterentiveMedicine';
import Swal from 'sweetalert2';


const MedicineCard = ({
	medicine,
	setSelectedMedicine,
	handleEditButtonClick,
	handleAddToCart,
	medicineIsBeingAddedToCart,
}) => {
	const { user } = useUserContext();
	const userId = user.id;
	const userType = user.type;
	const [isAltDialogOpen, setIsAltDialogOpen] = useState(false);
	const [addToCartStatus, setAddToCartStatus] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [activeIngerdients, setActiveIngerdients] = useState(null);

	useEffect(() => {
		pharmacyAxios
			.get(`/cart/users/${userId}/medicines/${medicine._id}`)
			.then((response) => {
				console.log(response.data);
				setAddToCartStatus(false);
				setIsLoading(false);
			})
			.catch((error) => {
				setAddToCartStatus(true);
				setIsLoading(false);
				console.log(error);
			});
	}, []);

	const addToCart = (medicine) => {
		console.log('the prescriptionMedicine is ', medicine.prescriptionMedicine);
		if (medicine.prescriptionMedicine === true) {
			let found = false;
			patientAxios
				.get(`/patient/${userId}/prescriptions`)
				.then((response) => response.data)
				.then((data) => {
					for (let i = 0; i < data.length; i++) {
						for (let j = 0; j < data[i].medicines.length; j++) {
							if (medicine._id === data[i].medicines[j].medicineId) {
								found = true;
							}
						}
					}
				}).then(() => {
					if (!found) {
						Swal.fire('error', "this medicine needs a prescriptions", 'error');
					} else {
						handleAddToCart(medicine);
						setIsLoading(medicineIsBeingAddedToCart);
					}
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					Swal.fire('error', error.message, 'error');
					setIsLoading(false);
				});


		} else {
			handleAddToCart(medicine);
			setIsLoading(medicineIsBeingAddedToCart);
		}

	};

	const handleAltDialogOpen = () => {
		setIsAltDialogOpen(true);
		setActiveIngerdients(medicine.activeIngerdients);
	};

	return (
		<div>
			{userType !== 'patient' && (
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
						primary={`$${medicine.price}`}
					/>
					{userType !== 'admin' && (
						<IconButton
							edge='end'
							aria-label='edit'
							onClick={(event) => handleEditButtonClick(medicine, event)}
						>
							<EditIcon />
						</IconButton>
					)}
				</ListItem>
			)}

			{userType === 'patient' && (
				<div>
					<AltrentivesMedicine isAltDialogOpen={isAltDialogOpen} setIsAltDialogOpen={setIsAltDialogOpen} activeIngerdients={activeIngerdients} />
					<Grid container spacing={5} m={0}>
						<Grid item xs={9}>
							<ListItem
								button
								onClick={() => setSelectedMedicine(medicine)}
								sx={{ width: '100%' }}
							>
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
										width: '70%',
										lineHeight: '1.5em',
										maxHeight: '3em',
									}}
								/>
								<ListItemText
									sx={{ paddingLeft: '2%' }}
									primary={`$${medicine.price}`}
								/>
							</ListItem>
						</Grid>
						<Grid item sx={{ alignSelf: 'center' }} xs={2}>
							{medicine.quantity === 0 ? (
								<Box sx={{ width: '100%' }}>
									<Stack spacing={2}>
										<Typography variant='body1' color='error' ml={0}>
											Out of Stock
										</Typography>
										<Button variant="text" onClick={handleAltDialogOpen}>View Altrentives</Button>
									</Stack>
								</Box>
							) : (
								<>
									{isLoading ? (
										<CircularProgress />
									) : (
										<Button
											disabled={!addToCartStatus}
											onClick={() => {
												setAddToCartStatus(false);
												addToCart(medicine);
											}}
										>
											<IconButton
												color='primary'
												edge='end'
												aria-label='add to cart'
												disabled={!addToCartStatus}
											>
												<AddShoppingCartIcon />
											</IconButton>
										</Button>
									)}
								</>
							)}
						</Grid>
					</Grid>
				</div>
			)}

			<Divider />
		</div>

	);
};

export default MedicineCard;
