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

Cart.statics.signup = async function (
	userId,
	email,
	password,
	userName,
	type,
	state,
) {
	const userRecord = new this({
		userId: new mongoose.Types.ObjectId(userId),
		email,
		password,
		userName,
		type,
		state,
	});
	const result = await userRecord.save();
	return result;
};

const CartModel = mongoose.model('Cart', Cart);

export default CartModel;
