import MedicineRepository from '../database/repository/medicine-repository.js';

class MedicineService {
	constructor() {
		this.repository = new MedicineRepository();
	}

	async getAllMedicines() {
		const medicines = await this.repository.findAllMedicines();
		return medicines;
	}

	async addMedicine(newMedicine) {
		return await this.repository.addMidicine(newMedicine);
	}
}

export default MedicineService;