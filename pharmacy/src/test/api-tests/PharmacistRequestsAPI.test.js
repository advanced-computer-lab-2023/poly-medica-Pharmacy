import request from 'supertest';
import app from '../../../app.js';
import { connectDBTest, disconnectDBTest } from '../../utils/TestingUtils.js';
import {
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
} from '../../utils/Constants.js';

import PharmacistReqModel from '../../database/models/PharmacistReq.js';
import generatePharmacistReq from '../model-generators/generatePharmacistReq.js';

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

const SECONDS = 1000;
jest.setTimeout(80 * SECONDS);

jest.mock('axios');

describe('GET /pharmacist-requests', () => {
	const getPharmacistRequests = async () => {
		const response = await request(app).get('/pharmacist-requests');
		return response;
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 upon getting all requests', async () => {
		const pharmacistReq = await PharmacistReqModel(
			generatePharmacistReq(),
		).save();
		const response = await getPharmacistRequests();

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.pharmacistRequests.length).toBe(1);
		expect(response.body.pharmacistRequests[0].userName).toBe(
			pharmacistReq.userName,
		);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('POST /add-pharmacist-req', () => {
	const addPharmacistReq = async (pharmacistReq) => {
		const response = await request(app)
			.post('/add-pharmacist-req')
			.field('sendData', JSON.stringify(pharmacistReq));
		return response;
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 when adding new pharmacist request', async () => {
		const pharmacistReq = generatePharmacistReq();

		const response = await addPharmacistReq(pharmacistReq);

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.userName).toBe(pharmacistReq.userData.userName);
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});

describe('DELETE /pharmacist-requests/:id?accept=x', () => {
	const deletePharmacistReq = async (id, accept) => {
		const response = await request(app).delete(
			`/pharmacist-requests/${id}?accept=${accept}`,
		);
		return response;
	};

	beforeEach(async () => {
		await connectDBTest();
	});

	it('should return 200 upon deleting a pharmacist request when accepted', async () => {
		const pharmacistReq = await PharmacistReqModel(
			generatePharmacistReq(),
		).save();
		const response = await deletePharmacistReq(pharmacistReq._id, true);

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.message).toBe('pharmacist request deleted');
	});

	it('should return 200 upon deleting a pharmacist request when rejected', async () => {
		const pharmacistReq = await PharmacistReqModel(
			generatePharmacistReq(),
		).save();
		const response = await deletePharmacistReq(pharmacistReq._id, false);

		expect(response.status).toBe(OK_STATUS_CODE);
		expect(response.body.message).toBe('pharmacist request deleted');
	});

	it('should return 404 upon deleting a pharmacist request that does not exist', async () => {
		const id = faker.database.mongodbObjectId();
		const response = await deletePharmacistReq(id, true);

		expect(response.status).toBe(NOT_FOUND_STATUS_CODE);
		expect(response.body.message).toBe('pharmacist request not found');
	});

	it('should return 500 upon deleting a pharmacist request with invalid id', async () => {
		const id = faker.lorem.word();
		const response = await deletePharmacistReq(id, true);

		expect(response.status).toBe(ERROR_STATUS_CODE);
		expect(response.body.message).toBe('Invalid ID');
	});

	afterEach(async () => {
		await disconnectDBTest();
	});
});
