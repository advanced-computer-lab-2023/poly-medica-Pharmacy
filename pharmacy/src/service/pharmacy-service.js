import PharmacyRepository from '../database/repository/pharamcy-repository.js';

class PharmacyService{
    constructor(){
        this.repository = new PharmacyRepository();
    }

    async getPharmacist(id){
        const pharmacist = await this.repository.findPharmacist(id);
        return pharmacist;
    }
}

export default PharmacyService;