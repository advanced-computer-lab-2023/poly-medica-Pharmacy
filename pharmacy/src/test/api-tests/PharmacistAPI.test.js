import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/TestingUtils.js';
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
} from '../../utils/Constants.js';

import PharmacistModel from '../../database/models/Pharmacist.js';
import generatePharmacist from '../model-generators/generatePharmacist.js';

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

describe('GET /pharmacists', () => {
	const getPharmacists = async () => {
		const response = await request(app).get('/pharmacists');
		return response;
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 upon getting all pharmacists', async () => {
		const pharmacist = await PharmacistModel(generatePharmacist()).save();
		const response = await getPharmacists();

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.pharmacists.length).toBe(1);
		expect(response.body.pharmacists[0].userName).toBe(pharmacist.userName);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('GET /pharmacists/:id', () => {
	const getPharmacist = async (id) => {
		const response = await request(app).get(`/pharmacists/${id}`);
		return response;
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 upon getting a pharmacist', async () => {
		const pharmacist = await PharmacistModel(generatePharmacist()).save();
		const response = await getPharmacist(pharmacist._id);

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.pharmacist.userName).toBe(pharmacist.userName);
	});

	it('should return 500 when id is invalid', async () => {
		const id = faker.lorem.word();
		const response = await getPharmacist(id);

		expect(response.status).toBe(ERROR_STATUS_CODE);
		expect(response.body.message).toBe('Invalid ID');
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('DELETE /pharmacists/:id', () => {
	const deletePharmacist = async (id) => {
		const response = await request(app).delete(`/pharmacists/${id}`);
		return response;
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 when deleting a pharmacist', async () => {
		const pharmacist = await PharmacistModel(generatePharmacist()).save();
		const response = await deletePharmacist(pharmacist._id);

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.deletedPharmacist.userData.userName).toBe(
			pharmacist.userData.userName,
		);
	});

	it('should return 404 when pharmacist not found', async () => {
		const id = faker.database.mongodbObjectId();
		const response = await deletePharmacist(id);

		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
	});

	it('should return 500 when id is invalid', async () => {
		const id = faker.lorem.word();
		const response = await deletePharmacist(id);

		expect(response.status).toBe(ERROR_STATUS_CODE);
		expect(response.body.message).toBe('Invalid ID');
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});
