import PharmacistModel from '../models/Pharmacist.js';

class PharmacyRepository{

    async findPharmacist(id){
        const pharmacist = await PharmacistModel.findById(id);
        return pharmacist;
    }
}

export default PharmacyRepository;