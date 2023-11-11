import mongoose from 'mongoose';
import UserSchema from './UserSchema.js';

const Pharmacist = mongoose.Schema({
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
	},
	//.....
});

Pharmacist.statics.addUser = async function (userData, hourlyRate, affiliation, educationalBackground, documentsNames){
	const newRecord = new this({ userData, hourlyRate, affiliation, educationalBackground, documentsNames });
	const user = await newRecord.save();
	return user;
};

const PharmacistModel = mongoose.model('Pharmacist', Pharmacist);

export default PharmacistModel;