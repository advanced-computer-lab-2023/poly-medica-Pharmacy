import PharmacistModel from '../models/Pharmacist.js';

class PharmacyRepository{

    async findPharmacist(id){
        const pharmacist = await PharmacistModel.findById(id);
        return pharmacist;
    }

    async findPharmacist(){
        const pharmacists = await PharmacistModel.find();
        return pharmacists;
    }
}

export default PharmacyRepository;