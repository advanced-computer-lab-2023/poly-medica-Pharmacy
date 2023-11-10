import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/TestingUtils.js';
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
} from '../../utils/Constants.js';

import CartModel from '../../database/models/Cart.js';
import MedicineModel from '../../database/models/Medicine.js';
import generateCart from '../model-generators/generateCart.js';
import generateMedicine from '../model-generators/generateMedicine.js';
import {
	describe,
	beforeEach,
	afterEach,
	expect,
	it,
	jest,
} from '@jest/globals';

const SECONDS = 1000;
jest.setTimeout(80 * SECONDS);

jest.mock('axios');

describe('POST /cart/users', () => {
	const addCart = async (userId) => {
		return await request(app).post('/cart/users').send({ userId });
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 when adding a cart', async () => {
		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const response = await addCart(userId);
		expect(response.status).toBe(OK_STATUS_CODE);
	});

	it('should return 500 when adding a cart with invalid user id', async () => {
		const userId = '60f1b2b4b8b8b1b2b4b8b1';
		const response = await addCart(userId);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /cart/users/:userId', () => {
	const getCart = async (userId) => {
		return await request(app).get(`/cart/users/${userId}`);
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 when getting a cart', async () => {
		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const cart = await CartModel(generateCart(userId, []));
		await cart.save();
		const response = await getCart(userId);
		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.cart).toBeDefined();
	});

	it('should return 500 when getting a cart with invalid user id', async () => {
		const userId = '60f1b2b4b8b8b2b4b8b1';
		const response = await getCart(userId);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 404 when getting a none existing cart', async () => {
		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const response = await getCart(userId);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(response.body.cart).toBeUndefined();
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('POST /cart/users/:userId/medicines', () => {
	const addMedicineToCart = async (userId, medicine) => {
		return await request(app)
			.post(`/cart/users/${userId}/medicines`)
			.send({ medicine });
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 when adding a medicine to cart', async () => {
		const medicine = new MedicineModel(generateMedicine());
		await medicine.save();

		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';
		await CartModel(generateCart(userId, [])).save();

		const response = await addMedicineToCart(userId, medicine);

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.cart).toBeDefined();
		expect(response.body.cart.medicines.length).toBe(1);
	});

	it('should return 500 when adding a medicine to cart with invalid user id', async () => {
		const medicine = new MedicineModel(generateMedicine());
		await medicine.save();

		const userId = '60f1b2b4b8b8bb24bb8b1';

		const response = await addMedicineToCart(userId, medicine);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 404 when adding a medicine to a none existing cart', async () => {
		const medicine = new MedicineModel(generateMedicine());
		await medicine.save();

		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const response = await addMedicineToCart(userId, medicine);

		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(response.body.cart).toBeUndefined();
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /cart/users/:userId/medicines', () => {
	const addMedicineToCart = async (userId, medicine) => {
		return await request(app)
			.post(`/cart/users/${userId}/medicines`)
			.send({ medicine });
	};

	const getMedicinesFromCart = async (userId) => {
		return await request(app).get(`/cart/users/${userId}/medicines`);
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 404 when getting medicines from a none existing cart', async () => {
		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const response = await getMedicinesFromCart(userId);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(response.body.medicines).toBeUndefined();
	});

	it('should return 200 when getting medicines from cart', async () => {
		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';
		await CartModel(generateCart(userId, [])).save();

		for (let i = 0; i < 5; i++) {
			const medicine = new MedicineModel(generateMedicine());
			await medicine.save();
			await addMedicineToCart(userId, medicine);
		}

		const response = await getMedicinesFromCart(userId);
		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.medicines).toBeDefined();
		expect(response.body.medicines.length).toBe(5);
	});

	it('should return 500 when getting medicines from cart with invalid user id', async () => {
		const userId = '60f1b2b4b8b82b4b8b8b1';
		const response = await getMedicinesFromCart(userId);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /cart/users/:userId/medicines/:medicineId', () => {
	const addMedicineToCart = async (userId, medicine) => {
		return await request(app)
			.post(`/cart/users/${userId}/medicines`)
			.send({ medicine });
	};

	const getMedicineFromCart = async (userId, medicineId) => {
		return await request(app).get(
			`/cart/users/${userId}/medicines/${medicineId}`,
		);
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 404 when getting a medicine from a none existing cart', async () => {
		const medicineId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';

		const response = await getMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(response.body.medicine).toBeUndefined();
	});

	it('should return 200 when getting a medicine from cart', async () => {
		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';
		await CartModel(generateCart(userId, [])).save();

		const medicine = new MedicineModel(generateMedicine());
		await medicine.save();
		await addMedicineToCart(userId, medicine);

		const response = await getMedicineFromCart(userId, medicine._id);
		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.medicine).toBeDefined();
	});

	it('should return 500 when getting a medicine from cart with invalid user id', async () => {
		const medicineId = '60f1b2b4b8b82b4b8b8b1';
		const userId = '60f1b2b4b8b82b4b8b8b1';

		const response = await getMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 500 when getting a medicine from cart with invalid medicine id', async () => {
		const medicineId = '60f1b2bb82b4b8b8b1';
		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';

		const response = await getMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 404 when getting a none existing medicine from cart', async () => {
		const medicineId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';

		const response = await getMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(response.body.medicine).toBeUndefined();
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /cart/users/:userId/medicine/:medicineId?quantity=x', () => {
	const addMedicineToCart = async (userId, medicine) => {
		return await request(app)
			.post(`/cart/users/${userId}/medicines`)
			.send({ medicine });
	};
	const updateMedicineQuantity = async (medicineId, userId, quantity) => {
		return await request(app).patch(
			`/cart/users/${userId}/medicines/${medicineId}?quantity=${quantity}`,
		);
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 when updating medicine quantity', async () => {
		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const medicine = new MedicineModel(generateMedicine());
		await medicine.save();
		await CartModel(generateCart(userId, [])).save();
		await addMedicineToCart(userId, medicine);

		const response = await updateMedicineQuantity(medicine._id, userId, 2);

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.cart).toBeDefined();
		expect(response.body.cart.medicines[0].quantity).toBe(2);
	});

	it('should return 500 when updating medicine quantity with invalid user id', async () => {
		const medicineId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const userId = '60f1b2b4bbbbb4b8b8b1';
		const response = await updateMedicineQuantity(medicineId, userId, 3);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 500 when updating medicine quantity with invalid medicine id', async () => {
		const medicineId = '60f1b2b4b8bb4b8b8b1';
		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const response = await updateMedicineQuantity(medicineId, userId, 3);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 404 when updating quantity of none existing medicine', async () => {
		const medicineId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const userId = '20f1b2b4b8b8b1b2b4b8b8b1';
		await CartModel(generateCart(userId, [])).save();
		const response = await updateMedicineQuantity(medicineId, userId, 3);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('DELETE /cart/user/:userId/medicines/:medicineId', () => {
	const addMedicineToCart = async (userId, medicine) => {
		return await request(app)
			.post(`/cart/users/${userId}/medicines`)
			.send({ medicine });
	};

	const deleteMedicineFromCart = async (userId, medicineId) => {
		return await request(app).delete(
			`/cart/users/${userId}/medicines/${medicineId}`,
		);
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 404 when deleting from none existing cart', async () => {
		const medicineId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const userId = '20f1b2b4b8b8b1b2b4b8b8b1';
		const response = await deleteMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 200 when deleting medicine from cart', async () => {
		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const medicine1 = new MedicineModel(generateMedicine());
		const medicine2 = new MedicineModel(generateMedicine());
		await medicine1.save();
		await medicine2.save();
		await CartModel(generateCart(userId, [])).save();
		await addMedicineToCart(userId, medicine1);
		await addMedicineToCart(userId, medicine2);
		const response = await deleteMedicineFromCart(userId, medicine1._id);
		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.updatedCart).toBeDefined();
		expect(response.body.updatedCart.medicines.length).toBe(1);
	});

	it('should return 500 when deleting medicine from cart with invalid user id', async () => {
		const medicineId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const userId = '60f1b2b4bbbbb4b8b8b1';
		const response = await deleteMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 500 when deleting medicine from cart with invalid medicine id', async () => {
		const medicineId = '60f1b2b4b8bb4b8b8b1';
		const userId = '60f1b2b4b8b8b1b2b4b8b8b1';
		await CartModel(generateCart(userId, [])).save();
		const response = await deleteMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 404 when deleting none existing medicine from cart', async () => {
		const medicineId = '60f1b2b4b8b8b1b2b4b8b8b1';
		const userId = '20f1b2b4b8b8b1b2b4b8b8b1';
		await CartModel(generateCart(userId, [])).save();
		const response = await deleteMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});
