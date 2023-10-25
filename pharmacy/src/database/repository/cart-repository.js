import CartModel from '../models/Cart.js';
import mongoose from 'mongoose';

class CartRepository {
	async createCart(userId) {
		const cart = await CartModel.create({
			userId: new mongoose.Types.ObjectId(userId),
		});
		return cart;
	}

	async addMedicineToCart(userId, medicineId) {
		const cart = await CartModel.findOneAndUpdate(
			{ userId: new mongoose.Types.ObjectId(userId) },
			{
				$push: {
					medicines: {
						medicineId: new mongoose.Types.ObjectId(medicineId),
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
			{ 'medicines.medicineId': id },
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
			{ 'medicines.medicineId': id },
			{
				$pull: {
					medicines: {
						medicineId: id,
					},
				},
			},
			{ new: true },
		);

		return medicine;
	}
}

export default CartRepository;
