import axios from 'axios';
import AdminService from '../service/admin-service.js';
import { isValidMongoId } from '../utils/Validation.js';
import {
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
	AUTH_BASE_URL,
	PATIENTS_BASE_URL,
	ADMIN_ENUM,
	DUPLICATE_KEY_ERROR_CODE,
	BAD_REQUEST_CODE_400,
	ZERO_INDEX_ARR,
	ONE_ELEMENT_IN_ARR,
} from '../utils/Constants.js';

export const admin = (app) => {
	const service = new AdminService();

	app.get('/admins', async (req, res) => {
		try {
			const admins = await service.findAllAdmins();
			res.status(OK_STATUS_CODE).json({ admins });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post('/admins', async (req, res) => {
		try {
			const adminUser = await service.addAdmin(req);
			req.body = {
				userId: adminUser._id,
				password: adminUser.password,
				userName: adminUser.userName,
				email: adminUser.email,
				type: ADMIN_ENUM,
			};
			res.status(OK_STATUS_CODE).send(req.body);
		} catch (err) {
			if (err.code == DUPLICATE_KEY_ERROR_CODE) {
				const duplicateKeyAttrb = Object.keys(err.keyPattern)[ZERO_INDEX_ARR];
				const keyAttrb = duplicateKeyAttrb.split('.');
				res.status(BAD_REQUEST_CODE_400).send({
					errCode: DUPLICATE_KEY_ERROR_CODE,
					errMessage: `that ${
						keyAttrb[keyAttrb.length - ONE_ELEMENT_IN_ARR]
					} is already registered`,
				});
			} else res.status(ERROR_STATUS_CODE).send({ errMessage: err.message });
		}
	});

	app.delete('/admins/:id', async (req, res) => {
		try {
			const { id } = req.params;
			if (!isValidMongoId(id))
				return res.status(ERROR_STATUS_CODE).json({ message: 'Invalid ID' });

			const isMainAdmin = await service.checkMainAdmin(id);
			if (isMainAdmin) {
				res
					.status(ERROR_STATUS_CODE)
					.json({ message: 'you can not delete main admin' });
			} else {
				const deletedAdmin = await service.deleteAdmin(id);

				if (deletedAdmin) {
					axios.delete(`${AUTH_BASE_URL}/users/${id}`);
					res
						.status(OK_STATUS_CODE)
						.json({ message: 'admin deleted!', deletedAdmin });
				} else {
					res
						.status(NOT_FOUND_STATUS_CODE)
						.json({ message: 'admin not found!' });
				}
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/patients/:id', async (req, res) => {
		try {
			const { id } = req.params;
			if (!isValidMongoId(id))
				return res.status(ERROR_STATUS_CODE).json({ message: 'Invalid ID' });
			const deletePatientURL = `${PATIENTS_BASE_URL}/patients/${id}`;
			const response = await axios.delete(deletePatientURL);

			if (response.data.status == NOT_FOUND_STATUS_CODE) {
				res.status(NOT_FOUND_STATUS_CODE).send({
					message: 'patient not found!',
					status: NOT_FOUND_STATUS_CODE,
				});
			} else if (response.data.status == OK_STATUS_CODE) {
				await axios.delete(`${AUTH_BASE_URL}/users/${id}`);
				res.status(OK_STATUS_CODE).send({
					message: 'patient deleted!',
					status: OK_STATUS_CODE,
					deletePatient: response.data.deleted_patient,
				});
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).send(err);
		}
	});
};
