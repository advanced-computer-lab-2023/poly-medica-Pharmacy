import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from 'hooks/useUserContext';
import {
	pharmacyAxios,
	patientAxios,
	paymentAxios,
} from 'utils/AxiosConfig.js';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import OrderTable from 'pages/orders/OrderTable';
import AddressCard from 'pages/address/AddressCard';
import { ZERO_INDEX } from 'utils/Constants';
import { Container, Button, Typography } from '@mui/material';
import PaymentOptions from 'pages/payment/PaymentOptions';
import { successfulPayment } from '../../utils/PaymentUtils';
import Swal from 'sweetalert2';
import '../../assets/css/swalStyle.css';
import { usePayment } from 'contexts/PaymentContext';
import { useCartContext } from 'contexts/CartContext';

const Checkout = () => {
	const { type, id } = useParams();
	const { setPaymentDone } = usePayment();
	const [items, setItems] = useState([]);
	const [primaryAddress, setPrimaryAddress] = useState(null);
	const [value, setValue] = useState('credit-card');
	const [totalCost, setTotalCost] = useState(0);
	const { user } = useUserContext();
	const userId = user.id;
	const navigate = useNavigate();
	const { updateCartLength } = useCartContext();
	primaryAddress;
	useEffect(() => {
		pharmacyAxios
			.get(`/cart/users/${userId}/medicines/`)
			.then((response) => {
				console.log(response.data);
				const medicines = response.data;
				setItems(() => {
					let itms = medicines.medicines.map((medicine) => {
						const itm = {
							medicineId: medicine.medicine._id,
							name: medicine.medicine.name,
							quantity: medicine.quantity,
							price: medicine.medicine.price,
						};
						setTotalCost((prev) => {
							return prev + itm.quantity * itm.price;
						});
						return itm;
					});
					medicines.prescriptions.map((prescription) => {
						const meds = prescription.medicines.map((medicine) => {
							const itm = {
								medicineId: medicine.medicineId,
								name: medicine.name,
								quantity: medicine.amount,
								price: medicine.price,
								prescriptionId: prescription.prescriptionId,
							};
							setTotalCost((prev) => {
								return prev + itm.quantity * itm.price;
							});
							return itm;
						});
						itms = [...itms, ...meds];
					});
					return itms;
				});
			})
			.catch((error) => {
				console.log(error);
			});

		patientAxios
			.get('/address/' + userId)
			.then((response) => {
				const data = response.data.deliveryAddresses;
				if (data.length) {
					setPrimaryAddress(data[ZERO_INDEX]);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handlePayment = () => {
		let amountInWallet;
		patientAxios
			.get(`/patients/${userId}/wallet`)
			.then((response) => {
				amountInWallet = response.data.walletAmount;
			})
			.then(() => {
				const amountToPay = totalCost;
				if (value === 'credit-card') {
					navigate('/patient/pages/payment', {
						state: {
							items: {
								patientId: userId,
								details: items,
								amount: totalCost,
								paymentMethod: 'card',
								type: type,
								typeId: id,
							},
							amountToPay: totalCost,
						},
						replace: true,
					});
				} else if (value === 'wallet') {
					console.log('the amount in  wallet is : ', amountInWallet);
					if (amountInWallet >= amountToPay) {
						paymentAxios
							.post('/payment/wallet', {
								amountToPayByWallet: amountToPay,
								userId: userId,
							})
							.then(
								Swal.fire('success', 'Payment Succeeded', 'success').then(
									() => {
										const callBackUrl = successfulPayment(
											userId,
											{
												patientId: userId,
												details: items,
												amount: totalCost,
												type: type,
												typeId: id,
												paymentMethod: 'wallet',
											},
											updateCartLength,
										);
										pharmacyAxios
											.delete(`/cart/users/${userId}`)
											.then(() => {
												updateCartLength();
												navigate(callBackUrl, { replace: true });
											})
											.catch((err) => {
												console.log(err);
											});
									},
								),
							)
							.catch((error) => {
								console.log('Error in payment with the wallet', error);
							});
					} else {
						Swal.fire({
							title: 'Pay with the credit card',
							text: 'Do you want to pay the rest of the amount using the card',
							icon: 'warning',
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: 'Yes',
						}).then((result) => {
							if (result.isConfirmed) {
								console.log(amountInWallet);
								paymentAxios
									.post('/payment/wallet', {
										amountToPayByWallet: amountInWallet,
										userId: userId,
									})
									.catch((error) => {
										console.log('Error in payment with the wallet', error);
									});
								const amountToPayByCard = amountToPay - amountInWallet;
								navigate('/patient/pages/payment', {
									state: {
										items: {
											patientId: userId,
											details: items,
											amount: totalCost,
											paymentMethod: 'wallet',
											type: type,
											typeId: id,
										},
										amountToPay: amountToPayByCard,
									},
									replace: true,
								});
							}
						});
					}
				} else {
					Swal.fire('success', 'Payment Succeeded', 'success').then(() => {
						const callBackUrl = successfulPayment(
							userId,
							{
								patientId: userId,
								details: items,
								amount: totalCost,
								paymentMethod: 'cash',
								type: type,
								typeId: id,
							},
							updateCartLength,
						);
						navigate(callBackUrl, { replace: true });
					});
					setPaymentDone(true);
				}
			});
	};

	return (
		<MainCard title='Checkout' sx={{ width: '90%', margin: '0 auto' }}>
			<SubCard title='Order Details' sx={{ marginBottom: 5 }}>
				<OrderTable items={items} total={totalCost} />
			</SubCard>
			<SubCard
				title='Delivery Address'
				secondary={
					<Button
						onClick={() => {
							navigate('/patient/pages/address');
						}}
					>
						Choose Address
					</Button>
				}
			>
				{primaryAddress && (
					<AddressCard address={primaryAddress} includeEdit={false} />
				)}
				{!primaryAddress && (
					<Typography sx={{ textAlign: 'center' }} color='error'>
						Please add a delivery address
					</Typography>
				)}
			</SubCard>
			<SubCard title='Payment method' sx={{ marginTop: 5 }}>
				<PaymentOptions type={type} handleChange={handleChange} value={value} />
			</SubCard>
			<Container
				sx={{
					justifyContent: 'flex-end',
					display: 'flex',
					marginTop: 2,
				}}
			>
				<Button
					onClick={handlePayment}
					variant='contained'
					color='secondary'
					disabled={!primaryAddress || !totalCost}
				>
					Place Order
				</Button>
			</Container>
		</MainCard>
	);
};

export default Checkout;
