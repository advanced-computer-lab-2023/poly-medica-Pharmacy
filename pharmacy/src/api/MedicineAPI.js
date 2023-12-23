import upload from '../config/MulterConfig.js';
import MedicineService from '../service/medicine-service.js';
import {
	ERROR_STATUS_CODE,
	MEDICINE_FOLDER_NAME,
	NOT_FOUND_STATUS_CODE,
	OK_REQUEST_CODE_200,
	OK_STATUS_CODE,
} from '../utils/Constants.js';

export const medicine = (app) => {
	const service = new MedicineService();

	app.get('/medicines', async (req, res) => {
		try {
			const medicines = await service.getAllMedicines();
			if (medicines) {
				res.status(OK_STATUS_CODE).json({ medicines });
			} else {
				res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ message: 'medicines not found' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/medicines/archive', async (req, res) => {
		try {
			const medicines = await service.getAllArchiveMedicines();
			res.send(medicines);
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ err: error.message });
		}
	});

	app.get('/medicines/:id', async (req, res) => {
		try {
			const { id } = req.params;
			const medicine = await service.getOneMedicine(id);
			if (medicine) {
				res.status(OK_STATUS_CODE).json({ medicine });
			} else {
				res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ message: 'medicine not found' });
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/medicines/:id/pictures', async (req, res) => {
		try {
			const { id } = req.params;
			const medicine = await service.getOneMedicine(id);
			const picturePath = service.getPicture(medicine.pictureName);
			if (picturePath) {
				res.status(OK_STATUS_CODE).sendFile(picturePath);
			} else {
				res.status(NOT_FOUND_STATUS_CODE).json({ message: 'No picture found' });
			}
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ message: error.message });
		}
	});

	app.patch('/medicines/:id', async (req, res) => {
		try {
			const { id } = req.params;
			const { updatedMedicine } = req.body;
			const oldMedicine = await service.getOneMedicine(id);
			if (!oldMedicine) {
				res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ message: 'No medicine found' });
			} else {
				const updated = await service.updateMedicine(
					oldMedicine,
					updatedMedicine,
				);
				res.status(OK_STATUS_CODE).json(updated);
			}
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ message: error.message });
		}
	});

	app.patch('/medicines/:id/:quantity', async (req, res) => {
		try {
			const { id, quantity } = req.params;
			const oldMedicine = await service.getOneMedicine(id);
			if (!oldMedicine) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ message: 'No medicine found' });
			}

			const newSales = oldMedicine.sales + (oldMedicine.quantity - quantity);
			//monthlySales
			const date = new Date();
			const month = date.getMonth();
			const day = date.getDate();
			const newMonthlySales = oldMedicine.monthlySales;
			newMonthlySales[month + 1][day] += oldMedicine.quantity - quantity;

			const updated = await service.updateMedicineQuantity(
				id,
				quantity,
				newSales,
				newMonthlySales,
			);

			return res.status(OK_STATUS_CODE).json(updated);
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ message: error.message });
		}
	});

	app.patch('/medicines/:id/arcive/:archive', async (req, res) => {
		try {
			const medicineId = req.params.id;
			const archive = req.params.archive;
			await service.updateMedicineArchiveState(medicineId, archive);
			res.status(OK_REQUEST_CODE_200).end();
		} catch (error) {
			res.status(ERROR_STATUS_CODE).json({ message: error.message });
		}
	});

	app.post(
		'/medicines',
		upload(MEDICINE_FOLDER_NAME).single('image'),
		async (req, res) => {
			try {
				const { newMedicine } = req.body;
				const parsedMedicine = JSON.parse(newMedicine);
				parsedMedicine.pictureName = req.file ? req.file.filename : '';

				const addedMedicine = await service.addMedicine(parsedMedicine);

				if (addedMedicine) res.status(OK_STATUS_CODE).json({ addedMedicine });
				else {
					res
						.status(NOT_FOUND_STATUS_CODE)
						.json({ message: 'Medicine not added' });
				}
			} catch (err) {
				res.status(ERROR_STATUS_CODE).json({ message: err.message });
			}
		},
	);
};
