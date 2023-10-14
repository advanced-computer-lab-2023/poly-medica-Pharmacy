import { getImage } from '../../utils/CommonUtils.js';
import { MEDICINE_FOLDER_NAME } from '../../utils/Constants.js';
import MedicineModel from '../models/Medicine.js';

class MedicineRepository {
	async findAllMedicines() {
		const medicines = await MedicineModel.find();
		return medicines;
	}

	async getOneMedicine(id) {
		const medicine = await MedicineModel.findById(id);
		return medicine;
	}

	async addMidicine(newMedicine) {
		const medicine = new MedicineModel(newMedicine);
		const savedMedicine = await medicine.save();
		return savedMedicine;
	}

	async updateMedicine(updatedMedicine) {
		const updated = await updatedMedicine.save();
		return updated;
	}

	getPicture(picName) {
		const pictureName = picName;
		const picturePath = getImage(MEDICINE_FOLDER_NAME, pictureName);
		return picturePath;
	}
}

export default MedicineRepository;
