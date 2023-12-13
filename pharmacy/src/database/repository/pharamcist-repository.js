import { PHARMACIST_FOLDER_NAME } from '../../utils/Constants.js';
import { getFile, deleteFile } from '../../utils/CommonUtils.js';
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

	async addPharmacistReq(data) {
		const {
			userData,
			hourlyRate,
			affiliation,
			educationalBackground,
			documentsNames,
		} = data;

		const user = await PharmacistReqModel.addUser(
			userData,
			hourlyRate,
			affiliation,
			educationalBackground,
			documentsNames,
		);
		return user;
	}

	async findPharmacistRequestById(id) {
		const pharmacist = await PharmacistReqModel.findById(id);
		return pharmacist;
	}

	async findAllPharmacistRequests() {
		const pharmacists = await PharmacistReqModel.find();
		return pharmacists;
	}

	async deletePharmacistRequest(id) {
		const pharmacist = await PharmacistReqModel.findByIdAndDelete(id);
		return pharmacist;
	}

	async deletePharmacist(id) {
		const pharmacist = await PharmacistModel.findByIdAndDelete(id);
		return pharmacist;
	}

	async addPharmacist(req) {
		const {
			userData,
			hourlyRate,
			affiliation,
			educationalBackground,
			documentsNames,
		} = req.body;
		const user = await PharmacistModel.addUser(
			userData,
			hourlyRate,
			affiliation,
			educationalBackground,
			documentsNames,
		);
		return user;
	}

	async checkPharmacistReqUser(req) {
		const { email, userName } = req.body;
		if (email) {
			const checkUserEmail = await PharmacistReqModel.findOne({
				'userData.email': email,
			});
			if (checkUserEmail) {
				throw new Error('that email is already registered');
			}
		}

		const checkUserUserName = await PharmacistReqModel.findOne({
			'userData.userName': userName,
		});
		if (checkUserUserName) {
			throw new Error('that username is already registered');
		}
	}

	getFile(fileName) {
		const filePath = getFile(PHARMACIST_FOLDER_NAME, fileName);
		return filePath;
	}

	deleteFile(fileName) {
		return deleteFile(PHARMACIST_FOLDER_NAME, fileName);
	}
	async getWalletAmount(id) {
		const user = await PharmacistModel.findById(id);
		return user.walletAmount;
	}
	async updateWallet(pharmacistId, newWalletAmount){
		const pharmacist = await PharmacistModel.findById(pharmacistId);
		pharmacist.walletAmount = newWalletAmount;
		return await pharmacist.save();
	}
}

export default PharmacyRepository;
