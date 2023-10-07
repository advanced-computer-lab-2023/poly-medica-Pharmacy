
import MedicineService from '../service/medicine-service.js';
import { ERROR_STATUS_CODE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE } from '../utils/Constants.js';

export const medicine = (app) => {
	const service = new MedicineService();

	app.get('/get-all-medicines', async (req, res) => {
		try {
			const medicines = await service.getAllMedicines();
			if (medicines) {
				res.status(OK_STATUS_CODE).json({ medicines });
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({ message: 'medicines not found' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post('/add-medicine', async (req, res) => {
		try {
			const { newMedicine } = req.body;
			const addedMedicine = await service.addMedicine(newMedicine);

			if (addedMedicine) res.status(OK_STATUS_CODE).json({ addedMedicine });
			else {
				res.status(NOT_FOUND_STATUS_CODE).json({ message: 'Medicine not added' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ message: err.message });
		}
	});
};