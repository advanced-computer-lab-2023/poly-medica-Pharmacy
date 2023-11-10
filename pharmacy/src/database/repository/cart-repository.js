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
		await CartModel.findOneAndUpdate(
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

		return await this.getCart(userId);
	}

	async getMedicine(userId, medicineId) {
		const cart = await CartModel.findOne({
			userId: new mongoose.Types.ObjectId(userId),
		});
		return cart.medicines.find((item) => item.medicine._id == medicineId);
	}

	async getCartMedicines(userId) {
		const cart = this.getCart(userId);
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
		const cart = await this.getCart(userId);
		if (cart) {
			for (let i = 0; i < cart.medicines.length; i++) {
				if (cart.medicines[i].medicine._id == medicineId) {
					cart.medicines.splice(i, 1);
					break;
				}
			}
		}

		return cart;
	}
}

export default CartRepository;
