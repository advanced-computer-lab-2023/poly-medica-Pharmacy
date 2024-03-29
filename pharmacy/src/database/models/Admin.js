import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Admin = mongoose.Schema({
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: [true],
	},
	email:{
		type:String,
		required:true,
		unique: true,
	},
	mainAdmin: {
		type: Boolean,
		default: false,
	},
});

Admin.statics.addUser = async function (userName, password, email, mainAdmin) {
	const salt = await bcrypt.genSalt();
	password = await bcrypt.hash(password, salt);
	const newRecord = new this({ userName, password, email, mainAdmin });
	const user = await newRecord.save();
	return user;
};

const AdminModel = mongoose.model('Admin', Admin);

export default AdminModel;
