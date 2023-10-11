import PharmacyRepository from '../database/repository/pharamcist-repository.js';

class PharmacistService {
	constructor() {
		this.repository = new PharmacyRepository();
	}

	async getAllPharmacists() {
		const pharmacists = await this.repository.getAllPharmacists();
		return pharmacists;
	}
	async getPharmacistById(id) {
		const pharmacist = await this.repository.getPharmacistById(id);
		return pharmacist;
	}

	async createPharmacist(pharmacist) {
		const newPharmacist = await this.repository.createPharmacist(pharmacist);
		return newPharmacist;
	}
}

export default PharmacistService;
