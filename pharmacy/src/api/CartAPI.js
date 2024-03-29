import CartService from '../service/cart-service.js';
import {
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
} from '../utils/Constants.js';

import { isValidMongoId } from '../utils/Validation.js';

export const cart = (app) => {
	const service = new CartService();

	app.post('/cart/users', async (req, res) => {
		try {
			const { userId } = req.body;
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}

			const cart = await service.createCart(userId);
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/cart/users/:userId', async (req, res) => {
		try {
			const { userId } = req.params;
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}
			const cart = await service.getCart(userId);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'cart not found' });
			}
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			console.log(err.message, 'err in cart api');
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post('/cart/users/:userId/medicines', async (req, res) => {
		try {
			const { medicine } = req.body;
			const { userId } = req.params;
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}
			const cart = await service.addMedicineToCart(userId, medicine);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Cart not found!' });
			}

			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/cart/users/:userId', async (req, res) => {
		try {
			const { userId } = req.params;
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}

			const cart = await service.getCart(userId);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Cart not found!' });
			}

			const updatedCart = await service.deleteAllMedicinesAndPrescriptionsFromCart(userId);

			res.status(OK_STATUS_CODE).json({ updatedCart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/cart/users/:userId/medicines/', async (req, res) => {
		try {
			const { userId } = req.params;
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}
			const cart = await service.getCart(userId);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Cart not found!' });
			}
			const medicines = cart.medicines;
			const prescriptions = cart.prescriptions;
			res.status(OK_STATUS_CODE).json({ medicines, prescriptions });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/cart/users/:userId/medicines/:medicineId', async (req, res) => {
		try {
			const { userId, medicineId } = req.params;
			if (!isValidMongoId(medicineId)) {
				return res
					.status(ERROR_STATUS_CODE)
					.json({ err: 'Invalid medicine id!' });
			}
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}

			const cart = await service.getCart(userId);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Cart not found!' });
			}

			const medicine = await service.getMedicine(userId, medicineId);
			if (!medicine) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Medicine not found!' });
			}

			res.status(OK_STATUS_CODE).json({ medicine });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post('/cart/users/:userId/prescription', async (req, res) => {
		try {
			const {
				prescriptionId,
				description,
				doctorName,
				medicines,
				medicinesQuantity,
				price,
			} = req.body;
			const { userId } = req.params;
			if (!isValidMongoId(userId) || !isValidMongoId(prescriptionId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid id!' });
			}
			const cart = await service.addPrescriptionToCart(
				userId,
				prescriptionId,
				description,
				doctorName,
				medicines,
				medicinesQuantity,
				price,
			);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Cart not found!' });
			}

			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.patch('/cart/users/:userId/medicines/:medicineId', async (req, res) => {
		try {
			const { userId, medicineId } = req.params;
			const { quantity } = req.query;

			if (!isValidMongoId(medicineId)) {
				return res
					.status(ERROR_STATUS_CODE)
					.json({ err: 'Invalid medicine id!' });
			}
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}

			const medicine = await service.getMedicine(userId, medicineId);
			if (!medicine) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Medicine not found!' });
			}

			if (quantity <= 0) {
				return res
					.status(ERROR_STATUS_CODE)
					.json({ err: 'Quantity cannot be less that or equal to zero!' });
			}
			if (quantity > medicine.medicine.quantity) {
				return res
					.status(ERROR_STATUS_CODE)
					.json({ err: 'Quantity cannot be more than the available amount!' });
			}

			const cart = await service.updateMedicineInCart(
				userId,
				medicineId,
				quantity,
			);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Medicine is not in the cart!' });
			}
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/cart/users/:userId/medicines/:medicineId', async (req, res) => {
		try {
			const { userId, medicineId } = req.params;
			if (!isValidMongoId(medicineId)) {
				return res
					.status(ERROR_STATUS_CODE)
					.json({ err: 'Invalid medicine id!' });
			}
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}

			const cart = await service.getCart(userId);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'No cart for this user' });
			}

			const medicine = await service.getMedicine(userId, medicineId);
			if (!medicine) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Medicine is not in the cart!' });
			}

			const updatedCart = await service.deleteMedicineFromCart(
				userId,
				medicineId,
			);

			res.status(OK_STATUS_CODE).json({ updatedCart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/cart/users/:userId/items/length', async (req, res) => {
		try {
			const { userId } = req.params;
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}

			const cart = await service.getCart(userId);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'No cart for this user' });
			}

			const length = await service.getCartItemsLength(userId);
			res.status(OK_STATUS_CODE).json({ length });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get(
		'/cart/users/:userId/prescriptions/:prescriptionId',
		async (req, res) => {
			try {
				const { userId, prescriptionId } = req.params;
				if (!isValidMongoId(prescriptionId)) {
					return res
						.status(ERROR_STATUS_CODE)
						.json({ err: 'Invalid prescription id!' });
				}
				if (!isValidMongoId(userId)) {
					return res
						.status(ERROR_STATUS_CODE)
						.json({ err: 'Invalid user id!' });
				}

				const cart = await service.getCart(userId);
				if (!cart) {
					return res
						.status(NOT_FOUND_STATUS_CODE)
						.json({ err: 'No cart for this user' });
				}

				const prescription = await service.getPrescription(
					userId,
					prescriptionId,
				);
				if (!prescription) {
					return res
						.status(NOT_FOUND_STATUS_CODE)
						.json({ err: 'Prescription is not in the cart!' });
				}

				res.status(OK_STATUS_CODE).json({ prescription });
			} catch (err) {
				res.status(ERROR_STATUS_CODE).json({ err: err.message });
			}
		},
	);

	app.delete(
		'/cart/users/:userId/prescriptions/:prescriptionId',
		async (req, res) => {
			try {
				const { userId, prescriptionId } = req.params;
				if (!isValidMongoId(prescriptionId)) {
					return res
						.status(ERROR_STATUS_CODE)
						.json({ err: 'Invalid prescription id!' });
				}
				if (!isValidMongoId(userId)) {
					return res
						.status(ERROR_STATUS_CODE)
						.json({ err: 'Invalid user id!' });
				}

				const cart = await service.getCart(userId);
				if (!cart) {
					return res
						.status(NOT_FOUND_STATUS_CODE)
						.json({ err: 'No cart for this user' });
				}

				const updatedCart = await service.deletePrescriptionFromCart(
					userId,
					prescriptionId,
				);

				res.status(OK_STATUS_CODE).json({ updatedCart });
			} catch (err) {
				res.status(ERROR_STATUS_CODE).json({ err: err.message });
			}
		},
	);
};
