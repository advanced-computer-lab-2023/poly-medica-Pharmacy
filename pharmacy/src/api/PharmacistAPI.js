import axios from 'axios';
import PharmacistService from '../service/pharmacist-service.js';
import {
	PATIENTS_BASE_URL,
	BAD_REQUEST_CODE_400,
	DUPLICATE_KEY_ERROR_CODE,
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
	PHARMACIST_ENUM,
	CREATED_STATUS_CODE,
	UNAUTHORIZED_STATUS_CODE,
} from '../utils/Constants.js';

export const pharmacist = (app) => {
	const service = new PharmacistService();

	app.get('/patients', async (req, res) => {
		const getPatientsURL = `${PATIENTS_BASE_URL}/patients`;
		try {
			const response = await axios.get(getPatientsURL);
			const allPatients = response.data;
			res.status(OK_STATUS_CODE).json({ allPatients });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/pharmacists', async (req, res) => {
		try {
			const pharmacists = await service.getAllPharmacists();
			if (pharmacists) {
				res.status(OK_STATUS_CODE).json({ pharmacists });
			} else {
				res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ message: 'pharmacists not found' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post('/add-pharmacist-req', async (req, res) => {
		try {
			const pharmacistUser = await service.addReqPharmacist(req);
			req.body = {
				userId: pharmacistUser._id,
				email: pharmacistUser.userData.email,
				password: pharmacistUser.userData.password,
				userName: pharmacistUser.userData.userName,
				type: PHARMACIST_ENUM,
			};
			res.send(req.body);
		} catch (err) {
			if (err.code == DUPLICATE_KEY_ERROR_CODE) {
				const duplicateKeyAttrb = Object.keys(err.keyPattern)[0];
				const keyAttrb = duplicateKeyAttrb.split('.');
				res.status(BAD_REQUEST_CODE_400).send({
					errCode: DUPLICATE_KEY_ERROR_CODE,
					errMessage: `that ${
						keyAttrb[keyAttrb.length - 1]
					} is already registered`,
				});
			} else res.status(BAD_REQUEST_CODE_400).send({ errMessage: err.message });
		}
	});

	app.post('/check-pharmacist-req', async (req, res) => {
		try {
			await service.checkPharmacistReqUser(req);
			res.status(OK_STATUS_CODE).end();
		} catch (err) {
			res
				.status(BAD_REQUEST_CODE_400)
				.send({ errCode: DUPLICATE_KEY_ERROR_CODE, errMessage: err.message });
		}
	});

	app.get('/pharmacists/:id', async (req, res) => {
		try {
			const id = req.params.id;
			const pharmacist = await service.getPharmacistById(id);
			if (pharmacist) {
				res.status(OK_STATUS_CODE).json({ pharmacist });
			} else {
				res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ message: 'pharmacist not found' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post('/pharmacists', async (req, res) => {
		try {
			const newPharmacist = await service.createPharmacist(req.body);
			res
				.status(CREATED_STATUS_CODE)
				.json({ message: 'pharmacist created!', newPharmacist });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/pharmacists/:id', async (req, res) => {
		try {
			const role = 'ADMIN'; // to be adjusted later on with the role of the logged in user
			if (role == 'ADMIN') {
				const id = req.params.id;
				const deletedPharmacist = await service.deletePharmacist(id);
				if (deletedPharmacist) {
					res
						.status(OK_STATUS_CODE)
						.json({ message: 'pharmacist deleted!', deletedPharmacist });
				} else {
					res
						.status(NOT_FOUND_STATUS_CODE)
						.json({ message: 'pharmacist not found!' });
				}
			} else {
				res
					.status(UNAUTHORIZED_STATUS_CODE)
					.json({ message: 'You are not authorized to delete a pharmacist!' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});
};
