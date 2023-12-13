import { useState, useEffect } from 'react';
import { patientAxios, pharmacyAxios } from 'utils/AxiosConfig.js';
import MainCard from 'ui-component/cards/MainCard';
import OrdersList from './OrdersList.js';
import OrdersDetails from './OrdersDetails.js';
import { useUserContext } from 'hooks/useUserContext.js';
import { REJECTED_STATUS, CANCELLED_STATUS } from 'utils/Constants.js';
import { usePayment } from 'contexts/PaymentContext';


const Orders = () => {
	const { setPaymentDone } = usePayment();
	const [orders, setOrders] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const { user } = useUserContext();
	const userType = user.type;
	const userId = user.id;
	useEffect(() => {
		if (user.type === 'patient') {
			patientAxios
				.get(`/order/${userId}`)
				.then((response) => {
					setOrders(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			patientAxios
				.get(`/order/pending`)
				.then((response) => {
					setOrders(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);

	const handleDialogClose = () => {
		setSelectedOrder(null);
	};

	const handleAmountRefund = (order) => {
		if (order.paymentMethod != 'cash') {
			let user_Id;
			if(userType != 'patient'){
				user_Id = order.patientId;
			}else if (userType === 'patient'){
				user_Id = userId;
			}
			patientAxios.
				get(`/patients/${user_Id}/wallet`).
				then((response) => {
					console.log(response.data.walletAmount);
					patientAxios
						.patch(`/patients/${user_Id}/wallet`, { amount: response.data.walletAmount + order.amount })
						.then(() => {
							setPaymentDone((prev) => prev + 1);
						}).catch((err) => {
							console.log(err.message);
						});
				}).
				catch((err) => {
					console.log(err.message);
				});
		}
	};

	const handleCancleOrder = (order) => {
		order.status = CANCELLED_STATUS;
		patientAxios
			.patch(`/order/${order._id}`, { order })
			.then((response) => {
				const order = response.data;
				setOrders((prevOrders) => {
					const updateOrders = prevOrders.map((ord) => {
						if (ord._id === order._id) return order;
						return ord;
					});
					return updateOrders;
				});
			})
			.then(() => {
				order.details.forEach((medicine) => {
					pharmacyAxios
						.get(`/medicines/${medicine.medicineId}`)
						.then((response) => {
							const updatedMedicine = response.data.medicine;
							updatedMedicine.quantity += medicine.quantity;
							updatedMedicine.sales -= medicine.quantity;
							//monthlySales
							const date = new Date(order.createdAt);
							console.log('date ===f===== ', date);
							const month = date.getMonth(); 
							const day = date.getDate();
							updatedMedicine.monthlySales[month+1][day] -= medicine.quantity;

							pharmacyAxios
								.patch(`/medicines/${updatedMedicine._id}`, { updatedMedicine })
								.then((response) => {
									console.log(response);
								})
								.catch((err) => {
									console.log(err);
								});
						});
				});
			})
			.catch((err) => {
				console.log(err);
			});

		handleAmountRefund(order);
		handleDialogClose();

	};

	const handleAcceptOrRejectOrder = (status) => {
		selectedOrder.status = status;
		patientAxios
			.patch(`/order/${selectedOrder._id}`, { order: selectedOrder })
			.then((response) => {
				const order = response.data;
				setOrders((prevOrders) => {
					const updateOrders = prevOrders.filter((ord) => {
						if (ord._id != order._id) return ord;
					});
					return updateOrders;
				});
				if (status === REJECTED_STATUS){
					console.log('was hererererer');
					handleAmountRefund(order);
				}
			})
			.then(() => {
				if(selectedOrder.status === REJECTED_STATUS) { 
					selectedOrder.details.forEach((medicine) => {
						pharmacyAxios
							.get(`/medicines/${medicine.medicineId}`)
							.then((response) => {
								const updatedMedicine = response.data.medicine;
								updatedMedicine.quantity += medicine.quantity;
								updatedMedicine.sales -= medicine.quantity;
								pharmacyAxios
									.patch(`/medicines/${updatedMedicine._id}`, { updatedMedicine })
									.then((response) => {
										console.log(response);
									})
									.catch((err) => {
										console.log(err);
									});
							});
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
			handleDialogClose();
	};

	return (
		<MainCard title='Orders'>
			<OrdersList
				orders={orders}
				setSelectedOrder={setSelectedOrder}
				handleCancleOrder={handleCancleOrder}
			/>
			<OrdersDetails
				selectedOrder={selectedOrder}
				handleDialogClose={handleDialogClose}
				handleAcceptOrRejectOrder={handleAcceptOrRejectOrder}
			/>
		</MainCard>
	);
};

export default Orders;
