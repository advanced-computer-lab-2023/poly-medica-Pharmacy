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
}

export default PharmacistService;