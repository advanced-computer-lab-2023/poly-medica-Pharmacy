import MedicineModel from "../models/Medicine.js";

class MedicineRepository {
    async findAllMedicines() {
        const medicines = await MedicineModel.find();
        return medicines;
    }

    async addMidicine(newMedicine) {
        const medicine = new MedicineModel(newMedicine);
        const savedMedicine = await medicine.save();
        return savedMedicine;
    }

}

export default MedicineRepository;
