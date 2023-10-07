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

const PharmacistModel = mongoose.model('Pharmacist', Pharmacist);

export default PharmacistModel;