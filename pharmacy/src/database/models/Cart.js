import mongoose from 'mongoose';

const Cart = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		unique: true,
	},
	medicines: [
		{
			medicine: {
				_id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				description: {
					type: String,
					required: true,
				},
				pictureName: {
					type: String,
				},
				quantity: {
					type: Number,
					required: true,
				},
				sales: {
					type: Number,
					required: true,
					default: 0,
				},
				medicinalUse: {
					type: String,
					required: true,
				},
				activeIngerdients: {
					type: String,
					required: true,
				},
				monthlySales:{
					type: [Number],
					required: true,
					default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				},
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
