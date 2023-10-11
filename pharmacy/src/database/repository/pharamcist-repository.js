import PharmacistModel from '../models/Pharmacist.js';

class PharmacyRepository {

	async findOnePharmacist(id) {
		const pharmacist = await PharmacistModel.findById(id);
		return pharmacist;
	}

	async findAllPharmacists() {
		const pharmacists = await PharmacistModel.find();
		return pharmacists;
	}
}

export default PharmacyRepository;