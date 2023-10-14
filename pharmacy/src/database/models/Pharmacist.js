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
	//.....
});

Pharmacist.statics.addUser = async function (userData, speciality, hourlyRate, affiliation, educationalBackground){
    const newRecord = new this({userData, speciality, hourlyRate, affiliation, educationalBackground});
    let user = await newRecord.save();
    return user;
};

const PharmacistModel = mongoose.model('Pharmacist', Pharmacist);

export default PharmacistModel;