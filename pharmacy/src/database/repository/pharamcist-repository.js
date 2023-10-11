import PharmacistModel from '../models/Pharmacist.js';
import { PHARMACIST_PROJECTION } from '../../utils/Constants.js';

class PharmacyRepository {
	async getAllPharmacists() {
		const pharmacists = await PharmacistModel.find({}).select(
			PHARMACIST_PROJECTION,
		);
		return pharmacists;
	}

	async getPharmacistById(id) {
		const pharmacist = await PharmacistModel.findById(id).select(
			PHARMACIST_PROJECTION,
		);
		return pharmacist;
	}

	async createPharmacist(pharmacist) {
		const newPharmacist = await PharmacistModel.create(pharmacist);
		return newPharmacist;
	}

	async deletePharmacist(id) {
		const deletedPharmacist = await PharmacistModel.findByIdAndDelete(
			id,
		).select(PHARMACIST_PROJECTION);
		return deletedPharmacist;
	}
}

export default PharmacyRepository;
