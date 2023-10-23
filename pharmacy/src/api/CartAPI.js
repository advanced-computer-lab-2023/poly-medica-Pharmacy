import CartService from '../service/cart-service.js';
import {
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
} from '../utils/Constants.js';

export const cart = (app) => {
	const service = new CartService();
	const userId = '6534395d7a9849cea9066267';

	app.post('/cart/', async (req, res) => {
		try {
			const cart = await service.createCart(userId);
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post('/cart/medicines', async (req, res) => {
		try {
			const { userId, medicineId } = req.body;
			const cart = await service.addMedicineToCart(userId, medicineId);
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.patch('/cart/medicines/:id', async (req, res) => {
		try {
			const { id } = req.params;
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

	app.get('/cart/', async (req, res) => {
		try {
			const cart = await service.getCart(userId);
			if (!cart) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'cart not found' });
			}
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
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
