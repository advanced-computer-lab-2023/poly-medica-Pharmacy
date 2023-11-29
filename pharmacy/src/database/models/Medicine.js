import mongoose from 'mongoose';

const Medicine = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	pictureName: {
		type: String,
	},
	quantity: {
		type: Number,
		required: true
	},
	sales: {
		type: Number, 
		required: true,
		default: 0
	},
	medicinalUse: {
		type: String,
		required: true
	},
	activeIngerdients: {
		type: String,
		required: true
	},
	monthlySales:{
		type: [Number],
		required: true,
		default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	}
});

const MedicineModel = mongoose.model('Medicine', Medicine);

export default MedicineModel;