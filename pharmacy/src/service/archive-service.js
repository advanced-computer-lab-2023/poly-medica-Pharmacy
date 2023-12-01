import ArchiveMedicineRepository from "../database/repository/archive-repository.js";

class ArchiveService {
	constructor() {
		this.repository = new ArchiveMedicineRepository();
	}

    async getPharmacistMedicine(pharmacistId){
        const medicines = await this.repository.getPharmacistMedicine(pharmacistId);
        return medicines;
    }

    async addMedicine(pharmacistId, medicineId, data){
        await this.repository.addMedicine(pharmacistId, medicineId, data);
    }

    async addUser(pharmacistId){
        await this.repository.addUser(pharmacistId);
    }

    async deleteUser(pharmacistId){
        await rhis.repository.deleteUser(pharmacistId);
    }

    async deleteMedicine(pharmacistId, medicineId){
        await this.repository.deleteMedicine(pharmacistId, medicineId);
    }

    async deleteMedicineInEveryUser(medicineId){
        await this.repository.deleteMedicineInEveryUser(medicineId);
    }
}

export default ArchiveService;