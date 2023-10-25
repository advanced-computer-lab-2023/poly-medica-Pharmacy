import CartModel from '../models/Cart.js';
import mongoose from 'mongoose';

class CartRepository {
	async createCart(userId) {
		const cart = await CartModel.create({
			userId: new mongoose.Types.ObjectId(userId),
		});
		return cart;
	}

	async addMedicineToCart(userId, medicine, quantity) {
		const cart = await CartModel.findOneAndUpdate(
			{ userId: new mongoose.Types.ObjectId(userId) },
			{
				$push: {
					medicines: {
						medicine: medicine,
						quantity: quantity,
					},
				},
			},
			{ new: true },
		);
		return cart;
	}

	async getCartMedicines(userId) {
		const cart = await CartModel.findOne({
			userId: new mongoose.Types.ObjectId(userId),
		});
		return cart.medicines;
	}

	async updateMedicineInCart(id, quantity) {
		const cart = await CartModel.findOneAndUpdate(
			{ 'medicines.medicine._id': id },
			{
				$set: {
					'medicines.$.quantity': quantity,
				},
			},
			{ new: true },
		);
		return cart;
	}

	async getCart(userId) {
		const cart = await CartModel.findOne({
			userId: new mongoose.Types.ObjectId(userId),
		});
		return cart;
	}

	async deleteMedicineFromCart(id) {
		const medicine = await CartModel.findOneAndUpdate(
			{ 'medicines.medicine._id': id },
			{
				$pull: {
					medicines: {
						'medicine._id': id,
					},
				},
			},
			{ new: true },
		);

		return medicine;
	}
}

export default CartRepository;
