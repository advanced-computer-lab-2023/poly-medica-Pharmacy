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
		required: true
	},
	medicinalUse: {
		type: String,
		required: true
	},
	activeIngerdients: {
		type: String,
		required: true
	}
});

const MedicineModel = mongoose.model('Medicine', Medicine);

export default MedicineModel;