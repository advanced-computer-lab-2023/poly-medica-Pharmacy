import mongoose from 'mongoose';
import UserSchema from './UserSchema.js';
import bcrypt from 'bcrypt';
const PharmacistReq = mongoose.Schema({
	userData: {
		type: UserSchema,
		required: true
	},
	hourlyRate: {
		type: Number,
		required: true
	},
	affiliation: {
		type: String,
		required: true
	},
	educationalBackground: {
		type: String,
		required: true
	},
	documentsNames: {
		type: [String],
		required: true
	},
	//.....
});

PharmacistReq.statics.addUser = async function (userData, speciality, hourlyRate, affiliation, educationalBackground){
	const salt = await bcrypt.genSalt();
	userData.password = await bcrypt.hash(userData.password, salt);
	const newRecord = new this({ userData, speciality, hourlyRate, affiliation, educationalBackground });
	const user = await newRecord.save();
	return user;
};

const PharmacistReqModel = mongoose.model('PharmacistReq', PharmacistReq);

export default PharmacistReqModel;