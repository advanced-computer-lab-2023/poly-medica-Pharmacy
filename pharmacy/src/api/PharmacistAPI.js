import PharmacistService from '../service/pharmacist-service.js';
import {
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
	CREATED_STATUS_CODE,
	UNAUTHORIZED_STATUS_CODE,
} from '../utils/Constants.js';

export const pharmacist = (app) => {
	const service = new PharmacistService();

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
