import PharmacyRepository from '../database/repository/pharamcist-repository.js';

class PharmacistService {
	constructor() {
		this.repository = new PharmacyRepository();
	}

	async getPharmacist(id) {
		const pharmacist = await this.repository.findOnePharmacist(id);
		return pharmacist;
	}

	async getAllPharmacists() {
		const pharmacist = await this.repository.findAllPharmacists();
		return pharmacist;
	}

	async addPharmacist(req) {
		const pharmacistUser = await this.repository.addPharmacist(req);
		return pharmacistUser;
	}

	async getPharmacistRequestById(id) {
		const pharmacistRequest = await this.repository.findPharmacistRequestById(
			id,
		);
		return pharmacistRequest;
	}

	async addReqPharmacist(data) {
		const pharmacistUser = await this.repository.addPharmacistReq(data);
		return pharmacistUser;
	}

	async deletePharmacist(id) {
		const pharmacist = await this.repository.deletePharmacist(id);
		return pharmacist;
	}

	async deletePharmacistRequest(id) {
		const pharmacistRequest = await this.repository.deletePharmacistRequest(id);
		return pharmacistRequest;
	}

	async findAllPharmacistRequests() {
		const pharmacistRequests =
			await this.repository.findAllPharmacistRequests();
		return pharmacistRequests;
	}

	async checkPharmacistReqUser(req) {
		await this.repository.checkPharmacistReqUser(req);
	}

	getFile(fileName) {
		return this.repository.getFile(fileName);
	}

	deleteFile(fileName) {
		return this.repository.deleteFile(fileName);
	}
	async getWalletAmount(id){
		return this.repository.getWalletAmount(id);
	}
	async updateWalletAmount(pharamcistId, newAmount){
		const amountNowInWallet = await this.getWalletAmount(pharamcistId);
		return this.repository.updateWallet(pharamcistId, amountNowInWallet+newAmount);
	}
}

export default PharmacistService;
