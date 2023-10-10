import PharmacistModel from '../models/Pharmacist.js';
import PharmacistReqModel from '../models/PharmacistReq.js';

class PharmacyRepository {

	async findOnePharmacist(id) {
		const pharmacist = await PharmacistModel.findById(id);
		return pharmacist;
	}

	async findAllPharmacists() {
		const pharmacists = await PharmacistModel.find();
		return pharmacists;
	}

	async addPharmacistReq(req){
        const { userData, speciality, hourlyRate, affiliation, educationalBackground } = req.body;
        const user = await PharmacistReqModel.addUser(userData, speciality, hourlyRate, affiliation, educationalBackground);
        return user;
    }

	async addPharmacist(req){
        const { userData, speciality, hourlyRate, affiliation, educationalBackground } = req.body;
        const user = await PharmacistModel.addUser(userData, speciality, hourlyRate, affiliation, educationalBackground);
        return user;
    }
}

export default PharmacyRepository;