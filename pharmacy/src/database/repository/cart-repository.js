import CartModel from '../models/Cart.js';

class CartRepository {
	async createCart(userId) {
		const cart = await CartModel.create({ userId });
		return cart;
	}

	async addMedicineToCart(userId, medicineId) {
		const cart = await CartModel.findOneAndUpdate(
			{ userId: userId },
			{
				$push: {
					medicines: {
						medicineId: medicineId,
					},
				},
			},
			{ new: true },
		);
		return cart;
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
		const cart = await CartModel.findOne({ userId: userId });
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
