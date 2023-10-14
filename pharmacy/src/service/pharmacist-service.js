import PharmacyRepository from '../database/repository/pharamcist-repository.js';

class PharmacistService{
	constructor(){
		this.repository = new PharmacyRepository();
	}

	async getPharmacist(id){
		const pharmacist = await this.repository.findPharmacist(id);
		return pharmacist;
	}

	async getAllPharmacists(){
		const pharmacist = await this.repository.findAllPharmacists();
		return pharmacist;
	}

	async addPharmacist(req){
        const pharmacistUser = await this.repository.addPharmacist(req);
        return pharmacistUser;
    }

    async addReqPharmacist(req){
        const pharmacistUser = await this.repository.addPharmacistReq(req);
        return pharmacistUser;
    }

	async checkPharmacistReqUser(req){
		await this.repository.checkPharmacistReqUser(req);
	}
}

export default PharmacistService;