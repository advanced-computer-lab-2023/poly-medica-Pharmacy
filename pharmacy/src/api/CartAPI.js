import CartService from '../service/cart-service.js';
import {
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
} from '../utils/Constants.js';

import { isValidMongoId } from '../utils/Validation.js';

export const cart = (app) => {
	const service = new CartService();

	app.post('/cart/', async (req, res) => {
		try {
			const userId = req.body.userId;
			if (!isValidMongoId(userId)) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Invalid user id!' });
			}

			const cart = await service.createCart(userId);
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post('/cart/medicines', async (req, res) => {
		try {
			const { userId, medicine } = req.body;
			const cart = await service.addMedicineToCart(userId, medicine);
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/cart/:userId/medicines/', async (req, res) => {
		try {
			const { userId } = req.params;
			if (!isValidMongoId(userId)) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Invalid user id!' });
			}
			const medicines = await service.getCartMedicines(userId);
			res.status(OK_STATUS_CODE).json({ medicines });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post('/cart/medicines/:medicineId', async (req, res) => {
		try {
			const { userId } = req.body;
			const { medicineId } = req.params;
			console.log('medicineId', medicineId);
			console.log('userId', userId);
			if (!isValidMongoId(medicineId)) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Invalid medicine id!' });
			}
			if (!isValidMongoId(userId)) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Invalid user id!' });
			}
			const medicine = await service.getMedicine(userId, medicineId);
			console.log('medicine', medicine);
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

	app.patch('/cart/medicines/:medicineId', async (req, res) => {
		try {
			const { medicineId } = req.params;
			const { userId } = req.body;
			if (!isValidMongoId(medicineId)) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Invalid medicine id!' });
			}
			if (!isValidMongoId(userId)) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Invalid user id!' });
			}
			const { quantity } = req.body;
			console.log('medicineId', medicineId);
			console.log('userId', userId);
			console.log('quantity', quantity);
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
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Invalid medicine id!' });
			}
			if (!isValidMongoId(userId)) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Invalid user id!' });
			}

			const medicines = await service.getCartMedicines(userId);
			console.log('medicinesLength', medicines.length);
			const cart = await service.deleteMedicineFromCart(userId, medicineId);
			if (cart.medicines.length + 1 !== medicines.length) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Medicine is not in the cart!' });
			}

			res
				.status(OK_STATUS_CODE)
				.json({ message: 'Medicine deleted from cart!' });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/cart/:userId', async (req, res) => {
		try {
			const { userId } = req.params;
			if (!isValidMongoId(userId)) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Invalid user id!' });
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

	app.delete('/cart/medicines/:medicineId', async (req, res) => {
		try {
			console.log('delete medicine');
			const { medicineId } = req.params;
			const { userId } = req.body;
			console.log('medicineId in delete medicine', medicineId);
			console.log('userId', userId);
			if (!isValidMongoId(medicineId)) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Invalid medicine id!' });
			}
			if (!isValidMongoId(userId)) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Invalid user id!' });
			}

			const cart = await service.deleteMedicineFromCart(userId, medicineId);
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});
};
