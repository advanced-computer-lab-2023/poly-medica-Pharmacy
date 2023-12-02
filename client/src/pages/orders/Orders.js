import { useState, useEffect } from 'react';
import { patientAxios, pharmacyAxios } from 'utils/AxiosConfig.js';
import MainCard from 'ui-component/cards/MainCard';
import OrdersList from './OrdersList.js';
import OrdersDetails from './OrdersDetails.js';
import { useUserContext } from 'hooks/useUserContext.js';
import { CANCELLED_STATUS } from 'utils/Constants.js';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const { user } = useUserContext();
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
				.get(`/order/pending/`)
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
							updatedMedicine.monthlySales[month+1] -= medicine.quantity;

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
