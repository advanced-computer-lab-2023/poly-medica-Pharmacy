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

	async checkPharmacistReqUser(req){
		const { email, userName } = req.body;
		if(email){
			const checkUserEmail = await PharmacistReqModel.findOne({ 'userData.email': email });
			if(checkUserEmail){
				throw new Error('that email is already registered');
			}
		}
		
		const checkUserUserName = await PharmacistReqModel.findOne({ 'userData.userName': userName });
		if(checkUserUserName){
			throw new Error('that username is already registered');
		}

	}
}

export default PharmacyRepository;
