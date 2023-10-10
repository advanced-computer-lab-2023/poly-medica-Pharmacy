import mongoose from 'mongoose';
import UserSchema from './UserSchema.js';
import { GENDERS } from '../utils/Constants.js';

const Patient = mongoose.Schema({
	userData: {
		type: UserSchema,
		required: true
	},
	gender: {
		type: String,
		enum: GENDERS,
		required: true
	},
	mobileNumber: {
		type: String,
		required: true
	},
	emergencyContact: {
		name: {
			type: String,
			required: true
		},
		mobile: {
			type: String,
			required: true
		}
	},
	familyMembers: [
		{
			name: {
				type: String,
				required: true
			},
			nationalId: {
				type: String,
				required: true,
				unique: true
			},
			age: {
				type: Number,
				required: true
			},
			gender: {
				type: String,
				enum: GENDERS,
				required: true
			},
			relation: {
				type: String,
				required: true
			}
		}
	]
	//.....
});

const PatientModel = mongoose.model('Patient', Patient);

export default PatientModel;