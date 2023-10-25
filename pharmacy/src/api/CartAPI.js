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
			const { userId, medicine, quantity } = req.body;
			const cart = await service.addMedicineToCart(userId, medicine, quantity);
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/cart/medicines/', async (req, res) => {
		try {
			const userId = req.body.userId;
			const medicines = await service.getCartMedicines(userId);
			res.status(OK_STATUS_CODE).json({ medicines });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.patch('/cart/medicines/:id', async (req, res) => {
		try {
			const { id } = req.params;
			if (!isValidMongoId(id)) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Invalid medicine id!' });
			}
			const { quantity } = req.body;
			const cart = await service.updateMedicineInCart(id, quantity);
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

	app.delete('/cart/medicines/:id', async (req, res) => {
		try {
			const { id } = req.params;
			if (!isValidMongoId(id)) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Invalid medicine id!' });
			}
			const deletedMedicine = await service.deleteMedicineFromCart(id);
			if (!deletedMedicine) {
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

	app.delete('/cart/medicines/:id', async (req, res) => {
		try {
			const id = req.params.id;
			const cart = await service.deleteMedicineFromCart(id);
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});
};
