import { getImage } from '../../utils/CommonUtils.js';
import { MEDICINE_FOLDER_NAME } from '../../utils/Constants.js';
import MedicineModel from '../models/Medicine.js';

class MedicineRepository {
	async findAllMedicines() {
		const medicines = await MedicineModel.find();
		return medicines;
	}

	async findAllArchiveMedicine(){
		const medicines = await MedicineModel.find({ archive: true });
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

	async updateMedicine(oldMedicine, updatedMedicine) {
		Object.assign(oldMedicine, updatedMedicine);
		const updated = await oldMedicine.save();
		return updated;
	}

	async updateMedicineQuantity(id, newQuantity, newSales,newMonthlySales) {
		const updated = await MedicineModel.findByIdAndUpdate(
			id,
			{ quantity: newQuantity, sales: newSales , monthlySales: newMonthlySales },
			{ new: true },
		);
		return updated;
	}

	async updateMedicineArchiveState(id, archive){
		await MedicineModel.findByIdAndUpdate(
			id,
			{ archive: archive },
			{ new: true },
		);
	}

	getPicture(picName) {
		const pictureName = picName;
		const picturePath = getImage(MEDICINE_FOLDER_NAME, pictureName);
		return picturePath;
	}
}

export default MedicineRepository;
