import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/TestingUtils.js';
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
} from '../../utils/Constants.js';
import MedicineModel from '../../database/models/Medicine.js';
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
jest.useFakeTimers();

jest.mock('axios');

describe('GET /medicines', () => {
	const fetchMedicines = async () => {
		return await request(app).get('/medicines');
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and retrieve the medicines correctly', async () => {
		for (let i = 0; i < 5; i++) {
			const medicine = new MedicineModel(generateMedicine());
			await medicine.save();
		}

		const res = await fetchMedicines();

		expect(res.status).toBe(OK_STATUS_CODE);
		expect(res._body.medicines.length).toBe(5);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('PATCH /medicines/:id', () => {
	const updateMedicines = async (id, updatedMedicine) => {
		return await request(app).patch(`/medicines/${id}`).send(updatedMedicine);
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and update the medicine correctly', async () => {
		const medicine = new MedicineModel(generateMedicine());
		await medicine.save();
		const id = medicine._id;
		const updatedMedicine = {
			name: faker.commerce.productName(),
			price: medicine.price,
			description: medicine.description,
			pictureName: medicine.pictureName,
			quantity: medicine.quantity,
			sales: medicine.sales,
			medicinalUse: medicine.medicinalUse,
			activeIngerdients: medicine.activeIngerdients,
		};
		const res = await updateMedicines(id, updatedMedicine);
		expect(res.status).toBe(OK_STATUS_CODE);
	});

	it('should return 404 ERROR with the unknown id', async () => {
		const id = faker.database.mongodbObjectId();
		const updatedMedicine = new MedicineModel(generateMedicine());
		const res = await updateMedicines(id, updatedMedicine);
		expect(res.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('POST /medicines', () => {
	const addMedicine = async (newMedicine) => {
		return await request(app).post('/medicines').send(newMedicine);
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 OK and add the medicine correctly', async () => {
		const medicine = generateMedicine();
		const newMedicine = {
			newMedicine: JSON.stringify(medicine),
		};
		const res = await addMedicine(newMedicine);
		expect(res.status).toBe(OK_STATUS_CODE);
		const medicines = await MedicineModel.find();
		expect(medicines.length).toBe(1);
	});

	it('should return 500 ERROR', async () => {
		const medicine = { name: 'medicine missing attributes' };
		const res = await addMedicine(medicine);
		expect(res.status).toBe(ERROR_STATUS_CODE);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});
