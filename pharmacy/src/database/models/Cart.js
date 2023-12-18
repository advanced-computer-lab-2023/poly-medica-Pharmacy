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
				monthlySales: {
					type: [[Number]],
					required: true,
					default: () =>
						Array.from({ length: 13 }, () => new Array(32).fill(0)),
				},
			},
			quantity: {
				type: Number,
				default: 1,
			},
		},
	],

	prescriptions: [
		{
			prescriptionId: {
				type: mongoose.Schema.Types.ObjectId,
			},

			description: {
				type: String,
			},

			doctorName: {
				type: String,
			},

			medicines: [
				{
					medicineId: {
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
					amount: {
						type: Number,
						required: true,
					},
				},
			],

			medicinesQuantity: {
				type: Number,
				required: true,
			},

			price: {
				type: Number,
				required: true,
			},
		},
	],
});

const CartModel = mongoose.model('Cart', Cart);

export default CartModel;
