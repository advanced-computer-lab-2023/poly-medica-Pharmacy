import { communicationAxios, patientAxios, pharmacyAxios } from './AxiosConfig';
import Swal from 'sweetalert2';

export const successfulPayment = (userId, order, updateCartLength) => {
	console.log('IN SUCCESSFUL PAYMENT ==== ', order);
	const { type } = order;
	patientAxios
		.post('/order', { order })
		.then(() => {
			if (type === 'cart') {
				pharmacyAxios
					.get(`/cart/users/${userId}`)
					.then((response) => {
						const cart = response.data.cart;
						cart.medicines.forEach((medicine) => {
							pharmacyAxios.patch(
								`medicines/${medicine.medicine._id}/${medicine.medicine.quantity - medicine.quantity
								}`,
							).then(() => {
								if (medicine.medicine.quantity - medicine.quantity === 0) {
									communicationAxios.post(`/notifications/medicines/${medicine.medicine.name}`).catch((err) => {
										Swal.fire(err.message);
										console.log(err);
									});
								}
							}
							);
						});

						cart.prescriptions.forEach((prescription) => {
							prescription.medicines.forEach((medicine) => {
								pharmacyAxios
									.get(`/medicines/${medicine.medicineId}`)
									.then((response) => {
										pharmacyAxios.patch(
											`medicines/${medicine.medicineId}/${response.data.medicine.quantity - medicine.amount
											}`,
										);
									});
							});
						});

						cart.prescriptions.forEach((prescription) => {
							patientAxios.patch(
								`/prescriptions/${prescription.prescriptionId}`,
								{
									prescription: { filled: true },
								},
							);
						});
					})
					.then(() => {
						pharmacyAxios
							.delete(`/cart/users/${userId}`)
							.then(() => updateCartLength())
							.catch((err) => {
								console.log(err);
							});
					})
					.catch((error) => {
						console.log(error);
					});
			} else if (type === 'prescription') {
				const { typeId } = order;
				patientAxios
					.patch(`/prescriptions/${typeId}`, {
						prescription: { purchased: true },
					})
					.then(() => {
						patientAxios
							.get(`/prescriptions/${typeId}/medicines`)
							.then((response) => {
								const medicines = response.data;
								console.log('MEDICINES == ', medicines);
								medicines.forEach((medicine) => {
									pharmacyAxios
										.get(`/medicines/${medicine.medicineId}`)
										.then((response) => {
											pharmacyAxios.patch(
												`medicines/${medicine.medicineId}/${response.data.medicine.quantity - medicine.amount
												}`,
											);
										});
								});
							});
					})
					.catch((error) => {
						console.log(error);
					});
			}
		})
		.catch((error) => {
			console.log('Error in placing the order', error);
		});

	return '/patient/pages/orders';
};

export const paymentStatus = (
	navigate,
	status,
	item,
	userId,
	updateCartLength,
) => {
	console.log('the status is ', status);
	console.log('Payment item is ', item);
	switch (status) {
		case 'succeeded': {
			Swal.fire('success', 'Payment Succeeded', 'success')
				.then(() => {
					const callBackUrl = successfulPayment(userId, item, updateCartLength);
					navigate(callBackUrl, { replace: true });
				})
				.catch((error) => {
					console.log('Error the purchase', error);
				});
			return 'Payment succeeded!';
		}
		case 'processing': {
			return 'Your payment is processing.';
		}
		case 'requires_payment_method': {
			Swal.fire('error', 'failed payment', 'error');
			return 'Your payment was not successful, please try again.';
		}
		default:
			Swal.fire('error', 'Something went wrong.', 'error');
			return 'Something went wrong.';
	}
};

export const paymentElementOptions = {
	layout: {
		type: 'accordion',
		defaultCollapsed: false,
		radios: true,
		spacedAccordionItems: true,
	},
};
