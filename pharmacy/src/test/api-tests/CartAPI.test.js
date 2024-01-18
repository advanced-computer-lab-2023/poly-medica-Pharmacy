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

import { faker } from '@faker-js/faker';

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
		const userId = faker.database.mongodbObjectId();
		const response = await addCart(userId);
		expect(response.status).toBe(OK_STATUS_CODE);
	});

	it('should return 500 when adding a cart with invalid user id', async () => {
		const userId = faker.lorem.word();
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
		const userId = faker.database.mongodbObjectId();
		const cart = await CartModel(generateCart(userId, []));
		await cart.save();
		const response = await getCart(userId);
		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.cart).toBeDefined();
	});

	it('should return 500 when getting a cart with invalid user id', async () => {
		const userId = faker.lorem.word();
		const response = await getCart(userId);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 404 when getting a none existing cart', async () => {
		const userId = faker.database.mongodbObjectId();
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

		const userId = faker.database.mongodbObjectId();
		await CartModel(generateCart(userId, [])).save();

		const response = await addMedicineToCart(userId, medicine);

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.cart).toBeDefined();
		expect(response.body.cart.medicines.length).toBe(1);
	});

	it('should return 500 when adding a medicine to cart with invalid user id', async () => {
		const medicine = new MedicineModel(generateMedicine());
		await medicine.save();

		const userId = faker.lorem.word();

		const response = await addMedicineToCart(userId, medicine);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 404 when adding a medicine to a none existing cart', async () => {
		const medicine = new MedicineModel(generateMedicine());
		await medicine.save();

		const userId = faker.database.mongodbObjectId();
		const response = await addMedicineToCart(userId, medicine);

		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(response.body.cart).toBeUndefined();
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /cart/users/:userId/medicines', () => {
	const getMedicinesFromCart = async (userId) => {
		return await request(app).get(`/cart/users/${userId}/medicines`);
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 404 when getting medicines from a none existing cart', async () => {
		const userId = faker.database.mongodbObjectId();
		const response = await getMedicinesFromCart(userId);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(response.body.medicines).toBeUndefined();
	});

	it('should return 200 when getting medicines from cart', async () => {
		const userId = faker.database.mongodbObjectId();
		const medicines = [];
		for (let i = 0; i < 5; i++) {
			const medicine = new MedicineModel(generateMedicine());
			await medicine.save();
			medicines.push({ medicine: medicine });
		}
		await CartModel(generateCart(userId, medicines)).save();
		const response = await getMedicinesFromCart(userId);
		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.medicines).toBeDefined();
		expect(response.body.medicines.length).toBe(5);
	});

	it('should return 500 when getting medicines from cart with invalid user id', async () => {
		const userId = faker.lorem.word();
		const response = await getMedicinesFromCart(userId);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /cart/users/:userId/medicines/:medicineId', () => {
	const getMedicineFromCart = async (userId, medicineId) => {
		return await request(app).get(
			`/cart/users/${userId}/medicines/${medicineId}`,
		);
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 404 when getting a medicine from a none existing cart', async () => {
		const medicineId = faker.database.mongodbObjectId();
		const userId = faker.database.mongodbObjectId();

		const response = await getMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(response.body.medicine).toBeUndefined();
	});

	it('should return 200 when getting a medicine from cart', async () => {
		const userId = faker.database.mongodbObjectId();
		const medicine = new MedicineModel(generateMedicine());
		await medicine.save();
		await CartModel(generateCart(userId, [{ medicine: medicine }])).save();

		const response = await getMedicineFromCart(userId, medicine._id);
		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.medicine).toBeDefined();
	});

	it('should return 500 when getting a medicine from cart with invalid user id', async () => {
		const medicineId = faker.database.mongodbObjectId();
		const userId = faker.lorem.word();

		const response = await getMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 500 when getting a medicine from cart with invalid medicine id', async () => {
		const medicineId = faker.lorem.word();
		const userId = faker.database.mongodbObjectId();

		const response = await getMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 404 when getting a none existing medicine from cart', async () => {
		const medicineId = faker.database.mongodbObjectId();
		const userId = faker.database.mongodbObjectId();

		const response = await getMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(response.body.medicine).toBeUndefined();
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /cart/users/:userId/medicine/:medicineId?quantity=x', () => {
	const updateMedicineQuantity = async (medicineId, userId, quantity) => {
		return await request(app).patch(
			`/cart/users/${userId}/medicines/${medicineId}?quantity=${quantity}`,
		);
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 when updating medicine quantity', async () => {
		const userId = faker.database.mongodbObjectId();
		const medicine = new MedicineModel(generateMedicine());
		await medicine.save();
		await CartModel(
			generateCart(userId, [{ medicine: medicine, quantity: 10 }]),
		).save();

		const response = await updateMedicineQuantity(medicine._id, userId, 2);

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.cart).toBeDefined();
		expect(response.body.cart.medicines[0].quantity).toBe(2);
	});

	it('should return 500 when updating medicine with zero quantity', async () => {
		const userId = faker.database.mongodbObjectId();
		const medicine = new MedicineModel(generateMedicine());
		await medicine.save();
		await CartModel(generateCart(userId, [{ medicine: medicine }])).save();
		const response = await updateMedicineQuantity(medicine._id, userId, 0);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 500 when updating medicine with negative quantity', async () => {
		const userId = faker.database.mongodbObjectId();
		const medicine = new MedicineModel(generateMedicine());
		await medicine.save();
		await CartModel(generateCart(userId, [{ medicine: medicine }])).save();
		const response = await updateMedicineQuantity(medicine._id, userId, -2);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 500 when updating medicine with quantity greater than available quantity', async () => {
		const userId = faker.database.mongodbObjectId();
		const medicine = new MedicineModel(generateMedicine());
		medicine.quantity = 10;
		await medicine.save();
		await CartModel(generateCart(userId, [{ medicine: medicine }])).save();
		const response = await updateMedicineQuantity(medicine._id, userId, 100);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 500 when updating medicine quantity with invalid user id', async () => {
		const medicineId = faker.database.mongodbObjectId();
		const userId = faker.lorem.word();
		const response = await updateMedicineQuantity(medicineId, userId, 3);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 500 when updating medicine quantity with invalid medicine id', async () => {
		const medicineId = faker.lorem.word();
		const userId = faker.database.mongodbObjectId();
		const response = await updateMedicineQuantity(medicineId, userId, 3);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 404 when updating quantity of none existing medicine', async () => {
		const medicineId = faker.database.mongodbObjectId();
		const userId = faker.database.mongodbObjectId();
		await CartModel(generateCart(userId, [])).save();
		const response = await updateMedicineQuantity(medicineId, userId, 3);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('DELETE /cart/users/:userId/medicines/:medicineId', () => {
	const deleteMedicineFromCart = async (userId, medicineId) => {
		return await request(app).delete(
			`/cart/users/${userId}/medicines/${medicineId}`,
		);
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 404 when deleting from none existing cart', async () => {
		const medicineId = faker.database.mongodbObjectId();
		const userId = faker.database.mongodbObjectId();
		const response = await deleteMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 200 when deleting medicine from cart', async () => {
		const userId = faker.database.mongodbObjectId();
		const medicine1 = new MedicineModel(generateMedicine());
		const medicine2 = new MedicineModel(generateMedicine());
		await medicine1.save();
		await medicine2.save();
		await CartModel(
			generateCart(userId, [{ medicine: medicine1 }, { medicine: medicine2 }]),
		).save();
		const response = await deleteMedicineFromCart(userId, medicine1._id);
		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.updatedCart).toBeDefined();
		expect(response.body.updatedCart.medicines.length).toBe(1);
	});

	it('should return 500 when deleting medicine from cart with invalid user id', async () => {
		const medicineId = faker.database.mongodbObjectId();
		const userId = faker.lorem.word();
		const response = await deleteMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 500 when deleting medicine from cart with invalid medicine id', async () => {
		const medicineId = faker.lorem.word();
		const userId = faker.database.mongodbObjectId();
		await CartModel(generateCart(userId, [])).save();
		const response = await deleteMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(ERROR_STATUS_CODE);
	});

	it('should return 404 when deleting none existing medicine from cart', async () => {
		const medicineId = faker.database.mongodbObjectId();
		const userId = faker.database.mongodbObjectId();
		await CartModel(generateCart(userId, [])).save();
		const response = await deleteMedicineFromCart(userId, medicineId);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('DELETE /cart/users/:userId/medicines', () => {
	const deleteAllMedicinesFromCart = async (userId) => {
		return await request(app).delete(`/cart/users/${userId}/medicines`);
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 404 when deleting all medicines from none existing cart', async () => {
		const userId = faker.database.mongodbObjectId();
		const response = await deleteAllMedicinesFromCart(userId);
		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});
