import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, CardContent, CardHeader, Card, TextField, Button, Divider, CardActions, FormControl, Autocomplete } from '@mui/material';
import AccountProfile from './AccountProfile';
import PharmacistAccountProfileDetails from './accountProfileDetails/PharmacistAccountProfileDetails';
import PatientAccountProfileDetails from './accountProfileDetails/PatientAccountProfileDetails';
import { useUserContext } from 'hooks/useUserContext';
import { PATIENT_TYPE_ENUM, PHARMACIST_TYPE_ENUM } from 'utils/Constants';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { authenticationAxios, pharmacyAxios } from 'utils/AxiosConfig';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import PharmacistArchive from './PharmacistArchive';

const Page = () => {
    
    
    const { user } = useUserContext();
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [strength, setStrength] = useState(0);
	const [level, setLevel] = useState();
	const [archiveMedicine, setArchiveMedicine] = useState(null);
	const [archiveMedicineOptions, setArchiveMedicineOptions] = useState([]);
	const [archiveMedicineList, setArchiveMedicineList] = useState([]);
	const [dataChange, setDataChange] = useState(true);

	const handleDataChange = () => {
		setDataChange(!dataChange);
	};

	const submitPassword = async () => {
		if (!level || level.label != 'Strong'){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Please enter a Strong password. \n Password must be at least 8 characters and include one number, one letter, one capital letter, and one special character.',
			});
			return;
		}
		setLoading(true);
		try{
			authenticationAxios.patch(`/change-password/${user.id}`, { password });
				Swal.fire({
					icon: 'success',
					title: 'Success!',
					text: 'password changed successfully',
				});
				setPassword('');
				const temp = strengthIndicator('');
				setStrength(temp);
				setLevel(strengthColor(temp));
				setLoading(false);
		} catch(err) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: err.response.data.message,
			});
			setLoading(false);
		}	
	};

	useEffect(() => {
		pharmacyAxios.get('/medicines').then((response ) => {
			// response.data.medicines
			let tmp = [];
			for (let i = 0; i < response.data.medicines.length; i++) {
				const medicine = response.data.medicines[i];
				tmp = [...tmp, { label:medicine.name, value: medicine._id, image: medicine.pictureName } ];
			}
			setArchiveMedicineOptions(() => [...tmp]);
			
		}).catch((error) => {
			console.log(error);
		});
}, [dataChange]);

useEffect(() => {
	pharmacyAxios.get(`/medicines/archive`).then((response) => {
		const data = response.data;
		console.log({ data: response.data });
		let tmp = [];
		for(let i = 0; i != data.length; i++){
			const medicine = data[i];
			tmp = [...tmp, { name: medicine.name, id: medicine._id }];
		}
		setArchiveMedicineList(() => [...tmp]);
	});
}, [dataChange]);

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
		const temp = strengthIndicator(e.target.value);
		setStrength(temp);
		setLevel(strengthColor(temp));
	};

	const handleAddArchiveMedicine = async () => {
		// 
		console.log({ archiveMedicine });
		if(!archiveMedicine) return;
		try{
			await pharmacyAxios.patch(`/medicines/${archiveMedicine.value}/arcive/${true}`);
			handleDataChange();
			setArchiveMedicine(null);
		} catch (error){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.response.data.errMessage,
			});
		}
		
	};
	return (
		<>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8
				}}
			>
				<Container maxWidth="lg">
					<Stack spacing={3}>
						<div>
							<Typography variant="h4">
              Account
							</Typography>
						</div>
						<div>
							<Grid
								container
								spacing={3}
							>
								<Grid
									xs={12}
									md={6}
									lg={4}
								>
									<AccountProfile />
								</Grid>
								<Grid
									xs={12}
									md={6}
									lg={8}
								>
									{user.type == PHARMACIST_TYPE_ENUM &&<PharmacistAccountProfileDetails />}
									{user.type == PATIENT_TYPE_ENUM &&<PatientAccountProfileDetails />}
									
									<Card sx={{ mt:5 }} >
										<CardHeader
											title='Change Password'
										/>
											<CardContent  sx={{ width:'100%' }}>
												
												<Grid container sx={{ width:'100%' }} spacing={1} display={'flow'} flexDirection={'row'}>
													<Grid  width={'50%'}>
													<TextField
													fullWidth
													label='password'
													name='password'
													type='password'
													onChange={ handleChangePassword }
													required
													value={password}
												/>
																				{strength !== 0 && (
					<FormControl fullWidth>
						<Box sx={{ mb: 2 }}>
							<Grid container spacing={2} alignItems='center'>
								<Grid item>
									<Box
										style={{ backgroundColor: level?.color }}
										sx={{ width: 85, height: 8, borderRadius: '7px' }}
									/>
								</Grid>
								<Grid item>
									<Typography variant='subtitle1' fontSize='0.75rem'>
										{level?.label}
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</FormControl>
				)}
													</Grid>
												</Grid>
											</CardContent>
											<Divider/>
												<CardActions sx={{ justifyContent: 'flex-end' }}>
												<Button
														variant='contained'
														type='submit'
														onClick={ submitPassword }
														disabled={loading}
													>
														Save password
													</Button>
												</CardActions>
									</Card>

									<Card sx={{ mt:5 }} >
										<CardHeader
											title='Archive medicines'
										/>
											<CardContent  sx={{ width:'100%' }}>
												
												<Grid container width={'100%'} spacing={1}>
													
													<Grid item container width={'100%'} display={ 'flex' } flexDirection={'row'} spacing={3} justifyContent={'center'}>
														<Grid item width={'70%'}>
													<Autocomplete
													value={archiveMedicine}
													onChange={(event, newValue) => {
														setArchiveMedicine(newValue);
													}}
													options={archiveMedicineOptions}
													getOptionLabel={(option) => option.label}
													renderInput={(params) => (
													<TextField
													{...params}
													label="Choose an option"
													variant="outlined"
													/>
													)}
													/>
													</Grid>
													<Grid item container justifyContent={'center'} alignItems={'center'}>
														<Button variant='contained'onClick={handleAddArchiveMedicine}>
															Add
														</Button>
													</Grid>
													</Grid>
													<Grid item container width={'100%'} justifyContent='center' >
														<Grid width={'70%'}>
															{ archiveMedicineList.map((element, idx) => (
																<>
																<PharmacistArchive key={`pharmacist_archive_list_${idx}`} name={ element.name } id={element.id} handleDataChange={handleDataChange}/>			
																<Divider/>
																</>
															)) }
														</Grid>
													</Grid>
												</Grid>
											</CardContent>
											
									</Card>
									
								</Grid>
							</Grid>
						</div>
					</Stack>
				</Container>
			</Box>
		</>
	);};


export default Page;
