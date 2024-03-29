import AdminRepository from '../database/repository/admin-repository.js';

class AdminService {
	constructor() {
		this.repository = new AdminRepository();
	}

	async findAdminByUserName(userName) {
		const admin = await this.repository.findAdminByUserName(userName);
		return admin;
	}

	async findAdminById(id) {
		const admin = await this.repository.findAdminById(id);
		return admin;
	}

	async findAllAdmins() {
		const admins = await this.repository.findAllAdmins();
		return admins;
	}

	async addAdmin(req) {
		const adminUser = await this.repository.addAdmin(req);
		return adminUser;
	}

	async createAdmin(admin) {
		const newAdmin = await this.repository.createAdmin(admin);
		return newAdmin;
	}

	async checkMainAdmin(id) {
		const admin = await this.repository.findAdminById(id);
		if (admin) return admin.mainAdmin;
		return false;
	}

	async deleteAdmin(id) {
		const deletedAdmin = await this.repository.deleteAdmin(id);
		return deletedAdmin;
	}
}

export default AdminService;
