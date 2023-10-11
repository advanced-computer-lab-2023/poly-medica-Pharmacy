import AdminModel from '../models/Admin.js';
import { ADMIN_PROJECTION } from '../../utils/Constants.js';

class AdminRepository {
	async findAdminByUserName(userName) {
		const admin = await AdminModel.findOne({ userName }).select(
			ADMIN_PROJECTION,
		);
		return admin;
	}
	async findAdminById(id) {
		const admin = await AdminModel.findById(id).select(ADMIN_PROJECTION);
		return admin;
	}

	async findAllAdmins() {
		const admins = await AdminModel.find({}).select(ADMIN_PROJECTION);
		return admins;
	}

	async createAdmin(admin) {
		const newAdmin = await AdminModel.create(admin);
		return newAdmin;
	}

	async deleteAdmin(id) {
		const deletedAdmin = await AdminModel.findByIdAndDelete(id);
		return deletedAdmin;
	}
}

export default AdminRepository;
