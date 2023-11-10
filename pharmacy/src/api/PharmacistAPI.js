import axios from 'axios';
import PharmacistService from '../service/pharmacist-service.js';
import {
	PATIENTS_BASE_URL,
	BAD_REQUEST_CODE_400,
	DUPLICATE_KEY_ERROR_CODE,
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
	CREATED_STATUS_CODE,
	AUTH_BASE_URL,
	PHARMACIST_ENUM,
} from '../utils/Constants.js';
import { isValidMongoId } from '../utils/Validation.js';

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
			const pharmacist = await service.getPharmacist(id);
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
			const newPharmacist = await service.addPharmacist(req);
			await axios.post(`${AUTH_BASE_URL}/pharmacists`, {
				userId: newPharmacist._id,
				email: newPharmacist.userData.email,
				password: newPharmacist.userData.password,
				userName: newPharmacist.userData.userName,
				type: PHARMACIST_ENUM,
			});

			res
				.status(CREATED_STATUS_CODE)
				.json({ message: 'pharmacist created!', newPharmacist });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/pharmacists/:id', async (req, res) => {
		try {
			const { id } = req.params;
			if (!isValidMongoId(id))
				return res.status(ERROR_STATUS_CODE).json({ message: 'Invalid ID' });
			await service
				.getPharmacist(id)
				.then((pharmacist) => {
					if (!pharmacist) {
						console.log('pharmacist not found');
						return res
							.status(ERROR_STATUS_CODE)
							.json({ message: 'pharmacist not found' });
					}
					pharmacist.documentsNames.forEach((fileName) => {
						service.deleteFile(fileName);
					});
				})
				.catch((err) => {
					console.log('Here 1111', err.message);
					return res.status(ERROR_STATUS_CODE).json({ message: err.message });
				});

			const deletedPharmacist = await service.deletePharmacist(id);
			if (deletedPharmacist) {
				await axios.delete(`${AUTH_BASE_URL}/users/${id}`);
				res
					.status(OK_STATUS_CODE)
					.json({ message: 'pharmacist deleted!', deletedPharmacist });
			} else {
				res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ message: 'pharmacist not found!' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});
};
