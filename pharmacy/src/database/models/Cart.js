import mongoose from 'mongoose';

const Cart = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		unique: true,
	},
	medicines: [
		{
			medicineId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Medicine',
				required: true,
			},
			quantity: {
				type: Number,
				default: 1,
			},
		},
	],
});

const CartModel = mongoose.model('Cart', Cart);

export default CartModel;
