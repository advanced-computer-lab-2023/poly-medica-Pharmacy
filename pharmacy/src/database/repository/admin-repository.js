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

	async addAdmin(req) {
		const { userName, password, email, mainAdmin } = req.body;
		const user = await AdminModel.addUser(userName, password, email, mainAdmin);
		return user;
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
