import { DUB_MEDICINE_ARCHIVE } from "../../utils/Constants.js";
import ArchiveMedicineModel from "../models/ArchiveMedicine.js";

class ArchiveMedicineRepository {

    async getPharmacistMedicine(pharmacistId){
        const medicines = await ArchiveMedicineModel.findOne({ pharmacistId: pharmacistId }, "medicines");
        return medicines;
    }

    async addMedicine(pharmacistId, medicineId, data){
        const medicine = await ArchiveMedicineModel.findOne({ pharmacistId, 'medicines.medicineId': medicineId });
        if(medicine)
            throw new Error(DUB_MEDICINE_ARCHIVE);
        await ArchiveMedicineModel.findOneAndUpdate({ pharmacistId: pharmacistId },
            {$push: {"medicines": { medicineId, ...data } } },
            { new: true, upsert: true, runValidators: true});
    }

    async addUser(pharmacistId){
        const user = new ArchiveMedicineModel({pharmacistId: pharmacistId});
        await user.save();
    }

    async deleteUser(pharmacistId){
        await ArchiveMedicineModel.deleteOne({pharmacistId: pharmacistId});
    }

    async deleteMedicine(pharmacistId, medicineId){
        await ArchiveMedicineModel.findOneAndUpdate({ pharmacistId: pharmacistId },
            {$pull: {"medicines": { medicineId } }},
            {new :true});
    }

    async deleteMedicineInEveryUser(medicineId){
        await ArchiveMedicineModel.updateMany(
            {},
            {$pull: {"medicines": { medicineId } }});
    }
}

export default ArchiveMedicineRepository;