import mongoose from 'mongoose';
import UserSchema from './UserSchema.js';
import { ZERO_INDEX_ARR } from '../../utils/Constants.js';

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
	walletAmount: {
		type: Number,
		default: 0,
		validate: {
			validator: function (v) {
				return v >= ZERO_INDEX_ARR;
			},
			message: (props) => `${props.value} is not a valid wallet amount!`,
		},
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