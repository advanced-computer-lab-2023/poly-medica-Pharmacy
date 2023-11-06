import CartModel from '../models/Cart.js';
import mongoose from 'mongoose';

class CartRepository {
	async createCart(userId) {
		const cart = await CartModel.create({
			userId: new mongoose.Types.ObjectId(userId),
		});
		return cart;
	}

	async addMedicineToCart(userId, medicine) {
		const cart = await CartModel.findOneAndUpdate(
			{ userId: new mongoose.Types.ObjectId(userId) },
			{
				$push: {
					medicines: {
						medicine: medicine,
					},
				},
			},
			{ new: true },
		);
		return cart;
	}

	async getMedicine(userId, medicineId) {
		const cart = await CartModel.findOne({
			userId: new mongoose.Types.ObjectId(userId),
		});
		return cart.medicines.find((item) => item.medicine._id == medicineId);
	}

	async getCartMedicines(userId) {
		const cart = await CartModel.findOne({
			userId: new mongoose.Types.ObjectId(userId),
		});
		return cart.medicines;
	}

	async updateMedicineInCart(userId, medicineId, quantity) {
		const cart = await CartModel.findOneAndUpdate(
			{
				userId: new mongoose.Types.ObjectId(userId),
				'medicines.medicine._id': medicineId,
			},
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

	async deleteMedicineFromCart(userId, medicineId) {
		const cart = await CartModel.findOne({
			userId: new mongoose.Types.ObjectId(userId),
		});

		const updatedMedicines = cart.medicines.filter(
			(item) => item.medicine._id != medicineId,
		);
		cart.medicines = updatedMedicines;
		await cart.save();

		return cart;
	}
}

export default CartRepository;
