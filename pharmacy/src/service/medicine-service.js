import MedicineRepository from '../database/repository/medicine-repository.js';

class MedicineService {
	constructor() {
		this.repository = new MedicineRepository();
	}

	async getAllMedicines() {
		const medicines = await this.repository.findAllMedicines();
		return medicines;
	}

	async getOneMedicine(id) {
		const medicine = await this.repository.getOneMedicine(id);
		return medicine;
	}

	async updateMedicine(updatedMedicine) {
		const updated = await this.repository.updateMedicine(updatedMedicine);
		return updated;
	}

	async addMedicine(newMedicine) {
		return await this.repository.addMidicine(newMedicine);
	}

	getPicture(pictureName) {
		return this.repository.getPicture(pictureName);
	}
}

export default MedicineService;