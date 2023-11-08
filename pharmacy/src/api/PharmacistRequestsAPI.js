import PharmacistService from '../service/pharmacist-service.js';
import upload from '../config/MulterConfig.js';
import {
	BAD_REQUEST_CODE_400,
	DUPLICATE_KEY_ERROR_CODE,
	PHARMACIST_ENUM,
	OK_STATUS_CODE,
	ERROR_STATUS_CODE,
	ZERO_INDEX_ARR,
	ONE_ELEMENT_IN_ARR,
	PHARMACIST_FOLDER_NAME,
} from '../utils/Constants.js';
import { isValidMongoId } from '../utils/Validation.js';

export const pharmacistRequests = (app) => {
	const service = new PharmacistService();

	app.get('/pharmacist-requests', async (req, res) => {
		try {
			const pharmacistRequests = await service.findAllPharmacistRequests();
			res.status(OK_STATUS_CODE).json({ pharmacistRequests });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post(
		'/add-pharmacist-req',
		upload(PHARMACIST_FOLDER_NAME).array('fileUpload'),
		async (req, res) => {
			try {
				console.log('In add-pharmacist-req');
				console.log('req.body', req.body);
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
					const duplicateKeyAttrb = Object.keys(err.keyPattern)[ZERO_INDEX_ARR];
					const keyAttrb = duplicateKeyAttrb.split('.');
					res.status(BAD_REQUEST_CODE_400).send({
						errCode: DUPLICATE_KEY_ERROR_CODE,
						errMessage: `that ${
							keyAttrb[keyAttrb.length - ONE_ELEMENT_IN_ARR]
						} is already registered`,
					});
				} else
					res.status(BAD_REQUEST_CODE_400).send({ errMessage: err.message });
			}
		},
	);

	app.delete('/pharmacist-requests/:id', async (req, res) => {
		try {
			const id = req.params.id;
			if (!isValidMongoId(id))
				return res.status(ERROR_STATUS_CODE).json({ message: 'Invalid ID' });
			const pharamcistRequest = await service.deletePharmacistRequest(id);
			if (pharamcistRequest) {
				res
					.status(OK_STATUS_CODE)
					.json({ message: 'pharmacist request deleted' });
			} else {
				res.status(ERROR_STATUS_CODE).json({
					message: 'doctor not found',
				});
			}
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ message: error });
		}
	});
};
